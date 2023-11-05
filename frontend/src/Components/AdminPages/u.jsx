import React, { useState, useEffect, Fragment } from "react";
import { nanoid } from "nanoid";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import { v4 as uuid } from "uuid";
import Side from "./Sidebar";
import API_BASE_URL from "../../config";

export const U = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("SavedToken"),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed");
        }
        return response.json();
      })
      .then((data) => {
        setContacts(data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, []);

  //for adding data in add contacts
  const [addFormData, setAddFormData] = useState({
    name: "",
    year: parseInt(),
    password: "",
    department: "",
    email: "",
    batch: parseInt(),
    isAdmin: "",
  });

  const [editFormData, setEditFormData] = useState({
    name: "",
    // year:parseInt(),
    department: "",
    email: "",
    password: "",
    batch: parseInt(),
  });

  const [editContactId, setEditContactId] = useState(null);

  //when ever the form changes it will call this function (add contact form)
  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name"); //gets the  name attribute from the input field
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData }; //copyying values from addformdata to newformdata
    newFormData[fieldName] = fieldValue;
    //selecting the field name and assigning the field value to it
    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };
  //called when add button is clicked in add contact form

  const handleAddFormSubmit = async (event) => {
    event.preventDefault(); // prevents the page from reloading when submit button is clicked[or to stop making post request when it's submitted]

    const newContact = {
      id: nanoid(),
      name: addFormData.name,
      email: addFormData.email,
      password: uuid(),
      department:
        addFormData.department === "bcs" ||
        addFormData.department === "bec" ||
        addFormData.department === "bcy" ||
        addFormData.department === "bcd"
          ? addFormData.department
          : alert("Wrong department input"),
      year:
        addFormData.year >= 2019 ? addFormData.year : alert("Wrong year input"),
      isAdmin: "yes" ? addFormData.isAdmin === "True" : "False",
      batch:
        addFormData.batch >= 1 && addFormData.batch <= 3
          ? addFormData.batch
          : alert("Wrong batch input"),
    };

    let response;
    try {
      if (!addFormData.email.endsWith("iiitkottayam.ac.in")) {
        throw new Error(
          'Error: Invalid email. Only emails with the domain "iiitkottayam.ac.in" are allowed.'
        );
      }
      const response = await fetch(`${API_BASE_URL}/user`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("SavedToken"),
        },
        body: JSON.stringify(newContact),
      });
      if (!response.ok) {
        alert("Error: " + response.status);
      }
      const data = await response.json();
      setContacts([...contacts, data]);
      setAddFormData({
        name: "",
        year: parseInt(),
        batch: parseInt(),
        department: "",
        email: "",
      });
    } catch (error) {
      console.error(error);
      if (response && response.text) {
        const errorMessage = await response.text(); // Get the error message from the response body
        console.error(errorMessage); // Log the specific error message
        // Perform additional error handling as needed
      }
    }
  };

  const handleEditFormSubmit = async (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      name: editFormData.name,
      password: 1234, // remove this
      email: editFormData.email,
      department:
        editFormData.department === "bcs" ||
        editFormData.department === "bec" ||
        editFormData.department === "bcy" ||
        editFormData.department === "bcd"
          ? editFormData.department
          : alert("Wrong department input"),
      // year: editFormData.year >= 2019 ? editFormData.year : alert("Wrong year input"),
      isAdmin: "yes" ? editFormData.isAdmin === "True" : "False",
      batch:
        editFormData.batch === 1 ||
        editFormData.batch === 2 ||
        editFormData.batch === 3,
    };

    try {
      if (!editFormData.email.endsWith("iiitkottayam.ac.in")) {
        alert(
          'Error: Invalid email. Only emails with the domain "iiitkottayam.ac.in" are allowed.'
        );
      }

      const response = await fetch(`${API_BASE_URL}/user/${editContactId}`, {
        method: "PUT", // or 'PATCH' depending on your API's requirements
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("SavedToken"),
        },
        body: JSON.stringify(editedContact),
      });

      if (!response.ok) {
        throw new Error("Error: " + response.status);
      }

      // Update the contacts state with the edited contact
      const updatedContacts = contacts.map((contact) => {
        if (contact.id === editContactId) {
          return editedContact;
        }
        return contact;
      });

      setContacts(updatedContacts);
      setEditContactId(null);
    } catch (error) {
      console.error(error);
      // Handle the error accordingly
    }
  };

  const handleEditClick = (event, contact) => {
    //contact bec we need to know the contact id to checkwhich row is editable
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      name: contact.name,
      //  year:contact.year,
      batch: contact.batch,
      department: contact.department,
      email: contact.email,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = async (contactId) => {
    const newContacts = [...contacts];

    try {
      const response = await fetch(`${API_BASE_URL}/user/${contactId}`, {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("SavedToken"),
        },
      });

      if (!response.ok) {
        throw new Error("Error: " + response.status);
      }

      const index = contacts.findIndex((contact) => contact.id === contactId);
      newContacts.splice(index, 1);
      setContacts(newContacts);
    } catch (error) {
      console.error(error);
      // Handle the error accordingly
    }
  };

  return (
    <div className="bg-image">
      <div className="side">
        <Side></Side>
      </div>
      <div className="container1">
        <h1>Student Details</h1>

        <form onSubmit={handleEditFormSubmit}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                {/* <th>year</th> */}
                <th>Batch</th>
                <th>Department</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <Fragment key={contact.id}>
                  {editContactId === contact.id ? ( // if editcontactid is equal to contact id then we can edit editable row else it will be readonly row ie, can't edit
                    <EditableRow //we can't wrap editablerow in form tag because a form can't be child of tbodyt
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}
                    />
                  ) : (
                    <ReadOnlyRow
                      contact={contact}
                      handleEditClick={handleEditClick}
                      handleDeleteClick={handleDeleteClick}
                    />
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </form>

        <h2>Add a Contact</h2>
        <form onSubmit={handleAddFormSubmit}>
          <div className="form">
            <input
              className="in"
              type="text"
              name="name"
              required="required"
              placeholder="Name"
              onChange={handleAddFormChange}
            />
            <input
              type="text"
              className="in"
              name="year"
              required="required"
              placeholder="year"
              onChange={handleAddFormChange}
            />

            <input
              type="text"
              className="in"
              name="department"
              required="required"
              placeholder="Department"
              onChange={handleAddFormChange}
            />

            <input
              type="batch"
              name="batch"
              required="required"
              className="in"
              placeholder="batch"
              onChange={handleAddFormChange}
            />

            <input
              type="email"
              name="email"
              className="in"
              required="required"
              placeholder="Email"
              onChange={handleAddFormChange}
            />
            <select
              name="isAdmin"
              className="in"
              placeholder="Select Admin"
              value={addFormData.isAdmin} // Set the selected value of the dropdown
              required="required"
              onChange={handleAddFormChange}
            >
              <option value="">Select Admin</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>

            <button className="on" type="submit">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

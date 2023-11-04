import React from "react";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td>
        <input //making a form to edit the data for each row
          type="text"
          required="required"
          placeholder="name"
          name="fullName"
          value={editFormData.name}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="year"
          name="year"
          value={editFormData.year}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <input
          type="text"
          required="required"
          placeholder="batch"
          name="batch"
          value={editFormData.year}
          onChange={handleEditFormChange}
        ></input>
      <td></td>
      <td>
      <input
          type="text"
          name="department"
          required="required"
          placeholder="Department"
          value={editFormData.department}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type="email"
          required="required"
          placeholder="email"
          name="email"
          value={editFormData.email}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;

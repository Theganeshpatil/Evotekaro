import React, { useEffect, useState } from "react";
import CreateElection from "./CreateElection";
import Sidebar from "./Sidebar";
import jwt_decode from "jwt-decode";
import API_BASE_URL from "../../config";

export const Dashboard = ({ onFormSwitch = () => {}, setElectionId = () => {}, seteId = () => {} }: any) => {
  const [d, setd] = useState<any[]>([]);
  const token = localStorage.getItem("SavedToken") || "";
  let decoded: any = {};
  if (token) {
    try {
      decoded = jwt_decode(token.replace("Bearer ", ""));
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetch(`${API_BASE_URL}/election/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("request failed");
        }
        return response.json();
      })
      .then((data) => {
        setd(data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, [token]);

  function shouldRenderElection(item: any, decoded: any) {
    return (
      item.batch === "all" ||
      item.batch === decoded.batch ||
      item.year === "all" ||
      item.year === decoded.year ||
      item.branch === "all" ||
      item.branch === decoded.branch
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <div className="w-64 flex-shrink-0">
        <Sidebar change={onFormSwitch} />
      </div>
      <div className="flex-1 overflow-y-auto p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">EvoteKaro Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {d.map((item) =>
            shouldRenderElection(item, decoded) ? (
              <CreateElection
                title={item.name}
                rule={item.rules}
                onFormSwitch={onFormSwitch}
                setElectionId={setElectionId}
                start={item.startTime}
                end={item.endTime}
                seteId={seteId}
                id={item.id}
                key={item.id}
              />
            ) : null
          )}
        </div>
        <div className="mt-12 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">About:</h2>
          <p className="text-gray-600">
            Welcome to the EvoteKaro admin dashboard. From here, you can manage elections and track results securely.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

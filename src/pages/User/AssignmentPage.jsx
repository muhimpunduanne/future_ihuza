import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckDone01, Package } from "@untitledui/icons";

export default function AssignmentsPage() {
    const [assignments, setAssignments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedAssignments = JSON.parse(localStorage.getItem("assignments")) || [];
        setAssignments(storedAssignments);
    }, []);

    if (assignments.length === 0) {
        return (
            <div className="mt-16 ml-64 p-6">
                <p className="text-gray-500 text-lg">No assignments found</p>
            </div>
        );
    }

    return (
        <div className="mt-16 ml-64 p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">All Assignments</h1>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {assignments.map((assignment, index) => (
                    <div
                        key={index}
                        className="p-4 bg-white rounded-md shadow cursor-pointer hover:bg-gray-50 transition"
                        onClick={() => navigate(`/assignments/${index}`)}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <Package className="h-5 w-5 text-green-600" />
                            <h2 className="text-lg font-medium">{assignment.productTitle}</h2>
                        </div>
                        <p className="text-sm text-gray-500 mb-1">
                            <strong>Assigned to:</strong> {assignment.userName}
                        </p>
                        <p className="text-sm text-gray-500 mb-1">
                            <strong>Date:</strong> {assignment.date || "N/A"}
                        </p>
                        <span
                            className={`mt-2 inline-block px-3 py-1 text-xs font-medium rounded-full ${assignment.statusColor || "bg-gray-100 text-gray-600"}`}
                        >
              {assignment.status || "Pending"}
            </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
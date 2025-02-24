import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [resumes, setResumes] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalFormData, setModalFormData] = useState({
    name: "",
    email: "",
    jd : ""
  });
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // Get the first selected file
    setFile(selectedFile); // Update state with the selected file
  };

  // Fetch all resumes
  const fetchResumes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/students", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setResumes(response.data);
    } catch (error) {
      console.error("Error fetching resumes:", error);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  // Handle file upload
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file to upload");
      return;
    }
    
    setIsLoading(true)
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", modalFormData.name);
    formData.append("email", modalFormData.email); 
    formData.append("jd", modalFormData.jd); 
    try {
      await axios.post(
        "http://localhost:5000/api/students",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      fetchResumes()
      alert("Resume uploaded successfully");
    } catch (error) {
      console.error("Error uploading resume:", error);
      alert("Failed to upload resume");
    }
    finally{
      setModal(false)
      setIsLoading(false)
    }
  };

  // Handle file deletion
  const handleDelete = async (id) => {
    try {
      console.log();

      await axios.delete(`http://localhost:5000/api/students/${id}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });
      fetchResumes();
      alert("Resume deleted successfully");
    } catch (error) {
      console.error("Error deleting resume:", error);
      alert("Failed to delete resume");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col p-8">
      <div className="flex justify-between w-full mb-4">
        <h1 className="text-4xl font-semibold mb-8">Dashboard</h1>
        <button
          onClick={() => {
            setModal(true);
          }}
          className="bg-blue-600 text-white px-4 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Add Student
        </button>
      </div>
      {/* Dashboard Content */}
      <div className="w-full max-w-4xl mx-auto bg-gray-900 rounded-lg shadow-lg p-8">
        {/* File Upload Section */}
        {modal && (
          <form onSubmit={handleUpload} className="mb-8 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-700 p-4 rounded-md">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Upload Resume
            </h2>
            <div className="flex flex-col gap-2 w-full">
              <input
                className="bg-white text-black p-2 rounded-md"
                placeholder="Enter student email"
                type="email"
                required
                value={modalFormData.email}
                onChange={(e) =>
                  setModalFormData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
              />
              <input
                className="bg-white text-black p-2 rounded-md"
                placeholder="Enter student name"
                type="text"
                required
                value={modalFormData.name}
                onChange={(e) =>
                  setModalFormData((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
              <textarea
                className="bg-white text-black p-2 rounded-md"
                placeholder="Enter Job Description"
                type="text"
                required
                value={modalFormData.jd}
                onChange={(e) =>
                  setModalFormData((prev) => ({
                    ...prev,
                    jd: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-center p-4">
                {/* File input button */}
                <label htmlFor="file" className="text-center my-4 cursor-pointer bg-blue-500 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-transform transform hover:scale-105 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">Browse</label>
                <input
                  style={{ display: "none" }}
                  id="file"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                />

                {/* File name display */}
                {file && (
                  <div className="w-full text-white mt-4">
                    <span className="font-medium">Selected File:</span>{" "}
                    {file.name}
                  </div>
                )}
              </div>
              <div className="flex justify-end w-full gap-2">
                <button
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300 cursor-pointer"
                  onClick={() => {
                    setModal(false);
                    setModalFormData({ name: "", email: "" });
                    setFile(null);
                  }}
                >
                  Close
                </button>
                <button
                  disabled={isLoading}
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300 cursor-pointer"
                >
                  {isLoading ? 'Uploading...' : 'Upload'}
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Resume List Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Uploaded Resumes
          </h2>
          {resumes.length === 0 ? (
            <p className="text-gray-400 text-center">
              No resumes uploaded yet.
            </p>
          ) : (
            <ul className="space-y-4">
              {resumes.map((resume) => (
                <li
                  key={resume.id}
                  className="bg-gray-800 p-4 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <p className="text-lg font-semibold">{resume.name}</p>
                    <Link
                      to={`/student/${resume._id}`}
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-400"
                    >
                      View Resume
                    </Link>
                  </div>
                  <button
                    onClick={() => handleDelete(resume._id)}
                    className="cursor-pointer bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

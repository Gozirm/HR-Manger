import React from "react";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast, { LoaderIcon } from "react-hot-toast";
import "../../Styles/AdminSummary.css";
import cancleIcon from "../../assets/cancle-icon.svg";
import addIcon from "../../assets/addIcon.svg";
const TaskModal = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [title, setTitle] = useState([]);
  const token = localStorage.getItem("hr-token");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [status, setStatus] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [assignedMembers, setAssignedMembers] = useState([]);
  const [description, setDescription] = useState([]);

  useEffect(() => {
    if (searchQuery) {
      const fetchSuggestions = async () => {
        try {
          const response = await axios.get(
            `http://localhost:4000/api/employee/users/search?query=${searchQuery}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setSuggestions(response.data.users);
        } catch (error) {
          console.error("Error fetching user suggestions:", error);
          toast.error("Not Found");
        }
      };
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  const handleAddMember = (member) => {
    if (!assignedMembers.some((m) => m._id === member._id)) {
      setAssignedMembers([...assignedMembers, member]);
      setSearchQuery("");
      setSuggestions([]);
    } else {
      toast.error("member already added");
    }
  };

  const handleRemoveMember = (memberToRemove) => {
    setAssignedMembers(
      assignedMembers.filter((member) => member._id !== memberToRemove._id)
    );
  };

  const newTask = {
    title,
    description,
    assignedMembers: assignedMembers.map((member) => member._id),
    startDate,
    endDate,
    status,
  };

  function reset() {
    setTitle([]);
    setDescription([]);
    setAssignedMembers([]);
    setEndDate("");
    setStartDate("");
    setStatus("");
    setSearchQuery("");
    setSuggestions([]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const req = await axios.post(
        "http://localhost:4000/api/task/task",
        newTask,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (req.data.success) {
        toast.success(req?.data?.message);
        setTitle([]);
        setDescription([]);
        setAssignedMembers([]);
        setEndDate("");
        setStartDate("");
        setStatus("");
        setSearchQuery("");
        setSuggestions([]);
        props.onHide();
      }
      // console.log(req.data);
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error(error?.response?.data?.errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const btnText = isSubmitting ? "Checking..." : "Save";

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h1>Create New Task</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <main className="container">
              <div className="">
                <form onSubmit={handleSubmit}>
                  {/* 1 */}
                  <div className=" gap-5 mb-4">
                    <div className="col-lg mb-3 mb-lg-0 w-100">
                      <label>Task Title</label>
                      <input
                        type="text"
                        placeholder="Enter Name"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-100 input-employee"
                        autoFocus
                      />
                    </div>
                    <div className="col-lg w-100">
                      <label>Task Description</label>
                      <textarea
                        type="text-area"
                        className="w-100 mt-3"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="5"
                        cols="50"
                      />
                    </div>
                  </div>

                  <div className="col-lg w-100 mb-4">
                    <label>Assign Persons</label>
                    <input
                      type="text"
                      className="w-100 assigned-members-input input-employee"
                      placeholder="Search for employees"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {suggestions.length > 0 && (
                      <div
                        className="suggestions-list d-flex flex-wrap gap-2"
                        role="button"
                      >
                        {suggestions.map((suggestion) => (
                          <div
                            key={suggestion._id}
                            className="suggestion-list-li d-fle flex-wrap gap-2"
                          >
                            {suggestion.firstName} {suggestion.lastName}
                            <img
                              src={addIcon}
                              alt=""
                              className="ms-2"
                              onClick={() => handleAddMember(suggestion)}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="assigned-members flex-wrap d-flex row gap-2">
                      {assignedMembers.map((member) => (
                        <span key={member._id} className="assigned-member">
                          {member.firstName} {member.lastName}
                          <img
                            src={cancleIcon}
                            alt=""
                            onClick={() => handleRemoveMember(member)}
                            className="mb-1"
                            role="button"
                          />
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* 3 */}
                  <div className="d-md-flex gap-5 mb-2">
                    <div className="col-lg mb-3 mb-lg-0 w-100">
                      <label>Start Date</label>
                      <input
                        type="date"
                        placeholder="Select Date"
                        value={startDate}
                        className="w-100 input-employee"
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </div>
                    <div className="col-lg mb-3 mb-lg-0 w-100">
                      <label>End Date</label>
                      <input
                        type="date"
                        placeholder="Select Date"
                        className="w-100 input-employee"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </div>
                  </div>
                  {/* 4 */}
                  <div className="d-md-flex gap-5 mb-5">
                    <div className="col-lg mb-3 mb-lg-0 w-100">
                      <label>Task Status</label>
                      <select
                        name=""
                        id=""
                        className="input-employee w-100"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="" disabled selected>
                          Select Status
                        </option>
                        <option value="planned">Planned</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  </div>
                  {/* end */}
                  <div className="d-lg-flex gap-3">
                    <Link className="w-25" to="">
                      <button className="cancel" onClick={reset}>
                        Cancel
                      </button>
                    </Link>
                    <button
                      type="submit"
                      className="save mt-3 mt-lg-0"
                      disabled={setIsSubmitting}
                    >
                      {btnText}
                    </button>
                  </div>
                </form>
              </div>
            </main>
          </>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TaskModal;

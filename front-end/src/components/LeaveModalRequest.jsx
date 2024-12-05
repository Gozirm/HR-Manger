import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { requestLeave } from "../lib/ValidationScheme";
import { yupResolver } from "@hookform/resolvers/yup";
import { getAllLeaves } from "./getAllLeaves";
import { Loader } from "../Auth/Loader";
const LeaveModalRequest = (props) => {
  const token = localStorage.getItem("hr-token");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalShowRequest, setModalShowRequest] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(requestLeave),
  });

  const submitRequest = async (data) => {
    try {
      const req = await fetch("http://localhost:4000/api/leave/apply", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await req.json();
      console.log(res);
      if (res.success) {
        props.onHide();
        fetchLeaves();
        setModalShowRequest(false);
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
      setError("Failed to fetch departments");
    }
    reset();
  };
  const fetchLeaves = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const leaves = await getAllLeaves(token);
      setData(leaves);
    } catch (error) {
      setError("Error fetching leaves");
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return (
      <div className="vh-100 d-flex justify-content-center">
        {" "}
        <Loader />{" "}
      </div>
    );
  }
  return (
    <>
      <Modal
        onHide={() => modalShowRequest}
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="new-team-wrapper"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <span> Leave Request</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(submitRequest)}>
            {/* task status */}
            <Form.Group className="mb-3">
              <Form.Label htmlFor="">Leave Type</Form.Label>
              <Form.Select
                id=""
                className="new-team-wrapper-select"
                {...register("leaveType", { required: true })}
              >
                <option disabled selected>
                  Select
                </option>
                <option> Annual Leave</option>
                <option>Sick Leave</option>
                <option>Casual Leave</option>
              </Form.Select>
              <span className="text-danger fs-6 text-start fw-bold">
                {" "}
                {errors.leaveType?.message}
              </span>
            </Form.Group>

            {/* start and end date */}
            <div className="container-fluid mb-4">
              <div className="row justify-content-between">
                <Form.Group
                  className="mb-3 col-lg-6 ps-0"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Select Date"
                    {...register("startDate", { required: true })}
                  />
                  <span className="text-danger fs-6 text-start fw-bold">
                    {" "}
                    {errors.startDate?.message}
                  </span>
                </Form.Group>
                <Form.Group
                  className="mb-3 col-lg-6 px-0 "
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Select Date"
                    {...register("endDate", { required: true })}
                  />
                  <span className="text-danger fs-6 text-start fw-bold">
                    {" "}
                    {errors.endDate?.message}
                  </span>
                </Form.Group>
              </div>
            </div>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                {...register("description", { required: true })}
              />
              <span className="text-danger fs-6 text-start fw-bold">
                {" "}
                {errors.description?.message}
              </span>
            </Form.Group>

            <div className="d-flex flex-column-reverse flex-md-row justify-content-between w-100 gap-lg-5 gap-3">
              <Button
                variant="outline-danger"
                className="cancel-btn mb-2"
                onClick={() => reset()}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                className="save-and-continue-btn"
                // onClick={() => submitRequest() }
              >
                Save
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LeaveModalRequest;

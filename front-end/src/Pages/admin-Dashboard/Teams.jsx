import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import arrow from "../../assets/teamArror.svg";
import addIcon from "../../assets/addIcon.svg";
import { useMatch } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
// function MyVerticallyCenteredModal(props) {
//   return (
//     <Modal
//       {...props}
//       size="lg"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       <Modal.Body className="p-3">
//         <div className="d-flex justify-content-between mb-3">
//           <h1>Product Team</h1>
//           <div className="d-flex gap-lg-4 gap-3 align-items-center">
//             <Link to="/admin-dashboard/employess/teams/edit-teams">
//               <button className="editTeam">Edit Team</button>
//             </Link>
//             <img onClick={props.onHide} src={xIcon} />
//           </div>
//         </div>
//         <div>
//           <Table responsive="lg">
//             <thead className="text-white">
//               <tr className="title-tr">
//                 <th className="bg-light ">Team Members</th>
//                 <th className="bg-light">Role</th>
//                 <th className="text-center bg-light ">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {Employ.map((employe) => {
//                 const {
//                   id,
//                   names,
//                   img,
//                   email,
//                   team,
//                   supervisor,
//                   status,
//                   role,
//                 } = employe;
//                 return (
//                   <tr key={id} className="title">
//                     <td>
//                       <div className="d-flex gap-2 align-items-center">
//                         <img src={img} alt="" />
//                         <p className="mt-3 ">{names}</p>
//                       </div>
//                     </td>
//                     <td>
//                       <p className="mt-3">{role}</p>
//                     </td>
//                     <td className="text-center pt-3 ">
//                       <p
//                         className={`action-status mt-2 ${status
//                           .replace(/\s+/, "-")
//                           .toLowerCase()}`}
//                       >
//                         {status}
//                       </p>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </Table>
//         </div>
//       </Modal.Body>
//     </Modal>
//   );
// }
const Teams = () => {
  const [teamsActive, setTeamsActive] = useState(true);
  const match = useMatch("/admin-dashboard/employess/teams");
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDept, setSelectedDept] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem("hr-token");
  const getAllDepartments = async () => {
    try {
      const req = await axios.get(
        "https://hr-manger.onrender.com/api/department/all-departments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(req.data.departments);
      setData(req.data.departments);
    } catch (error) {}
  };
  // signle dept
  const getDeptById = async (id) => {
    try {
      const res = await axios.get(`https://hr-manger.onrender.com/api/department/departments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSelectedDept(res.data.department);
      setShowModal(true); 
      console.log(res.data.department);
      
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllDepartments();
  }, []);
  return (
    <>
      {match ? (
        <main className="mt-lg-5 container">
          {/*  */}
          <h1 className="mt-4">Employees</h1>
          <p className="title">Dashboard/Employee</p>
          <div className="d-flex align-items-center justify-content-between gap-4">
            <div className="d-flex align-items-center gap-md-5 gap-3">
              <Link to="/admin-dashboard/employess" className="text-secondary">
                All Employees
              </Link>
              <Link
                to="/admin-dashboard/employess/teams"
                className={teamsActive ? "active-link" : "text-secondary "}
                onClick={() => {
                  setEmployeesActive(false);
                  setTeamsActive(true);
                }}
              >
                Team
              </Link>
            </div>
            <Link to="/admin-dashboard/employess/teams/new-teams">
              <button
                style={{
                  width: "100%",
                  color: "white",
                  backgroundColor: "#3439CA",
                  fontFamily: "Bricolage Grotesque, sans-serif",
                }}
                className="newEmployeebtn px-3"
              >
                <img src={addIcon} className="me-1" />
                New Team
              </button>
            </Link>
          </div>
          <hr />
         
            <div className="gap-4  justify-content-between w-100 mx-0 row">
              {/* <div className="border p-3 rounded  team">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex">
                    {data.map((departmentName) => {
                      return  <div>
                         <h2>{departmentName.name} Dept. </h2>
                         <h2>  {departmentName.members.length} </h2>
                      </div>
                        

                    })}
                    {data.map((totalTeams) => {
                      const { _id, membersLenght } = totalTeams;
                      return (
                        <div key={_id}>
                          <p>{totalTeams.manager.fullName} Members</p>
                        </div>
                      );
                    })}
                  </div>
                  <Link
                    className="text-primary"
                    onClick={() => setModalShow(true)}
                  >
                    View All
                  </Link>
                  <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                  />
                </div>
                <hr />
                {data.map((teams) => {
                  const { _id, manager } = teams;
                  return (
                    <div>
                      <div
                        key={_id}
                        className="d-flex justify-content-between align-items-center"
                      >
                        <div className="d-flex align-items-center gap-3">
                          <img
                            src={manager?.profileImage}
                            alt=""
                            className="profileImgIcon mt-3"
                          />
                          <div className="pt-3">
                            <h5 className="mb-0">{manager.fullName}</h5>
                            <p className="m-0">Manager</p>
                          </div>
                        </div>
                        <img src={arrow} alt="" />
                      </div>
                    </div>
                  );
                })}
              </div> */}
              {data.map((datum) => {
                return (
                  // <div className="row">
                  <div className="border p-3 rounded teams col-4  ">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h2>{datum.name}</h2>
                        <p>{datum.membersLenght} Members</p>
                      </div>
                      <Link
                        className="text-primary"
                        onClick={() => getDeptById(datum._id)}
                      >
                        View All
                      </Link>
                    </div>
                    <hr />
                    <div>
                      <div className="d-flex justify-content-between align-items-center ">
                        <div className="d-flex align-items-center gap-3">
                          <img
                            src={datum?.manager.profileImage}
                            alt=""
                            className="profileImgIcon mt-3"
                          />
                          <div className="pt-3">
                            <h5 className="mb-0">{datum?.manager.fullName}</h5>
                            <p className="m-0">Manager</p>
                          </div>
                        </div>
                        <img src={arrow} alt="" />
                      </div>
                      {datum?.members.slice(0,3).map((datumMembers) => {
                        return (
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center gap-3">
                              <img
                                src={datumMembers?.profileImage}
                                alt=""
                                className="profileImgIcon mt-3"
                              />
                              <div className="pt-3">
                                <h5 className="mb-0">
                                  {datumMembers?.fullName}
                                </h5>
                                <p className="m-0">{datumMembers?.jobTitle}</p>
                              </div>
                            </div>
                            <img src={arrow} alt="" />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  // </div>
                );
              })}
            </div>
          
          {/* <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          /> */}
          {/* modal fro single dept */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered  size="lg">
          <Modal.Header closeButton >
          
            <Modal.Title> 
              <div  className="d-flex justify-content-between gap-5">

              <h6> {selectedDept?.name} Department </h6> <button>Edit</button>
              </div>
              </Modal.Title>
            
          </Modal.Header>
          <Modal.Body>
           {selectedDept?.members?.map((depts)=>{
            return(
              <div className="d-flex justify-content-between">
                <div className="teams-wrapper-employees-profile-pic">

                <img src={depts.profileImage} alt="" className="profileImgIcon" />
                </div>
                <h5> {depts?.fullName} </h5>
                <div className="d-flex gap-5">

                <span> {depts?.jobTitle} </span>
                <span> {depts?.status} </span>
                </div>

              </div>
            )
           })}
          </Modal.Body>
          {/* <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Modal.Footer> */}
        </Modal>
        </main>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default Teams;

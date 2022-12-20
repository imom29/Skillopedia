import { useEffect, useState } from "react";
import "./dashboard.css";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import image from "../Assets/avatar.png";
import Searchbar from "./Searchbar/Searchbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const PATH = "http://localhost:5000/api/auth";

  const getUsers = () => {
    console.log("Inside getUsers");
    axios.get(`${PATH}/users`).then((res) => {
      setUsers(res.data.users);
      // console.log(res);
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    console.log(users);
  }, [users]);

  const handleClick = (user) => {
    navigate(`/profile/${user._id}`);
  };

  return (
    <div className="col main pt-5 mt-3">
      <nav aria-label="breadcrumb">
        <Searchbar />
      </nav>

      <hr />

      {/* <div className="row" style={{ width: "183%", overflow: "hidden" }}>
        <div className="col-lg-7 col-md-6 col-sm-12">
          <h5 className="mt-3 mb-3 text-secondary">Team Members</h5>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead className="thead-light">
                <tr>
                  <th>FirstName</th>
                  <th>LastName</th>
                  <th>Email</th>
                  <th>Skill Set</th>
                  <th>Role</th>
                  <th>Project</th>
                </tr>
              </thead>
              <tbody>
                {record.slice(0, 5).map((output) => (
                  <tr>
                    <td>{output.id}</td>
                    <td>{output.name}</td>
                    <td>{output.email}</td>
                    <td>{output.username}</td>
                    <td>{output.website}</td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div> */}
      <b className="mt-3 mb-3 text-secondary">Team Members</b>
      <TableContainer>
        <Table size="md" variant="simple" colorScheme="gray">
          <Thead>
            <Tr>
              <Th></Th>
              <Th>FirstName</Th>
              <Th>LastName</Th>
              <Th>Email</Th>
              <Th>Skill Set</Th>
              <Th>Role</Th>
              <Th>Project</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users?.slice(0, 5).map((user) => (
              <Tr
                id="i"
                onClick={() => {
                  handleClick(user);
                }}
              >
                <Td>
                  <img src={image} alt="" style={{ width: "25px" }} />
                </Td>
                <Td>{user?.firstname}</Td>
                <Td>{user?.lastname}</Td>
                <Td>{user?.email}</Td>
                <Td>{user?.Role}</Td>
                <Td>{user?.Skills?.length}</Td>
                <Td></Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Dashboard;

import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
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
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import Searchbar from "../Components/Searchbar/Searchbar";
import axios from "axios";
import avatar from "../Assets/avatar.png";
import Cookies from "js-cookie";

export default function PendingRequest() {
  const [pendingUsers, setUsers] = useState([]);

  const PATH = "http://localhost:5000/api/auth";

  const getUsers = () => {
    axios.get(`${PATH}/pendings`).then((res) => {
      setUsers(res.data.pendings);
      // console.log(res);
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const AcceptRequest = (user) => {
    let token = Cookies.get("token");
    console.log(token, "TOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOKEN");
    axios
      .post(
        `${PATH}/approve`,
        {
          id: user._id,
        },{
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        setUsers(
          pendingUsers.filter((item)=>{
            return item._id != user._id
          })
        )
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const rejectRequest = (user) => {
    setUsers(
      pendingUsers.filter((item)=>{
        return item._id != user._id
      })
    )
  }

  return (
    <div style={{ overflow: "hidden" }}>
      {/* <Navbar/> */}
      <div className="container-fluid" id="main">
        <div className="row row-offcanvas row-offcanvas-left">
          <Sidebar />

          <div className="col main pt-5 mt-3">
            <nav aria-label="breadcrumb">
              <Searchbar />
            </nav>

            <hr />
            <b className="mt-3 mb-3 text-secondary">Pending Requests</b>
            <TableContainer>
              <Table size="md" variant="simple" colorScheme="gray">
                <Thead>
                  <Tr>
                    <Th></Th>
                    <Th>FirstName</Th>
                    <Th>LastName</Th>
                    <Th>Email</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {pendingUsers &&
                    pendingUsers.length !== 0 &&
                    pendingUsers?.slice(0, 5).map((output) => (
                      <Tr>
                        {/* <Td>Pic</Td> */}
                        <Td>
                          <img
                            src={avatar}
                            alt="avatar"
                            style={{ height: "25px" }}
                          />
                        </Td>
                        <Td>{output?.firstname}</Td>
                        <Td>{output?.lastname}</Td>
                        <Td>{output?.email}</Td>
                        <Td>
                          <ButtonGroup variant="outline" spacing="6">
                            <Button
                            onClick={()=>{rejectRequest(output)}}
                              colorScheme="teal"
                              size="sm"
                              variant="ghost"
                            >
                              DECLINE
                            </Button>
                            <Button
                              onClick={() => AcceptRequest(output)}
                              colorScheme="orange"
                              size="sm"
                              variant="solid"
                            >
                              ACCEPT
                            </Button>
                          </ButtonGroup>
                        </Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </TableContainer>
            {pendingUsers && pendingUsers.length === 0 && (
              <>No Pending Requests!</>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

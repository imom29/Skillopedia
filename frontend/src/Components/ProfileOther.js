import React, { useState, useEffect } from "react";
import "./Profilemain.css";
import background from "../Assets/Banner.png";
import person from "../Assets/person.png";
// import { AiOutlineEdit } from "react-icons/ai";
import { Button, ButtonGroup } from "@chakra-ui/react";
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
import axios from "axios";
import Cookie from "js-cookie";
import Star from "./Star";
import { useParams } from "react-router-dom";

const ProfileOther = (props) => {
  const PATH = "http://localhost:5000/api/auth";

  const { id } = useParams();

  const [user, setUser] = useState();

  const getUserinfo = () => {
    let token = Cookie.get("token");
    axios
      .post(
        `${PATH}/userinfo`,
        {
          id,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setUser(res.data.data);
        // console.log(res);
      })
      .catch((error) => {
        console.log("====================================");
        console.log(error);
        console.log("====================================");
      });
  };

  useEffect(() => {
    getUserinfo();
  }, []);

  return (
    <div className="profile_container">
      <div className="image">
        <img src={background} alt="" />
      </div>
      <div className="info_header">
        <img src={person} alt="" />
        <div className="details">
          <h5>
            {user?.firstname}
            {user?.lastname}
          </h5>
          <span>{user?.email}</span>
        </div>
      </div>
      <div className="main_info_container">
        <div className="profile_info_form">
          <div className="profile_info_form_header">
            <h4>Profile Information</h4>
            <hr />
            <hr />
            {/* <AiOutlineEdit className="profile_info_form_header_edit" /> */}
          </div>
          <div className="main_form">
            <hr />
            <span className="title">FirstName: </span>
            <span className="info">{user?.firstname}</span>
            <span className="title">LastName: </span>
            <span className="info">{user?.lastname}</span>
            <span className="title">Email: </span>
            <span className="info">{user?.email}</span>
            <span className="title">Experience: </span>
            <span className="info">1 Year</span>
            <span className="title">Role: </span>
            <span className="info">{user?.Role}</span>
          </div>
        </div>
        <div className="skill_set_info">
          <div className="skill_set_info_header">
            <h4>Skill Set</h4>
            {/* <AiOutlineEdit className="skill_set_info_header_edit" /> */}
          </div>
          {/* <div className="skill_set_info_main_form">
            <div>
              <label htmlFor="skill">Skill</label>
              <input type="text" name="skill" />
            </div>
            <div>
              <label htmlFor="experience">Experience</label>
              <div className="experience">
                <input type="text" name="months" />
                <input type="text" name="days" />
              </div>
            </div>
            <div>
              <label htmlFor="github_link">GitHub Link</label>
              <input type="text" name="github_link" />
            </div>
          </div> */}
          {/* <span className="add_skill">+ Add Skill</span> */}
          <TableContainer>
            <Table variant="unstyled">
              <Thead>
                <Tr>
                  <Th>Skill</Th>
                  <Th>Self Rating</Th>
                  <Th isNumeric>Experience</Th>
                  <Th>Github Profile</Th>
                </Tr>
              </Thead>
              <Tbody>
                {user?.skills.map((item) => {
                  return (
                    <Tr>
                      <Td>{item.name}</Td>
                      <Td>
                        <Star count={item.rating} />
                      </Td>
                      <Td>{item.github}</Td>
                      <Td>{item.experience}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      </div>

      {/* <div className="button_container">
        <ButtonGroup variant="outline" spacing="6">
          <Button colorScheme="teal" size="sm" variant="ghost">
            CANCEL
          </Button>
          <Button colorScheme="orange" size="sm" variant="solid">
            SAVE
          </Button>
        </ButtonGroup>
      </div> */}
    </div>
  );
};

export default ProfileOther;

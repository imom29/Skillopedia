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
import Star from "../Components/Star";
import { useParams } from "react-router-dom";

const ProfileMain = (props) => {
  const PATH = "http://localhost:5000/api/auth";

  const { id } = useParams();

  const [user, setUser] = useState();

  const getUserinfo = () => {
    let token = Cookie.get("token");
    axios
      .get(`${PATH}/loggedin`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
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
            {/* <AiOutlineEdit className="profile_info_form_header_edit" /> */}
          </div>
          <div className="main_form">
            <label htmlFor="firstname">First Name</label>
            <input type="text" name="firstname" />
            <label htmlFor="lastname">Last Name</label>
            <input type="text" name="lastname" />
            <label htmlFor="email">Email</label>
            <input type="email" name="email" />
            <label htmlFor="totalExperience">Total Experience</label>
            <input type="email" name="totalExperience" />
            <label htmlFor="Role">Role</label>
            <input type="email" name="Role" />
            <label htmlFor="currentProject">Current Project</label>
            <input type="email" name="currentProject" />
          </div>
        </div>
        <div className="skill_set_info">
          <div className="skill_set_info_header">
            <h4>Skill Set</h4>
            {/* <AiOutlineEdit className="skill_set_info_header_edit" /> */}
          </div>
          <div className="skill_set_info_main_form">
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
          </div>
          <span className="add_skill">+ Add Skill</span>
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

      <div className="button_container">
        <ButtonGroup variant="outline" spacing="6">
          <Button colorScheme="teal" size="sm" variant="ghost">
            CANCEL
          </Button>
          <Button colorScheme="orange" size="sm" variant="solid">
            SAVE
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default ProfileMain;

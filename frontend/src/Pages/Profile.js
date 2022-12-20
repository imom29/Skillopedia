import React from "react";
import Sidebar from "../Components/Sidebar";
import { Grid, GridItem, Button, ButtonGroup } from "@chakra-ui/react";
import banner from "../Assets/Banner.png";
import "./profile.css";
import ProfileMain from "../Components/ProfileMain";
import ProfileOther from "../Components/ProfileOther";
import { useParams } from "react-router-dom";

export default function Profile() {
  const { id } = useParams();
  return (
    // <div style={{overflow: 'hidden'}}>
    //         <div className="container-fluid" id="main">
    //          <div className="row row-offcanvas row-offcanvas-left">
    //            <Sidebar/>
    //           <ProfileMain />
    //      </div>
    //     </div>
    // </div>

    <div className="container-fluid" style={{display: "flex",
      width: "100%"}}>
      <Sidebar/> 
      {
        id === undefined ? <ProfileMain/> : <ProfileOther />
      }
      
    </div>

    // <Grid
    //   templateAreas={`"nav header"
    //               "nav main"
    //               "nav footer"`}
    //   gridTemplateRows={"30% 60% 10%"}
    //   gridTemplateColumns={"10% 90%"}
    //   h="100vh"
    //   gap="1"
    //   color="blackAlpha.700"
    //   fontWeight="bold"
    // >
    //   <GridItem pl="2" area={"header"}>
    //     <img src={banner} alt="" />
    //   </GridItem>
    //   <GridItem pl="2" bg="white.300" area={"nav"}>
    //     <Sidebar />
    //   </GridItem>
    //   <GridItem pl="2" area={"main"}>
    //     <ProfileMain />
    //   </GridItem>
    //   <GridItem pl="2" area={"footer"}>
    //     <div className="footer">
    //       <ButtonGroup variant="outline" spacing="6">
    //         <Button colorScheme="teal" size="sm" variant="ghost">
    //           Cancel
    //         </Button>
    //         <Button colorScheme="orange" size="sm" variant="solid">
    //           Save
    //         </Button>
    //       </ButtonGroup>
    //     </div>
    //   </GridItem>
    // </Grid>
  );
}

// import React from "react";
// import "./profile.css";
// import background from "../Assets/Banner.png";
// // import person from "../assests/person.jpg";
// // import { AiOutlineEdit } from "react-icons/ai";

// const Profile = (props) => {
//   return (
//     <div className="profile_container">
//       <div className="image">
//         <img src={background} alt="" />
//       </div>
//       <div className="info_header">
//         {/* <img src={person} alt="" /> */}
//         <div className="details">
//           <h5>Rahul Prajapati</h5>
//           <span>abc@gmail.com</span>
//         </div>
//       </div>
//       <div className="main_info_container">
//         <div className="profile_info_form">
//           <div className="profile_info_form_header">
//             <h4>Profile Information</h4>
//             {/* <AiOutlineEdit className="profile_info_form_header_edit" /> */}
//           </div>
//           <div className="main_form">
//             <label htmlFor="firstname">First Name</label>
//             <input type="text" name="firstname" />
//             <label htmlFor="lastname">Last Name</label>
//             <input type="text" name="lastname" />
//             <label htmlFor="email">Email</label>
//             <input type="email" name="email" />
//             <label htmlFor="totalExperience">Total Experience</label>
//             <input type="email" name="totalExperience" />
//             <label htmlFor="Role">Role</label>
//             <input type="email" name="Role" />
//             <label htmlFor="currentProject">Current Project</label>
//             <input type="email" name="currentProject" />
//           </div>
//         </div>
//         <div className="skill_set_info">
//           <div className="skill_set_info_header">
//             <h4>Skill Set</h4>
//             {/* <AiOutlineEdit className="skill_set_info_header_edit" /> */}
//           </div>
//           <div className="skill_set_info_main_form">
//             <div>
//               <label htmlFor="skill">Skill</label>
//               <input type="text" name="skill" />
//             </div>
//             <div>
//               <label htmlFor="experience">Experience</label>
//               <div className="experience">
//                 <input type="text" name="months" />
//                 <input type="text" name="days" />
//               </div>
//             </div>
//             <div>
//               <label htmlFor="github_link">GitHub Link</label>
//               <input type="text" name="github_link" />
//             </div>
//           </div>
//           <span className="add_skill">+ Add Skill</span>
//         </div>
//       </div>
//       <div className="button_container">
//         <button className="btn_save">SAVE</button>
//         <button className="btn_cancel">CANCEL</button>
//       </div>
//     </div>
//   );
// };

// export default Profile;

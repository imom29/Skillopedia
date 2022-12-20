import React, { useState } from "react";
import "./Login.css";
import banner from "../../Assets/Banner.png";
import axios from "axios";
import { Spinner } from "@chakra-ui/react";
import { useNavigate, Link } from "react-router-dom";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  useDisclosure,
  CloseButton,
} from "@chakra-ui/react";
import { useCookies } from "react-cookie";

export default function Login() {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");

  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const [loading, setloading] = useState(false);

  const PATH = "http://localhost:5000/api/auth";

  const handleSubmit = (e) => {
    e.preventDefault();
    setloading(true);
    axios
      .post(`${PATH}/login`, {
        email: username,
        password: password,
      })
      .then(function (response) {
        setloading(false);
        // console.log(response);
        setCookie("token", `${response.data.token}`, {
          path: "/",
        });
        // alert("Success");
        navigate("/dashboard");
      })
      .catch(function (error) {
        setloading(false);
        onOpen();
        console.log("ERROR  ", error);
      });
  };

  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: false });

  return (
    <div>
      <div className="banner" style={{ backgroundImage: `url(${banner})` }}>
        <h2 className="Heading">SKILLOPEDIA</h2>
        <div>
          <h4 className="wb">Welcome Back!</h4>
          <p className="lower">Use these awesome forms to login or create!</p>
        </div>
      </div>
      <div className="logincard">
        <form onSubmit={(e) => handleSubmit(e)}>
          <h2>Login</h2>
          <span>Username</span>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Email Address"
            onChange={(e) => setusername(e.target.value)}
          />
          <span className="pass">Password</span>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* <div className="checks">
            <h6>- Atleast 8 characters</h6>
            <h6>- Atleast 1 capital</h6>
            <h6>- Atleast 1 number</h6>
          </div> */}

          <h5 id="forgot" style={{ textAlign: "end", fontSize: "0.7rem" }}>
            Forgot Password?
          </h5>

          <button type="submit" id="login">
            {loading ? <Spinner /> : <>LOGIN</>}
          </button>
          {/* TODO: CHANGE LOGIN => LINK TO*/}
        </form>
        <div className="change">
          Don't have an account?{" "}
          <Link to="/register">
            <b>Sign up</b>
          </Link>
        </div>
        {/* <Alert status="error" >
          <AlertIcon />
          There was an error processing your request
        </Alert> */}
        {isVisible ? (
          <Alert status="error">
            <AlertIcon />
            <Box>
              <AlertTitle>Error!</AlertTitle>
              <AlertDescription>
                Something is not right! Can you please try again?
              </AlertDescription>
            </Box>
            <CloseButton
              alignSelf="flex-start"
              position="relative"
              right={-1}
              top={-1}
              onClick={onClose}
            />
          </Alert>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

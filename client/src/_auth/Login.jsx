import { BsEye, BsEyeSlash, BsThreads } from "react-icons/bs";
import "../_styles/login.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [isPassword, setIsPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLoginDataChange = (e) => {
    setLoginData((prevData) => ({
      ...prevData, // Spread the previous state
      [e.target.name]: e.target.value, // Update the specific field
    }));
  };

  const [message, setMessage] = useState(false);

  const loginFunction = async () => {
    const loginResponse = await axios.post(
      "http://localhost:8080/api/user/login",
      {
        email: loginData.email,
        password: loginData.password,
      }
    );
    console.log(loginResponse.data);

    const loggedIn = loginResponse?.data?.message == "Logged In";
    loggedIn
      ? window.localStorage.setItem("userToken", loginResponse?.data?.token) +
        window.location.reload()
      : setMessage(loginResponse?.data?.message);
  };

  return (
    <div className="h-100 flex">
      <img className="img-main" src="/banner.png" alt="" />
      <div className="form flex col" data-after="LOGIN">
        <BsThreads className="icon" />
        <div className="input-wrap flex">
          <input
            type="text"
            placeholder="Email Address"
            name="email"
            onChange={handleLoginDataChange}
            value={loginData?.email}
          />
        </div>
        <div className="input-wrap flex">
          <input
            type={isPassword ? "password" : "text"}
            placeholder="Password"
            name="password"
            onChange={handleLoginDataChange}
            value={loginData?.password}
          />
          <div
            className="is-pass flex"
            onClick={() => setIsPassword(!isPassword)}
          >
            {isPassword ? <BsEye /> : <BsEyeSlash />}
          </div>
        </div>
        {message ? (
          <div className="err-message flex">
            <p>{message}</p>
          </div>
        ) : (
          this
        )}
        <button
          style={{ background: "orange", color: "white" }}
          onClick={loginFunction}
        >
          LOGIN
        </button>
        <div className="or-text flex">
          <p>OR</p>
        </div>
        <button onClick={() => navigate("/register")}>REGISTER</button>
      </div>
    </div>
  );
};

export default Login;

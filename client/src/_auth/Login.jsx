import {
  BsEye,
  BsEyeSlash,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsThreads,
} from "react-icons/bs";
import "../_styles/login.scss";
import { useState } from "react";
import { BiShow } from "react-icons/bi";

const Login = () => {
  const [isPassword, setIsPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLoginDataChange = (e) => {
    setLoginData({
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="h-100 flex">
      <div className="form flex col">
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
        <button>LOGIN</button>
        <div className="or-text flex">
          <p>OR</p>
        </div>
        <div className="continue flex">
          <div className="icon-continue flex">
            <BsFacebook />
          </div>
          <div className="icon-continue flex">
            <BsInstagram />
          </div>
          <div className="icon-continue flex">
            <BsGithub />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

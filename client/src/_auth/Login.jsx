import { BsEye, BsEyeSlash, BsThreads } from "react-icons/bs";
import "../_styles/login.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
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
        <button style={{ background: "orange", color: "white" }}>LOGIN</button>
        <div className="or-text flex">
          <p>OR</p>
        </div>
        <button onClick={() => navigate("/register")}>REGISTER</button>
      </div>
    </div>
  );
};

export default Login;

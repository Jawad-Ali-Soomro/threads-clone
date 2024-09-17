import { BsEye, BsEyeSlash, BsThreads } from "react-icons/bs";
import "../_styles/login.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [isPassword, setIsPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    phone: "",
  });

  const handleLoginDataChange = (e) => {
    setLoginData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="h-100 flex">
      <img className="img-main" src="/banner.png" alt="" />
      <div
        className="form flex col"
        data-after="REGISTER"
        style={{ height: "550px" }}
      >
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
            type="text"
            placeholder="Phone Number"
            name="phone"
            onChange={handleLoginDataChange}
            value={loginData?.phone}
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
        <div className="file">
          <input type="file" />
          <div className="file-content">
            <p>
              Upload Profile <span>Drag & Drop File To Upload!</span>
            </p>
          </div>
        </div>
        <button style={{ background: "orange", color: "white" }}>
          REGISTER
        </button>
        <div className="or-text flex">
          <p>OR</p>
        </div>
        <button onClick={() => navigate("/")}>LOGIN</button>
      </div>
    </div>
  );
};

export default Register;

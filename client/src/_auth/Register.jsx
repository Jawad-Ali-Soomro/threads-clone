import { BsEye, BsEyeSlash, BsThreads } from "react-icons/bs";
import "../_styles/login.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadImage } from "../_global/uploadImage";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const [isPassword, setIsPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [fileUrl, setFileUrl] = useState();
  const [errMessage, setErrMessage] = useState();

  const handleRegister = async () => {
    if ((!loginData?.email, !loginData?.password, !loginData?.username)) {
      return setErrMessage("Please Fill All The Fields!");
    } else if (!fileUrl) {
      return setErrMessage("Please Upload Avatar!");
    } else {
      const registerResponse = await axios.post(
        "http://localhost:8080/api/user/create",
        {
          email: loginData?.email,
          password: loginData?.password,
          username: loginData?.username,
          avatar: fileUrl,
        }
      );
      const registered = registerResponse?.data?.message == "Account Created!";
      if (registered) {
        toast.success("Account Created");
        toast.success("Please Login");
        navigate("/");
      }
    }
  };

  const handleLoginDataChange = (e) => {
    setLoginData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const uploadedFile = await uploadImage({ file });
    setFileUrl(uploadedFile.secure_url);
  };

  return (
    <div className="h-100 flex">
      <img className="img-main" src="/banner.png" alt="" />
      <div className="form flex col" data-after="REGISTER">
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
            placeholder="Username"
            name="username"
            onChange={handleLoginDataChange}
            value={loginData?.username}
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

        {fileUrl ? <img src={fileUrl} alt="" /> : this}
        <div className="file">
          <input type="file" onChange={handleFileChange} />
          <div className="file-content">
            <p>
              Upload Profile <span>Drag & Drop File To Upload!</span>
            </p>
          </div>
        </div>
        {errMessage ? (
          <div className="err-message flex">
            <p>{errMessage}</p>
          </div>
        ) : (
          this
        )}
        <button
          style={{ background: "orange", color: "white" }}
          onClick={handleRegister}
        >
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

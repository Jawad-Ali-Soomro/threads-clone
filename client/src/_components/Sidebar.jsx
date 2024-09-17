import { BsThreads } from "react-icons/bs";
import "../_styles/sidebar.scss";
import {
  BiBug,
  BiHeart,
  BiImage,
  BiLogOut,
  BiPlus,
  BiSearch,
  BiSolidDashboard,
  BiUser,
} from "react-icons/bi";
import { PiHouse } from "react-icons/pi";
import { useState } from "react";
import { FiSettings } from "react-icons/fi";
import { useEffect } from "react";
import axios from "axios";
import { HiHashtag } from "react-icons/hi";
import { MdAnimation } from "react-icons/md";
import { uploadImage } from "../_global/uploadImage";
import toast from "react-hot-toast";
const Sidebar = () => {
  const activeTab = window.location.pathname;
  const [showMenu, setShowMenu] = useState(false);
  const [showUpload, setShowUplaod] = useState(false);
  const handleLogout = () => {
    window.localStorage.clear();
    window.location.reload();
  };
  const onHide = () => setShowUplaod(false);

  const [userInfo, setUserInfo] = useState();
  const userToken = window.localStorage.getItem("userToken");

  const getUserInfo = async () => {
    const data = await axios.post(
      "http://localhost:8080/api/user/get/profile",
      {
        token: userToken,
      }
    );
    setUserInfo(data?.data?.user?.findByEmail);
  };
  useEffect(() => {
    getUserInfo();
  }, [showUpload]);

  const [fileUrl, setFileUrl] = useState();
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const uploadedFile = await uploadImage({ file });
    if (uploadedFile) {
      setFileUrl(uploadedFile.secure_url);
    }
  };

  const [threadContent, setThreadContent] = useState();
  const uploadThread = async () => {
    if (!threadContent) {
      return toast.error("Please Write A Threat!");
    }
    const createdThreat = await axios.post(
      "http://localhost:8080/api/thread/create",
      {
        title: "",
        content: threadContent,
        image: fileUrl,
        author: userInfo?._id,
      }
    );
    createdThreat?.data?.message == "Thread created"
      ? window.location.reload()
      : toast.error("Error while creating threat!");
  };

  return (
    <div className="side-bar flex col">
      <div className="logo flex">
        <BsThreads />
      </div>
      <div className="navs flex col">
        <div
          className="icon flex"
          style={{ color: `${activeTab == "/" ? "white" : ""}` }}
        >
          <PiHouse />
        </div>
        <div className="icon flex">
          <BiSearch />
        </div>
        <div className="icon bg flex" onClick={() => setShowUplaod(true)}>
          <BiPlus />
        </div>
        <div className="icon flex">
          <BiHeart />
        </div>
        <div className="icon flex">
          <BiUser />
        </div>
      </div>
      <div className="more flex col" onClick={() => setShowMenu(!showMenu)}>
        <div style={{ width: "15px" }}></div>
        <div></div>
        <div style={{ width: "15px" }}></div>
        <div
          className="main-menu flex col"
          style={{
            height: `${showMenu ? "220px" : "0px"}`,
            overflow: `${showMenu ? "" : "hidden"}`,
          }}
        >
          <div className="card flex" data-nav="profile">
            <BiUser />
          </div>
          <div className="card flex" data-nav="DASHBOARD">
            <BiSolidDashboard />
          </div>
          <div className="card flex" data-nav="settings">
            <FiSettings />
          </div>
          <div className="card flex" data-nav="report problem">
            <BiBug />
          </div>
          <div className="card flex" data-nav="logout" onClick={handleLogout}>
            <BiLogOut />
          </div>
        </div>
      </div>
      {showUpload ? (
        <div className="upload-sect flex col" onClick={onHide}>
          <div
            className="upload-wrap flex col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="profile flex">
              <img src={userInfo?.avatar} alt="" />
              <p>{userInfo?.username}</p>
            </div>
            <input
              type="text"
              placeholder="Start A Thread!"
              value={threadContent}
              onChange={(e) => setThreadContent(e.target.value)}
            />
            {fileUrl ? (
              <img className="upload-image" src={fileUrl} alt="" />
            ) : (
              this
            )}
            <div className="icons flex">
              <div className="icon flex">
                <input type="file" onChange={handleFileChange} />
                <BiImage />
              </div>
              <div className="icon flex">
                <MdAnimation />
              </div>
              <div className="icon flex">
                <HiHashtag />
              </div>
            </div>
            <button onClick={uploadThread}>POST</button>
          </div>
        </div>
      ) : (
        this
      )}
    </div>
  );
};

export default Sidebar;

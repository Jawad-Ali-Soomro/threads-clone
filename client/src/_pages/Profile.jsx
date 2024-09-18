import { useEffect } from "react";
import Sidebar from "../_components/Sidebar";
import "../_styles/profile.scss";
import { useState } from "react";
import axios from "axios";
import { BiPencil } from "react-icons/bi";
import { GoVerified } from "react-icons/go";
import { BsInfo } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Profile = () => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const navigate = useNavigate();

  return (
    <div className="profile-container flex col">
      <Sidebar />
      <div className="profile-main flex">
        <div className="profile-card flex col">
          <div className="top-profile flex bw">
            <img src={userInfo?.avatar} alt="" />
            <div className="info flex col">
              <h3>{userInfo?.username}</h3>
              <p>{userInfo?.email}</p>
            </div>
          </div>
          <div className="line"></div>
          <div className="complete flex">
            <div className="card flex col">
              <div className="icon flex">
                <BiPencil />
              </div>
              <h3>Add Bio</h3>
              <p>Introduce yourself and tell people what you’re into.</p>
              <button>ADD</button>
            </div>
            <div className="card flex col">
              <div className="icon flex">
                <GoVerified />
              </div>
              <h3>Add Profile Photo</h3>
              <p>Make it easier for people to recognize you.</p>
              <button>ADD</button>
            </div>
            <div className="card flex col">
              <div className="icon flex">
                <BiPencil />
              </div>
              <h3>Add Followers</h3>
              <p>Fill your feed with threads that interest you.</p>
              <button>ADD</button>
            </div>
          </div>
          <div className="threads-container flex col">
            <div className="threads-wrap flex col">
              {userInfo?.threads?.map((thread) => {
                return (
                  <div className="card flex col" key={thread?._id}>
                    <div className="top-profile flex bw">
                      <div className="left-profile flex">
                        <img src={userInfo?.avatar} alt="" />
                        <p>@{userInfo?.username.toLowerCase().split(" ")}</p>
                      </div>
                      <div className="more flex">
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    </div>
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate(`/thread/${thread?._id}`)}
                    >
                      {thread?.content.substring(0, 90)}...
                    </p>
                    <img
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate(`/thread/${thread?._id}`)}
                      src={thread?.image}
                      alt=""
                    />
                    <div className="line"></div>
                    <div className="btns flex">
                      <button>
                        <BsInfo />
                      </button>
                      <button>DELETE</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

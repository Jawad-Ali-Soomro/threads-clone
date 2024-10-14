import { useState, useEffect } from "react";
import Sidebar from "../_components/Sidebar";
import axios from "axios";
import "../_styles/home.scss";
import { BiBookmark, BiComment, BiHeart, BiTrash } from "react-icons/bi";
import { CgShare } from "react-icons/cg";
import { BsEyeSlash } from "react-icons/bs";
import { CiWarning } from "react-icons/ci";
import { PiLinkSimple } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [threadData, setThreadData] = useState();
  const [menuVisibility, setMenuVisibility] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);

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
  }, [threadData]);
  const getThreadData = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/thread/all");
      setThreadData(data?.foundThreads);
    } catch (error) {
      console.error("Error fetching thread data", error);
    }
  };

  useEffect(() => {
    getThreadData();
  }, []);

  // Toggle menu visibility for each thread
  const toggleMenu = (threadId) => {
    setMenuVisibility((prevState) => ({
      ...prevState,
      [threadId]: !prevState[threadId],
    }));
  };

  const handleLike = async (threadId) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:8080/api/thread/${threadId}/like`,
        { userId: userInfo?._id }
      );

      const updatedThreads = threadData.map((thread) =>
        thread._id === threadId
          ? { ...thread, likedBy: response.data.likedBy }
          : thread
      );

      setThreadData(updatedThreads);
    } catch (error) {
      console.error("Error liking/unliking thread", error);
    } finally {
      setLoading(false);
    }
  };
  const navigate = useNavigate();

  return (
    <div>
      <Sidebar />
      <div className="main-threads flex">
        <div className="threads flex col">
          {threadData?.map((thread) => {
            return (
              <div className="card flex col" key={thread?._id}>
                <div className="profile flex">
                  <div className="left-profile flex">
                    <img src={thread?.author?.avatar} alt="" />
                    <h5 style={{ textTransform: "lowercase" }}>
                      @{thread?.author?.username.split(" ")}
                    </h5>
                  </div>
                  <div
                    className="more flex"
                    onClick={() => toggleMenu(thread?._id)}
                  >
                    <div></div>
                    <div></div>
                    <div></div>
                    <div
                      className="options flex"
                      style={{
                        height: `${
                          menuVisibility[thread?._id] ? "180px" : "0px"
                        }`,
                        border: `${
                          menuVisibility[thread?._id]
                            ? "1px solid #80808025"
                            : "none"
                        }`,
                      }}
                    >
                      <div className="card-icon flex">
                        <BiBookmark />
                      </div>
                      <div className="card-icon flex">
                        <BsEyeSlash />
                      </div>
                      <div className="card-icon flex">
                        <PiLinkSimple />
                      </div>
                      <div
                        className="card-icon flex"
                        style={{
                          background: `${
                            userInfo?._id === thread?.author?._id ? "red" : ""
                          }`,
                        }}
                      >
                        {userInfo?._id === thread?.author?._id ? (
                          <BiTrash />
                        ) : (
                          <CiWarning />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <p onClick={() => navigate(`/thread/${thread?._id}`)}>
                  {thread?.content.substring(0, 120)} ...
                </p>
                <img
                  onClick={() => navigate(`/thread/${thread?._id}`)}
                  src={thread?.image}
                  alt=""
                />
                <div className="line"></div>
                <div className="icons flex">
                  <div
                    className="icon after flex"
                    data-after={thread?.likedBy?.length}
                    style={{
                      gap: "5px",
                      cursor: "pointer",
                      background: `${
                        thread?.likedBy.includes(userInfo?._id) ? "red" : ""
                      }`,
                    }}
                    onClick={() => handleLike(thread?._id)}
                  >
                    <BiHeart />
                  </div>
                  <div
                    className="icon after flex"
                    data-after={thread?.comments?.length}
                  >
                    <BiComment />
                  </div>
                  <div className="icon flex">
                    <CgShare />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;

import { useState } from "react";
import Sidebar from "../_components/Sidebar";
import axios from "axios";
import "../_styles/home.scss";
import { useEffect } from "react";
import { BiComment, BiHeart } from "react-icons/bi";
import { CgRepeat, CgShare } from "react-icons/cg";

const Home = () => {
  const [threadData, setThreadData] = useState();
  const getThreadData = async () => {
    const data = await axios.get("http://localhost:8080/api/thread/all");
    setThreadData(data?.data?.foundThreads);
  };
  useEffect(() => {
    getThreadData();
  }, [threadData]);

  console.log(threadData);

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
                    <p style={{ textTransform: "lowercase" }}>
                      @{thread?.author?.username.split(" ")}
                    </p>
                  </div>
                  <div className="more flex">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
                <p>{thread?.content.substring(0, 120)} ...</p>
                <img src={thread?.image} alt="" />
                <div className="line"></div>
                <div className="icons flex">
                  <div className="icon flex" style={{ gap: "5px" }}>
                    <BiHeart />
                    <p>{thread?.likedBy?.length}</p>
                  </div>
                  <div className="icon flex">
                    <BiComment />
                  </div>
                  <div className="icon flex">
                    <CgRepeat />
                  </div>
                  <div className="icon flex">
                    <CgShare />
                  </div>
                </div>
              </div>
            );
          })}
          {/* <p style={{ marginTop: "50px" }}>
            2024 Threads Clone - Developed By Jawad Ali
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default Home;

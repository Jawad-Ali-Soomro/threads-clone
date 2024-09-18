import { useParams } from "react-router-dom";
import Sidebar from "../_components/Sidebar";
import { useState } from "react";
import axios from "axios";
import "../_styles/mainThread.scss";
import { useEffect } from "react";
import { BiComment, BiHeart, BiSend } from "react-icons/bi";
import { CgShare } from "react-icons/cg";

const MainThread = () => {
  const threadId = useParams();
  const [threadData, setThreadData] = useState();

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

  const getThreadData = async () => {
    const { data } = await axios.get(
      `http://localhost:8080/api/thread/get/${threadId.threadId}`
    );
    setThreadData(data?.foundThread);
  };

  useEffect(() => {
    getThreadData();
  });
  const [commentContent, setCommentContent] = useState();

  const sendComment = async () => {
    const comingData = await axios.post(
      "http://localhost:8080/api/comment/create",
      {
        threadId: threadId.threadId,
        content: commentContent,
        authorId: userInfo?._id,
      }
    );
    if (comingData?.data?.createdComment) {
      setCommentContent("");
      getThreadData();
    }
  };

  // console.log(threadData);

  return (
    <div className="main-thread flex">
      <Sidebar />
      <div className="thread-card flex col">
        <div className="profile flex">
          <div className="left-profile flex">
            <img src={threadData?.author?.avatar} alt="" />
            <h3>{threadData?.author?.username}</h3>
          </div>
          <button>Follow</button>
        </div>
        <div className="line"></div>
        <div className="content flex col">
          <h3>{threadData?.content}</h3>
          <img src={threadData?.image} alt="" />
          <div className="line"></div>

          {threadData?.likedBy?.length >= 1 ? (
            <div className="reactions flex">
              <p style={{ marginRight: "10px" }}>Liked By</p>
              <img src={threadData?.likedBy[0]?.avatar} alt="" />
              {threadData?.likedBy?.length > 1 ? (
                <img src={threadData?.likedBy[1]?.avatar} alt="" />
              ) : null}
              {threadData?.likedBy?.length > 2 ? (
                <img src={threadData?.likedBy[2]?.avatar} alt="" />
              ) : null}
            </div>
          ) : (
            this
          )}

          <div className="comments flex col">
            <h2>Comments</h2>
            {threadData?.comments?.map((comment) => {
              return (
                <div className="comment-card flex col" key={comment?._id}>
                  <div className="profile flex">
                    <div className="flex">
                      <img src={comment?.author?.avatar} alt="" />
                      <div className="flex col">
                        <h3>@{comment?.author?.username.split(" ")}</h3>
                        <p>{comment?.content}</p>
                      </div>
                    </div>
                  </div>
                  <div className="icons flex">
                    <div className="icon flex">
                      <BiHeart />
                    </div>
                    <div className="icon flex">
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

          <div className="add-comment flex">
            <img src={userInfo?.avatar} alt="" />
            <input
              type="text"
              placeholder="Add"
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
            />
            <div className="icon flex" onClick={sendComment}>
              <BiSend />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainThread;

import { BsThreads } from "react-icons/bs";
import "../_styles/sidebar.scss";
import {
  BiBug,
  BiHeart,
  BiLogOut,
  BiPlus,
  BiSearch,
  BiSolidDashboard,
  BiUser,
} from "react-icons/bi";
import { PiHouse } from "react-icons/pi";
import { useState } from "react";
import { FiSettings } from "react-icons/fi";
const Sidebar = () => {
  const activeTab = window.location.pathname;
  const [showMenu, setShowMenu] = useState(false);
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
        <div className="icon bg flex">
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
          }}
        >
          <div className="card flex bw">
            <p>Profile</p>
            <BiUser />
          </div>
          <div className="card flex bw">
            <p>Insight</p>
            <BiSolidDashboard />
          </div>
          <div className="card flex bw">
            <p>Settings</p>
            <FiSettings />
          </div>
          <div className="card flex bw">
            <p>Report</p>
            <BiBug />
          </div>
          <div className="card flex bw">
            <p>Logout</p>
            <BiLogOut />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Login from "./_auth/Login";
import "./globals.scss";
import Home from "./_pages/Home";
import Register from "./_auth/Register";
import { Toaster } from "react-hot-toast";
import Profile from "./_pages/Profile";
import MainThread from "./_pages/mainThread";

function App() {
  const userToken = window.localStorage.getItem("userToken");
  return (
    <>
      <Toaster position="bottom-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={userToken ? <Home /> : <Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route
            path="/profile"
            element={userToken ? <Profile /> : <Login />}
          ></Route>
          <Route path="/thread/:threadId" element={<MainThread />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

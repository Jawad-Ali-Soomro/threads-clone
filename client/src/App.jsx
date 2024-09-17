import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Login from "./_auth/Login";
import "./globals.scss";
import Home from "./_pages/Home";
import Register from "./_auth/Register";

function App() {
  const userToken = window.localStorage.getItem("googleUserInfo");
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={userToken ? <Home /> : <Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

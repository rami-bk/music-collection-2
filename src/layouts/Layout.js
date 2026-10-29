
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Layouts.css";

const Layouts = () => {
  return (
    <>
      <Navbar />

      <main className="main-content">
        <Outlet />
      </main>
    </>
  );
};

export default Layouts;

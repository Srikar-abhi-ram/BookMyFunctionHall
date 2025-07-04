// import Sidebar from "./Sidebar";
import Header from "./Header";
//import { useAuth } from "../context/auth";
//import Opsheader from "./Opsheader";
import { Outlet } from "react-router-dom";

const Layout = () => {
  //const [auth, setAuth] = useAuth();

  return (
    <div>
      <Header />
      <main>
        <Outlet /> {/* This is where child routes will be rendered */}
      </main>
    </div>
  );
};

export default Layout;
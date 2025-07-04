import "./App.css";
//import Signin from "./components/auth/SignInLayout";
import { styled } from "styled-components";
//import { useAuth } from "./context/auth";
import Layout from "./components/Layout";
import { useEffect } from "react";
//import SignInLayout from "./components/auth/SignInLayout";

function App() {
  //const [auth, setAuth] = useAuth();    used for later authorisation
 
 
  //return <App1>{auth.user ? <Layout /> : <SignInLayout />}</App1>;

  return <App1> <Layout /></App1>
}

export default App;

const App1 = styled.div`
  .topcomp {
    //  position:fixed;
    display: flex;
    height: 60px;
    margin-left: 50px;
    width: 300px;
    justify-content: center;
    margin-top: -80px;
  }
  .leftcontent {
    // position:fixed;
    margin-top: 10px;
    font-size: 25px;
  }
`;
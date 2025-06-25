// import logo from "./logo.svg";
import "./App.css";
import LoginForm from "./components/LoginForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "./components/ui/provider";
import { useState } from "react";
import Cookies from "js-cookie";

function App() {
  const [users, setUsers] = useState([]);

  // const fetchUsers = async () => {
  //   const response = await fetch("http://localhost:4000/videogame");
  //   const data = await response.json();
  //   console.log(data)
  //   setUsers(data);
  // };

  // fetchUsers();

  // const token = Cookies.get("idToken");
  const token = localStorage.getItem("idToken");

  console.log(token)

  // console.log(Cookies)

  // if (!token) {
  //   return <LoginForm />;
  // }

  return (
    // <div className="App bg-primary h-screen flex flex-col">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //     <LoginForm />
    //   </header>
    // </div>
    <Provider>
      <Router>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;

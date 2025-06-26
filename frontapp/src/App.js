// import logo from "./logo.svg";
import "./App.css";
import LoginForm from "./containers/organisms/LoginForm";
import VideogameList from "./components/organisms/VideogameList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "./components/ui/provider";
import { useState } from "react";
import Cookies from "js-cookie";
import ProtectedRoute from "./components/protectedRoute";
import RegisterForm from "./containers/organisms/RegisterForm";

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

  console.log(token);

  // console.log(Cookies)

  // if (!token) {
  //   return <LoginForm />;
  // }

  return (
    <div className="App bg-primary flex flex-col">
      <Provider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<VideogameList />} />
            </Route>
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;

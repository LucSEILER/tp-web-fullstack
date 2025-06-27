// import logo from "./logo.svg";
import "./App.css";
import LoginForm from "./containers/organisms/LoginForm";
import VideogameList from "./components/organisms/VideogameList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "./components/ui/provider";
import ProtectedRoute from "./components/protectedRoute";
import RegisterForm from "./containers/organisms/RegisterForm";

function App() {
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

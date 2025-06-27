// import logo from "./logo.svg";
import "./App.css";
import LoginForm from "./containers/organisms/LoginForm";
import VideogameList from "./components/organisms/VideogameList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "./components/ui/provider";
import ProtectedRoute from "./components/protectedRoute";
import RegisterForm from "./containers/organisms/RegisterForm";
import Toaster from "./components/atoms/Toaster";
import GameDetailsPage from "./pages/GameDetailsPage";

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
              <Route path="/games/:id" element={<GameDetailsPage />} />
            </Route>
          </Routes>
        </Router>
        <Toaster />
      </Provider>
    </div>
  );
}

export default App;

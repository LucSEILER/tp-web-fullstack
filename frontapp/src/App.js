// App.tsx
import "./App.css";
import LoginForm from "./containers/organisms/LoginForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "./components/ui/provider";
import ProtectedRoute from "./components/protectedRoute";
import RegisterForm from "./containers/organisms/RegisterForm";
import Toaster from "./components/atoms/Toaster";
import GameDetailsPage from "./pages/GameDetailsPage";
import Home from "./pages/Home";
import MyList from "./pages/MyList";
import Layout from "./layout/Layout";

function App() {
  return (
    <div className="App bg-primary text-white">
      <Provider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />

            <Route element={<ProtectedRoute />}>
              <Route
                path="/"
                element={
                  <Layout>
                    <Home />
                  </Layout>
                }
              />
              <Route
                path="/games/:id"
                element={
                  <Layout>
                    <GameDetailsPage />
                  </Layout>
                }
              />
              <Route
                path="/wishlist"
                element={
                  <Layout>
                    <MyList />
                  </Layout>
                }
              />
            </Route>
          </Routes>
        </Router>
        <Toaster />
      </Provider>
    </div>
  );
}

export default App;

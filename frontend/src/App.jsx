import { Navigate, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Navbar from "./components/Navbar";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore";
import About from "./pages/About";
function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  if (isCheckingAuth && !authUser) {
    return (
      <>
        <div className="flex items-center justify-center h-screen">
          <Loader className="size-10 animate-spin" />
        </div>
      </>
    );
  }

  return (
    <div data-theme={theme}>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/" />}
        />
        <Route path="/settings" element={<Settings />} />
        <Route
          path="/profile"
          element={authUser ? <Profile /> : <Navigate to="/login" />}
        />
        <Route path="/about" element={<About />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;

import "./App.css";
import Login from "./Page/Login/Login";
import Signup from "./Page/Signup/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./component/Navbar";
import Users from "./Page/Users";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Users />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

import { Link, useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useEffect } from "react";
function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage("isLoggedIn", false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          SHIPCOM
        </Typography>
        {isLoggedIn ? (
          <Typography
            variant="h6"
            component="p"
            onClick={handleLogout}
            sx={{ cursor: "pointer" }}
          >
            Logout
          </Typography>
        ) : (
          <Typography variant="h6" component="p" sx={{ cursor: "pointer" }}>
            <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
              Login
            </Link>
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

import labImage from "../../assets/images/labImage.jpg";
import { Box, Typography } from "@mui/material";
import styles from "./login.module.css";
import { Link } from "react-router-dom";
import LoginComponent from "./LoginComponent";

function Login() {
  return (
    <Box className={styles.loginPage}>
      <Box className={styles.imageContainer}>
        <img src={labImage} alt="Lab image" />
      </Box>
      <Box className={styles.container}>
        <Typography variant="h3" gutterBottom>
          Welcome
        </Typography>
        <Typography variant="h5" gutterBottom>
          Login to Lab monitoring system
        </Typography>
        <LoginComponent />

        <Typography paragraph={true} className={styles.forgotPasswordLink}>
          <a href="">Forgot Password?</a>
        </Typography>

        <Typography paragraph={true} className={styles.signupLink}>
          Need an account? <Link to="/signup">Sign Up</Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default Login;

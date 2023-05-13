import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import LoadingButton from "@mui/lab/LoadingButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Box, FormHelperText, IconButton, OutlinedInput } from "@mui/material";
import { Formik } from "formik";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";
import useLocalStorage from "../../hooks/useLocalStorage";

function LoginComponent() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [isLoggedIn, setIsLoggedIn] = useLocalStorage("isLoggedIn", false);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Email can't be blank";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          if (!values.password) {
            errors.password = "Password can't be blank";
          } else if (
            !/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(
              values.password
            )
          ) {
            errors.password =
              "Required 8 plus character password needs uppercase, lowercase, special character, and number.";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          try {
            const users = JSON.parse(localStorage.getItem("users")) ?? [];
            const userExits = users.find(({ email }) => values.email === email);

            if (userExits && userExits.password === values.password) {
              //  toast message
              toast.success("Login Successfully");
              setIsLoggedIn(true);
              //redirected to user listing screen
              // navigate("/");
            } else {
              toast.error("Invalid Credentials");

              setIsLoggedIn(false);
            }
            setSubmitting(false);
          } catch (error) {
            toast.error("Something went wrong");
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <Box
            component="form"
            method="POST"
            action=""
            className={styles.loginForm}
            onSubmit={handleSubmit}
          >
            <TextField
              required
              id="email"
              label="Email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              error={errors.email && touched.email}
              helperText={errors.email && touched.email && errors.email}
            />

            <FormControl variant="outlined">
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                type={showPassword ? "text" : "password"}
                error={errors.password && touched.password}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              {errors.password && touched.password && (
                <FormHelperText error id="password-error">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>

            <LoadingButton
              size="small"
              loading={isSubmitting}
              loadingIndicator="Loading…"
              variant="contained"
              type="submit"
            >
              <span> login</span>
            </LoadingButton>
          </Box>
        )}
      </Formik>
    </>
  );
}

export default LoginComponent;

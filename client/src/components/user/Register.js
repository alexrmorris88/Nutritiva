// React Components Imports
import React, { Fragment, useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";

// Utils Imports
import MetaData from "../utils/MetaData";

// Redux Imports
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearErrors } from "../../state/actions/userActions";

const Register = () => {
  // Creating the form fields form the state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Creating the react alert variable
  const alert = useAlert();

  // Creating redux dispatch function variable
  const dispatch = useDispatch();

  // Importing Auth, Error, and Loading variables from user redux reducer
  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.user
  );

  // Navigate to a different page
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      // if auth, push to "/"
      navigate("/");
    }

    if (error) {
      // clear errors if any
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, isAuthenticated, error, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    // Setting the API fields with the form fields
    const formData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };

    // send the form data to redux actions for axios processing
    dispatch(registerUser(formData));
  };

  return (
    // User JSX form
    <Fragment>
      <MetaData title={"Register"} />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            className="shadow-lg"
            encType="multipart/form-data"
            onSubmit={submitHandler}
          >
            <h1 className="mb-3">Register</h1>

            <div className="form-group">
              <label htmlFor="name_field">First Name</label>
              <input
                type="name"
                id="first_name_field"
                className="form-control"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="name_field">Last Name</label>
              <input
                type="name"
                id="last_name_field"
                className="form-control"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Confirm Password</label>
              <input
                type="password"
                id="confirm_password_field"
                className="form-control"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              id="register_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading ? true : false}
            >
              REGISTER
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;

// React Components
import React, { Fragment, useState, useEffect } from "react";
import { useAlert } from "react-alert";

// Utils
import MetaData from "../utils/MetaData";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearErrors } from "../../state/actions/userActions";

const Register = ({ history }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, isAuthenticated, error, history]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };

    dispatch(registerUser(formData));
  };

  return (
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
                onChange={e => setFirstName(e.target.value)}
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
                onChange={e => setLastName(e.target.value)}
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
                onChange={e => setEmail(e.target.value)}
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
                onChange={e => setPassword(e.target.value)}
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
                onChange={e => setConfirmPassword(e.target.value)}
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

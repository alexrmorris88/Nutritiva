// React Import
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";

// Redux Import
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../../state/actions/userActions";

// Utils Import
import Loader from "../utils/Loader";
import MetaData from "../utils/MetaData";

const Login = () => {
  // React State Variables
  const alert = useAlert();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Redux Variables
  const dispatch = useDispatch();
  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.user
  );

  // Navigate to a different page
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      // if auth, auto navigate to "/"
      navigate("/");
    }

    if (error) {
      // Clear errors, if any
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, isAuthenticated, error, navigate]);

  // Form data to be dispatched to Actions via axios
  const submitHandler = (e) => {
    e.preventDefault();

    const formData = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };

    dispatch(login(formData));
  };

  return (
    // Creating the JSX form
    <Fragment>
      <MetaData title={"Login"} />

      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mb-3">Login</h1>
                <div className="form-group">
                  <label htmlFor="email_field">Email</label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password_field">Confirm Password</label>
                  <input
                    type="password"
                    id="Confirm_password_field"
                    className="form-control"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <Link to="/user/password/forgot" className="float-right mb-4">
                  Forgot Password?
                </Link>

                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
                >
                  LOGIN
                </button>

                <Link to="/user/register" className="float-right mt-3">
                  New User?
                </Link>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;

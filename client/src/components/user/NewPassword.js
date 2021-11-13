// React Import
import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, useMatch } from "react-router";
import { useAlert } from "react-alert";

// Redux Import
import { useDispatch, useSelector } from "react-redux";

// Component Imports
import { resetPassword, clearErrors } from "../../state/actions/userActions";

// Utils Import
import MetaData from "../utils/MetaData";

const NewPassword = () => {
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const alert = useAlert();
  const match = useMatch("/users/reset-password/:token");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, success } = useSelector((state) => state.forgotPassword);

  // Use Effect Function
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Password Updated Successfully");
      navigate("/login");
    }
  }, [dispatch, alert, error, success, navigate]);

  // Submit Handler Function
  const submitHandler = (e) => {
    e.preventDefault();

    const formData = {
      password: Password,
      confirmPassword: ConfirmPassword,
    };

    dispatch(resetPassword(match.params.token, formData));
  };

  return (
    <Fragment>
      <MetaData title={"New Password Reset"} />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-3">New Password</h1>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name="password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirm_password_field">Confirm Password</label>
              <input
                type="password"
                id="confirm_password_field"
                className="form-control"
                name="confirmPassword"
                value={ConfirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              id="new_password_button"
              type="submit"
              className="btn btn-block py-3"
            >
              Set Password
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewPassword;

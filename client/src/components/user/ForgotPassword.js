// React Import
import React, { Fragment, useState, useEffect } from "react";
import { useAlert } from "react-alert";

// Redux Import
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../state/actions/userActions";

// Utils import
import MetaData from "../utils/MetaData";

const ForgotPassword = () => {
  const [Email, setEmail] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();

  const { message, error } = useSelector((state) => state.forgotPassword);

  // Use Effect Function
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      alert.success(message);
    }
  }, [dispatch, alert, error, message]);

  // Submit Handler Function
  const submitHandler = (e) => {
    e.preventDefault();

    const formData = {
      email: Email,
    };

    dispatch(forgotPassword(formData));
  };

  return (
    <Fragment>
      <MetaData title={"Forgot Password"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form 
          className="shadow-lg"
          onSubmit={submitHandler}
          >
            <h1 className="mb-3">Forgot Password</h1>
            <div className="form-group">
              <label htmlFor="email_field">Enter Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={Email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <button
              id="forgot_password_button"
              type="submit"
              className="btn btn-block py-3"
            >
              Send Email
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default ForgotPassword;

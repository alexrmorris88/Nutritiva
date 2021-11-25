// React Import
import React, { Fragment, useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router";

// Redux Import
import { useDispatch, useSelector } from "react-redux";

// Component Imports
import {
  updateProfile,
  getUserDetails,
  clearErrors,
} from "../../state/actions/userActions";
import { USER_PROFILE_RESET } from "../../state/constants/userConstants";
import Sidebar from "./Sidebar";

// Utils Import
import MetaData from "../utils/MetaData";

const UpdateUser = () => {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [Role, setRole] = useState("");

  const alert = useAlert();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const { error, isUpdated } = useSelector((state) => state.editUser);
  const { user } = useSelector((state) => state.userDetails);

  const userId = id;

  // Use Effect Function
  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setRole(user.roles);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("User updated successfully");

      dispatch({
        type: USER_PROFILE_RESET,
      });

      navigate("/admin/users");
    }
  }, [dispatch, alert, error, navigate, isUpdated, user, userId]);

  // Submit Handler Function
  const submitHandler = (e) => {
    e.preventDefault();

    const formData = {
      firstName: FirstName,
      lastName: LastName,
      email: Email,
      Role: Role,
    };

    dispatch(updateProfile(user._id, formData));
  };

  return (
    <Fragment>
      <MetaData title={`Update User`} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mt-2 mb-5">Update User</h1>

                <div className="form-group">
                  <label htmlFor="name_field">First Name</label>
                  <input
                    type="name"
                    id="name_field"
                    className="form-control"
                    name="name"
                    value={FirstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="name_field">Last Name</label>
                  <input
                    type="name"
                    id="name_field"
                    className="form-control"
                    name="name"
                    value={LastName}
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
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="role_field">Role</label>

                  <select
                    id="role_field"
                    className="form-control"
                    name="role"
                    value={Role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn update-btn btn-block mt-4 mb-3"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser;

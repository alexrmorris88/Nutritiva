// React Imports
import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAlert } from "react-alert";

// Utils Imports
import MetaData from "../utils/MetaData";

// Redux Imports
import { useDispatch, useSelector } from "react-redux";
import {
  updateProfile,
  loadUser,
  clearErrors,
} from "../../state/actions/userActions";
import { UPDATE_PROFILE_RESET } from "../../state/constants/userConstants";

const UpdateProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.jpg"
  );

  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.editUser);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setAvatarPreview(user.avatar);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("User updated successfully");
      dispatch(loadUser());

      navigate("/profile");
      
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
      
    }
  }, [dispatch, alert, error, navigate, isUpdated, user]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = {
    "firstName": firstName,
    "lastName": lastName,
    "email": email,
    "avatar": avatar,}

    dispatch(updateProfile(user._id, formData));
  };

  const onChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };
  return (
    <Fragment>
      <MetaData title={"Update Profile"} />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            className="shadow-lg"
            onSubmit={submitHandler}
            encType="multipart/form-data"
          >
            <h1 className="mt-2 mb-5">Update Profile</h1>

            <div className="form-group">
              <label htmlFor="email_field">First Name</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Last Name</label>
              <input
                type="name"
                id="name_field"
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
              <label htmlFor="avatar_upload">Avatar</label>
              <div className="d-flex align-items-center">
                <div>
                  <figure className="avatar mr-3 item-rtl">
                    <img
                      src={avatarPreview}
                      className="rounded-circle"
                      alt="Avatar Preview"
                    />
                  </figure>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    name="avatar"
                    className="custom-file-input"
                    id="customFile"
                    accept="image/*"
                    onChange={onChange}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Avatar
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn update-btn btn-block mt-4 mb-3"
              disabled={loading ? true : false}
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProfile;

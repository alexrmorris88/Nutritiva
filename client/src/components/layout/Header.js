// React Components
import React, { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAlert } from "react-alert";
import "../../App.css";

// Redux Imports
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../state/actions/userActions";

const Header = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  const logoutHandler = () => {
    dispatch(logoutUser());
    alert.success("Logged out successfully");
  };

  return (
    <Fragment>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <Link to="/">
              <img
                style={{ height: "50px", width: "auto" }}
                src="/images/nutritiva_logo.png"
                alt="Nutritiva"
              />
            </Link>
          </div>
        </div>

        <div className="col-12 col-md-6 mt-2 mt-md-0"></div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          {cartItems.length !== 0 ? (
            <Link to="/cart" style={{ textDecoration: "none" }}>
              <span id="cart" className="ml-3">
                Cart
              </span>
              <span className="ml-1" id="cart_count">
                {cartItems.length}
              </span>
            </Link>
          ) : (
            ""
          )}

          {user ? (
            <div className="ml-4 dropdown d-inline">
              <Link
                to="#"
                className="btn dropdown-toggle text-white mr-4"
                type="button"
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <figure className="avatar avatar-nav">
                  <img
                    src={
                      user && user.avatar
                        ? user.avatar
                        : "images/default_avatar.jpg"
                    }
                    alt=""
                    className="rounded-circle"
                  />
                </figure>
                <span>
                  {user && user.firstName} {user && user.lastName}
                </span>
              </Link>

              <div
                className="dropdown-menu"
                aria-labelledby="dropDownMenuButton"
              >
                {user && user.roles !== "admin" ? (
                  ""
                ) : (
                  <NavLink className="dropdown-item" to="/dashboard">
                    Dashboard
                  </NavLink>
                )}
                <NavLink className="dropdown-item" to="/orders">
                  Orders
                </NavLink>
                <NavLink className="dropdown-item" to="/profile">
                  Profile
                </NavLink>
                <NavLink
                  className="dropdown-item text-danger"
                  to="/"
                  onClick={logoutHandler}
                >
                  Logout
                </NavLink>
              </div>
            </div>
          ) : (
            !loading && (
              <Link to="/login" className="btn ml-4" id="login_btn">
                Login
              </Link>
            )
          )}
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;

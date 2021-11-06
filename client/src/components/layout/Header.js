// React Components
import React, { Fragment } from "react";
import { Route, Link } from "react-router-dom";
import "../../App.css";

// Redux
import { useDispatch, useSelector } from "react-redux";

const Header = () => {

  return (
    <Fragment>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <Link to="#">
              <img style={{"height": "50px", "width": "auto"}} src="/images/nutritiva_logo.png" />
            </Link>
          </div>
        </div>

        <div className="col-12 col-md-6 mt-2 mt-md-0">
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <Link to="#">
            <span id="cart" className="ml-3">
              Cart
            </span>
            <span className="ml-1" id="cart_count">
              5
            </span>
          </Link>

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
                <img src="" alt="" className="rounded-circle" />
              </figure>
              <span>User</span>
            </Link>

            <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">
              <Link className="dropdown-item" to="#">
                Dashboard
              </Link>

              <Link className="dropdown-item" to="#">
                Orders
              </Link>
              <Link className="dropdown-item" to="#">
                Profile
              </Link>
              <Link className="dropdown-item text-danger" to="#" onClick="">
                Logout
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;

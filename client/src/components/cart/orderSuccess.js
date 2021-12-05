import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MetaData from "../utils/MetaData";

const OrderSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 2000);
  });

  return (
    <Fragment>
      <MetaData title={"Order Success"} />

      <div className="container container-fluid">
        <div className="row justify-content-center">
          <div className="col-6 mt-5 text-center">
            <img
              className="my-5 img-fluid d-block mx-auto"
              src="/images/order_success.png"
              alt="Order Success"
              width="200"
              height="200"
            />

            <h2>Your Order has been placed successfully.</h2>
            <h5>Redirect in 2 seconds</h5>
            <Link to="/">Redirected Now</Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderSuccess;

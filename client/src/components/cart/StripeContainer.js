import React, { useState, useEffect, Fragment } from "react";
import Payment from "../cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import axios from "axios";

const StripeContainer = () => {
  const [stripeApiKey, setStripeApiKey] = useState("");

  useEffect(() => {
    async function getStripeApiKey() {
      const { data } = await axios.get("/payment/stripeapi");
      setStripeApiKey(data.stripeApiKey);
    }

    getStripeApiKey();
  }, []);

  return (
    <Fragment>
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Payment />
        </Elements>
      )}
    </Fragment>
  );
};

export default StripeContainer;

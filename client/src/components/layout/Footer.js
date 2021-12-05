import React, { Fragment } from "react";
import Typography from "@mui/material/Typography";

const Footer = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();

  return (
    <Fragment>
      <Typography
        variant="h6"
        component="p"
        align="center"
        color="textSecondary"
        marginTop="10rem"
        gutterBottom
      >
        &copy; {year}, All Rights Reserved
      </Typography>
    </Fragment>
  );
};

export default Footer;

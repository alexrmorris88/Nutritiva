// React Components
import React from "react";
import { Link } from "react-router-dom";

// UI Components
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Products = ({ product, col }) => {
  return (
    <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
      <div className="card p-3 rounded">
        <img
          className="card-img-top mx-auto"
          src="https://m.media-amazon.com/images/I/617NtexaW2L._AC_UY218_.jpg"
          alt="Text Goes here"
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <Link to={`/products/${product._id}`}>{product.name}</Link>
          </h5>
          <div className="ratings mt-auto">
            <div className="rating-outer">
              <div className="rating-inner"></div>
            </div>
            <span id="no_of_reviews">
              ({product.numOfReviews}{" "}
              {product.numOfReviews && product.numOfReviews === 1
                ? "Review"
                : "Reviews"}
              )
            </span>
          </div>
          <Typography variant="h6" component="p">
            ${product.price}
          </Typography>
          <Button
            type="submit"
            variant="contained"
            component={Link}
            to={`/products/${product._id}`}
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Products;

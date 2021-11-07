// React Imports
import React, { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";

// Redux Imports
import { useDispatch, useSelector } from "react-redux";
import { allProducts } from "../state/actions/productActions";

// Components Import
import Products from '../components/products/Products'

// Utils Imports
import MetaData from "./utils/MetaData";
import Loader from "./utils/Loader";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, products, resPerPage, productsCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(allProducts());
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Products"} />
          <h1 id="product_heading">Latest Products</h1>

          <section id="products" className="container mt-5">
            <div className="row">

              {products.map((product) => (
                <Products key={product._id} product={product} col={4} />
              ))}

            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};
export default Home;

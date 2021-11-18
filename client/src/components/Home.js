// React Imports
import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";

// Redux Imports
import { useDispatch, useSelector } from "react-redux";
import { allProducts } from "../state/actions/productActions";

// Components Import
import Products from "../components/products/Products";

// Utils Imports
import MetaData from "./utils/MetaData";
import Loader from "./utils/Loader";
import Pagination from "react-js-pagination";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, products, resPerPage, productsCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(allProducts(currentPage));
  }, [dispatch, alert, error, currentPage]);

  function setCurrentPageNumber(pageNumber) {
    setCurrentPage(pageNumber);
  }

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

          <div className="d-flex justify-content-center mt-5">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resPerPage}
              totalItemsCount={productsCount ? productsCount : 1}
              onChange={setCurrentPageNumber}
              nextPageText={"Next"}
              prevPageText={"Prev"}
              firstPageText={"First"}
              lastPageText={"Last"}
              itemClass="page-item"
              linkClass="page-link"
            />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
export default Home;

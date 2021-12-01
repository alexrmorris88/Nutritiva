// React
import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";

// MDB Data Table
import { MDBDataTable } from "mdbreact";

// Redux Import
import { useDispatch, useSelector } from "react-redux";
import { myOrders, clearErrors } from "../../state/actions/orderActions";

// Utils Import
import Loader from "../utils/Loader";
import MetaData from "../utils/MetaData";
import { useAlert } from "react-alert";

const ListOrders = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { error, orders } = useSelector((state) => state.myOrders);

  console.log(orders);

  useEffect(() => {
    dispatch(myOrders(user._id));

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, user._id, error]);

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "Order ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Num of Items",
          field: "numOfItems",
          sort: "asc",
        },
        {
          label: "Amount",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    //todo: notworking on a null list
    orders.forEach((order) => {
      data.rows.push({
        id: order._id,
        numOfItems: order.orderItems.length,
        amount: `$${order.totalPrice}`,
        status:
          order.orderStatus &&
          String(order.orderStatus).includes("Delivered") ? (
            <p style={{ color: "green" }}>{order.orderStatus}</p>
          ) : (
            <p style={{ color: "red" }}>{order.orderStatus}</p>
          ),
        actions: (
          <Link to={`/orders/${order._id}`} className="btn btn-primary">
            <i className="fa fa-eye"></i>
          </Link>
        ),
      });
    });
    return data;
  };

  return (
    <Fragment>
      <MetaData title={"Orders"} />

      <h1 className="my-5">Orders</h1>

      <MDBDataTable
        data={setOrders()}
        className="px-3"
        bordered
        striped
        hover
      />
    </Fragment>
  );
};

export default ListOrders;

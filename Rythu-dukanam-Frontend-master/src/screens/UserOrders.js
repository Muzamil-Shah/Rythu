import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateOrder, userOrders } from "../redux/actions/orderAction";
import Header from "../components/Header";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import ProfileHeader from "../components/ProfileHeader";
import moment from "moment";

function UserOrders(props) {
  const [details, setDetails] = useState(false);
  const ordersUser = useSelector((state) => state.ordersUser);
  const { loading, error, orders } = ordersUser;
  const orderUpdate = useSelector((state) => state.orderUpdate);
  const { error: errorUP, loading: loadingUP, success } = orderUpdate;
  // const [status, setStatus] = useState("");
  // const [orderId, setOrderId] = useState("");
  const [getStatus, setGetStatus] = useState({
    status: "",
    orderId: "",
  });
  const carts = useSelector((state) => state.carts);
  const { cartItems } = carts;
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(updateOrder(getStatus));
    props.history.push("/customer/orders");
  };
  // const submitOneHandler = (e) => {
  //   e.preventDefault();
  //   alert(orderId);
  //   dispatch(updateOrder({ orderId, status }));
  //   // props.history.push("/admin/dashboard/orders");
  // };

  useEffect(() => {
    dispatch(userOrders());
  }, []);
  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <>
      <Header cartItems={cartItems} />
      <ProfileHeader />
      <div className="container text-sm   mx-auto space-y-3 flex flex-col justify-start items-center md:text-lg text-gray-800">
        <h3 className="text-xl font-bold py-3 ">My Orders</h3>
        {orders.map((order) => (
          <div
            key={order._id}
            className="w-full border-2 flex flex-col justify-start items-start"
          >
            <div className="w-full py-3 px-2 bg-gray-50 flex flex-col md:flex-row justify-between items-center">
              <span className="md:w-4/12 flex justify-start items-center">
                Order:<span>#{order._id}</span>
              </span>

              <span
                className={
                  order.status === "ordered"
                    ? "md:w-4/12 flex justify-center items-center text-yellow-500"
                    : order.status === "delivered"
                    ? "md:w-4/12 flex justify-center items-center text-lime-400"
                    : "md:w-4/12 flex justify-center items-center text-red-500"
                }
              >
                <strong>{order.status}</strong>
              </span>
              <span className="md:w-4/12 flex justify-end items-center">
                Date:{" "}
                <strong className="px-2">
                  {moment(order.createAt).format("DD/MM/YY HH:MM")}
                </strong>
              </span>
            </div>
            {order.orderItems.map((item) => (
              <div
                key={item._id}
                className="w-full h-44 border-b  px-2 flex justify-between items-center"
              >
                <div className="w-20 h-24 md:w-32 md:h-32 rounded-lg">
                  <img
                    className="w-full h-full  rounded-lg"
                    src={item.image}
                    alt="item"
                  />
                </div>
                <div>
                  <strong>{item.name}</strong>
                  <p>&#x20B9; {item.price}.00/Kg</p>
                </div>
                <span>
                  <strong>{item.qty}</strong> KG
                </span>
              </div>
            ))}
            <div className="w-full flex flex-col justify-center items-center space-y-1 border-b-2 py-3">
              <div className="w-full flex justify-between items-center px-2">
                <span>Grand Total:</span>{" "}
                <strong>
                  &#x20B9;{" "}
                  {order.orderItems.reduce((a, c) => a + c.price * c.qty, 0)}.00
                </strong>
              </div>
              <div className="w-full flex justify-between items-center px-2">
                <span>Total items:</span>
                <strong> {order.orderItems.length}</strong>
              </div>
              <div className="w-full flex justify-between items-center px-2">
                <span>Deliverid at:</span>
                <strong> {moment(order.createAt).format("DD/MM/YY")}</strong>
              </div>
              <div className="w-full flex justify-between items-center px-2">
                <span>Payment status:</span>{" "}
                <strong>
                  {order.isPaid === true ? <p>Paid</p> : <p>Not paid</p>}
                </strong>
              </div>
              <button
                onClick={() => setDetails(!details)}
                className="bg-gray-900 text-white py-1 px-4 rounded-lg"
              >
                Details
              </button>
            </div>
            <div className={details ? "w-full flex flex-col" : "hidden"}>
              <div className="w-full flex justify-between items-center py-4 px-2 border-b-2">
                <div>
                  <strong>Shipping Address</strong>
                  <div>
                    <p>
                      {order.informationAddress.firstName +
                        " " +
                        order.informationAddress.lastName}
                    </p>
                    <p>{order.informationAddress.address}</p>
                    <p>{order.informationAddress.nearTo}</p>
                    <p>
                      {order.informationAddress.pinCode +
                        " " +
                        order.informationAddress.city +
                        " " +
                        order.informationAddress.state}
                    </p>
                    <p>{order.informationAddress.country}</p>
                  </div>
                </div>
                <div>
                  <strong>Billing Address</strong>
                  <div>
                    <p>
                      {order.informationAddress.firstName +
                        " " +
                        order.informationAddress.lastName}
                    </p>
                    <p>{order.informationAddress.address}</p>
                    <p>{order.informationAddress.nearTo}</p>
                    <p>
                      {order.informationAddress.pinCode +
                        " " +
                        order.informationAddress.city +
                        " " +
                        order.informationAddress.state}
                    </p>
                    <p>{order.informationAddress.country}</p>
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col justify-center items-center py-4">
                <strong>Cost Bill</strong>
                <div className="w-full flex justify-between items-center px-2">
                  <span>subtotal</span>
                  <span>
                    &#x20B9;{" "}
                    {order.orderItems.reduce((a, c) => a + c.price * c.qty, 0)}
                    .00
                  </span>
                </div>
                <div className="w-full flex justify-between items-center px-2">
                  <span>Grand Total</span>
                  <span>
                    &#x20B9;{" "}
                    {order.orderItems.reduce((a, c) => a + c.price * c.qty, 0)}
                    .00
                  </span>
                </div>
                <div className="w-full flex justify-between items-center px-2">
                  <span>Payment Type</span>
                  {/* <strong>{order.paymentMethod.payment}</strong> */}
                </div>
              </div>
            </div>
            {order.status === "ordered" &&
            moment(order.createAt).format("DD/MM/YYYY") ==
              moment(Date.now()).format("DD/MM/YYYY") ? (
              <form
                className="w-full  flex flex-col justify-center items-center"
                onSubmit={submitHandler}
              >
                <h3 className="py-3">
                  You have{" "}
                  <span className="text-purple-500 font-bold">
                    {" "}
                    {moment(order.createAt).add(1, "day").fromNow()}{" "}
                  </span>
                  time to cancell your order
                </h3>
                <button
                  onClick={() =>
                    setGetStatus({
                      ...getStatus,
                      orderId: order._id,
                      status: "cancelled",
                    })
                  }
                  type="submit"
                  className="w-full flex justify-center items-center bg-red-500 text-white py-5 px-4 "
                >
                  Cancell Order
                </button>
              </form>
            ) : order.status === "delivered" &&
              (moment(order.createAt).format("DD/MM/YYYY") ==
                moment(Date.now()).subtract("1", "day").format("DD/MM/YYYY") ||
                moment(order.createAt).format("DD/MM/YYYY") ==
                  moment(Date.now()).format("DD/MM/YYYY") ||
                moment(order.createAt).format("DD/MM/YYYY") ==
                  moment(Date.now())
                    .subtract("7", "day")
                    .format("DD/MM/YYYY") ||
                moment(order.createAt).format("DD/MM/YYYY") ==
                  moment(Date.now())
                    .subtract("6", "day")
                    .format("DD/MM/YYYY") ||
                moment(order.createAt).format("DD/MM/YYYY") ==
                  moment(Date.now())
                    .subtract("5", "day")
                    .format("DD/MM/YYYY") ||
                moment(order.createAt).format("DD/MM/YYYY") ==
                  moment(Date.now())
                    .subtract("4", "day")
                    .format("DD/MM/YYYY") ||
                moment(order.createAt).format("DD/MM/YYYY") ==
                  moment(Date.now())
                    .subtract("3", "day")
                    .format("DD/MM/YYYY") ||
                moment(order.createAt).format("DD/MM/YYYY") ==
                  moment(Date.now())
                    .subtract("2", "day")
                    .format("DD/MM/YYYY")) ? (
              <form
                className="w-full flex flex-col justify-center items-center"
                onSubmit={submitHandler}
              >
                <h3 className="py-3">
                  You have{" "}
                  <span className="text-purple-500 font-bold">
                    {" "}
                    {moment(order.createAt).add(7, "days").fromNow()}{" "}
                  </span>
                  time to return your order
                </h3>
                <button
                  onClick={() =>
                    setGetStatus({
                      ...getStatus,
                      orderId: order._id,
                      status: "returned",
                    })
                  }
                  type="submit"
                  className="w-full flex justify-center items-center bg-yellow-500 text-white py-5 px-4 "
                >
                  Return Order
                </button>
              </form>
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default UserOrders;

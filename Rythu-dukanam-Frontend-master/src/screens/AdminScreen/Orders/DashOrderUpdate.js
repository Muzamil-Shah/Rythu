import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../../../components/LoadingBox";
import MessageBox from "../../../components/MessageBox";
import {
  deleteOrder,
  orderDetails,
  updateOrder,
} from "../../../redux/actions/orderAction";
import moment from "moment";

function DashOrderUpdate(props) {
  const orderId = props.match.params.id;
  const detailsOrder = useSelector((state) => state.detailsOrder);
  const { error, loading, order } = detailsOrder;
  const orderUpdate = useSelector((state) => state.orderUpdate);
  const { error: errorUP, success } = orderUpdate;
  const [status, setStatus] = useState("");
  const [isPaid, setIsPaid] = useState("");

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateOrder({ orderId, status, isPaid }));
    props.history.push("/admin/dashboard/orders");
  };

  const deleteHandler = (e) => {
    e.preventDefault();
    dispatch(deleteOrder({ _id: orderId }));
    props.history.push("/admin/dashboard/orders");
  };

  useEffect(() => {
    dispatch(orderDetails(orderId));
    setStatus(order.status);
    setIsPaid(order.isPaid);
  }, [orderId]);
  return (
    <div className="  w-full h-screen bg-gray-100">
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className=" w-full pt-8 ">
          <form
            onSubmit={submitHandler}
            className="w-full  md:w-8/12 md:m-auto  md:p-8 p-2 bg-white flex flex-col justify-start items-start space-y-3"
          >
            <div className="w-full flex justify-between items-center font-bold md:text-2xl">
              <h3>Order</h3>
              <h3 className="w-3/12 ">Customer</h3>
            </div>
            <div className="w-full flex justify-between items-center">
              <div className="flex flex-col justify-start items-start">
                <span>Date</span>
                <span className="text-xs md:text-lg font-semibold">
                  {moment(order.createAt).format("DD/MM/YYYY")}
                </span>
              </div>
              <div className="flex flex-col justify-start items-start">
                <span>Reference</span>
                <span className="text-xs md:text-lg font-semibold">
                  {order._id}
                </span>
              </div>
              <div className=" md:w-3/12 flex flex-col text-xs md:text-lg justify-start items-start border p-2">
                <span className="font-semibold">
                  {order.informationAddress.firstName +
                    " " +
                    order.informationAddress.lastName}
                </span>
                <span className="font-semibold">
                  {order.informationAddress.contact}
                </span>
                <span className="font-semibold">
                  (+91)
                  {order.informationAddress.phone +
                    ",  (+91)" +
                    order.shippingAddress.phone}
                </span>
              </div>
            </div>
            <div className="w-full flex justify-between items-center">
              <div className="relative  border py-5 focus-within:border-lime-500">
                <label className="absolute top-0 ml-2 z-10 text-sm">
                  Status
                </label>
                <select
                  name="status"
                  id="status"
                  type="text"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="relative w-11/12  top-0 ml-2  font-semibold focus:outline-none"
                >
                  <option value="ordered">Ordered</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="returned">Returned</option>
                </select>
              </div>
              {order.paymentMethod.payment === "COD" && (
                <div className="relative  border py-5 focus-within:border-lime-500">
                  <label className="absolute top-0 ml-2 z-10 text-sm">
                    Paid
                  </label>
                  <select
                    name="status"
                    id="status"
                    type="text"
                    value={isPaid}
                    onChange={(e) => setIsPaid(e.target.value)}
                    className="relative w-11/12  top-0 ml-2  font-semibold focus:outline-none"
                  >
                    <option value="false">false</option>
                    <option value="true">true</option>
                  </select>
                </div>
              )}
              <div className=" md:w-3/12 border flex flex-col justify-start items-start space-y-1 p-2">
                <h3 className="md:text-xl font-bold pb-3">Shipping Address</h3>
                <span>{order.informationAddress.address}</span>
                <span>{order.informationAddress.nearTO}</span>
                <span>{order.informationAddress.city}</span>
                <span>
                  {order.informationAddress.pinCode +
                    "," +
                    order.informationAddress.state +
                    "," +
                    order.informationAddress.country}
                </span>
              </div>
            </div>
            <h3 className="text-xl font-bold pb-3">Items</h3>
            <table className="w-full">
              <thead>
                <tr className="text-left border ">
                  <th className="border py-2 px-2">Reference</th>
                  <th className="border py-2 px-2">Unit Price</th>
                  <th className="border py-2 px-2">Quantity</th>
                  <th className="border py-2 px-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.orderItems.map((item) => (
                  <tr key={item._id}>
                    <td className="border py-2 px-2">{item.name}</td>
                    <td className="border py-2 px-2">
                      &#x20B9;{item.price}.00
                    </td>
                    <td className="border py-2 px-2">{item.qty}</td>
                    <td className="border py-2 px-2">
                      &#x20B9;{item.price * item.qty}.00
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h3 className="text-xl font-bold pb-3">Totals</h3>
            <div className="w-full flex flex-col justify-start items-start">
              <div className="w-full pb-3 flex justify-between items-center border-b">
                <span>Sum</span>
                <span>
                  &#x20B9;
                  {order.orderItems.reduce((a, c) => a + c.price * c.qty, 0)}.00
                </span>
              </div>
              <div className="w-full py-3 flex justify-between items-center border-b">
                <span>Delivery</span>
                <span>&#x20B9;0.00</span>
              </div>
              <div className="w-full py-3 flex justify-between items-center border-b">
                <span>Tax</span>
                <span>&#x20B9;0.00</span>
              </div>
              <div className="w-full py-3 flex justify-between items-center border-b">
                <span className="font-bold">Total</span>
                <span className="font-bold">
                  &#x20B9;
                  {order.orderItems.reduce((a, c) => a + c.price * c.qty, 0)}.00
                </span>
              </div>
            </div>
            <div className="w-full flex justify-between items-center">
              <button
                type="submit"
                className="text-lg font-bold text-white bg-purple-500 px-2 py-1 rounded-lg"
              >
                SAVE
              </button>
              <button
                onClick={deleteHandler}
                className="text-lg font-bold text-red-500 px-2 py-1 rounded-lg hover:bg-red-300"
              >
                DELETE
              </button>
            </div>
          </form>
          {errorUP && <MessageBox variant="danger">{errorUP}</MessageBox>}
          {success && (
            <MessageBox variant="success">
              Status Update Successfully
            </MessageBox>
          )}
        </div>
      )}
    </div>
  );
}

export default DashOrderUpdate;

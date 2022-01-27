import React, { useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";

function Row(props) {
  const [details, setDetails] = useState(false);
  const { order, orders, id } = props;
  return (
    <>
      <tr
        key={order._id}
        onClick={(e) => setDetails(!details)}
        className=" text-lg border "
      >
        <td className="border text-center py-2">
          <input className="w-5 h-5" type="checkbox" />
        </td>
        <td className="border text-center py-2 px-2">{id + 1}</td>
        <td className="border text-center py-2 ">
          {moment(order.createAt).fromNow()}
        </td>
        <td className=" flex justify-start py-2 items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 ml-2 text-red-500 bg-red-200  rounded-full "
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
              clip-rule="evenodd"
            />
          </svg>
          <p>{order.informationAddress.contact}</p>
        </td>
        <td className="border text-center py-2">
          {order.shippingAddress.shipIn.slice(0,3)}...
        </td>
        <td className="border text-center py-2 px-2">
          <Link
            className="text-purple-500"
            to={`/admin/dashboard/order/update/${order._id}`}
          >
            {order._id.slice(0,3)}...
          </Link>
        </td>
        <td className="border text-center py-2">
          &#x20B9; {order.orderItems.reduce((a, c) => a + c.price * c.qty, 0)}
          .00
        </td>
        <td className="border text-center py-2">&#x20B9; 0.00</td>
        <td className="border text-center py-2">&#x20B9; 0.00</td>
        <td className="border text-center py-2">
          &#x20B9; {order.orderItems.reduce((a, c) => a + c.price * c.qty, 0)}
          .00
        </td>
      </tr>
      {details && (
        <tr className="">
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td className="border rounded-lg my-3   flex flex-col justify-start items-start space-y-4 text-lg p-2">
            <div className="w-full flex justify-between items-center  text-2xl font-bold">
              <h3>PudamiMart</h3>
              <h3>Invoice {orders.length}</h3>
            </div>
            <div>
              <p>{order.informationAddress.address}</p>
              <p>{order.informationAddress.nearTo}</p>
              <p>{order.informationAddress.city}</p>
              <p>
                {order.informationAddress.pinCode +
                  "," +
                  order.informationAddress.state +
                  "," +
                  order.informationAddress.country}
              </p>
            </div>
            <div className="w-full flex justify-around items-center">
              <div className="flex flex-col justify-center items-center">
                <span className="font-bold">Date</span>
                <span>{moment(order.createAt).format("DD/MM/YYYY")}</span>
              </div>
              <div className="flex flex-col justify-center items-center">
                <span className="font-bold">Order</span>
                <span>{order._id}</span>
              </div>
            </div>

            <table className="w-full text-center border">
              <thead>
                <tr>
                  <th className="border">Reference</th>
                  <th className="border">Unit Price</th>
                  <th className="border">Quantity</th>
                  <th className="border">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.orderItems.map((item) => (
                  <tr>
                    <td className="border">{item.name}</td>
                    <td className="border">&#x20B9;{item.price}.00</td>
                    <td className="border">{item.qty} Kg</td>
                    <td className="border">
                      &#x20B9;{item.price * item.qty}.00
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      )}
    </>
  );
}

export default Row;

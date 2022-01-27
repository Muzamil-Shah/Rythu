import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import img from "./logo.png";
import card from "./image/card.png";
import { useDispatch, useSelector } from "react-redux";
import { orderDetails } from "../redux/actions/orderAction";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {FaOpencart} from "react-icons/fa"
import {IoIosArrowDropdown, IoIosArrowDropup} from "react-icons/io"

function OrderScreen(props) {
  const orderId = props.match.params.id;
  const detailsOrder = useSelector((state) => state.detailsOrder);
  const { error, loading, order } = detailsOrder;
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(orderDetails(orderId));
  }, [dispatch, orderId]);
  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className="container mx-auto text-sm md:text-lg flex flex-col justify-start items-center space-y-3 text-gray-600">
      <img className="w-1/6" src={img} alt="logo" />
      <div className="container py-4 bg-gray-200 flex justify-between items-center">
        <span
          onClick={() => setShow(!show)}
          className="text-red-500 flex justify-center items-center ml-2"
        >
          <FaOpencart className="w-6 h-6"/>
          {!show ? (
            <span className="text-sm md:text-xl ml-2 flex justify-center items-center">
              Show order summery
              <IoIosArrowDropdown className="w-6 h-6" />
            </span>
          ) : (
            <span className="text-sm md:text-xl ml-2 flex justify-center items-center">
              Hide order summery
              <IoIosArrowDropup className="w-6 h-6"/>
              
            </span>
          )}
        </span>
        <span className="text-lg md:text-xl font-bold mr-2">
          &#x20B9; {order.orderItems.reduce((a, c) => a + c.price * c.qty, 0)}
          .00
        </span>
      </div>
      <div className={!show ? "container  bg-gray-100" : "hidden"}>
        <div className="w-full flex flex-col justify-start items-start">
          {order.orderItems.map((item) => (
            <div className="w-full h-44 border-b  px-2 flex justify-between items-center">
              <div className="w-20 h-24 md:w-32 md:h-32 rounded-lg ">
                <img
                  className="w-full h-full rounded-lg"
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
        </div>
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
        </div>
      </div>
      <div className="w-full flex justify-start items-center">
        <svg
          // className="w-28 text-lime-500"
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 md:h-20 md:w-20 text-red-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clip-rule="evenodd"
          />
        </svg>
        <div className="flex flex-col justify-start items-start">
          <p>Order #{order._id}</p>
          <h3 className="text-lg md:text-2xl">
            Thank you {order.informationAddress.firstName}!
          </h3>
        </div>
      </div>
      <div className="w-full flex flex-col justify-start items-start border p-4">
        <h3 className=" text-xl font-semibold ">Your order is confirmed</h3>
        <p>
          You'll receive a confirmation email with your order number shortly
        </p>
        <p>
          <strong>Delivery information:</strong> Free Home Delivery on orders.
          No minimum order value.
        </p>
      </div>
      <div className="w-full flex flex-col justify-start items-start border p-4">
        <p className=" ">
          Thank you! Your order will be dispatched with in a hours.
        </p>
      </div>
      <div className="w-full flex flex-col justify-start items-start space-y-3 border p-4 md:text-lg">
        <h3 className="text-xl">Customer information</h3>
        <strong>Contact information</strong>
        <p>{order.informationAddress.contact}</p>
        <p>{order.shippingAddress.phone}</p>
        <strong>Shipping address</strong>
        <div className="flex flex-col justify-start items-start space-y-1">
          <p>
            {order.informationAddress.firstName +
              " " +
              order.informationAddress.lastName}
          </p>
          <p>{order.informationAddress.address}</p>
          <p>{order.informationAddress.nearTO}</p>
          <p>
            {order.informationAddress.pinCode +
              " " +
              order.informationAddress.city +
              " " +
              order.informationAddress.state}
          </p>
          <p>{order.informationAddress.country}</p>
        </div>
        <strong>Shipping method</strong>
        <p>Local Delivery</p>
        <strong>Payment method</strong>
        <p className="flex justify-start items-center ">
          <img className="w-6 mr-3" src={card} alt="card" /> &#x20B9;{" "}
          {order.orderItems.reduce((a, c) => a + c.price * c.qty, 0)}.00{" "}
          {order.paymentMethod.payment}
        </p>
        <strong>Billing address</strong>
        <div className="flex flex-col justify-start items-start">
          <p>
            {order.informationAddress.firstName +
              " " +
              order.informationAddress.lastName}
          </p>
          <p>{order.informationAddress.address}</p>
          <p>{order.informationAddress.nearTO}</p>
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
      <Link
        className="w-full flex justify-center items-center h-16 text-white md:text-lg font-semibold rounded-lg bg-gray-900 "
        to="/"
      >
        Continue shopping
      </Link>
      <button
        className="w-full h-16 flex justify-center items-center  md:text-lg font-semibold rounded-lg  "
        type="submit"
      >
        Need help? <span className="text-lime-500 ml-2">Contact us</span>
      </button>
      <p className="text-center">
        By checking the sign-up box for text message offers and clicking
        Continue to shipping, I consent to receive recurring automated marketing
        text messages from www.manikondamart.com at the number provided, and I
        agree that texts may be sent using an auto dialer or other technology.
        Consent is not a condition of purchase. Text STOP to cancel, HELP for
        help. Message and Data rates may apply. For more information see Terms
        of Service & Privacy Policy.
      </p>
    </div>
  );
}

export default OrderScreen;

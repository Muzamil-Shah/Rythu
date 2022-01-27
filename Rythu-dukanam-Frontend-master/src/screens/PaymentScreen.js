import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Checkout from "../components/Checkout";
import img from "./logo.png";
import visa from "./image/visa.png";
import amex from "./image/amex.png";
import master from "./image/master.png";
import online from "./image/online.png";
import card from "./image/card.png";
import { useDispatch, useSelector } from "react-redux";
import { savePayment } from "../redux/actions/cartAction";
import { createOrder } from "../redux/actions/orderAction";
import { ORDER_CREATE_RESET } from "../redux/conistance/orderConstance";
import MessageBox from "../components/MessageBox";
import axios from "axios";
import {FaOpencart} from "react-icons/fa"
import {IoIosArrowDropdown, IoIosArrowDropup} from "react-icons/io"

const __DEV__ = document.domain === "localhost";

function PaymentScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const carts = useSelector((state) => state.carts);
  // const { cartItems, informationAddress, shippingAddress } = carts;
  const orderCreate = useSelector((state) => state.orderCreate);
  const { error, success, order } = orderCreate;
  const [show, setShow] = useState(false);
  const [go, setGo] = useState(false);
  const [getH, setGetH] = useState({
    hide: false,
    placebtn: false,
  });
  const [getData, setGetData] = useState({
    payment: "",
    billingAddress: "",
  });
  //Payment Method
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // creating a new order
    const result = await axios.post(
      "https://pudami-backend.herokuapp.com/razorpay"
    );
    // const result = await fetch("http://localhost:4000/razorpay", {
    //   method: "POST",
    // }).then((t) => t.json());

    console.log(result);

    if (!result) {
      alert("Server error. Are you onlineeeeeee?");
      return;
    }

    // Getting the order details back
    const { id: order_id, currency } = result.data;
    // const amount = carts.cartItems.reduce((a, c) => a + c.price * c.qty, 0);
    // console.log("sdfads", amount);
    const options = {
      key: __DEV__ ? "rzp_test_aH1LU7eVK1YOb0" : "API_NOT_AVAILABLE", // Enter the Key ID generated from the Dashboard
      amount: carts.cartItems.reduce((a, c) => a + c.price * c.qty, 0),
      currency: currency,
      order_id: order_id,
      name: "Donation",
      description: "Test Transaction",
      image: { img },
      // handler: async function (response) {
      // const data = {
      //   orderCreationId: this.order_id,
      //   razorpayPaymentId: response.razorpay_payment_id,
      //   razorpayOrderId: response.razorpay_order_id,
      //   razorpaySignature: response.razorpay_signature,
      // };
      // alert(response.razorpay_payment_id);
      // alert(response.razorpay_order_id);
      // alert(response.razorpay_signature);

      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await axios.post(
          "https://pudami-backend.herokuapp.com/success",
          data
        );
        console.log(result);
        alert(result.data);
      },
      prefill: {
        name: userInfo.name,
        email: userInfo.email,
        contact: carts.shippingAddress.phone,
      },
      notes: {
        address: "Soumya Dey Corporate Office",
      },
      theme: {
        color: "#61dafb",
      },
    };
    console.log(options);
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  //Payment Method
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePayment(getData));
    // props.history.push("/checkouts/order/:id");
  };
  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        ...carts,
        orderItems: carts.cartItems,
        informationAddress: carts.informationAddress,
        shippingAddress: carts.shippingAddress,
        paymentMethod: carts.payment,
      })
    );
  };
  useEffect(() => {
    if (success) {
      props.history.push(`/checkouts/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [success]);
  return (
    <div className="container text-sm md:text-lg mx-auto flex flex-col justify-start items-center space-y-3 text-gray-600">
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
              <IoIosArrowDropdown className="w-6 h-6 ml-2" />
            </span>
          ) : (
            <span className="text-sm md:text-xl ml-2 flex justify-center items-center">
              Hide order summery
              <IoIosArrowDropup className="w-6 h-6 ml-2"/>
              
            </span>
          )}
        </span>
        <span className="text-xl font-bold mr-2">
          &#x20B9; {carts.cartItems.reduce((a, c) => a + c.price * c.qty, 0)}.00
        </span>
      </div>
      <div className={show ? "container bg-gray-100" : "hidden"}>
        <div className="w-full flex flex-col justify-start items-start">
          {carts.cartItems.map((item) => (
            <div className="w-full h-44 border-b  px-2 flex justify-between items-center">
              <div className="w-32 h-32 ">
                <img className="w-32 h-32" src={item.image} alt="item" />
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
              {carts.cartItems.reduce((a, c) => a + c.price * c.qty, 0)}.00
            </strong>
          </div>
          <div className="w-full flex justify-between items-center px-2">
            <span>Total items:</span>
            <strong> {carts.cartItems.length}</strong>
          </div>
        </div>
      </div>
      <Checkout green1 green2 green3 step4 />
      <form onSubmit={submitHandler}>
        <div className="w-full border py-2 flex flex-col justify-center items-center space-y-3">
          <div className="relative w-11/12 border-b py-5 focus-within:border-lime-500">
            <label
              className={
                go
                  ? "absolute top-4 text-lg ml-2 z-10"
                  : "absolute top-0 ml-2 z-10 text-sm"
              }
            >
              Contact{" "}
            </label>
            <input
              disabled
              value={carts.informationAddress.contact}
              className="relative w-11/12  top-0 ml-2  font-semibold focus:outline-none"
            />
          </div>
          <div className="relative w-11/12 border-b py-5 focus-within:border-lime-500">
            <label
              className={
                go
                  ? "absolute top-4 text-lg ml-2 z-10"
                  : "absolute top-0 ml-2 z-10 text-sm"
              }
            >
              Ship in
            </label>
            <input
              value={carts.shippingAddress.shipIn}
              className="relative w-11/12  top-0 ml-2  font-semibold focus:outline-none"
            />
          </div>
          <div className="relative w-11/12 border-b py-5 focus-within:border-lime-500">
            <label className="absolute top-0 ml-2 z-10 text-sm">Method</label>
            <h3 className="relative w-11/12  top-0 ml-2  font-semibold focus:outline-none flex justify-start items-center">
              Local Delivery <li className="ml-2 font-bold">Free</li>
            </h3>
          </div>
        </div>
        <div className="w-full space-y-6 px-2">
          <div>
            <h3 className="text-lg font-bold md:text-2xl ">Payment</h3>
            <p>Select the address that matches your card or payment method.</p>
          </div>
          <div className="w-full h-96 border flex flex-col justify-between item-start bg-gray-200 ">
            <div className="w-full  py-4 flex justify-between items-center space-x-3 border bg-white">
              <div className=" flex justify-start items-center">
                <input
                  name="payment"
                  value="onlinePayment"
                  required
                  onChange={(e) =>
                    setGetData({ ...getData, payment: e.target.value })
                  }
                  className="w-6 h-6 ml-2"
                  type="radio"
                />
                <div className="flex flex-col justify-center items-start ml-3 font-semibold">
                  <p className="text-sm md:text-lg">
                    Credit Card / Debit Card / Net Banking / UPI
                  </p>
                  <div className="flex justify-start items-center space-x-2">
                    <img className="w-10" src={visa} alt="visa" />
                    <img className="w-10" src={master} alt="visa" />
                    <img className="w-10" src={amex} alt="visa" />
                    <img className="w-10" src={online} alt="visa" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <img className="w-20 md:w-28" src={card} alt="card" />
              <p className="w-5/6 text-center ">
                After clicking "Complete order", you will be redirected to
                Credit Card / Debit Card / Net Banking / UPI to complete your
                purchase securely.
              </p>
              <button
                type="button"
                className="App-link bg-red-500 text-white px-2 py-1"
                onClick={displayRazorpay}
              >
                pay &#x20B9;
                {carts.cartItems.reduce((a, c) => a + c.price * c.qty, 0)}.00
              </button>
            </div>
            <div className="w-full bg-white  py-4 flex justify-between items-center space-x-3 border">
              <div className=" flex justify-start items-center">
                <input
                  name="payment"
                  value="COD"
                  required
                  onChange={(e) =>
                    setGetData({ ...getData, payment: e.target.value })
                  }
                  className="w-6 h-6 ml-2"
                  type="radio"
                />
                <div className="flex flex-col justify-center items-start ml-2 font-semibold">
                  <p>Cash on Delivery</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full space-y-6">
            <div>
              <h3 className="text-lg font-bold md:text-2xl ">
                Billing address
              </h3>
              <p>
                Select the address that matches your card or payment method.
              </p>
            </div>
            <div className="w-full border flex flex-col justify-center item-start ">
              <div className="w-full  py-4 flex justify-between items-center space-x-3 border-b">
                <div className="flex justify-center items-center">
                  <input
                    required
                    name="billing"
                    value="samebillingaddress"
                    onChange={(e) =>
                      setGetData({ ...getData, billingAddress: e.target.value })
                    }
                    className="w-6 h-6 ml-2"
                    type="radio"
                  />
                  <div className="flex flex-col justify-center items-start ml-2 font-semibold">
                    <p>Same as shipping address</p>
                  </div>
                </div>
              </div>
              {/* <div className="w-full  py-4 flex justify-between items-center space-x-3">
              <div className="flex justify-center items-center">
                <input name="billing" className="w-6 h-6 ml-2" type="radio" />
                <div className="flex flex-col justify-center items-start ml-2 font-semibold">
                  <p>Use a different billing address</p>
                </div>
              </div>
            </div> */}
            </div>
          </div>
          <div className="w-full space-y-6">
            <button
              onClick={() => setGetH({ ...getH, hide: true, placebtn: true })}
              className={
                !getH.hide
                  ? "w-full h-16 text-white text-lg font-semibold rounded-lg bg-gray-900 "
                  : "hidden"
              }
              type="submit"
            >
              Complete order
            </button>
            {getH.placebtn && (
              <button
                onClick={placeOrderHandler}
                className="w-full h-16 text-white text-lg font-semibold rounded-lg bg-gray-900 "
              >
                PlaceOrder
              </button>
            )}
            {/* {loading && <LoadingBox></LoadingBox>}rty */}
            {error && <MessageBox variant="danger">{error}</MessageBox>}
            <Link
              to="/cart"
              className="w-full h-16 flex justify-center items-center  text-lg font-semibold rounded-lg  "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Return to cart
            </Link>
            <p className="text-center">
              By checking the sign-up box for text message offers and clicking
              Continue to shipping, I consent to receive recurring automated
              marketing text messages from www.manikondamart.com at the number
              provided, and I agree that texts may be sent using an auto dialer
              or other technology. Consent is not a condition of purchase. Text
              STOP to cancel, HELP for help. Message and Data rates may apply.
              For more information see Terms of Service & Privacy Policy.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PaymentScreen;

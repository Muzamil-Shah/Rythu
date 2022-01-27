import React, { useState } from "react";
import { Link } from "react-router-dom";
import Checkout from "../components/Checkout";
import img from "./logo.png";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../redux/actions/cartAction";
import {FaOpencart} from "react-icons/fa"
import {IoIosArrowDropdown, IoIosArrowDropup} from "react-icons/io"

function ShippingScreen(props) {
  const carts = useSelector((state) => state.carts);
  const { cartItems, informationAddress, shippingAddress } = carts;
  const [show, setShow] = useState(false);
  const [go, setGo] = useState(false);

  const [getData, setGetData] = useState({
    contact: informationAddress.contact,
    shipIn:
      informationAddress.address +
      "," +
      informationAddress.nearTO +
      "," +
      informationAddress.pinCode +
      "," +
      informationAddress.city +
      "," +
      informationAddress.state +
      "," +
      informationAddress.country,
    free: shippingAddress.free,
    instraction: shippingAddress.instraction,
    phone: informationAddress.phone,
  });
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress(getData));
    props.history.push("/checkouts/payment");
  };

  return (
    <div className="container mx-auto flex flex-col justify-start items-center space-y-3 text-gray-600">
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
        <span className="text-sm md:text-xl font-bold mr-2">
          &#x20B9; {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}.00
        </span>
      </div>
      <div className={show ? "container bg-gray-100" : "hidden"}>
        <div className="w-full flex flex-col justify-start items-start">
          {cartItems.map((item) => (
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
              &#x20B9; {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}.00
            </strong>
          </div>
          <div className="w-full flex justify-between items-center px-2">
            <span>Total items:</span>
            <strong> {cartItems.length}</strong>
          </div>
        </div>
      </div>
      <Checkout green1 green2 step3 />
      <form onSubmit={submitHandler}>
        <div className="w-full py-2 flex flex-col justify-center items-center space-y-3">
          <div className="relative w-full border py-5 focus-within:border-lime-500">
            <label
              className={
                go
                  ? "absolute top-3 text-lg ml-2 z-10"
                  : "absolute top-0 ml-2 z-10 text-sm"
              }
            >
              Contact{" "}
            </label>
            <input
              value={getData.contact}
              onChange={(e) =>
                setGetData({ ...getData, contact: e.target.value })
              }
              className="relative w-11/12  top-0 ml-2  font-semibold focus:outline-none"
            />
          </div>
          <div className="relative w-full border py-5 focus-within:border-lime-500">
            <label
              className={
                go
                  ? "absolute top-3 text-lg ml-2 z-10"
                  : "absolute top-0 ml-2 z-10 text-sm"
              }
            >
              Ship in
            </label>
            <input
              value={getData.shipIn}
              onChange={(e) =>
                setGetData({ ...getData, shipIn: e.target.value })
              }
              className="relative w-11/12  top-0 ml-2  font-semibold focus:outline-none"
            />
          </div>
        </div>
        <div className="w-full space-y-6">
          <h3 className="text-lg md:text-2xl ">Shipping method</h3>
          <div className="w-full border flex flex-col justify-center item-start bg-gray-200">
            <div className="w-full  py-4 flex justify-between items-center space-x-3">
              <div className="flex justify-center items-center">
                <input
                  checked
                  value={getData.free}
                  onChange={(e) =>
                    setGetData({ ...getData, free: e.target.value })
                  }
                  className="w-6 h-6 ml-2"
                  type="radio"
                />
                <div className="flex flex-col justify-center items-start ml-2">
                  <p>Local delivery</p>
                  <p>Free Home Delivery on orders, No minimum order value.</p>
                </div>
              </div>
              <h3 className="text-lg font-semibold pr-2">Free</h3>
            </div>
          </div>
          <div className="relative w-full border py-5 focus-within:border-lime-500">
            <label
              className={
                go
                  ? "absolute top-5 text-lg ml-20 z-10"
                  : "absolute top-0 ml-2 z-10 text-sm"
              }
            >
              Mobile phone number
            </label>
            <div className="relative w-full flex justify-start items-center ">
              <PhoneInput
                inputStyle={{ width: "80px" }}
                country={"in"}
                // onClick={() => setGo(!go)}
                // className="relative  top-0 ml-2 bg-gray-500  font-semibold focus:outline-none"
              />
              <input
                required
                value={getData.phone}
                onChange={(e) =>
                  setGetData({ ...getData, phone: e.target.value })
                }
                className="absolute left-20 -top-1 py-2 w-full  text-lg ml-2  font-semibold focus:outline-none"
                type="number"
                min="1000000000"
                max="9999999999"
              />
            </div>
          </div>
          <p>We may use this number to call or text you about your delivery.</p>
          <div className="relative w-full border py-5 focus-within:border-lime-500">
            <label
              className={
                go
                  ? "absolute top-3 text-lg ml-2 z-10"
                  : "absolute top-0 ml-2 z-10 text-sm"
              }
            >
              Delivery instruction (optional)
            </label>
            <input
              v
              value={getData.instraction}
              onChange={(e) =>
                setGetData({ ...getData, instraction: e.target.value })
              }
              className="relative w-11/12  top-0 ml-2  font-semibold focus:outline-none"
            />
          </div>
          <p className="py-4">
            Enter necessary information like door codes or package drop-off
            instruction.
          </p>
        </div>
        <div className="w-full space-y-6">
          <button
            className="w-full h-16 text-white text-lg font-semibold rounded-lg bg-gray-900 "
            type="submit"
          >
            Continue to shipping
          </button>
          <Link
            to="/carts"
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
            provided, and I agree that texts may be sent using an auto dialer or
            other technology. Consent is not a condition of purchase. Text STOP
            to cancel, HELP for help. Message and Data rates may apply. For more
            information see Terms of Service & Privacy Policy.
          </p>
        </div>
      </form>
    </div>
  );
}

export default ShippingScreen;

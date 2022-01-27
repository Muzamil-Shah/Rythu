import React, { useState } from "react";
import { Link } from "react-router-dom";
import Checkout from "../components/Checkout";
import img from "./logo.png";
import states from "../states";
import { useDispatch, useSelector } from "react-redux";
import { saveInformationAddress } from "../redux/actions/cartAction";
import {FaOpencart} from "react-icons/fa"
import {IoIosArrowDropdown, IoIosArrowDropup} from "react-icons/io"
import {MdOutlineLocalShipping} from "react-icons/md"
import {BiBuildingHouse} from "react-icons/bi"

function InformationScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const carts = useSelector((state) => state.carts);
  const { cartItems, informationAddress } = carts;
  if (!userInfo) {
    props.history.push("/signin");
  }
  const [show, setShow] = useState(false);
  const [go, setGo] = useState(false);

  const [getData, setGetData] = useState({
    contact: userInfo.email,
    deliverymethod: informationAddress.deliverymethod,
    firstName: informationAddress.firstName,
    lastName: informationAddress.lastName,
    address: informationAddress.address,
    nearTO: informationAddress.nearTo,
    city: informationAddress.city,
    country: informationAddress.country,
    state: informationAddress.state,
    pinCode: informationAddress.pinCode,
    phone: informationAddress.phone,
    save: "true",
  });
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveInformationAddress(getData));
    props.history.push("/checkouts/shipping");
  };
  return (
    <div className="container px-2 mx-auto flex flex-col justify-start items-center space-y-3 text-gray-600">
      <img className="w-1/6 h-auto" src={img} alt="logo" />
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
        <span className="text-sm md:text-xl font-bold mr-2">
          &#x20B9; {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}.00
        </span>
      </div>
      <div className={show ? "container bg-gray-100" : "hidden"}>
        <div className="w-full flex flex-col justify-start items-start">
          {cartItems.map((item) => (
            <div className="w-full h-44 border-b  px-2 flex justify-between items-center">
              <div className="md:w-32 md:h-32 w-20 h-24 rounded-lg border-4 border-white ">
                <img
                  className="w-full  h-full object-cover rounded-lg"
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
              &#x20B9; {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}.00
            </strong>
          </div>
          <div className="w-full flex justify-between items-center px-2">
            <span>Total items:</span>
            <strong> {cartItems.length}</strong>
          </div>
        </div>
      </div>
      <Checkout green1 step2 />
      <div className="w-full py-2 flex flex-col justify-center items-center space-y-3">
        <div className="w-full py-2 flex justify-between items-center">
          <h3 className="text-sm md:text-2xl  ">Contact information</h3>
          <p className="text-sm md:text-lg">
            Already have an account?{" "}
            <Link className="text-red-500" to="/sigin">
              Log in
            </Link>
          </p>
        </div>
        <div className="relative w-full border py-5 focus-within:border-gray-900">
          <label
            className={
              !go
                ? "absolute top-3 text-lg ml-2 z-10 py-1 bg-white"
                : "absolute top-0 ml-2 z-10 text-sm"
            }
          >
            Email or mobile phone number
          </label>
          <input
            name="contact"
            id="contact"
            required
            value={userInfo.email}
            onClick={() => setGo(!go)}
            className="relative w-11/12  top-0 ml-2  font-semibold focus:outline-none"
          />
        </div>
        <span className="w-full text-lg text-gray-600 space-x-3 flex justify-start items-center">
          <input
            checked
            className="w-5 h-5 mr-2 focus:outline-none"
            type="checkbox"
          />{" "}
          Sign up for exclusive offers and news via text message & email.
        </span>
      </div>
      <form onSubmit={submitHandler}>
        <div className="w-full space-y-6 ">
          <h3 className="text-2xl ">Delivery method</h3>
          <div className="w-full border flex flex-col justify-center item-start">
            <div className="w-full  py-4 flex justify-start items-center space-x-3">
              <input
                className="w-6 h-6 ml-2 "
                name="deliverymethod"
                checked
                value="ship"
                onChange={(e) =>
                  setGetData({ ...getData, deliverymethod: e.target.value })
                }
                type="radio"
              />
              < MdOutlineLocalShipping className="w-6 h-6"/>
              <p>Ship</p>
            </div>
            <div className="w-full border-t py-4 flex justify-start items-center space-x-3">
              <input
                className="w-6 h-6 ml-2"
                name="deliverymethod"
                value="pickup"
                onChange={(e) =>
                  setGetData({ ...getData, deliverymethod: e.target.value })
                }
                type="radio"
              />
              <BiBuildingHouse className="w-6 h-6"/>
              <p>Pick up</p>
            </div>
          </div>
        </div>
        <div className="w-full space-y-6">
          <h3 className="text-2xl ">Shipping address</h3>
          <div className="relative w-full border py-5 focus-within:border-lime-500">
            <label
              className={
                !go
                  ? "absolute top-3 text-lg ml-2 z-10 py-1 bg-white"
                  : "absolute top-0 ml-2 z-10 text-sm"
              }
            >
              First name
            </label>
            <input
              name="firstname"
              id="firstname"
              required
              type="text"
              value={getData.firstName}
              onChange={(e) =>
                setGetData({ ...getData, firstName: e.target.value })
              }
              className="relative w-11/12  top-0 ml-2  font-semibold focus:outline-none"
            />
          </div>
          <div className="relative w-full border py-5 focus-within:border-lime-500">
            <label
              className={
                !go
                  ? "absolute top-3 text-lg ml-2 z-10 py-1 bg-white"
                  : "absolute top-0 ml-2 z-10 text-sm"
              }
            >
              Last name
            </label>
            <input
              name="lastname"
              id="lastname"
              required
              type="text"
              value={getData.lastName}
              onChange={(e) =>
                setGetData({ ...getData, lastName: e.target.value })
              }
              className="relative w-11/12  top-0 ml-2  font-semibold focus:outline-none"
            />
          </div>
          <div className="relative w-full border py-5 focus-within:border-lime-500">
            <label
              className={
                !go
                  ? "absolute top-3 text-lg ml-2 z-10 py-1 bg-white"
                  : "absolute top-0 ml-2 z-10 text-sm"
              }
            >
              Address
            </label>
            <input
              name="address"
              id="address"
              required
              type="text"
              value={getData.address}
              onChange={(e) =>
                setGetData({ ...getData, address: e.target.value })
              }
              className="relative w-11/12  top-0 ml-2  font-semibold focus:outline-none"
            />
          </div>
          <div className="relative w-full border py-5 focus-within:border-lime-500">
            <label
              className={
                !go
                  ? "absolute top-3 text-lg ml-2 z-10 py-1 bg-white"
                  : "absolute top-0 ml-2 z-10 text-sm"
              }
            >
              Shop, suite, etc
            </label>
            <input
              name="nearto"
              id="nearto"
              required
              type="text"
              value={getData.nearTo}
              onChange={(e) =>
                setGetData({ ...getData, nearTo: e.target.value })
              }
              className="relative w-11/12  top-0 ml-2  font-semibold focus:outline-none"
            />
          </div>
          <div className="relative w-full border py-5 focus-within:border-lime-500">
            <label
              className={
                !go
                  ? "absolute top-3 text-lg ml-2 z-10 py-1 bg-white"
                  : "absolute top-0 ml-2 z-10 text-sm"
              }
            >
              City
            </label>
            <input
              name="city"
              id="city"
              required
              type="text"
              value={getData.city}
              onChange={(e) => setGetData({ ...getData, city: e.target.value })}
              className="relative w-11/12  top-0 ml-2  font-semibold focus:outline-none"
            />
          </div>
          <div className="relative w-full border py-5 focus-within:border-lime-500">
            <label
              className={
                !go
                  ? "absolute top-3 text-lg ml-2 z-10 py-1 bg-white"
                  : "absolute top-0 ml-2 z-10 text-sm"
              }
            >
              Country/Region
            </label>
            <select
              name="country"
              id="country"
              type="text"
              required
              value={getData.country}
              onChange={(e) =>
                setGetData({ ...getData, country: e.target.value })
              }
              className="relative w-11/12  top-0 ml-2  font-semibold focus:outline-none"
            >
              <option value=""></option>
              <option value="india">India</option>
            </select>
          </div>
          <div className="relative w-full border py-5 focus-within:border-lime-500">
            <label
              className={
                !go
                  ? "absolute top-3 text-lg ml-2 z-10 py-1 bg-white"
                  : "absolute top-0 ml-2 z-10 text-sm"
              }
            >
              State
            </label>
            <select
              name="state"
              id="state"
              type="text"
              required
              value={getData.state}
              onChange={(e) =>
                setGetData({ ...getData, state: e.target.value })
              }
              className="relative w-11/12  top-0 ml-2  font-semibold focus:outline-none"
            >
              {states.map((state) => (
                <>
                  <option key={state.key} value={state.name}>
                    {state.name}
                  </option>
                  ;
                </>
              ))}
            </select>
          </div>
          <div className="relative w-full border py-5 focus-within:border-lime-500">
            <label
              className={
                !go
                  ? "absolute top-3 text-lg ml-2 z-10 py-1 bg-white"
                  : "absolute top-0 ml-2 z-10 text-sm"
              }
            >
              PIN code
            </label>
            <input
              name="pincode"
              id="pincode"
              required
              type="text"
              value={getData.pinCode}
              onChange={(e) =>
                setGetData({ ...getData, pinCode: e.target.value })
              }
              type="Number"
              className="relative w-11/12  top-0 ml-2  font-semibold focus:outline-none"
            />
          </div>
          <div className="relative w-full border py-5 focus-within:border-lime-500">
            <label
              className={
                !go
                  ? "absolute top-3 text-lg ml-2 z-10 py-1 bg-white"
                  : "absolute top-0 ml-2 z-10 text-sm"
              }
            >
              Phone number for update and exclusive offers
            </label>
            <input
              name="phone"
              id="phone"
              type="text"
              value={getData.phone}
              onChange={(e) =>
                setGetData({ ...getData, phone: e.target.value })
              }
              type="Number"
              className="relative w-11/12  top-0 ml-2  font-semibold focus:outline-none"
            />
          </div>
          <span className="w-full text-lg text-gray-600 space-x-3 flex justify-start items-center">
            <input
              className="w-5 h-5 mr-2 focus:outline-none"
              type="checkbox"
            />{" "}
            Save this information for next time
          </span>
          <button
            className="w-full h-16 text-white text-lg font-semibold rounded-lg bg-gray-900 "
            type="submit"
          >
            Continue to shipping
          </button>

          <Link
            to="/"
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

export default InformationScreen;

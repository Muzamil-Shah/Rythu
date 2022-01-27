import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../redux/actions/cartAction";
import {MdDeleteOutline} from 'react-icons/md'
import {RiCloseCircleFill} from "react-icons/ri"

function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 2;
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.carts);
  const { cartItems } = carts;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkOutHandler = () => {
    props.history.push("/signin?redirect=/checkouts/information");
  };
  const closeHandler = () => {
    props.history.push("/");
  };
  return (
    <div className="w-full h-screen bg-gray-50 flex flex-col justify-start items-center">
      {cartItems.length === 0 ? (
        <div className="w-full h-screen space-y-5 flex flex-col justify-center items-center">
          <h3 className="text-2xl md:text-6xl shadow-2xl bg-white px-4 py-4 rounded-lg">
            Cart is empty
          </h3>
          <Link
            className="py-1 text-xl  px-3 rounded-2xl text-white bg-lime-900"
            to="/"
          >
            Go Home
          </Link>
        </div>
      ) : (
        <>
          <div className="bg-white mt-2 rounded-full text-gray-900 border border-red-500 hover:bg-red-500 hover:border-white hover:text-white">
            {/* <svg
              onClick={closeHandler}
              className="w-9   "
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg> */}
            < RiCloseCircleFill onClick={closeHandler}
              className="w-9 h-9  "/>
          </div>
          <div className="w-full h-5/6 mb-4">
            {cartItems.map((item) => (
              <div
                key={item.product}
                className="w-11/12 mx-auto my-4 bg-white  rounded-3xl  h-28 text-gray-800 mybg
                 shadow-xl flex justify-between  items-center "
              >
                <div
                  className="w-16 h-20 md:h-24 ml-3 rounded overflow-hidden
                "
                >
                  <img
                    className="w-16 h-20 md:h-24 "
                    src={item.image}
                    alt="cat"
                  />
                </div>
                <div className="flex flex-col text-center p-2 capitalize">
                  <h1 className="text-sm font-header">{item.name}</h1>
                  <h3 className="text-xs ">&#x20B9; {item.price}/kg</h3>
                </div>
                <div className="">
                  {/* <button className="border w-8 ">-</button>
                <input
                  className="text-center w-20"
                  type="text"
                  disabled
                  value="25"
                />
                <button className="border w-8 ">+</button> */}
                  {/* <select
                    value={item.qty}
                    onChange={(e) =>
                      dispatch(addToCart(item.product, Number(e.target.value)))
                    }
                  >
                    {[...Array(item.orderLimit).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select> */}
                  {/* <button
                    // onClick={decrease}
                    className={
                      item.qty >= item.orderLimit ? "border w-8 " : "hidden"
                    }
                  >
                    -
                  </button> */}
                  <input
                    className="text-center w-10 md:w-20"
                    type="text"
                    disabled
                    value={item.qty}
                  />
                  {/* <button
                    // onClick={increase}
                    className="border w-8 "
                  >
                    +
                  </button> */}
                </div>
                <div className="flex flex-col text-center p-2 capitalize">
                  <h3 className="text-xs ">
                    &#x20B9; {item.price * item.qty}.00
                  </h3>
                </div>
                <div className="text-sm mr-3">
                  <button
                    className="bg-red-400 text-white rounded-lg  px-2 p-1"
                    type="button"
                    onClick={() => removeFromCartHandler(item.product)}
                  >
                    <MdDeleteOutline className="w-8 h-10"/>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="w-5/6 h-3/6 rounded-t-2xl shadow-2xl  bg-white flex flex-col justify-between items-center">
            <h3 className="text-xl md:text-2xl font-bold mt-4">
              Here Your Cart Summery
            </h3>
            <div className="flex flex-col justify-between items-center space-y-3 text-sm md:text-xl">
              <p className="font-bold">
                Items Total ({cartItems.reduce((a, c) => a + c.qty, 0)} items) :
                &#x20B9; {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}.00{" "}
              </p>
              <p className="font-semibold">Tax & Delivery &#x20B9; 0.00</p>
              <h3 className="font-extrabold text-lg md:text-xl">
                Total Amount &#x20B9;{" "}
                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}.00
              </h3>
            </div>
            <button
              onClick={checkOutHandler}
              className="w-full h-10 bg-gray-900 text-white text-lg font-semibold"
            >
              Proceed To Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartScreen;

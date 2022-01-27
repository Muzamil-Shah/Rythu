import React from "react";

function Cart(props) {
  const { cart, setCart } = props;
  return (
    <div className="w-full h-screen bg-gray-50 flex flex-col justify-start items-center">
      <div className="bg-white mt-2 rounded-full p-2 text-lime-500 border border-lime-500 hover:bg-lime-500 hover:border-white hover:text-white">
        <svg
          onClick={() => setCart(!cart)}
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
        </svg>
      </div>
      <div className="w-full h-5/6 mb-4">
        <div
          className="w-11/12 mx-auto my-4  rounded-3xl  h-28 text-gray-800 mybg
                 shadow-xl flex justify-between  items-center "
        >
          <div
            className="w-16 h-24 ml-3 rounded shadow-md overflow-hidden
                  border border-gray-900"
          >
            <img
              className="w-full h-full object-cover"
              src="./img/tomato.js"
              alt="cat"
            />
          </div>
          <div className="flex flex-col text-center p-2 capitalize">
            <h1 className="text-sm font-header">Tomato</h1>
            <h3 className="text-xs ">&#x20B9; 20/kg</h3>
          </div>
          <div className="">
            <button className="border w-8 ">-</button>
            <input
              className="text-center w-20"
              type="text"
              disabled
              value="25"
            />
            <button className="border w-8 ">+</button>
          </div>
          <div className="text-sm mr-3">
            <button
              className="bg-red-400 text-white rounded-lg p-1 px-2"
              type="button"
              // onClick={() => removeFromCartHandler(item.book)}
            >
              Delete
            </button>
          </div>
        </div>
        <div
          className="w-11/12 mx-auto my-4  rounded-3xl  h-28 text-gray-800 mybg
                 shadow-xl flex justify-between  items-center "
        >
          <div
            className="w-16 h-24 ml-3 rounded shadow-md overflow-hidden
                  border border-gray-900"
          >
            <img
              className="w-full h-full object-cover"
              src="./img/tomato.js"
              alt="cat"
            />
          </div>
          <div className="flex flex-col text-center p-2 capitalize">
            <h1 className="text-sm font-header">Tomato</h1>
            <h3 className="text-xs ">&#x20B9; 20/kg</h3>
          </div>
          <div className="">
            <button className="border w-8 ">-</button>
            <input
              className="text-center w-20"
              type="text"
              disabled
              value="25"
            />
            <button className="border w-8 ">+</button>
          </div>
          <div className="text-sm mr-3">
            <button
              className="bg-red-400 text-white rounded-lg p-1 px-2"
              type="button"
              // onClick={() => removeFromCartHandler(item.book)}
            >
              Delete
            </button>
          </div>
        </div>
        <div
          className="w-11/12 mx-auto my-4  rounded-3xl  h-28 text-gray-800 mybg
                 shadow-xl flex justify-between  items-center "
        >
          <div
            className="w-16 h-24 ml-3 rounded shadow-md overflow-hidden
                  border border-gray-900"
          >
            <img
              className="w-full h-full object-cover"
              src="./img/tomato.js"
              alt="cat"
            />
          </div>
          <div className="flex flex-col text-center p-2 capitalize">
            <h1 className="text-sm font-header">Tomato</h1>
            <h3 className="text-xs ">&#x20B9; 20/kg</h3>
          </div>
          <div className="">
            <button className="border w-8 ">-</button>
            <input
              className="text-center w-20"
              type="text"
              disabled
              value="25"
            />
            <button className="border w-8 ">+</button>
          </div>
          <div className="text-sm mr-3">
            <button
              className="bg-red-400 text-white rounded-lg p-1 px-2"
              type="button"
              // onClick={() => removeFromCartHandler(item.book)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <div className="w-5/6 h-3/6 rounded-t-2xl shadow-2xl  bg-white flex flex-col justify-between items-center">
        <h3 className="text-2xl font-bold mt-4">Here Your Cart Summery</h3>
        <div className="flex flex-col justify-between items-center space-y-3 text-xl">
            <p className="font-bold">Items Total &#x20B9; 5000.00</p>
            <p className="font-semibold">Tax & Delivery &#x20B9; 0.00</p>
            <h3 className="font-extrabold text-xl">Total Amount &#x20B9; 5000.00</h3>
        </div>
        <button className="w-full h-10 bg-lime-500 text-lg font-semibold">Proceed To Checkout</button>
      </div>
    </div>
  );
}

export default Cart;

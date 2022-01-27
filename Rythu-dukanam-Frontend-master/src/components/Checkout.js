import React from "react";

function Checkout(props) {
  return (
    <div className="container py-2 text-sm md:text-lg flex justify-around items-center ">
      <span
        className={
          props.step1 ? "font-semibold" : props.green1 ? "text-gray-900" : ""
        }
      >
        Cart
      </span>
      <span>
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
            d="M9 5l7 7-7 7"
          />
        </svg>
      </span>
      <span
        className={
          props.step2 ? "font-semibold" : props.green2 ? "text-gray-900" : ""
        }
      >
        Information
      </span>
      <span>
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
            d="M9 5l7 7-7 7"
          />
        </svg>
      </span>
      <span
        className={
          props.step3 ? "font-semibold" : props.green3 ? "text-gray-900" : ""
        }
      >
        Shipping
      </span>
      <span>
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
            d="M9 5l7 7-7 7"
          />
        </svg>
      </span>
      <span
        className={
          props.step4 ? "font-semibold" : props.green ? "text-gray-900" : ""
        }
      >
        Payment
      </span>
      <span>
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
            d="M9 5l7 7-7 7"
          />
        </svg>
      </span>
    </div>
  );
}

export default Checkout;

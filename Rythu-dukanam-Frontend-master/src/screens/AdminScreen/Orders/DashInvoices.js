import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../../../components/LoadingBox";
import MessageBox from "../../../components/MessageBox";
import { allOrders } from "../../../redux/actions/orderAction";

import Row from "../../../components/row";

function DashInvoices() {
  const dispatch = useDispatch();
  const ordersAll = useSelector((state) => state.ordersAll);
  const { error, loading, orders } = ordersAll;

  useEffect(() => {
    dispatch(allOrders());
  }, []);
  return (
    <div className="w-full ml-16 mt-14 lg:w-full   flex flex-col justify-start items-start  bg-transparent text-coolGray-800 ">
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <div className="w-full flex justify-between items-center bg-gray-50 p-3">
            <div className="flex justify-center items-center">
              <input
                className="w-72 rounded-lg border py-2 text-center text-xl"
                type="date"
                //   placeholder="search"
              />
              <input
                className="w-72 rounded-lg border py-2 text-center text-xl"
                type="date"
                //   placeholder="search"
              />
            </div>

            <div className="flex justify-center items-center space-x-2 text-purple-500 font-bold ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                  clip-rule="evenodd"
                />
              </svg>
              <li>ADD FILTER</li>
            </div>
          </div>

          <table className="w-full  table-auto">
            <thead className="w-full border bg-gray-50">
              <tr className="w-full ">
                <th className="border py-2">
                  <input className="w-5 h-5" type="checkbox" />
                </th>
                <th className="border py-2">Id</th>
                <th className="border py-2">Invoice date</th>
                <th className="border py-2">Customer</th>
                <th className="border py-2">Address</th>
                <th className="border py-2">Order</th>
                <th className="border py-2">Total ex taxes</th>
                <th className="border py-2">Delivery fees</th>
                <th className="border py-2">Taxes</th>
                <th className="border py-2">Total</th>
              </tr>
            </thead>
            <tbody className="relative w-full border">
              {orders.reverse().map((order, index) => (
                <Row order={order} orders={orders} id={index} />
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default DashInvoices;

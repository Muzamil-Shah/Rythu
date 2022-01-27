import React, { useEffect, useState } from "react";
import { Link, Route } from "react-router-dom";
import img from "../logo.png";
import DashCreate from "./Products/DashCreate";
import DashCustomer from "./DashCustomer";

import DashHome from "./DashHome";
import DashInvoices from "./Orders/DashInvoices";
import DashOrders from "./Orders/DashOrders";
import DashProduct from "./Products/DashProduct";
import DashUpdate from "./Products/DashUpdate";
import DashOrderUpdate from "./Orders/DashOrderUpdate";
import UpdateCustomer from "./Customer/UpdateCustomer";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser } from "../../redux/actions/userAction";
import AdminRouter from "../../components/AdminRouter";
import {FaUserTie,FaServicestack,FaOpencart} from "react-icons/fa";
import {GoHome} from "react-icons/go"
import {BsCartPlus, BsStackOverflow} from "react-icons/bs"
import { HiOutlineUserGroup } from "react-icons/hi";



function DashboardScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;
  // if (userInfo.isAdmin === false) {
  //   props.history.push("/");
  // }
  const [nav, setNav] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsUser(userInfo._id));
  }, [userInfo._id]);

  return (
    <div className="w-full bg-white flex flex-col  justify-start items-center">
      <header className="fixed top-0 left-0 z-50 min-w-full h-14 bg-gray-900 text-white flex justify-between items-center ">
          <div className="w-4/12 py-1   flex justify-start items-center">
            <Link to="/admin/dashboard/">
            <div className="  py-1  flex justify-start items-center space-x-1  hover:bg-gray-200">
              <GoHome className="w-8 h-8 ml-3" />
              <h3 className="text-lg font-bold ">Dashboard</h3>
            </div>
          </Link></div>
        <div className="w-4/12 py-1   flex justify-center items-center">
          <Link to="/">
            <img className="w-20" src={img} />
          </Link>
        </div>
        {userInfo && user ? (
          <div className="w-4/12 py-1 mr-2  flex justify-end items-center space-x-1">
            {user.profile.img !== "" ? (
              <img
                className="h-8 w-8  text-lime-500 bg-lime-200  rounded-full "
                src={user.profile.img}
              />
            ) : (
              <FaUserTie className="h-8 w-8  text-gray-900 bg-white  rounded-full "/>
            )}

            <h3 className="font-bold text-lg md:text-xl">
              {user.profile.firstname + " " + user.profile.lastname}
            </h3>
          </div>
        ) : (
          ""
        )}
      </header>
      <div className="w-full flex  bg-white">
        <nav
          className= " fixed z-50 top-14   bg-gray-900  h-screen  text-white   flex flex-col space-y-7 justify-start iter  overflow-hidden"
          // className={
          //   !nav
          //     ? " absolute z-50 w-0 md:w-14  bg-white  h-screen  text-lime-500   flex flex-col space-y-7 justify-start items-start px-1  overflow-hidden"
          //     : "absolute z-50 bg-white w-44 h-screen  text-lime-500   flex flex-col space-y-7 justify-start items-start px-1  overflow-hidden"
          // }
          onClick={() => setNav(!nav)}
        >
          
          <Link to="/admin/dashboard/orders">
            <div className="    py-1  flex flex-col justify-start items-center  hover:bg-gray-200">
              <FaOpencart className="w-8 h-8" />
              <h3 className="text-xs font-bold ">Orders</h3>
            </div>
          </Link>
          <Link to="/admin/dashboard/invoices">
            <div className="    py-1  flex flex-col justify-start items-center  hover:bg-gray-200">
              <FaServicestack className="w-8 h-8 " />

              <h3 className="text-xs font-bold ">Invoices</h3>
            </div>
          </Link>
          <Link to="/admin/dashboard/products">
            <div className="   py-1  flex flex-col justify-start items-center   hover:bg-gray-200">
              <BsStackOverflow className="w-8 h-8 " />
              <h3 className="text-xs font-bold ">Products</h3>
            </div>
          </Link>
          <Link to="/admin/dashboard/customers">
            <div className="  py-1  flex flex-col justify-start items-center     hover:bg-gray-200">
             <HiOutlineUserGroup className="w-8 h-8 "/>
              <h3 className="text-xs font-bold  px-1 py-1">Customer</h3>
            </div>
          </Link>

          {/* <div className=" w-36 rounded-r-lg py-1  flex justify-start items-center space-x-3    rounded-xl ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 ml-1 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <h3 className="text-lg font-bold bg-white px-1 py-1 rounded-xl">
              Logout
            </h3>
          </div> */}
        </nav>
        
        <>
          <AdminRouter
            path="/admin/dashboard/customers"
            component={DashCustomer}
          />
          <AdminRouter
            path="/admin/dashboard/customer/:id"
            component={UpdateCustomer}
          />
          <AdminRouter path="/admin/dashboard/orders" component={DashOrders} />
          <AdminRouter
            path="/admin/dashboard/products"
            component={DashProduct}
          />
          <AdminRouter
            path="/admin/dashboard/invoices"
            component={DashInvoices}
          />
          <AdminRouter
            path="/admin/dashboard/order/update/:id"
            component={DashOrderUpdate}
          />
          <AdminRouter
            path="/admin/dashboard/product/create"
            component={DashCreate}
          />
          <AdminRouter
            path="/admin/dashboard/product/update/:id"
            component={DashUpdate}
          />
          <AdminRouter path="/admin/dashboard/" exact component={DashHome} />
          </> 
        
      </div>
    </div>
  );
}

export default DashboardScreen;

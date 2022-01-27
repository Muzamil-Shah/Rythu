import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { siginout } from "../redux/actions/userAction";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";
import {RiUser6Line, RiLogoutCircleLine,RiCloseCircleFill} from "react-icons/ri"
import {FaOpencart} from "react-icons/fa"
import {CgMenuGridO} from "react-icons/cg";
import {IoIosArrowForward} from "react-icons/io";
import {MdOutlinePrivacyTip} from "react-icons/md"
import {SiAboutdotme} from "react-icons/si"
import {BsCardChecklist, BsStackOverflow } from "react-icons/bs"

function Header(props) {
  const [nav, setNav] = useState(false);
  const { cartItems, userInfo, user, userLoading, userError } = props;

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(siginout());
  };

  return (
    <>
      <header className="w-full h-16 bg-white flex justify-between items-center overflow-hidden">
        <div className="w-3/12 flex justify-start items-center py-4">
          {/* <svg
            onClick={() => setNav(!nav)}
            className=" w-8 h-8 ml-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg> */}
          <CgMenuGridO onClick={() => setNav(!nav)}
            className=" w-8 h-8 ml-2" />
        </div>
        <div className="w-6/12 py-1   flex justify-center items-center">
          <Link to="/">
            <img className="w-20" src="./img/logo.png" alt="logo" />
          </Link>
        </div>
        <div className="relative w-3/12 h-16 flex justify-end items-center py-4 space-x-3 px-2">
          <Link to="/cart" className="relative">
            
            <FaOpencart className={
                cartItems.length > 0
                  ? "h-8 w-8 text-gray-900"
                  : "w-8 h-8 text-red-500"
              }/>
            {cartItems.length > 0 && (
              <>
                <span className="absolute animate-ping -top-2 right-1 rounded-full text-xs w-3 h-3 bg-red-500 text-center"></span>
                <span className="absolute text-xs -top-3 right-2 text-gray-900">
                  {cartItems.length}
                </span>
              </>
            )}
          </Link>
          <Link to="/signin" onClick={signoutHandler}>
           
            <RiUser6Line className={
                userInfo ? "w-8 h-8 text-gray-900 " : "w-8 h-8  text-red-500"
              }/>
          </Link>
        </div>
      </header>
      {userLoading ? (
        <LoadingBox />
      ) : userError ? (
        <MessageBox variant="danger">{userError}</MessageBox>
      ) : (
        <nav
          className={
            nav
              ? "bg-gray-50 fixed top-0 left-0 w-6/12 md:w-4/12 h-screen  z-10 flex flex-col justify-start items-center space-y-3"
              : "hidden"
          }
        >
          <div className="w-full p-2 border-b flex justify-between items-center">
            <img className="w-16" src="../../public/img/logo.png" alt="logo" />
            
            <RiCloseCircleFill onClick={() => setNav(!nav)}
              className="w-9 h-9 ml-auto pt-2 " />
          </div>
          <div className="w-full flex flex-col justify-center items-center space-y-3">
            {user ? (
              <img
                className="rounded-full w-32 h-32 mb-3"
                src={user.profile.img}
                alt="user"
              />
            ) : (
              <RiUser6Line className="rounded-full w-24 h-24 mb-1"/>
            )}
            {user ? (
              <h3 className="text-xl font-bold shadow-inner px-3">
                {user.profile.firstname + " " + user.profile.lastname}
              </h3>
            ) : (
              <h3 className="text-xl  font-bold">User Name</h3>
            )}
            <Link
              to="/customer/profile"
              className="bg-gray-900 font-semibold text-white py-1 px-3 rounded capitalize"
            >
              Edit Profile
            </Link>
            <Link
              to="/customer/orders"
              className="w-full pt-4 pl-2  flex justify-between items-center text-xl  hover:border-lime-500  hover:text-lime-500"
            >
              <li className="w-full    flex justify-between items-center text-xl  hover:border-lime-500  hover:text-lime-500">
                <div className="flex justify-start items-center gap-2">
                <BsCardChecklist />
                My Orders{" "}
                </div>
                <IoIosArrowForward  className="w-4" />
                
              </li>
            </Link>
          </div>
          <li className="w-full  pl-2  flex justify-between items-center text-xl  hover:border-lime-500  hover:text-lime-500">
          <div className="flex justify-start items-center gap-2">
                <BsStackOverflow />
                Products{" "}
                </div>
                <IoIosArrowForward  className="w-4" />
          </li>
          <li className="w-full  pl-2  flex justify-between items-center text-xl  hover:border-lime-500  hover:text-lime-500">
          <div className="flex justify-start items-center gap-2">
                <MdOutlinePrivacyTip />
                Privacy{" "}
                </div>
                <IoIosArrowForward  className="w-4" />
          </li>
          <li className="w-full pl-2 flex justify-between items-center text-xl  hover:border-lime-500  hover:text-lime-500">
          <div className="flex justify-start items-center gap-2">
                <SiAboutdotme />
                Terms{" "}
                </div>
                <IoIosArrowForward  className="w-4" />
          </li>

          <div className="w-full pl-2 flex justify-between items-center text-xl  hover:border-lime-500  hover:text-lime-500">
          <div className="flex justify-start items-center gap-2">
                <RiLogoutCircleLine />
                Logout{" "}
                </div>
                <IoIosArrowForward  className="w-4" />
          </div>
        </nav>
      )}
      {/* )}  */}
    </>
  );
}

export default Header;

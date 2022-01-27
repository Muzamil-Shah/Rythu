import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { siginout } from "../redux/actions/userAction";
import {RiUser6Line, RiLogoutCircleLine} from "react-icons/ri"
import {BsCardChecklist } from "react-icons/bs"

function ProfileHeader() {
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(siginout());
  };
  return (
    <nav className="w-full h-14  bg-gray-900 text-white flex justify-between items-center font-bold">
      <Link
        to="/customer/profile"
        className="h-14 px-4 flex  justify-center
                 items-center text-lg   hover:text-lime-500"
      >
        
        <RiUser6Line className="h-6 w-6 mr-2"/>
        Profile
      </Link>
      <Link
        to="/customer/orders"
        className="h-14 px-4 flex  justify-center
                 items-center text-lg   hover:text-lime-500"
      >
        <BsCardChecklist className="h-6 w-6 mr-2"/>
        My Orders
      </Link>
      <span
        onClick={signoutHandler}
        className="h-14 px-2 flex  justify-center
                 items-center text-lg  hover:text-lime-500"
      >
       <RiLogoutCircleLine className="h-6 w-6 mr-2"/>
        Log out
      </span>
    </nav>
  );
}

export default ProfileHeader;

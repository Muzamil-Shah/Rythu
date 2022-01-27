import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import ItemList from "../components/ItemList";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { detailsProduct, listProduct } from "../redux/actions/ProductAction";
import { detailsUser } from "../redux/actions/userAction";
import {MdOutlineArrowBack} from "react-icons/md";
import {GrMapLocation} from 'react-icons/gr'

function HomeScreen() {
  const [zoneLocation,setZoneLocation] = useState("");
  const [productId, setProductId] = useState("");
  const [category,setCategory] = useState([])
  const [hidden, setHidden] = useState(false);

  const dispatch = useDispatch();
  const productsList = useSelector((state) => state.productsList);
  const { loading, error, products } = productsList;

  const carts = useSelector((state) => state.carts);
  const { cartItems } = carts;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { error: userError, user } = userDetails;

  useEffect(() => {
    setHidden(false)
    dispatch(listProduct());
    dispatch(detailsProduct(productId));
    if (userInfo) {
      dispatch(detailsUser(userInfo._id));
    }
  }, [productId, userInfo]);

  const categoryHandler = (category,zoneLocation) => {
    
      const filterProduct = products.filter((product) => product.category === category && product.zone === zoneLocation)
      setCategory(filterProduct);

  }
  const submitALL = () =>{
    localStorage.setItem("zoneLocation", zoneLocation);
    setHidden(true)
  }

  const zone = localStorage.getItem("zoneLocation")
  
  
  

  return (
    <div className="w-full h-screen bg-gray-50">
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <Header
            userError={userError}
            user={user}
            cartItems={cartItems}
            userInfo={userInfo}
          />
          {hidden && (<MdOutlineArrowBack onClick={() => setHidden(false)} className="my-3 ml-2  justify-start " />)}
          <main className=" min-w-full min-h-screen    flex flex-col justify-start items-center space-y-3 ">
          {!hidden && (
            <>
              <div 
              className="absolute top-0 left-0 w-full opacity-20 h-screen bg-black flex flex-col justify-center items-center gap-2 space-y-3 p-2 overflow-hidden">
                </div>
                      <div className="absolute top-52 overflow-hidden flex flex-col justify-between items-start rounded-3xl w-2/3 h-2/4 bg-white opacity-100">
                        {zone === "" &&(
                          <div className="relative w-full border py-5 focus-within:border-gray-900 flex justify-start items-center">
                            <label
                              className="w-4/12 text-sm md:text-lg ml-2 gap-2 z-10 py-2.5 bg-white flex justify-center items-center "
                                
                              
                            >
                              <GrMapLocation className="w-8 h-8 text-gray-900"/> Zone Location 
                            </label>
                            <select
                              name="Zone"
                              id="Zone"
                              type="text"
                              value={zoneLocation}
                              onChange={(e) => setZoneLocation(e.target.value)}
                                
                              className=" w-10/12  mx-2 py-3  font-semibold focus:outline-none"
                            >
                              <option selected value="L.B.Nager">L.B.Nager</option>
                              <option value="Charminar">Charminar</option>
                              <option value="Khairatabad">Khairatabad</option>
                              <option value="Secunderabad">Secunderabad</option>
                              <option value="Serilingampally">Serilingampally</option>
                              <option value="Kukatpally">Kukatpally</option>
                            </select>
                        </div>
                        )}
                        <div className="w-full  flex justify-between items-center gap-2 p-2">
                          <div onClick={() => categoryHandler("foods",zoneLocation)} className="w-1/2 h-3/5 flex flex-col justify-center items-center gap-2 p-1 rounded-3xl border-2 hover:border-red-500 ">
                            <img className=" lg:w-full lg:h-full object-cover rounded-lg border-2 border-white shadow-lg cursor-pointer " src="./img/food.jpg" alt="food" />
                            <h3 className="text-3xl font-bold px-10 py-2    text-gray-900">Food</h3>
                          </div>
                          <div onClick={() => categoryHandler("vegetables",zoneLocation)} className="w-1/2 md:w-2/4 flex flex-col justify-center items-center gap-2 p-1 rounded-3xl border-2 hover:border-red-500 ">
                            <img className=" lg:w-full  lg:h-full object-cover rounded-lg border-2 border-white shadow-lg cursor-pointer " src="./img/veg.jpg" alt="vegetable" />
                            <h3 className="text-3xl font-bold px-10 py-2    text-gray-900  ">vegetables</h3>
                          </div>
                        </div>
                      <div className="w-full flex justify-center items-center py-4">
                          <button onClick={submitALL} className="w-11/12 py-5 bg-red-500 rounded-3xl hover:shadow-xl text-4xl font-bold  text-white">Done</button>
                      </div>
                      </div>
                      </>
          
          )}
  
          {
          // category.length > 0 ? (
            category.map((product) => (
              <ItemList setProductId={setProductId} product={product} />
            ))
            // ):(products.map((product) => (
            //   <ItemList setProductId={setProductId} product={product} />
            // )))
            }
          </main>
          {cartItems.length > 0 && (
            <footer className="fixed bottom-0 w-full h-12 border-t-2 bg-white flex justify-around items-center text-xl  ">
              <h3 className="text-xl font-bold ">{cartItems.length} Items</h3>
              <p>
                Total: &#x20B9;{" "}
                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}.00{" "}
              </p>
              <Link
                to="/cart"
                className="bg-lime-500 px-3 py-1 rounded text-white font-bold border hover:border-lime-500 hover:text-lime-500 hover:bg-white"
              >
                View Cart
              </Link>
            </footer>
          )}
        </>
      )}
    </div>
  );
}

export default HomeScreen;

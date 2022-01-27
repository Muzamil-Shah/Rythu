import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import InformationScreen from "./screens/InformationScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import OrderScreen from "./screens/OrderScreen";
import UserOrders from "./screens/UserOrders";
import PrivateRouter from "./components/PrivateRouter";
import UserProfile from "./screens/UserProfile";
import DashboardScreen from "./screens/AdminScreen/DashboardScreen";
import AdminRouter from "./components/AdminRouter";
// import ZonePicker from "./components/ZonePicker";


function App() {
  // const [zoneLocation,setZoneLocation] = useState("");
  // // // console.log(zoneLocation)
  // // localStorage.setItem("zoneLocation", zoneLocation);
  // const zone = localStorage.getItem("zoneLocation")
  // console.log(zone);
  return (
    <BrowserRouter>
      <div className="App">
         {/* {zone === "" && <ZonePicker />} */}
        <PrivateRouter path="/customer/profile" component={UserProfile} />
        <PrivateRouter path="/customer/orders" component={UserOrders} />
        <Route path="/signin" component={SigninScreen} />
        <Route path="/cart/:id?" component={CartScreen} />
        <Route path="/checkouts/order/:id" component={OrderScreen} />
        <Route path="/checkouts/payment" component={PaymentScreen} />
        <Route path="/checkouts/shipping" component={ShippingScreen} />
        <Route path="/checkouts/information" component={InformationScreen} />
        <AdminRouter path="/admin/dashboard" component={DashboardScreen} />
        <Route path="/" exact component={HomeScreen} />
      </div>
    </BrowserRouter>
  );
}

export default App;

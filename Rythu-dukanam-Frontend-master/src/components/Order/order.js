import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userOrders } from '../../redux/actions/orderAction';

function Order(props) {
    const {userId} =props;
    const userDetails = ((state)=> state.userDetails);
    const {error,loading,user} = userDetails;
    
    const ordersUser = useSelector((state) => state.ordersUser);
    const {orders} = ordersUser;
    const dispatch =useDispatch();
    useEffect(()=>{
        dispatch(userOrders(userId));
    },[])
    return (
        <div>
            {orders && (
                <>
                {orders.length}
            {/* {orders.map((order) => (
                <p>{orders.length}</p>
            ))} */}
            </>
            )}
        </div>
    )
}

export default Order;

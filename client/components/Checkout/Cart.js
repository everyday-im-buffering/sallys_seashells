import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const Cart =() => {
    const counter = useSelector(state => state);
    const dispatch = useDispatch();
 return(
    
     <div>Welcome to your cart </div>
 )
}



export default Cart
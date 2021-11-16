import React from "react";
import { connect } from "react-redux";
import history from "../../history";
const CheckOut = (props) => {
    

    function confirmOrder(){
        console.log('confirmed')
        history.push("/checkout/order-confirmation")
    }
  return (
    <div>
      <h1>CheckOut</h1>
      <button onClick={confirmOrder}>Submit Order</button>
    </div>
  );
};

const mapState = (state) => {
  return {
    userId: state.auth.id,
  };
};
export default connect(mapState)(CheckOut);

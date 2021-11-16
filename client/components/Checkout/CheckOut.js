import React from "react";
import { connect } from "react-redux";
import history from "../../history";
import { markOrderAsComplete } from "../../store/cartReducer";
const CheckOut = (props) => {
    

    function confirmOrder(){
       props.markOrderAsComplete("eaeeeb82-c27e-4d56-8600-410a4807b828")
        history.push("/checkout/order-confirmation")
    }
  return (
    <div>
      <h1>CheckOut</h1>
      <button onClick={()=>confirmOrder()}>Submit Order</button>
    </div>
  );
};

const mapState = (state) => {
  return {
    userId: state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
    return{
        markOrderAsComplete: (id) => dispatch(markOrderAsComplete(id))
    }
   
}
export default connect(mapState, mapDispatch)(CheckOut);

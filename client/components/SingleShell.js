import React, { useState, useEffect, useRef } from "react";
import { useIsMounted } from "./NonPages/useIsMounted";
import { fetchSingleShell } from "../store/singleShell";
import { connect } from "react-redux";
import { fetchShell } from "../store/cartReducer";

// class SingleShell extends React.Component {
//   componentDidMount() {
//     try {
//       const id = this.props.match.params.id;
//       this.props.loadSingleShell(id);
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   addToCart(shellId, shellPrice, shellQuantity) {
//     //check if this.props.userId exists
//     this.props.fetchShell(shellId, shellPrice, shellQuantity);
//   }

//   render() {
//     const singleShell = this.props.singleShell;
//     const userId = this.props.userId;

//     return (
//       <div>
//         <h1>{singleShell.name}</h1>
//         <li>{singleShell.marineType}</li>
//         <li>{singleShell.color}</li>
//         <li>{singleShell.pattern}</li>
//         <li>{singleShell.price}</li>
//         <button
//           onClick={() =>
//             this.addToCart(
//               singleShell.id,
//               singleShell.price,
//               singleShell.quantity
//             )
//           }
//         >
//           Add To Cart
//         </button>
//       </div>
//     );
//   }
// }

const SingleShell = (props) => {
  //initial shell state
  const [quantity, setQuantity] = useState(1);

  const isMounted = useIsMounted()
  

  useEffect(() => {
    console.log("on Mount");
 
    const id = props.match.params.id;
    props.loadSingleShell(id);
    
  }, []);

    // useEffect(() => {
    //   if(isMounted.current){
    //     setQuantity(props.singleShell.quantity)
    //   }
    // },[quantity])

  function decrement(){
    if(quantity > 0){
      setQuantity(prevQuantity => prevQuantity - 1)
    }
    
  }

  function increment() {
    if(quantity < props.singleShell.quantity){
      setQuantity(prevQuantity => prevQuantity + 1)
    }
  
  }

  return (
    <div>
      <h1>{props.singleShell.name}</h1>
      <li>{props.singleShell.marineType}</li>
      <li>{props.singleShell.color}</li>
      <li>{props.singleShell.pattern}</li>
      <li>{props.singleShell.price}</li>
      <img width="150" height="150" src={props.singleShell.imageUrl} />
      quantity:<span>{quantity}</span>
      <button onClick={decrement}>-</button>
      <button  style={{marginLeft: "5px"}} onClick={increment}>+</button>
      <button style={{marginLeft: "5px"}}>Add To Cart</button>
     
     
    </div>
  );
};

const mapState = (state) => {
  return {
    singleShell: state.singleShell,
    userId: state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadSingleShell: (id) => dispatch(fetchSingleShell(id)),
    fetchShell: (shellId, shellPrice, userId) =>
      dispatch(fetchShell(shellId, shellPrice, userId)),
  };
};

export default connect(mapState, mapDispatch)(SingleShell);

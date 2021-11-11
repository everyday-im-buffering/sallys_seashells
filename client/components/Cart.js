import React from "react";
import { connect } from 'react-redux'

// class Cart extends Component{
//   render(){
//     //create an addShell props to map through
//     return(
//       <div>
//       <img scr={shell.imageUrl}/></div>

//       <div>
//        <p> is this working </p>
//       <p> {shell.name}</p>
//       <p> {shell.price}</p>
//       <p> {shell.quantity}</p>
//       </div>
//     )
//   }
// };

const mapState = (state) => {
  return {
    shells
  }
}
export default connect(mapState)(Cart)
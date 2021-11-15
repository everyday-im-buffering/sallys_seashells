import React from "react";
import { connect } from 'react-redux'

class Cart extends React.Component {
  render() {
    //create an addShell props to map through
    return (
      <body>
        <img scr={shell.imageUrl} />

        <div>
          <p> is this working </p>
          <p> {shell.name}</p>
          <p> {shell.price}</p>
          <p> {shell.quantity}</p>
        </div>
      </body>
    )
  }
};

const mapState = (state) => {
  return {
    shells
  }
}
export default connect(mapState)(Cart)
import React from "react";
import { fetchSingleShell } from "../store/singleShell";
import { connect } from "react-redux";
import { fetchShell } from "../store/cartReducer";

class SingleShell extends React.Component {
  componentDidMount() {
    try {
      const id = this.props.match.params.id;
      this.props.loadSingleShell(id);
    } catch (err) {
      console.log(err);
    }
  }

  addToCart(shellId, shellPrice) {
      //check if loggedIn?
      console.log('clicked')
      this.props.fetchShell(shellId,shellPrice, this.props.userId)
  }

  render() {
    const singleShell = this.props.singleShell;
    const userId = this.props.userId;

    return (
      <div>
        <h1>{singleShell.name}</h1>
        <li>{singleShell.marineType}</li>
        <li>{singleShell.color}</li>
        <li>{singleShell.pattern}</li>
        <li>{singleShell.price}</li>
        <button onClick={() => this.addToCart(singleShell.id, singleShell.price)}>
          Add To Cart
        </button>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    singleShell: state.singleShell,
    userId: state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadSingleShell: (id) => dispatch(fetchSingleShell(id)),
    fetchShell: (shellId,shellPrice,userId) => dispatch(fetchShell(shellId,shellPrice,userId))
  };
};

export default connect(mapState, mapDispatch)(SingleShell);

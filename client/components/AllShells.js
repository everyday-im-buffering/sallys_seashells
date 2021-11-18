import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllShells } from "../store/allProducts";
import { createGlobalStyle } from "../global.css"
import { addShellToGuestCart } from "../store/cartReducer";

// import relevant thunks from reducer

const IndivdidualShell = (props) => {
  const shell = props.shell;
  const userId = props.userId;
  // shell is an object, as fetched from the DB via Redux

  return (
    <div className="single-shell-list">
      <img src={shell.imageUrl} />
      <h3>{shell.name}</h3>
      <p>{shell.price}</p>
      <Link to={`/shop/${shell.id}`}>Details</Link>
      <button>Add to Cart</button>
    </div>
  );
};

class AllShells extends React.Component {
  constructor() {
    super();
    this.state = {
      // filtering and sorting options
      waterType: null,
      marineType: null,
      color: null,
      pattern: null,
    };
    this.filterWater = this.filterWater.bind(this);
    this.filterType = this.filterType.bind(this);
    this.filterColor = this.filterColor.bind(this);
    this.filterPattern = this.filterPattern.bind(this);
  }

  componentDidMount() {
    this.props.getAllShells();
    window.scrollTo(0, 0);
  }

  // more filtering capabilities to be added in this component, sorting too if we get there

  filterWater(event) {
    if (event.target.value === "all") {
      this.setState({
        waterType: null,
      });
    } else {
      this.setState({
        waterType: event.target.value,
      });
    }
  }

  filterType(event) {
    if (event.target.value === "all") {
      this.setState({
        marineType: null,
      });
    } else {
      this.setState({
        marineType: event.target.value,
      });
    }
  }

  filterColor(event) {
    if (event.target.value === "all") {
      this.setState({
        color: null,
      });
    } else {
      this.setState({
        color: event.target.value,
      });
    }
  }

  filterPattern(event) {
    if (event.target.value === "all") {
      this.setState({
        pattern: null,
      });
    } else {
      this.setState({
        pattern: event.target.value,
      });
    }
  }

  render() {
    let shells = this.props.allShells || [];

    if (this.state.waterType) {
      shells = shells.filter(
        (shell) => shell.waterType === this.state.waterType
      );
    }

    if (this.state.marineType) {
      shells = shells.filter(
        (shell) => shell.marineType === this.state.marineType
      );
    }

    if (this.state.color) {
      shells = shells.filter((shell) => shell.color === this.state.color);
    }

    if (this.state.pattern) {
      shells = shells.filter((shell) => shell.pattern === this.state.pattern);
    }

    return (
      <div>
        <h1>Shells</h1>
        <div id="shell-filters">
          <select id="water-filter" onChange={this.filterWater}>
            <option value="all">-- select water type --</option>
            <option value="freshwater">Freshwater</option>
            <option value="marine">Marine</option>
          </select>
          <select id="type-filter" onChange={this.filterType}>
            <option value="all">--select marine type--</option>
            <option value="gastropoda">Gastropoda</option>
            <option value="bivalvia">Bivalvia</option>
            <option value="scaphopoda">Scaphopoda</option>
            <option value="polyplacophora">Polyplacophora</option>
            <option value="monoplacophora">Monoplacophora</option>
            <option value="cephalopoda">Cephalopoda</option>
          </select>
          <select id="color-filter" onChange={this.filterColor}>
            <option value="all">--select color--</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="brown">Brown</option>
            <option value="white">White</option>
            <option value="grey">Grey</option>
            <option value="red">Red</option>
            <option value="multi">Multi-colored</option>
          </select>
          <select id="pattern-filter" onChange={this.filterPattern}>
            <option value="all">--select pattern--</option>
            <option value="spotted">Spotted</option>
            <option value="striped">Striped</option>
            <option value="solid">Solid</option>
          </select>
        </div>
        <div id="all-shell-list">
          {shells.map((shell) => (
            <IndivdidualShell key={shell.id} shell={shell} />
          ))}
        </div>
        </div>
    );
  }
}

const mapState = (state) => ({
  allShells: state.allShells,
});

const mapDispatch = (dispatch) => ({
  getAllShells: () => dispatch(fetchAllShells()),
  addShell: (shell, newQuantity) => dispatch(addShellToGuestCart(shell, newQuantity))
});

export default connect(mapState, mapDispatch)(AllShells);

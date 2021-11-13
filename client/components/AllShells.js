import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllShells } from "../store/allProducts";

// import relevant thunks from reducer

const IndivdidualShell = (props) => {
  const shell = props.shell;
  const userId = props.userId
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
    };
    this.filterWater = this.filterWater.bind(this);
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

  render() {
    let shells = this.props.allShells || [];

    if (this.state.waterType) {
      shells = shells.filter(
        (shell) => shell.waterType === this.state.waterType
      );
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
});

export default connect(mapState, mapDispatch)(AllShells);

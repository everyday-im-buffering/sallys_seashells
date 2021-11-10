import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import relevant thunks from reducer

const IndivdidualShell = () => {
  const shell = props.shell;
  // shell is an object, as fetched from the DB via Redux
  // button needs to connect to Single Product view (<Link to={}>)
  // quick add to cart? or only from Single Product view?

  return (
    <div className="single-shell-list">
      <img src={shell.imageUrl} />
      <h3>{shell.name}</h3>
      <p>{shell.price}</p>
      <button>Details</button>
    </div>
  );
};

class AllProducts extends React.Component {
  constructor() {
    super();
    this.state = {
      // filtering and sorting options
      waterType: null,
    };
    this.filterWater = this.filterWater.bind(this);
  }

  componentDidMount() {
    // fetch all products using mapDispatch
    window.scrollTo(0, 0);
  }

  // more filtering capabilities to be added in this component, sorting too if we get there

  filterWater(event) {
    // need to check if "value={null}" works
    this.setState({
      waterType: event.target.value,
    });
  }

  render() {
    let shells = []; // data to be brought in from redux store via mapState and mapDispatch

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
            <option value={null}>-- select water type --</option>
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

const mapState = (state) => {};

const mapDispatch = (dispatch) => {};

export default AllProducts; // update to connected component once Redux is built out

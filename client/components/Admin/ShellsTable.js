
import React from "react";
import { connect } from "react-redux";
import {
  fetchAllShells,
  updateShell,
  deleteShell,
  createNewShell,
} from "../../store/allProducts";

const SingleShells= (props) => {

  const shell = props.shell;
  console.log(props.shells, 'shell')
  return (
    <tbody>
    <tr>
     <td>{shell.id}</td>
      <td>{shell.name}</td>
      <td>{shell.marineType}</td>
      <td>{shell.color}</td>
      <td>{shell.pattern}</td>
      <td>{shell.waterType}</td>
    </tr>
    </tbody>
  );
};

class ShellsTable extends React.Component {
  componentDidMount() {
    this.props.getAll();
  }

  render() {
    let allShells = this.props.allShells || [];
    console.log(this.props, 'props');
    return (
      <table>
          <thead>
        <tr>
        <th>id</th>
          <th>shell name</th>
          <th>marine type</th>
          <th>color</th>
          <th>pattern</th>
          <th>water type</th>
        </tr>
        {allShells.map((shell) => (
          <SingleShells key={shell.id} shell={shell} />
        ))}
        </thead>
      </table>
    );
  }
}

const mapState = (state) => {
  return {
    allShells: state.allShells
  };
};

const mapDispatch = (dispatch) => {
  return {
    getAll: () => dispatch(fetchAllShells()),
    update: (shell) => dispatch(updateShell(shell)),
    delete: (id) => dispatch(deleteShell(id)),
  };
};

export default connect(mapState, mapDispatch)(ShellsTable); // change to connected componenet
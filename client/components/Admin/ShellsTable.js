
import React from "react";
import { connect } from "react-redux";
import {
  fetchAllShells,
  updateShell,
  deleteShell,
  createNewShell,
} from "../../store/allProducts";

const SingleShell= (props) => {
  const shell = props.shell;
  return (
    <tr>
      <td>{shell.name}</td>
      <td>{shell.marineType}</td>
    </tr>
  );
};

class ShellsTable extends React.Component {
  componentDidMount() {
    this.props.getAll();
  }

  render() {
    let shells = this.props.shells || [];
    return (
      <table>
        <tr>
          <th>Id</th>
          <th>Email</th>
          <th>Password</th>
          <th>Admin</th>
        </tr>
        {shells.map((shell) => (
          <SingleShell key={shell.id} shell={shell} />
        ))}
      </table>
    );
  }
}

const mapState = (state) => {
  return {
    shells: state.shells
  };
};

const mapDispatch = (dispatch) => {
  return {
    getAll: () => dispatch(fetchAllShells()),
    update: (shell) => dispatch(updateShell(shell)),
    delete: (id) => dispatch(deleteShell(id)),
    create: (shell) => dispatch(createNewShell(shell))
  };
};

export default connect(mapState, mapDispatch)(ShellsTable); // change to connected componenet
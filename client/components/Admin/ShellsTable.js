import React from "react";
import { connect } from "react-redux";
import {
  fetchAllShells,
  updateShell,
  deleteShell,
} from "../../store/allProducts";
import { Link } from "react-router-dom";

const SingleShells = (props) => {
  const shell = props.shell;
  const deleteShell = props.delete;
  return (
    <tr>
      <td>{shell.id}</td>
      <td>{shell.name}</td>
      <td>{shell.marineType}</td>
      <td>{shell.color}</td>
      <td>{shell.pattern}</td>
      <td>{shell.waterType}</td>
      <td>
        <Link to={`/admin/shop/${shell.id}/edit`}>Edit</Link>
      </td>
      <td>
        <button 
        type="button"
        onClick={() =>{ 
          if (
          window.confirm("so you think you can get rid of me that easily?"
          )
          ){
            deleteShell(shell.id)
          }}}
        >Delete</button>
      </td>
    </tr>
  );
};

class ShellsTable extends React.Component {
  constructor(){
    super();
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidMount() {
    this.props.getAll();
  }

  handleDelete(id) {
    this.props.delete(id);
  }

  render() {
    let allShells = this.props.allShells || [];
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
        </thead>
        <tbody>
          {allShells.map((shell) => (
            <SingleShells key={shell.id} shell={shell} delete={this.handleDelete}/>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapState = (state) => {
  return {
    allShells: state.allShells,
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

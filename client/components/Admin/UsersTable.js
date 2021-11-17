import React from "react";
import { connect } from "react-redux";
import { getAllUsers, deleteUser } from "../../store/users";
import { Link } from "react-router-dom";

const SingleUser = (props) => {
  const user = props.user;
  const deleteUser = props.delete;
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.email}</td>
      <td>{user.isAdmin ? "Admin" : "Customer"}</td>
      <td>
        <Link to={`/admin/users/${user.id}`}>Edit</Link>
      </td>
      <td>
        <button
          type="button"
          onClick={() => {
            if (
              window.confirm(
                "Are you sure you wish to delete this user's account?"
              )
            ) {
              deleteUser(user.id);
            }
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

class UsersTable extends React.Component {
  constructor() {
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
    let users = this.props.users || [];
    return (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Status</th>
            <th>Manage</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <SingleUser key={user.id} user={user} delete={this.handleDelete} />
          ))}
        </tbody>
      </table>
    );
  }
}

const mapState = (state) => {
  return {
    users: state.users,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getAll: () => dispatch(getAllUsers()),
    delete: (id) => dispatch(deleteUser(id)),
  };
};

export default connect(mapState, mapDispatch)(UsersTable); // change to connected componenet

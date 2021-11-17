import React from "react";
import { connect } from "react-redux";
import { getAllUsers, updateUser, deleteUser } from "../../store/users";
import { Link } from "react-router-dom";

const SingleUser = (props) => {
  const user = props.user;
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.email}</td>
      <td>{user.password}</td>
      <td>{user.isAdmin ? "Admin" : "Customer"}</td>
      <td>
        <Link to={`/admin/users/${user.id}`}>Edit</Link>
      </td>
    </tr>
  );
};

class UsersTable extends React.Component {
  componentDidMount() {
    this.props.getAll();
  }

  render() {
    let users = this.props.users || [];
    return (
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Email</th>
            <th>Password</th>
            <th>Status</th>
            <th>Manage</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <SingleUser key={user.id} user={user} />
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
    update: (user) => dispatch(updateUser(user)),
    delete: (id) => dispatch(deleteUser(id)),
  };
};

export default connect(mapState, mapDispatch)(UsersTable); // change to connected componenet

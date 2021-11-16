import React from "react";
import { connect } from "react-redux";
import {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
} from "../../store/admin";

const SingleUser = (props) => {
  const user = props.user;
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.email}</td>
      <td>{user.password}</td>
      <td>{user.isAdmin}</td>
      <td>{user.isLoggedIn}</td>
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
        <tr>
          <th>Id</th>
          <th>Email</th>
          <th>Password</th>
          <th>Admin</th>
          <th>Logged In</th>
        </tr>
        {users.map((user) => (
          <SingleUser key={user.id} user={user} />
        ))}
      </table>
    );
  }
}

const mapState = (state) => {
  return {
    users: state.admin.allUsers,
    selected: state.admin.selectedUser,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getAll: () => dispatch(getAllUsers()),
    getOne: (id) => dispatch(getSingleUser(id)),
    update: (user) => dispatch(updateUser(user)),
    delete: (id) => dispatch(deleteUser(user)),
  };
};

export default UsersTable; // change to connected componenet

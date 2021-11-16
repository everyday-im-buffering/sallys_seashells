import React from "react";
import { connect } from "react-redux";
import {
  getAllUsers,
  updateUser,
  deleteUser,
} from "../../store/users";

const SingleUser = (props) => {
  const user = props.user;
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.email}</td>
      <td>{user.password}</td>
      <td>{`${user.isAdmin}`}</td>
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
    users: state.users
  };
};

const mapDispatch = (dispatch) => {
  return {
    getAll: () => dispatch(getAllUsers()),
    update: (user) => dispatch(updateUser(user)),
    delete: (id) => dispatch(deleteUser(user)),
  };
};

export default connect(mapState, mapDispatch)(UsersTable); // change to connected componenet

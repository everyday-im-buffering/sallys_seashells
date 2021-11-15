import React from "react";
import { connect } from "react-redux";
// will need to import thunks (from a separate admin reducer?) to fetch info from DB

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
    // dispatch thunks for fetch info
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

const mapState = (state) => {};

const mapDispatch = (dispatch) => {};

export default UsersTable; // change to connected componenet

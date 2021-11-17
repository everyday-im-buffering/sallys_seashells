import React from "react";
import { connect } from "react-redux";
import { getSingleUser } from "../../store/singleUser";
import { deleteUser, updateUser } from "../../store/users";

class EditUser extends React.Component {
  //   constructor() {
  //     super();
  //   }

  componentDidMount() {
    this.props.getUser(this.props.match.params.id);
  }

  render() {
    let user = this.props.user || {};
    return (
      <div>
        <p>{user.id}</p>
        <p>{user.email}</p>
        <p>{user.password}</p>
        <p>{`${user.isAdmin}`}</p>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    user: state.singleUser,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getUser: (id) => dispatch(getSingleUser(id)),
    update: (user) => dispatch(updateUser(user)),
    delete: (id) => dispatch(deleteUser(id)),
  };
};

export default connect(mapState, mapDispatch)(EditUser);

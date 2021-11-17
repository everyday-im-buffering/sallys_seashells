import React from "react";
import { connect } from "react-redux";
import { getSingleUser } from "../../store/singleUser";
import { updateUser } from "../../store/users";
import { Link } from "react-router-dom";

class EditUser extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      email: "",
      password: "",
      isAdmin: false,
      isLoggedIn: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getUser(this.props.match.params.id);
  }

  componentDidUpdate() {
    const user = this.props.user;
    if (user.id !== this.state.id) {
      this.setState({
        id: user.id,
        email: user.email,
        password: user.password,
        isAdmin: user.isAdmin,
        isLoggedIn: user.isLoggedIn,
      });
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.update({ ...this.state });
  }

  render() {
    let user = this.props.user || {};
    return (
      <div>
        <p>ID: {user.id}</p>
        <p>Email: {user.email}</p>
        <form id="update-user" onSubmit={this.handleSubmit}>
          <label htmlFor="isAdmin">Status:</label>
          <select
            name="isAdmin"
            value={this.state.isAdmin}
            onChange={this.handleChange}
          >
            <option value={false}>Customer</option>
            <option value={true}>Admin</option>
          </select>
          <button type="submit">Update</button>
        </form>
        <Link to="/admin">Back to Dash</Link>
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
  };
};

export default connect(mapState, mapDispatch)(EditUser);

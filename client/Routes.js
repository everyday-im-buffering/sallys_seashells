import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/NonPages/AuthForm";
import Home from "./components/OldHome";
import { me } from "./store";
import AllShells from "./components/AllShells.js";
import SingleShell from "./components/SingleShell";
import AdminDash from "./components/Admin/AdminDash";
import EditShell from "./components/Admin/EditShell";
import Cart from "./components/Checkout/Cart";
import CheckOut from "./components/Checkout/CheckOut";
import OrderConfirmation from "./components/Checkout/OrderConfirmation";
import About from "./components/About";
import AccountDetails from "./components/AccountDetails";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";

// AccountDetails only viewable if signed in
// Admin pages only viewable if an admin is mounted

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {/*
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path='/' exact component={ Login } />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            
          </Switch>
        )}
        */}
        <Switch>
          <Route path="/home" component={Home} />
          {/* <Redirect to="/home" /> */}
          <Route path="/" exact component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route exact path="/shop" component={AllShells} />
          <Route path="/shop/:id" component={SingleShell} />
          <Route path="/admin/shop/:id/edit" component={EditShell} />
          <Route exact path="/admin" component={AdminDash} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/checkout" component={CheckOut} />
          <Route
            exact
            path="/checkout/order-confirmation"
            component={OrderConfirmation}
          />
          <Route exact path="/about" component={About} />
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/account" component={AccountDetails} />
        </Switch>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));

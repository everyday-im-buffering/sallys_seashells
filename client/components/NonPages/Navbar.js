import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../store";

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <head>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/css/bootstrap.min.css" rel="stylesheet" />
    </head>
    <body>
      <nav class="navbar navbar-light bg-light">
        <ul class="nav justify-content-center">
          <a class="navbar-brand" href="#">
            seashore
          </a>
        </ul>

        {isLoggedIn ? (
          <div class="container-fluid">
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <ul class="nav justify-content-end">
          <li class="navbar-text">
          <Link class="nav-link active" to="/shop">shop</Link></li>
            {/* The navbar will show these links before you log in */}
            <li class="navbar-text">
              <Link class="nav-link active" to="/login">login</Link>
            </li>
            <li class="navbar-text">
              <Link class="nav-link active" to="/signup">sign up</Link>
            </li>
            <li class="navbar-text"> 
        
            <Link class="nav-link active" to="/cart"> <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
          </svg></Link>
            
            </li>
          </ul>
        )}

      </nav>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/js/bootstrap.bundle.min.js"></script>
    </body>
  </div >
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);

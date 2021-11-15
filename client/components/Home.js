import React from "react";
import { connect } from "react-redux";
// import Routes from "./Routes";
// import Navbar from "./components/NonPages/Navbar";
// import Footer from "./components/NonPages/Footer";

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username } = props;

  return (
    <div>
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* <p class="lead">
          Welcome, {username}
        </p> */}
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/js/bootstrap.bundle.min.js"></script>
      </body>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);

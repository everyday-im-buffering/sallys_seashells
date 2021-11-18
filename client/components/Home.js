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
      <body>
        <h1> sally? is that you?</h1>
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

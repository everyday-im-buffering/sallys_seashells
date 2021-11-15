// import React from "react";
// import { connect } from "react-redux";
// import { Link } from "react-router-dom";
// import { logout } from "../../../store";

// const Navbar = ({ handleClick, isLoggedIn }) => (
//   <div>
//     <head>
//       <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/css/bootstrap.min.css" rel="stylesheet" />
//     </head>
//     <body>
//       <nav class="navbar navbar-light bg-light">
//         <ul class="nav justify-content-center">
//           <a class="navbar-brand" href="#">
//             seashore
//           </a>
//         </ul>

//         {isLoggedIn ? (
//           <div class="container-fluid">
//             {/* The navbar will show these links after you log in */}
//             <Link to="/home">Home</Link>
//             <a href="#" onClick={handleClick}>
//               Logout
//             </a>
//           </div>
//         ) : (
//           <ul class="nav justify-content-end">
//             {/* The navbar will show these links before you log in */}
//             <li class="navbar-text">
//               <a class="nav-link active" href="/login">login</a>
//             </li>
//             <li class="navbar-text">
//               <a class="nav-link active" href="/signup">sign up</a>
//             </li>
//           </ul>
//         )}

//       </nav>
//       <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/js/bootstrap.bundle.min.js"></script>
//     </body>
//   </div >
// );

// /**
//  * CONTAINER
//  */
// const mapState = (state) => {
//   return {
//     isLoggedIn: !!state.auth.id,
//   };
// };

// const mapDispatch = (dispatch) => {
//   return {
//     handleClick() {
//       dispatch(logout());
//     },
//   };
// };

// export default connect(mapState, mapDispatch)(Navbar);

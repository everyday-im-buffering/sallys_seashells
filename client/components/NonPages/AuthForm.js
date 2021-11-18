import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../../store";
import * as Yup from "yup";
import { Formik } from 'formik';

const initialValues = {
  email: '',
  password: ''
}
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string()
    .min(8, 'Must be at least 8 characters')
    .required('Required'),
})

const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
    // cant get this to work
    // onSubmit={async (values, { resetForm }) => {
    //   authenticate(values);
    //   // await onSubmit(values)
    //   resetForm()
    // }}
    >
      {formik => (
        <div>
          <h1 className="form-header">{displayName}</h1>
          <form onSubmit={handleSubmit} name={name}>
            <div style={{
              display: "flex",
              flexDirection: "column"
            }}>
              <div>
                <label htmlFor="email">
                  <small>Email</small>
                </label>
                <input className="input-field"
                  name="email"
                  type="text"
                  // {...formik.getFieldProps("email")}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  placeholder="Your Email Address"
                />
                {formik.touched.email && formik.errors.email ? <div className="form-error-message">{formik.errors.email}</div> : null}
              </div>
              <div>
                <label htmlFor="password">
                  <small>Password</small>
                </label>
                <input className="input-field"
                  name="password"
                  type="password"
                  // {...formik.getFieldProps("password")}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur} // 
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? <div className="form-error-message">{formik.errors.password}</div> : null}
              </div>
              <div>
                <button className="submit-button" type="submit">{displayName}</button>
              </div>
            </div>
            {error && error.response && <div className="form-error-message"> {error.response.data} </div>}
          </form>
        </div>
      )}
    </Formik>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(authenticate(email, password, formName));
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);

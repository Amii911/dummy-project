import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { login } from '../../reducers/sessionSlice';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialValues = {
    username: '',
    password: '',
  };

  // State variable to track login status
  const [loginError, setLoginError] = useState(null);

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(7, 'Username must be at least 7 characters long')
      .required('Username is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters long'),
  });

  const handleSubmit = (values) => {
    fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(() => {
        dispatch(login(values));
        navigate("/bathrooms");
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setLoginError("Incorrect username or password. Please try again.");
      });
  };

  return (
    <div>
      <h1>Log In</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema} // corrected from formSchema to validationSchema
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <div>
              <label htmlFor="username">Username</label>
              <Field
                type="text"
                id="username"
                name="username"
                required
              />
              <ErrorMessage name="username" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                id="password"
                name="password"
                required
              />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <button type="submit">Login</button>
            {loginError && <div className="error">{loginError}</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
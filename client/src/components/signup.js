import React from 'react'

function signup() {
    const [values, setValues] = useState({
        username: '',
        password: '',
      });
    
      const [errorMessage, setErrorMessage] = useState('');
    
      const handleChange = (e) => {
        setValues({
          ...values,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if (values.username.length < 7) {
          setErrorMessage('Username must be at least seven characters long.');
          return;
        }
        if (values.password.length === 0) {
          setErrorMessage('Password should not be empty.');
          return;
        }
        login(values);
      };
    
      return (
        <div className="form">
          <h1>Create an account</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Username</label>
              <input
                type="text"
                required
                name="username"
                id="username"
                value={values.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password" 
                required
                name="password"
                id="password"
                value={values.password}
                onChange={handleChange}
              />
            </div>
            <button>Create User</button>
            <p>{errorMessage}</p>
          </form>
        </div>
      );
    }
 

export default signup
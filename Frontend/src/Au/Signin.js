import { useState, useEffect } from "react";
import "./Autent.css";
{/*const Signin = ({ onToggle }) => {
    return (
        <div>
            <h2>Signin Page</h2>
            <button onClick={onToggle}>Go to Login</button>
        </div>
    );
};

export default Signin;*/}






const Signin=({onToggle}) =>{
    const initialValues = {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);

    };

    const handleRegistration = () =>{
        let url = "http://localhost:5000/register"
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formValues),
        }).then( res => res.json())
        .then(data=>{
          localStorage.setItem('access_token', data.access_token);
          
          localStorage.setItem('username', data.email);
    
          if (localStorage.getItem("access_token") !== null && localStorage.getItem("access_token")!=="undefined") {
            window.location.replace("/Workspace")
          }else{
              alert(data.error)
          }
        }).catch(err => console.log(err));
      }

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            handleRegistration();
        }
        if (isSubmit) {
            setIsSubmit(false);
        }
    }, [formErrors, formValues, isSubmit]);



    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.username) {
            errors.username = "Username is required!";
        }
        if (!values.email) {
            errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }
        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 4) {
            errors.password = "Password must be more than 4 characters";
        } else if (values.password.length > 10) {
            errors.password = "Password cannot exceed more than 10 characters";
        }
        if (values.password !== values.confirmPassword) {
            errors.confirmPassword = "Those passwords didn’t match. Try again.";
        }
        return errors;
    };



    return (
        <>
            <div className="bgImg"></div>
            <div className="au-container">

                <form onSubmit={handleSubmit}>
                    <h1>Sign Up</h1>
                    <div className="ui divider"></div>
                    <div className="ui form">
                        <div className="field">
                            <label>Username</label>
                            <input
                                type="text"
                                name="username"
                                placeholder="Choose a username"
                                value={formValues.username}
                                onChange={handleChange}
                            />
                        </div>
                        <p>{formErrors.username}</p>
                        <div className="field">
                            <label>Email</label>
                            <input
                                type="text"
                                name="email"
                                placeholder="Email"
                                value={formValues.email}
                                onChange={handleChange}
                            />
                        </div>
                        <p>{formErrors.email}</p>
                        <div className="field">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formValues.password}
                                onChange={handleChange}
                            />
                        </div>
                        <p>{formErrors.password}</p>
                        <div className="field">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm password"
                                value={formValues.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>
                        <p>{formErrors.confirmPassword}</p>
                        <button className="fluid ui button blue">Submit</button>
                    </div>
                </form>
                <div className="au-text">
                    Already have an account? <a style={{color: 'rgb(97, 191, 249)'}} onClick={() => onToggle()}>Login</a>
                </div>
            </div>{" "}
        </>
    );
}

export default Signin;

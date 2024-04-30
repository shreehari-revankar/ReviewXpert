import { useState, useEffect } from "react";
import "./Autent.css";



const Login=({onToggle})=> {
    const initialValues = {
        email: "",
        password: "",
    };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSignIn = () =>{
        let url = "http://localhost:5000/login"
    
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
              alert(data.error);
          }
        }).catch(err => console.log(err));
      }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    };

    useEffect(() => {
        //console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            handleSignIn();
        }
        if (isSubmit) {
            setIsSubmit(false);
        }
    }, [formErrors, formValues, isSubmit]);


    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if (!values.email) {
            errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }
        if (!values.password) {
            errors.password = "Password is required";
        }
        return errors;
    };



    return (
        <>
            <div className="bgImg"></div>
            <div className="au-container">

                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <div className="ui divider"></div>
                    <div className="ui form">
                        
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
                        <button className="fluid ui button blue">Submit</button>
                    </div>
                </form>
                <div className="au-text">
                    Don't have an account? <a style={{color: 'rgb(97, 191, 249)'}} onClick={() => onToggle()}>Signup</a>
                </div>
            </div>{" "}
        </>
    );
}

export default Login;

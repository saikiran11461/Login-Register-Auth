import './Signup.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Axios from 'axios';
function Signup(){
    //Declaration of state variables
    const [usernameAcc,setUsernameAcc] = useState("");
    const [emailAcc,setEmailAcc] = useState("");
    const [passwordAcc,setPasswordAcc] = useState("");
    const [confirmPasswordAcc,setConfirmPasswordAcc] = useState("");
    const[checkInputUsername,setCheckInputUsername] = useState(false);
    const[checkInputEmail,setCheckInputEmail] = useState(false);
    const[checkInputPassword,setCheckInputPassword] = useState(false);
    const[checkInputConfirmPassword,setCheckInputConfirmPassword] = useState(false);
    const[signupStatus, setSignupStatus] = useState("");
    const usernameRegex = /^([a-zA-Z0-9_.])+$/;
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const passwordRegex = /^([a-zA-Z0-9_.])+$/;
    let validation = 0;

    const addUser = () =>{
        Axios.post('http://localhost:8080/userDetails', {
            username: usernameAcc,
            email: emailAcc,
            password: passwordAcc
        }).then((response) =>{
            setSignupStatus(response.data.message)
        });
    };


    const checkInputs = () => {

        if (!usernameAcc.trim() || usernameRegex.test(usernameAcc) === false) {
            setCheckInputUsername(true);
          }
        else{
            setCheckInputUsername(false);
            validation = validation + 1;  
          }
        if (!emailAcc.trim() || emailRegex.test(emailAcc) === false) {
            setCheckInputEmail(true);
          }
        else{
            setCheckInputEmail(false);
            validation = validation + 1; 
          }
        if (!passwordAcc.trim() || passwordRegex.test(passwordAcc) === false) {
            setCheckInputPassword(true);
          }
        else{
            setCheckInputPassword(false);
            validation = validation + 1; 
          }
        if (!confirmPasswordAcc.trim() || passwordRegex.test(confirmPasswordAcc) === false) {
            setCheckInputConfirmPassword(true);
          }
        else{
            setCheckInputConfirmPassword(false)
            validation = validation + 1;
          }
        if (passwordAcc !== confirmPasswordAcc){
            alert('Passwords are not the same')
            setCheckInputConfirmPassword(true);
            setCheckInputPassword(true);
        }
        else{
          validation = validation +1;
          alert('user sign up success')
        }
        
        if( validation === 5)
        {
          addUser();
          validation = 0;
        }
    }

    return ( 
        <div className = "signup-form-container">
            <div className = "signup">
                <div className ="signup-title">
                    <h1>SIGN UP</h1>
                </div>
                <div className = "signup-data">
                    <div className = "signup-usernameEmail-container">
                        <input className={checkInputUsername ? "red-input" : "grey-input"} type="text" placeholder="Username" maxLength="20" onChange={(event) =>{
                        setUsernameAcc(event.target.value)}}/>
                    </div>
                    <div className = "signup-usernameEmail-container">
                        <input className={checkInputEmail ? "red-input" : "grey-input"} type="text" placeholder="Email" maxLength="50" onChange={(event) =>{
                        setEmailAcc(event.target.value)}} />
                    </div>
                    <div className = "signup-passwordConfirm-container">
                        <input className={checkInputPassword ? "red-input" : "grey-input"} type="text" placeholder="Password" maxLength="30" onChange={(event) =>{
                        setPasswordAcc(event.target.value)}}/>
                    </div>
                    <div className = "signup-passwordConfirm-container">
                        <input className={checkInputConfirmPassword ? "red-input" : "grey-input"} type="text" placeholder="Confirm Password" maxLength="30" onChange={(event) =>{
                        setConfirmPasswordAcc(event.target.value)}}/>
                    </div>
                    <h4 className = "login-status">{signupStatus}</h4>
                </div>
                <div className = "signup-button">
                    <button onClick={checkInputs}>Sing Up</button>
                    <span>Already have an account? <Link to="/">Login</Link></span>
                </div>
            </div>
        </div>
     );
    
}
 
export default Signup;
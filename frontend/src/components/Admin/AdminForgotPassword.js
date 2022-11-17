/*
 * File Creation Date: December 2021
 * Author: Sabin Constantin Lungu
 * -----
 * Last Modified: Saturday 12th February 2022
 * Modified By: Sabin Constantin Lungu
 * -----
 * Copyright (c) 2021-2022 - eHouseholds Sabin Constantin Lungu - Edinburgh Napier Univeristy - All Rights Reserved
 * Any unauthorised broadcasting, public performance, copying or re-recording will constitute an infringement of copyright
 */


import React, {useState, Fragment} from 'react';
import RegisterCard from './RegisterCard';
import axios from 'axios';
import './AdminForgotPassword.css'

const AdminForgotPassword = () => {

    const [emailAddress, setEmailAddress] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [formIsValid, setFormIsValid] = useState(false); // Determines if the form is valid or not

    const forgotPasswordSubmitHandler = async (event) => {

        event.preventDefault();
    
        try {

            if(emailAddress.trim().length === 0) {
                setEmailValid(false);
                setFormIsValid(false);
            }

            if(!emailAddress.trim().includes("@")) {
                setFormIsValid(false);
                setEmailValid(false);
            }

            
            const {data} = await axios.post(`http://localhost:5200/api/v1/auth/forgot-password`, {emailAddress: emailAddress});
            setFormIsValid(true);
            setEmailValid(true);

            return data;
        }
        
        catch(err) {
    
            if(err) {
                throw new Error(err);
            }
    
        }
    }

    return (
        <Fragment>


  <section className = "section--forgotpassword">

<div className = "container grid grid--2-cols">

        <RegisterCard>

            <h1 className = "heading--primary login">Forgot Password</h1>
            <form id = "forgot--pw" onSubmit = {forgotPasswordSubmitHandler} method = "POST" className = "login--form">

        
            <div className = "email--box">
                <label className = "email--lbl">E-mail</label>
                <input value = {emailAddress}  onChange = {(e) => {setEmailAddress(e.target.value)}} placeholder = "Enter your E-mail Address" type = "email"/>
            </div>


            <div className = "submit--container">
                <button className = "login--btn" type = "submit">Submit</button>
            </div>
    </form>
        
    </RegisterCard>
    
    </div>    
</section>

    <footer className = "footer">
            <ul className = "footer--items">
                <li className = "footer--item">Copyright All Rights Reserved - eHouseholds Sabin Constantin Lungu - 2021</li>
            </ul>
        </footer>

        </Fragment>
      

    )
}

export default AdminForgotPassword
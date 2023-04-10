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


import React, {Fragment, useState} from 'react';
import Header from '../Header';
import './AdminBidsSettings.css';
import {useNavigate} from 'react-router-dom';
import HomepageImg from '../images/homepage/homepageimg.jpg';
import RegisterCard from './RegisterCard';
import axios from 'axios';

const AdminBidsSettings = () => {

    const navigate = useNavigate();
    const [enteredOpeningBid, setEnteredOpeningBid] = useState('');
    const [enteredVirtualCredits, setEnteredVirtualCredits] = useState('');
    const [formValid, setFormValid] = useState(false);

    const logoutHandler = () => { // Logout Handler Function to logout admins
        localStorage.removeItem("authToken"); // Remove auth token from local storage
        navigate('/admin-login')
        
        return window.location.reload(false);
    }

    const creditSubmitHandler = async (event) => {

        try {

            event.preventDefault();

            // Send POST request
            const {data} = await axios.post(`http://localhost:5200/api/v1/credits/create-credits`, {openingBid: enteredOpeningBid, virtualCredits: enteredVirtualCredits});
            const resData = data.data;

            alert('Credits Configured');
            setEnteredVirtualCredits("");
            setEnteredOpeningBid('');

            setFormValid(true);

            return resData;

        } 
        
        catch(error) {

            if(error) {

                setFormValid(false);
                return console.error(error);
            }


        }
    }
   
    return (


        <Fragment>

            <Header />
        
        <section className = "section--home">
            <div className = "home--grid">

        <div className = "home-text-box">
                <h1 className = "heading--primary">Admin Credits Settings</h1>
                <p className = "home--description">Configure Virtual Credit Settings.</p>

                <a onClick = {logoutHandler} className = "btn btn--outline" href = "/home">Logout</a>
            </div>

        <div className = "home-img-box">
            <img className = "home--img" alt = "Wind Turbine" src = {HomepageImg} />
        </div>
        
    </div>

    </section>

    <section className = "section--login">

        <div className = "container grid grid--2-cols">

                <RegisterCard>

                    <h1 className = "heading--primary login">Configure Credits Settings</h1>

                    <form onSubmit = {creditSubmitHandler} className = "login--form">

                    <div className = "credits--box">
                        <label className = "image--lbl">Virtual Credits</label>
                        <input value = {enteredVirtualCredits} onChange = {(e) => {setEnteredVirtualCredits(e.target.value)}} placeholder = "Enter Virtual Credits" required id = "virtual_credits" type = "number"/>
                    </div>

                    <div className = "submit--container">
                        <button className = "submit--btn" type = "submit">Configure</button>
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

export default AdminBidsSettings
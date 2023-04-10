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


/* eslint-disable no-lone-blocks */
import React, {useState, Fragment, useEffect} from 'react';
import './CreatePreference.css';
import {Link} from 'react-router-dom';
import RegisterCard from '../Admin/RegisterCard';
import axios from 'axios';
import Modal from '../../UI/Modal';

let DEFAULT_TEXT = {
    preferenceHeader: 'Your Preferences'
}

const applianceNames = [];

let otherPreferences = [

    {
      firstOtherPreference: ["06:00-07:00", "08:00-09:00" ,"10:00-11:00","12:00-13:00","14:00-15:00", "16:00-17:00", "18:00-19:00", "20:00-21:00", "22:00-23:00"],
      secondOtherPreference: ["06:00-07:00", "08:00-09:00" ,"10:00-11:00","12:00-13:00","14:00-15:00", "16:00-17:00", "18:00-19:00", "20:00-21:00", "22:00-23:00"],
      thirdOtherPreference: ["06:00-07:00", "08:00-09:00" ,"10:00-11:00","12:00-13:00","14:00-15:00", "16:00-17:00", "18:00-19:00", "20:00-21:00", "22:00-23:00"],
    }
  
  ];

  let filteredAppliances = [];
  let newAppliance = [];
  let newLastAppliance = [];
  let sanitizedInputs = [];

const CreatePreference = () => {
    const [enteredUsername, setUsername] = useState("");
    const [firstApplianceFound, setFirstApplianceFound] = useState(false);

    const [otherFirstPref, setOtherFirstPref] = useState('');
    const [otherSecondPref, setOtherSecondPref] = useState('');
    const [otherThirdPref, setOtherThirdPref] = useState('');

    const [chosenFirstPreference, setChosenFirstPreference] = useState("");
    const [chosenSecondPreference, setChosenSecondPreference] = useState("");
    const [chosenThirdPreference, setChosenThirdPreference] = useState("");

    const [appliances, setAppliances] = useState([]); // Array of appliances
    const [preferences, setPreferences] = useState([]);
    const [formValid, setFormValid] = useState(true);
    const [applianceFound, setApplianceFound] = useState(false);

    const [preferencesBtnClicked, setPreferencesBtnClicked] = useState(false);
    const [preferenceSubmitted, setPreferenceSubmitted] = useState(false);
    const [modalShown, setModalShown] = useState();

    const [showForm, setShowForm] = useState(true);
    const [showOkBtn, setShowOkBtn] = useState(true);

    const [enteredCommentTitle, setEnteredCommentTitle] = useState('');
    const [enteredCommentUsername, setEnteredCommentUsername] = useState('');
    const [enteredCommentReason, setEnteredCommentReason] = useState('');
    const [enteredCommentDescription, setEnteredCommentDescription] = useState('');

    const [firstApplianceData, setFirstApplianceData] = useState([]);

    let [nextApplianceData, setNextApplianceData] = useState([]);
    let [lastApplianceData, setLastApplianceData] = useState([]);

    const [nextApplianceDataInserted, setNextApplianceDataInserted] = useState(false);
    const [lastApplianceDataInserted, setLastApplianceDataInserted] = useState(false);
    const [chosenAppliance, setChosenAppliance] = useState("");

    const [lastApplianceFound, setLastApplianceFound] = useState(false);
    const [secondPrefSubmitted, setSecondPrefSubmitted] = useState(false);
    const [lastPrefSubmitted, setLastPrefSubmitted] = useState(false);

    const [dayChosenByUser, setDayChosenByUser] = useState(false);
    const [hasTheAppliance, setHasTheAppliance] = useState(false);

    const [appliancePrefSubmitted, setAppliancePrefSubmitted] = useState(false);
    
    useEffect(() => {
    }, [preferenceSubmitted])


    const preferencesSubmitHandler = async (e) => {

        try {

            e.preventDefault();

            if(chosenFirstPreference === chosenSecondPreference) {

                setFormValid(false);
                setShowForm(false);
                return setModalShown({title: 'Preference Error', message: "Invalid First Preference"});
            }

            else if(chosenSecondPreference === chosenThirdPreference) {

                setFormValid(false);
                setShowForm(false);
                return setModalShown({title: 'Preference Error', message: "Invalid Second Preference"});
            }

            else if(chosenFirstPreference === chosenThirdPreference) {
                setFormValid(false);
                setShowForm(false);
                return setModalShown({title: 'Preference Error', message: "Invalid Third Preference"});
            }

            else {

                processPreference();
                setFormValid(true);
                setShowOkBtn(false);
            }
          
        } 
        
        catch(err) {

            if(err) {

                setFormValid(false);
                return console.error(err);
            }

        }
    }

    useEffect(() => {

    }, [preferenceSubmitted, firstApplianceFound, secondPrefSubmitted, lastPrefSubmitted, lastApplianceFound, hasTheAppliance, appliancePrefSubmitted]);


    const processPreference = async () => {

        try {

            let invalidChars = ['<', '>', '()', "'", ';'];

            for(let i = 0; i < invalidChars.length; i++) {
                const invalidEntries = invalidChars[i];
    
                if(invalidEntries.includes(invalidEntries) || invalidEntries.includes(invalidEntries[i+1])) {
                   
                    const replacedSymbols = invalidChars[i].replace(invalidChars[i], "&lt");
                    sanitizedInputs.push({enteredUsername, replacedSymbols, invalidEntries});
                  
                   break;


                }
            }
    
            let lastAppliancePost = {};
    
            lastApplianceData.forEach((app, _key) => {
               lastAppliancePost = app;
            });
     
            return await axios.post(`http://localhost:5200/api/v1/preferences/create-preference`, {appliance: firstApplianceData[0], nextAppliance: nextApplianceData[0] , lastAppliance: lastAppliancePost.name, firstPreference: chosenFirstPreference, secondPreference: chosenSecondPreference , thirdPreference: chosenThirdPreference, day: dayChosenByUser}).then(response => {
            
            console.log(response.data.data);

                setModalShown({title: 'Your Preferences', message: `You have submitted your preference for ${firstApplianceData[0]} - now submit preferences for ${nextApplianceData[0]}`, showForm: false, showDefaultBtn: true});
    
                setAppliancePrefSubmitted(true);
    
                    if(appliancePrefSubmitted) {
                        setModalShown({title: 'Your Preferences', message: `You have submitted your preferences for ${nextApplianceData[0]} - you can now view your allocations below`, showForm: false, showDefaultBtn: true});
                    }
    
                    setChosenAppliance("");
    
                    setChosenFirstPreference("");
                    setChosenSecondPreference("");
                    setChosenThirdPreference("");
            
                    setPreferenceSubmitted(!preferenceSubmitted);
                    setFirstApplianceFound(false);
            
                    setSecondPrefSubmitted(!secondPrefSubmitted)
                    setLastApplianceFound(true);
            
                    setLastPrefSubmitted(true);
                    setLastApplianceFound(true);
            
                    if(preferenceSubmitted && secondPrefSubmitted) {
                        processNextAppliance();
                    }
            
                }).catch(err => {
    
                    if(err) {
    
                        return console.error(err);
                    }
                })
        }
        
        catch(error) {

            if(error) {
                return console.error(error.message);
            }

        }

      
        
    }
    
    const modalHandler = () => {
        {modalShown && setModalShown(null)}
    }

    useEffect(() => {
        return fetchAllAppliances();

    }, []);

    useEffect(() => {

    }, [firstApplianceFound, lastApplianceFound])

    const fetchAllAppliances = async () => {

        try {

            return await axios.get(`http://localhost:5200/api/v1/appliances/fetch-appliances`, {headers: {'Access-Control-Allow-Origin': '*'}}).then(response => {

                let appName;
                let nextAppName;
                let lastAppName;

                const allAppliances = response.data.appliances;
                setAppliances(allAppliances);
            
               for(let i = 0; i < allAppliances.length; i++) {
                   appName = allAppliances[0].name;
                   nextAppName = allAppliances[1].name; 
                   lastAppName = allAppliances.slice(-1)[0];
               }

               firstApplianceData.push(appName);
               nextApplianceData.push(nextAppName);

               lastApplianceData.push(lastAppName);

               setApplianceFound(true);
               setFirstApplianceFound(true); 
               setLastApplianceFound(true);
            
            }).catch(err => {

                if(err) {
                    const message = err.message;
                    return console.error(message);
                }

            })
        } 
        
        catch(error) {

            if(error) {
                throw new Error(error);
            }
        }
    }

    useEffect(() => {
    }, [applianceFound]);

    const processNextAppliance = async () => { // Process the next appliance for the user to choose from

        try {

            let firstApplianceObj = {};
            let nextApplianceObj = {};
            let lastApplianceObj = {};

            await new Promise(resolve => setTimeout(resolve))

                for(let i = 0; i < applianceNames.length - 1; i++) {

                        const firstAppliance = applianceNames[i];
                        const nextApplianceAvailable = applianceNames[i + 1]; // Fetch the next appliance

                        const lastAppliance = applianceNames.slice(-1)[0];
                        const applianceIndexes = applianceNames.indexOf(nextApplianceAvailable);

                   await new Promise(resolve => setTimeout((resolve)));
                        
                        if(applianceIndexes < applianceNames.length - 1) { 

                             firstApplianceObj = {firstAppliance};
                             nextApplianceObj = {nextApplianceAvailable};
                             lastApplianceObj = {lastAppliance};

                            firstApplianceData.push(firstApplianceObj);
                            nextApplianceData.push(nextApplianceObj);
                            lastApplianceData.push(lastApplianceObj);

                            setApplianceFound(!applianceFound);

                            for(let index = 0; index < nextApplianceData.length - 1; index++) {
                                
                                const data = nextApplianceData[index];
                                const recentlyInsertedIndex = nextApplianceData.indexOf(data) + 1;

                               if(nextApplianceData.length === 2) { 

                                  const filteredRecentlyInserted = nextApplianceData.slice(0, recentlyInsertedIndex).concat(nextApplianceData.slice(recentlyInsertedIndex + 1, nextApplianceData.length));
                                  filteredAppliances.push(filteredRecentlyInserted);
                                  
                                    // eslint-disable-next-line no-loop-func
                                    filteredAppliances.forEach((filteredVals) => {
                                        newAppliance.push(...filteredVals);
                                        nextApplianceData = [...newAppliance];
                                   });

                                    for(let z = 0; z < lastApplianceData.length - 1; z++) {
                                   
                                        const lastApplianceAvailable = lastApplianceData[z]
                                        newLastAppliance.push(lastApplianceAvailable);                                 
                                    }

                               }
                            }

                        setNextApplianceDataInserted(true);
                        setLastApplianceDataInserted(true);
                            
                      }
                }

        } 
        
        catch(err) {

            if(err) {
                throw new Error(err);
            }
        }
    }

    useEffect(() => {
      
    }, [nextApplianceDataInserted, lastApplianceDataInserted])


    // @description: Fetch User Preferences and store them in an array of preferences
    const fetchAllPreferences = async () => {

        try {

            return await axios.get(`http://localhost:5200/api/v1/preferences/fetch-preferences`, {headers: {'Access-Control-Allow-Origin': '*',}}).then(response => {

                const allPreferences = response.data.preferences;
                const length = response.data.preferences.length;

                setPreferences(allPreferences);
                setPreferencesBtnClicked(!preferencesBtnClicked);
                generateRandomTimeslots();

                preferences.push(allPreferences); 

                if(length === 0) {
                    return setModalShown({title: "Allocations", message: "No Allocations Found"});
                }

            }).catch(err => {

                if(err) {
                    throw new Error(err);

                }

            })
        } 
        
        catch(err) {
            
            if(err) {
                return console.error(err);
            }

        }
    }

    // Fair Negotiation Algorithm 1 Implementation
     const generateRandomTimeslots = () => {
    
        try {

            let firstOtherPrefIndex = otherPreferences[0].firstOtherPreference;
            let secondOtherPrefIndex = otherPreferences[0].secondOtherPreference
            let thirdOtherPrefIndex = otherPreferences[0].thirdOtherPreference;

            let firstRandomSlot = firstOtherPrefIndex[Math.floor(Math.random() * firstOtherPrefIndex.length)];
            let secondRandomSlot = secondOtherPrefIndex[Math.floor(Math.random() * secondOtherPrefIndex.length)];
            let thirdRandomSlot = thirdOtherPrefIndex[Math.floor(Math.random() * thirdOtherPrefIndex.length)]

            // Add Validation before setting the random timeslots
            setOtherFirstPref(firstRandomSlot); 
            setOtherSecondPref(secondRandomSlot);
            setOtherThirdPref(thirdRandomSlot);

            // Check to see if the first slot matches the user's entered one
            if(firstRandomSlot === secondRandomSlot || firstRandomSlot === thirdRandomSlot) {
                alert(`Some Allocations conflict with each other`)
            }

            if(secondRandomSlot === thirdRandomSlot) {
                alert(`Some Allocations conflict with each other`)
            }

        } 
        
        catch(error) {
        
            if(error) {
                const stack = error.stack

                console.log(stack);
            }
        }

    }

   const commentInputsHandler = (event) => {

       try {

            setEnteredCommentTitle(event.target.value);
            setEnteredCommentUsername(event.target.value);
            
            setEnteredCommentReason(event.target.value);
            setEnteredCommentDescription(event.target.value);
       } 
       
       catch(error) {

            if(error) {
                console.error(error);
                throw new Error(error);
            }
       }
       
   }

   const validateCommentTitle = function() {

    try {

        return enteredCommentTitle.trim().length !== 0;
    } 
    
    catch(error) {

        if(error) {

            return console.error(error);
        }

    }
   }

    const commentFormHandler = async (event) => {
        try {
            // Prevent form resubmission
            event.preventDefault();

            if(!validateCommentTitle()) {
                alert(`Invalid Comment Title`);
            }
           
            
         await axios.post(`http://localhost:5200/api/v1/comments/create-comment`, {commentTitle: enteredCommentTitle, commentUsername: enteredCommentUsername, commentReason: enteredCommentReason, commentDescription: enteredCommentDescription});
         return window.location.reload(false);

        } 
        
        catch(error) {

            if(error) {

             console.error(error);

            throw new Error(error);

            }
        }

    }

    return (

       <Fragment>

           <section className = "section--yourpreferences">

           <div className = "container grid grid--2-cols">
           {modalShown && <Modal onClick = {modalHandler} showSubmitBtn = {modalShown.showSubmitBtn} showDefaultBtn = {modalShown.showDefaultBtn} changeHandler = {commentInputsHandler} onBtnClick = {modalHandler} onSubmitBtnClick = {commentFormHandler} showInputs = {modalShown.showInputs} title = {modalShown.title} message = {modalShown.message} commTitle = {modalShown.commTitle} username = {modalShown.username} reason = {modalShown.reason} description = {modalShown.description} /> }

        <RegisterCard>
            <h1 className = "heading--primary login">{DEFAULT_TEXT.preferenceHeader}</h1>

        <form id = "pref--form" onSubmit = {preferencesSubmitHandler} method = "POST" className = "login--form">

        <div className = "issueType--box">

        {firstApplianceFound ? firstApplianceData.map((firstOne, key) => {

            return <div className = "first--box" key = {key}>

            <label className = "issue--lbl" htmlFor = "issue">Select Preferences For {firstOne}
                <input type = "hidden" value = {chosenAppliance} onSubmit = {() => setChosenAppliance(firstOne)} />
            </label>

            </div> 
            
        }) : null}

        {preferenceSubmitted && !firstApplianceFound && lastPrefSubmitted ? nextApplianceData.map((next, key) => {

        return <div key = {key}>

        <label className = "issue--lbl" htmlFor = "issue">Select Preferences For : {next}</label>

        </div>

        }) : null} 

            {preferenceSubmitted && !firstApplianceFound && !lastPrefSubmitted ? lastApplianceData.map((last, key) => {

            return <div key = {key}>

            <label className = "issue--lbl" htmlFor = "issue">Select Preferences For : {last.name}</label>

            </div>

    }) : null} 

     </div>

        <div className = "morningslot--box">

            <label className = "morning--lbl">First Preference</label>

            <select onChange = {(e) => {setChosenFirstPreference(e.target.value)}} value = {chosenFirstPreference} className = "box">
                <option>06:00-07:00</option>
                <option>07:00-08:00</option>
                <option>09:00-10:00</option>
                <option>11:00-12:00</option>
                <option>13:00-14:00</option>
                <option>15:00-16:00</option>
                <option>17:00-18:00</option>
                <option>18:00-19:00</option>
                <option>20:00-21:00</option>
                <option>22:00-23:00</option>
                <option>00:00-01:00</option>
                <option>02:00-03:00</option>
                <option>04:00-05:00</option>
            </select>

    </div>

        <div className = "latemorning--box">
            <label className = "second--lbl">Second Preference</label>

            <select onChange = {(e) => {setChosenSecondPreference(e.target.value)}} value = {chosenSecondPreference} className = "box">
                <option>06:00-07:00</option>
                <option>07:00-08:00</option>
                <option>09:00-10:00</option>
                <option>11:00-12:00</option>
                <option>13:00-14:00</option>
                <option>15:00-16:00</option>
                <option>17:00-18:00</option>
                <option>18:00-19:00</option>
                <option>20:00-21:00</option>
                <option>22:00-23:00</option>
                <option>00:00-01:00</option>
                <option>02:00-03:00</option>
                <option>04:00-05:00</option>
            </select>

        </div>

        <div className = "afternoon--box">

             <label className = "password--lbl">Third Preference</label>

            <select onChange = {(e) => {setChosenThirdPreference(e.target.value)}} value = {chosenThirdPreference} className = "box">

                <option>06:00-07:00</option>
                <option>07:00-08:00</option>
                <option>09:00-10:00</option>
                <option>11:00-12:00</option>
                <option>13:00-14:00</option>
                <option>15:00-16:00</option>
                <option>17:00-18:00</option>
                <option>18:00-19:00</option>
                <option>20:00-21:00</option>
                <option>22:00-23:00</option>
                <option>00:00-01:00</option>
                <option>02:00-03:00</option>
                <option>04:00-05:00</option>

            </select>

        </div>


        <div className = "day--box">

            <label className = "day--lbl">Day</label>

            <select onChange = {(e) => {setDayChosenByUser(e.target.value)}} value = {dayChosenByUser}  className = "box">
                <option>Monday</option>
                <option>Tuesday</option>
                <option>Wednesday</option>
                <option>Thursday</option>
                <option>Friday</option>
                <option>Saturday</option>
                <option>Sunday</option>
            </select>


        </div>

        <div className = "submit--container">
            <button className = "login--btn" type = "submit">Submit</button>
        </div>
        
    </form>

    </RegisterCard>

    </div>   

        <div className = "viewcontainer--btn">
            <button onClick = {fetchAllPreferences} className = "viewpreferences--btn">View Allocations</button>
        </div> 

        <section>
         
            {preferencesBtnClicked && firstApplianceFound ? preferences.map((preference, key) => {

                return <div key = {key}>

                    <div className = "preferences--card">

                    <h2 className = "appliance--heading">Allocations</h2>
                    <h2 className = "appliance--heading">{otherFirstPref}</h2>
                    <h2 className = "appliance--heading">{otherSecondPref}</h2>
                    <h2 className = "appliance--heading">{otherThirdPref}</h2>

                    <h2 className = "appliance--heading">Your Chosen Preferences for 1. {preference.appliance} and <br/> 2. {preference.nextAppliance}</h2>

                    <h2 className = "appliance--heading">{preference.firstPreference}</h2>
                    <h2 className = "appliance--heading">{preference.secondPreference}</h2>
                    <h2 className = "appliance--heading">{preference.thirdPreference}</h2>

        <Link className = "negotiate--btn" to = {{pathname: `/fair-negotiations/${preference.id}`, state: {preference, firstApplianceData}} }>Negotiate Allocations</Link>
                    
                    </div>
                </div>

            }) : null};
            
        </section>


    </section>

</Fragment>

    )
}


export default CreatePreference
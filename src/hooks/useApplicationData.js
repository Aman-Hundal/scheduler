import React, { useState, useEffect } from "react";
import axios from 'axios';

const useApplicationData = function(initial) {
  const [state, setState] = useState({ //parent object that stores every STATE. Rule of react -> we have to use setState function and throw out the old state and create a new one. SetStates works like this -> takes what the state is going to be and throws out the old state and repalces it with new
    selectedDay: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const baseURL = "http://localhost:8001";

  const updateSpots = function(state, appointments, id) {
    let spots = 0;

    const day = state.days.find(elm => elm.name === state.selectedDay);

    for (const id of day.appointments) {
      const appointment = appointments[id];

      if (!appointment.interview) {
        spots++;
      }
    }

    //DEEP UPDATE 
    //Level 1 Update
    const newDay = {...day, spots};
    
    //Level 2 update. This will be a days object that we can return and package into a spread update -> const days = updateSpots() -> seState({...state, days})
    const newDays = state.days.map((elm) => {
      if (elm.name === state.selectedDay) {
        return newDay;
      } else {
        return elm;
      }
    })

    return newDays;
  }

  useEffect(() => { //initial axios call to gather/get al the intial API Data.
    //package your api requests into variables (we can call them promise variables)
    const appointmentsPromise = axios.get(baseURL+"/api/appointments");
    const daysPromise = axios.get(baseURL+"/api/days");
    const interviewersPromise = axios.get(baseURL+"/api/interviewers");

    const promises = [daysPromise, appointmentsPromise, interviewersPromise ] //create an array of promises to easily track your promises. Order them in the order you need your data (ie. we need days data before appointments as appointsments needs days)

    Promise.all(promises) //pass in our promises array to the promises.all which will return an array of promises. We pass this array of promises (all) to a .then to unwrap the pormise and get the api data as an array
    .then((all) => { //all is the promise array passed down from the promises.all
      // console.log(all)
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data})); //previous function = react uses this to keep track of multiple state changes. Think of states as like asyncs they can go in diff orders. Previous fucntion sayas that for you to do this tates change get rid of prev first. Prev is an arguements that represensts the previous stte
    }); //setSTate function MUST RETURN THE NEW STATE which goes after the prev arg. By calling ...prev we spread out the previous state object, and anything that goes after hte comma is the new values we are appyling to the prev states. This function overall returns a new state object with the days and appointment state keys changed with new values. 
  }, []);

  const setSelectedDay = selectedDay => setState({ ...state, selectedDay }); //creates a function called setSelectedDay which updates the state of the selectedDay state. CAN DO THIS FOR DAYS AND APPOINTMENTS TOO TO CREATE SEPEARTE ACTION STATE SETTERS FOR THEIR OWN SPECIFIC STATES.
  // const setDays = (days) => { //createing a specific setter above using different function notation
  //   // setState({ ...state, days }) //this is removed cause of below notes
  //   return setState(prev => ({...prev, days})); // this is needed because we are now referring to state in the effect method, but we haven't declared it in the dependency list. We don't want to make the request every time the component renders. Need to do below instead to remove the dependencey.
  // }

  const bookInterview = async function(id, interview) { //function will allow us to change the local state when we book an interview. -> change the interviewers object in state obj
    // console.log("ID is:",id, interview);
    const appointment = { //We want to create a new appointment object starting with the values copied from the existing appointment. We replace the current value of the interview key with the new value.
      ...state.appointments[id], //copy of current appointment object with the match id above. We can keep this info the same (no need to change appointment id already in DB/state)
      interview: {...interview} //new interview object for the new appointment. comma after spread opperator = new data for the copied data
    };
    const appointments = { //Now that we have an appointment object, we can move a level up and work on updating the appointments object. We use the update pattern to replace the existing record with the matching id.
      ...state.appointments, //make copy of appointments state in the state object above
      [id]: appointment //add the new appointment object created in this function as new data to the copied appointments variable. we use the id to replace the existing record (in the db) with the matchhing id
    };
    await axios.put(baseURL+`/api/appointments/${id}`, {interview}) //axios call to update our api db with the inerview data sent over
    .then((response) => {
      // console.log(response.status)
      const days = updateSpots(state, appointments, id);
      setState({...state, days, appointments}); //this recreates the state object and then after the comma it replaces the previous appointments with the new appointments created above. With spread operators if we pass in a value with the same name as a value that exists in the spreaded obj after a comma the value mentioned will be adjusted/modified/updated 
    })
  }

  const cancelInterview = async function(id) {
    // console.log("appointment id:", id)
    const deletedAppointment = {...state.appointments[id], interview: null};
    const appointments = {...state.appointments, [id]: deletedAppointment};
    await axios.delete(baseURL+`/api/appointments/${id}`)
    .then((response) => {
      // console.log(response.status)
      const days = updateSpots(state, appointments, id);
      setState({...state, days, appointments})
    })
  }

  return {
    state,
    setSelectedDay,
    bookInterview,
    cancelInterview
  };
}

export default useApplicationData;

// The custom hook useApplicationData will be responsible for loading the initial data from the API, and when any of the provided actions are called the state updates, causing the component to render
import React, { useState, useEffect } from "react";
import axios from 'axios';

// This custom hook useApplicationData will be responsible for loading the initial data from the API, and manage the key states of our application. 
const useApplicationData = function(initial) {
  const [state, setState] = useState({
    selectedDay: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const baseURL = "http://localhost:8001";

  //Function which updates our spots state when daily appointments are deleted or added.
  const updateSpots = function(state, appointments, id) {
    let spots = 0;

    const day = state.days.find(elm => elm.name === state.selectedDay);

    for (const id of day.appointments) {
      const appointment = appointments[id];

      if (!appointment.interview) {
        spots++;
      }
    }

    const newDay = {...day, spots};
    
    const newDays = state.days.map((elm) => {
      if (elm.name === state.selectedDay) {
        return newDay;
      } else {
        return elm;
      }
    })
    return newDays;
  }

  //Hook which gathers all of our API DB data.
  useEffect(() => {
    const appointmentsPromise = axios.get(baseURL+"/api/appointments");
    const daysPromise = axios.get(baseURL+"/api/days");
    const interviewersPromise = axios.get(baseURL+"/api/interviewers");

    const promises = [daysPromise, appointmentsPromise, interviewersPromise ];

    Promise.all(promises)
    .then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    });
  }, []);

  //Functions allows us to set the currently selected day state. 
  const setSelectedDay = selectedDay => setState({ ...state, selectedDay });

  //Function that updates our application state and API DB data. This is the key function that creates new appointments and allows for the adjusting of existing appointments.
  const bookInterview = async function(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    await axios.put(baseURL+`/api/appointments/${id}`, {interview})
    .then((response) => {
      const days = updateSpots(state, appointments, id);
      setState({...state, days, appointments});
    })
  }

  //Function that updates our application state and API DB data. This is the key function that deletes existing appointments by adjusting the interview object to null values.
  const cancelInterview = async function(id) {
    const deletedAppointment = {...state.appointments[id], interview: null};
    const appointments = {...state.appointments, [id]: deletedAppointment};
    await axios.delete(baseURL+`/api/appointments/${id}`)
    .then((response) => {
      const days = updateSpots(state, appointments, id);
      setState({...state, days, appointments});
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
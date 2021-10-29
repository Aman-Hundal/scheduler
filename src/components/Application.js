import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment  from "./Appointment";
import axios from 'axios';
import { getAppointmentsForDay } from "helpers/selectors";
// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer:{
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer:{
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "4pm",
//   }
// ];

export default function Application(props) {
  const [state, setState] = useState({ //parent object that stores every STATE. Rule of react -> we have to use setState function and throw out the old state and create a new one. SetStates works like this -> takes what the state is going to be and throws out the old state and repalces it with new
    selectedDay: "Monday",
    days: [],
    appointments: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.selectedDay);

  const setSelectedDay = selectedDay => setState({ ...state, selectedDay }); //creates a function called setSelectedDay which updates the state of the selectedDay state. CAN DO THIS FOR DAYS AND APPOINTMENTS TOO TO CREATE SEPEARTE ACTION STATE SETTERS FOR THEIR OWN SPECIFIC STATES.
  // const setDays = (days) => { //createing a specific setter above using different function notation
  //   // setState({ ...state, days }) //this is removed cause of below notes
  //   return setState(prev => ({...prev, days})); // this is needed because we are now referring to state in the effect method, but we haven't declared it in the dependency list. We don't want to make the request every time the component renders. Need to do below instead to remove the dependencey.
  // }

  const baseURL = "http://localhost:8001";
  const parsedAppointments = dailyAppointments.map((appts, index) => {
    return <Appointment key={appts.id} {...appts} />
  });

  useEffect(() => {
    //package your api requests into variables (we can call them promise variables)
    const appointmentsPromise = axios.get(baseURL+"/api/appointments");
    const daysPromise = axios.get(baseURL+"/api/days");
    const interviewersPromise = axios.get(baseURL+"/api/interviewers");

    const promises = [daysPromise, appointmentsPromise, interviewersPromise ] //create an array of promises to easily track your promises. Order them in the order you need your data (ie. we need days data before appointments as appointsments needs days)

    Promise.all(promises) //pass in our promises array to the promises.all which will return an array of promises. We pass this array of promises (all) to a .then to unwrap the pormise and get the api data as an array
    .then((all) => { //all is the promise array passed down from the promises.all
      // console.log(all)
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data})); //previous function = react uses this to keep track of multiple state changes. Think of states as like asyncs they can go in diff orders. Previous fucntion sayas that for you to do this tates change get rid of prev first. Prev is an arguements that represensts the previous stte
    }); //setSTate function MUST RETURN THE NEW STATE which goes after the prev arg. By calling ...prev we spread out the previous state object, and anything that goes after hte comma is the new values we are appyling to the prev states. This function overall returns a new state object with the days and appointment state keys changed with new values. 
  }, []);


  parsedAppointments.push(<Appointment key="last" time="5pm" />)

  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
          days={state.days}
          value={state.selectedDay}
          onChange={setSelectedDay}
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {parsedAppointments}
      </section>
    </main>
  );
}

//When we call the setDay action, it changes the day state. When we change the state, the <Application> renders and passes the new day to the <DayList>. 
// The <DayList> renders and passes props to the <DayListItem> children causing the updates to the selected visual state.

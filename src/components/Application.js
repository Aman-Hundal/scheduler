import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment  from "./Appointment";
import axios from 'axios';
const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer:{
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer:{
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  {
    id: 5,
    time: "4pm",
  }
];

export default function Application(props) {
  const [days, setDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState("Monday")
  const baseURL = "http://localhost:8001/api/days";
  const parsedAppointments = appointments.map((appts, index) => {
    return <Appointment key={appts.id} {...appts} />
  });

  useEffect(() => {
    axios.get(baseURL)
    .then((response) => {
      setDays((prev) => {
        // console.log(response.data)
        return prev = response.data;
      })
    });
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
          days={days}
          value={selectedDay}
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

import React from 'react';
import useApplicationData from "hooks/useApplicationData";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {
  
  const {
    state,
    setSelectedDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();
  
  const dailyAppointments = getAppointmentsForDay(state, state.selectedDay);
  const dailyInterviewers = getInterviewersForDay(state, state.selectedDay);
  
  const parsedAppointments = dailyAppointments.map(appts => {
    const interview = getInterview(state, appts.interview);
    return <Appointment cancelInterview={cancelInterview} bookInterview={bookInterview} key={appts.id} id={appts.id} interview={interview} time={appts.time} dailyInterviewers={dailyInterviewers} />
  });
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

//to do -> final review of requirements + deploy on heroku

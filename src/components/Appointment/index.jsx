import React, { Fragment } from "react";
import "./styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import useVisualMode from "hooks/useVisualMode"; // we want to use the custom hook to determine the mode and then conditioanlly render the matching component


export default function Appointment(props) {
  const { time, interview, dailyInterviewers } = props
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment"> 
      <Header time={time} />
      { mode === EMPTY && <Empty onAdd={() => transition(CREATE)} /> }
      { mode === SHOW && <Show interviewer={interview.interviewer} student={interview.student} onDelete={() => console.log("Clicked onDelete")} onEdit={() => console.log("Clicked onEdit")} /> }
      { mode === CREATE && <Form interviewers={dailyInterviewers} onSave={() => console.log("Clicked onSave")} onCancel={() => back()} /> }
    </article>
  );
}
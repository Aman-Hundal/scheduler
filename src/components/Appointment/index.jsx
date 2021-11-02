import React, { Fragment } from "react";
import "./styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import useVisualMode from "hooks/useVisualMode"; // we want to use the custom hook to determine the mode and then conditioanlly render the matching component


export default function Appointment(props) {
  const { time, interview, dailyInterviewers, bookInterview, id, cancelInterview } = props
  // console.log(props.interview)
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT"
  const DELETING = "DELETING"
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  const save = async function(name, interviewer) {//this function is passed to the form component. Ensures that the child can call the action with the correct data. The form should capture the name and interviewre and pas them to props.onSave as args. We then create a new interview object to be passed to props.bookInterview.
    transition(SAVING);
    const interview = { //this function captures the name and interviewre and pass them to on.Save args. We then create a new interview obj to be passed to props.bookinterview. 
      student: name,
      interviewer
    };
    await bookInterview(id, interview) //The data gathered here is enough to change our state object and create a new appointment to our DB-> we have an appt id, sutendet name and interview numbe.
    transition(SHOW);
  }

  const deleteAppt = async function() {
    transition(DELETING);
    await cancelInterview(id);
    transition(EMPTY);
  }

  return (
    <article className="appointment"> 
      <Header time={time} />
      { mode === EMPTY && <Empty onAdd={() => transition(CREATE)} /> }
      { mode === SAVING && <Status message={"Saving"} /> }
      { mode === DELETING && <Status message={"Deleting"} /> }
      { mode === CONFIRM && <Confirm message={"Are you sure you would like to delete your appointment?"} onCancel={back} onConfirm={deleteAppt} /> }
      { mode === SHOW && <Show id={id} interviewer={interview.interviewer} student={interview.student} onDelete={() => transition(CONFIRM)} onEdit={() => transition(EDIT)} /> }
      { mode === CREATE && <Form interviewers={dailyInterviewers} save={save} onCancel={() => back()} /> }
      { mode === EDIT && <Form interviewers={dailyInterviewers} save={save} onCancel={() => back()} currentStudent={interview.student} currentInterviewer={interview.interviewer} /> }
    </article>
  );
}
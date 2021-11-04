import React, { Fragment } from "react";
import "./styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import useVisualMode from "hooks/useVisualMode";
import Error from "components/Appointment/Error";

export default function Appointment(props) {
  const { time, interview, dailyInterviewers, bookInterview, id, cancelInterview } = props;
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const DELETING = "DELETING";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DElete";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  // Save function which creates an interview object which is sent to our API DB. This function creates a new interview and edits existing inteviews.
  const save = async function(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    await bookInterview(id, interview)
    .then((res) => {
      transition(SHOW);
    })
    .catch((error) => {
      console.error("ERROR MESSAGE:", error);
      transition(ERROR_SAVE, true);
    });
  }

  //Delete function which sends an API request to our DB API and sets an interview object to null. This function deletes/cancels an existing interview. 
  const deleteAppt = async function() {
    transition(DELETING, true);
    await cancelInterview(id)
    .then((res) => {
      transition(EMPTY);
    })
    .catch((error) => {
      console.error("ERROR MESSAGE:", error);
      transition(ERROR_DELETE, true);
    });
  }

  //Appointment component rendering
  return (
    <article className="appointment"> 
      <Header time={time} />
      { mode === EMPTY && <Empty onAdd={() => transition(CREATE)} /> }
      { mode === SAVING && <Status message={"Saving"} /> }
      { mode === DELETING && <Status message={"Deleting"} /> }
      { mode === CONFIRM && <Confirm message={"Are you sure you would like to delete your appointment?"} onCancel={back} onConfirm={deleteAppt} /> }
      { mode === SHOW && <Show id={id} interviewer={interview.interviewer} student={interview.student} onDelete={() => transition(CONFIRM)} onEdit={() => transition(EDIT)} /> }
      { mode === CREATE && <Form interviewers={dailyInterviewers} save={save} onCancel={() => back()} /> }
      { mode === EDIT && <Form interviewers={dailyInterviewers} save={save} onCancel={() => back()} currentStudent={interview.student} currentInterviewer={interview.interviewer.id} /> }
      { mode === ERROR_DELETE && <Error message={"We apologize, there was an error cancelling your appointment. Please try again"} onClose={() => back()} /> }
      { mode === ERROR_SAVE && <Error message={"We apologize, there was an error booking your appointment. Please try again"} onClose={() => back()} /> }
    </article>
  );
}
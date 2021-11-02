import React, { useState } from 'react';
import Button from 'components/Button';
import InterviewerList from 'components/InterviewerList';

export default function Form(props) {
  const { currentStudent, currentInterviewer, interviewers, save, onCancel } = props;
  // console.log('curreInterviewre with K', currentInterviewer)
  const [student, setStudent] = useState(currentStudent|| "" );
  const [interviewer, setInterviewer ] = useState(currentInterviewer || null); // || operator will evalato to left hand if the value is truthy, else willl be right hand expression as itll be valued as a falesy
  const reset = function() {
    setStudent((prev) => {
      return prev = "";
    })
    
    setInterviewer((prev) => {
      return prev = null;
    })
  }

  const cancel = function() {
    reset();
    onCancel();
  }

  // console.log("RECENT CONSOLE:", interviewer)

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={(event) => {event.preventDefault()}} autoComplete="off">
          <input onChange={(event) => {setStudent(event.target.value)}} 
            value={student}
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
          />
        </form>
        <InterviewerList 
          interviewers={interviewers} onChange={setInterviewer} value={interviewer} currentInterviewer={currentInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => {save(student, interviewer)}}>Save</Button>
        </section>
      </section>
    </main>
  )
}
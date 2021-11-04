import React, { useState } from 'react';
import Button from 'components/Button';
import InterviewerList from 'components/InterviewerList';

export default function Form(props) {
  const { currentStudent, currentInterviewer, interviewers, save, onCancel } = props;
  const [student, setStudent] = useState(currentStudent|| "" );
  const [interviewer, setInterviewer ] = useState(currentInterviewer || null);
  const [error, setError] = useState("");
  const [errorInterviewer, setErrorInterviewer] = useState("");

  //Reset function. Sets student and interviewer states in the form to blank. This is executed in the cancel function. 
  const reset = function() {
    setStudent((prev) => {
      return prev = "";
    })
    
    setInterviewer((prev) => {
      return prev = null;
    })
  }

  // Cancel function which resets the form fields, and error messages. Fucntion is executed on the click of the cancel button in the form field.
  const cancel = function() {
    reset();
    onCancel();
    setError(prev => "");
    setErrorInterviewer(prev => "");
  }

  //Validation function which ensures that the student name is not blank, and a interviewer is selected. If either is true, the save function cannot be executed. 
  function validate() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }

    if (interviewer === null || currentInterviewer === null) {
      setErrorInterviewer("Please select an interviewer");
      return;
    }
    
    setError(prev => "");
    setErrorInterviewer(prev => "");
    save(student, interviewer);
  }

  //Form component rendering. Uses the React pattern of a controlled component. 
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
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList 
          interviewers={interviewers} onChange={setInterviewer} value={interviewer} currentInterviewer={currentInterviewer}
        />
      <section className="appointment__validation">{errorInterviewer}</section>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => {validate()}}>Save</Button>
        </section>
      </section>
    </main>
  )
}
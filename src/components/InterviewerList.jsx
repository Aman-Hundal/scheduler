import React from 'react';
import "components/InterviewerList.scss";
import InterviewerListItem from './InterviewerListItem'; //imports the component to use. Remember components are just functions, so we have export and import them to use them

export default function InterviewerList(props) {
  const { interviewers, value, onChange } = props; //call in the props taken from the parent. Props are just data passed down from parent. These are then passed down to this components childnre and so on (prop drilling)
  
  const parsedInterviewers = interviewers.map((elm) => { // IMPORTANT -> map is done to create a new/modified array of interviewlistitem components with associated/correct props. The correct props needed are outlined in the interiewlistitem component; this interviewlistitem component takes in these outlined/passed down props with (denoted with {}) and creates the component data from these passed down props/data
    if (value === elm.id) {
      return <InterviewerListItem selected={elm.id === value} setInterviewer={() => onChange(elm.id)} id={elm.id} name={elm.name} avatar={elm.avatar} key={elm.id} />
    }
    return <InterviewerListItem setInterviewer={() => onChange(elm.id)} id={elm.id} name={elm.name} avatar={elm.avatar} key={elm.id} />
  });



  //parsedInterviewers Array is called with {} in the u/l. JSX AUTOMATICALLY LOOPS THROUGH ARRAYS AND SPITS OUT THE VALUES WHEN ARRAYS ARE USED IN JSX. Therefore no forloop neded to extract the interviewlistitem components created in the maap

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{parsedInterviewers}</ul>
    </section>
  )
}
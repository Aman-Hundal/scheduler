import React from 'react';
import "components/InterviewerList.scss";
import InterviewerListItem from './InterviewerListItem';
import PropTypes from 'prop-types';

export default function InterviewerList(props) {
  const { interviewers, value, onChange } = props;
  //Mapping function done to create an array of interviewlistitem components with the required props. This new array is passed below to render a list of daily interviewers.
  const parsedInterviewers = interviewers.map((elm) => {
    if (value === elm.id) {
      return <InterviewerListItem selected={elm.id === value} setInterviewer={() => onChange(elm.id)} id={elm.id} name={elm.name} avatar={elm.avatar} key={elm.id} />
    }
    return <InterviewerListItem setInterviewer={() => onChange(elm.id)} id={elm.id} name={elm.name} avatar={elm.avatar} key={elm.id} />
  });

  //InterviewerList component rendering.
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{parsedInterviewers}</ul>
    </section>
  );
}

//Use of props-type library to validate our interviewlist props (and ensure it is an array)
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};
import React, { Fragment } from "react";
import "./styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";


export default function Appointment(props) {
  const { time, interview } = props
  return (
    <article className="appointment"> 
      <Header time={time} />
      {interview ? <Show interviewer={interview.interviewer} student={interview.student} /> : <Empty />}
    </article>
  );
}
import React from 'react';
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {
  const { name, avatar, setInterviewer, selected } = props;

  let interviewerClass = classNames('interviewers__item', {'interviewers__item--selected': selected});

  return (
    <li className={interviewerClass} onClick={setInterviewer}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      { selected && name }
    </li>
  );
}
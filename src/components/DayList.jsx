import React from 'react';
import DayListItem from 'components/DayListItem';

export default function DayList(props) {
  const { days, onChange, value  } = props;
  // Mapping of array which generates weekdays with their coressponding name and spots available.
  const parsedDaysArray = days.map((elm) => {
    if (value === elm.name) {
      return <DayListItem setDay={onChange} key={elm.id} spots={elm.spots} name={elm.name} selected />;
    } else {
      return <DayListItem setDay={onChange} key={elm.id} spots={elm.spots} name={elm.name} />;
    }
  });
  
  // DayList component rendering.
  return (
    <ul>
      {parsedDaysArray}
    </ul>
  );
}
import React from 'react';
import DayListItem from 'components/DayListItem';

export default function DayList(props) {
  const { days, onChange, value  } = props; //Remember we expect a days array to be passed to our <DayList> component as a prop (and appropriately, we are passing an array of three days in our Storybook tests). Each object in the days array contains all the information to populate one <DayListItem> component.
  const parsedDaysArray = days.map((elm) => {
    if (value === elm.name) {
      return <DayListItem setDay={onChange} key={elm.id} spots={elm.spots} name={elm.name} selected />;
    } else {
      return <DayListItem setDay={onChange} key={elm.id} spots={elm.spots} name={elm.name} />;
    }
  })
  
  return (
    <ul>
      {parsedDaysArray}
    </ul>
  )
}
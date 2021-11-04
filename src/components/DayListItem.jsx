import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  const { name, spots, selected, setDay } = props;
  // console.log("DayListItem Props", props)
  let dayClass = classNames('day-list__item', {"day-list__item--selected": selected}, {"day-list__item--full": spots === 0});

  const formatSpots = function () {
    if (spots > 1) {
      return <h3 className="text--light">{spots} spots remaining</h3>
    } else if (spots === 1) {
      return <h3 className="text--light">{spots} spot remaining</h3>
    } else if (spots === 0) {
      return <h3 className="text--light">no spots remaining</h3>
    }
  }

  return (
    <li onClick={() => setDay(name)} className={dayClass}  >
      <h2 className="text--regular">{name}</h2> 
      {formatSpots()}
    </li>
  );
}

// The <li> represents the entire day item
// The <h2> should display the day name
// The <h3> should display the spots remaining for a day

// props
// name:String the name of the day
// spots:Number the number of spots remaining
// selected:Boolean true or false declaring that this day is selected
// setDay:Function accepts the name of the day eg. "Monday", "Tuesday"

//, 
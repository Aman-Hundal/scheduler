import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  const { name, spots, selected, setDay } = props;
  let dayClass = classNames('day-list__item', {"day-list__item--selected": selected}, {"day-list__item--full": spots === 0});

  //Function which helps generate and control spots remaining string in daylist component. 
  const formatSpots = function() {
    if (spots > 1) {
      return <h3 className="text--light">{spots} spots remaining</h3>
    } else if (spots === 1) {
      return <h3 className="text--light">{spots} spot remaining</h3>
    } else if (spots === 0) {
      return <h3 className="text--light">no spots remaining</h3>
    }
  }

  //DayListItem component rendering.
  return (
    <li onClick={() => setDay(name)} className={dayClass}  >
      <h2 className="text--regular">{name}</h2> 
      {formatSpots()}
    </li>
  );
}
import React from 'react';

export default function Empty(props) {
  const { onAdd } = props;
  
  return (
    <main className="appointment__add">
      <img onClick={onAdd}
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
      />
    </main>
  );
}
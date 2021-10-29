export const getAppointmentsForDay = function(state, day) {
  const resultArr = [];
  
  if (state.days.length === 0) {
    return resultArr;
  }

  const apptKeysArr = Object.keys(state.appointments);
  
  const dailyAppts = state.days.filter((elm) => {
    return elm.name === day;
  });

  if (dailyAppts.length === 0) {
    return resultArr;
  }

  for (const key of apptKeysArr) {
    if (dailyAppts[0].appointments.includes(Number(key))) {
      resultArr.push(state.appointments[key])
    }
  }

  return resultArr;
};

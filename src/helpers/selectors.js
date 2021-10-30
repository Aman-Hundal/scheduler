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

export const getInterview = function (state, interview) {
  const newObj = {};
  const interviewerObj = state.interviewers;
  // interview.student
  // interview.interviewers
  if (!interview) {
    return null;
  }
  // console.log(interviewerObj)
  for (const key in interviewerObj) {
    if (Number(key) === interview.interviewer) {
      newObj.student = interview.student;
      newObj.interviewer = state.interviewers[key];
    }
  }
  return newObj;
}

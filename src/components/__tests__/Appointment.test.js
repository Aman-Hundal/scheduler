/*
  We are rendering `<Application />` down below, so we need React.createElement
*/
import React from "react";
/*
  We import our helper functions from the react-testing-library
  The render function allows us to render Components
*/
import { render, cleanup } from "@testing-library/react";
/*
  We import the component that we are testing
*/
import Appointment from "components/Appointment/index";

afterEach(cleanup);


/*
  A test that renders a React Component
*/
describe("Appointment", () => {
  const mockAppts = [
    {"id":1,"time":"12pm","interview":{"student":"Archie Cohen","interviewer":10}},
    {"id":2,"time":"1pm","interview":{"student":"Aman Hundal","interviewer":6}}
  ]
  
  it("renders without crashing", () => {
    render(<Appointment cancelInterview={() => {}} bookInterview={() => {}} key={mockAppts[0].id} id={mockAppts[0].id} interview={mockAppts[0].interview} time={mockAppts[0].time} dailyInterviewers={mockAppts} />);
  });
});
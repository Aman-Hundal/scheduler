import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";

import Form from "components/Appointment/Form";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  it("renders without student name if not provided", () => {
    const {getByPlaceholderText} = render(<Form interviewers={interviewers} save={() => {}} onCancel={() => {}} />);
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    const {getByTestId} = render(<Form interviewers={interviewers} currentStudent="Lydia Miller-Jones" save={() => {}} onCancel={() => {}} />);
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  //5 behviours that we would like to verify for now new feature (value field for student name must not be blank)
  it("validates that the student name is not blank", () => {
    /* 1. validation is shown */
    const save = jest.fn(); //its just a fake function/mock function. Its not supposed to do anything
    const {getByText} = render(<Form interviewers={interviewers} save={save} currentStudent="" onCancel={() => {}} />);
    fireEvent.click(getByText("Save"));
    
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument(); //value being passed into query is a case insesitive regex
  
    /* 2. save is not called */
    expect(save).not.toHaveBeenCalled();
  });
  
  it("calls save function when the name is defined", () => {
    /* 3. validation is not shown */
    const save = jest.fn(); 
    const {queryByText, getByText} = render(<Form interviewers={interviewers} save={save} currentStudent="Lydia Miller-Jones" onCancel={() => {}} />);
    fireEvent.click(getByText("Save"));

    expect(queryByText(/student name cannot be blank/i)).toBeNull();
  
    /* 4. save is called once*/
    expect(save).toHaveBeenCalledTimes(1);
  
    /* 5. save is called with the correct arguments */
    expect(save).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  });

});
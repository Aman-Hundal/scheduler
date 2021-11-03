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
  
  // it("calls save function when the name is defined", () => {
  //   /* 3. validation is not shown */
  //   const save = jest.fn(); 
  //   const {queryByText, getByText} = render(<Form interviewers={interviewers} save={save} currentStudent="Lydia Miller-Jones" onCancel={() => {}} />);
  //   fireEvent.click(getByText("Save"));

  //   expect(queryByText(/student name cannot be blank/i)).toBeNull();
  
  //   /* 4. save is called once*/
  //   expect(save).toHaveBeenCalledTimes(1);
  
  //   /* 5. save is called with the correct arguments */
  //   expect(save).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  // });

  // it("submits the name entered by the user", () => {
  //   const save = jest.fn();
  //   const { getByText, getByPlaceholderText } = render(
  //     <Form interviewers={interviewers} save={save} student="Lydia Miller-Jones" onCancel={() => {}} />
  //   );
  
  //   const input = getByPlaceholderText("Enter Student Name");
  
  //   fireEvent.change(input, { target: { value: "Lydia Miller-Jones" } }); //triggers the onChange event for the input field. With this change we execute teh code on line 40 and increases our code coverage (function coverage)
  //   fireEvent.click(getByText("Save"));
  
  //   expect(save).toHaveBeenCalledTimes(1);
  //   expect(save).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  // });

  //this test replace the above 2 tests and add an additonal layer that ensures that the student name cannot be blank message disapears afeter a correct save/submission is made
  it("can successfully save after trying to submit an empty student name", () => {
    const save = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form interviewers={interviewers} save={save} student="Lydia Miller-Jones" currentInterviewer={1} onCancel={() => {}} />
    );
  
    fireEvent.click(getByText("Save"));
  
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(save).not.toHaveBeenCalled();
  
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
  
    fireEvent.click(getByText("Save"));
  
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
  
    expect(save).toHaveBeenCalledTimes(1);
    expect(save).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  });

  it("calls onCancel and resets the student name input field and the interviewer selection to null", () => {
    //step 1- > set up of test
    const onCancel = jest.fn();
    const save = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
    <Form interviewers={interviewers} save={save} currentInterviewer={null} onCancel={onCancel} />
    );
      
    //step 2 -> actual testing of functionality of save and oncancel
    fireEvent.click(getByText("Save"));
  
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByText("Save"));
     

    expect(getByText(/please select an interviewer/i)).toBeInTheDocument();
    
    //fire event click on the cancel button -> what should happen now is there will be no student name cannot be blank + student name field = "" and interview = null
    fireEvent.click(getByText("Cancel"));
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(queryByText(/please select an interviewer/i)).toBeNull();
    
  
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("validates that the interviewer selection is not null", () => {
    const save = jest.fn();
    const {getByText} = render(<Form interviewers={interviewers} save={save} currentStudent="Lydia Miller-Jones" currentInterviewer={null} onCancel={() => {}} />);
    fireEvent.click(getByText("Save"));
    
    expect(getByText(/please select an interviewer/i)).toBeInTheDocument();
  
    expect(save).not.toHaveBeenCalled();
  });

    it("calls save function when the interviewre is not null (and selected)", () => {
    /* 3. validation is not shown */
    const save = jest.fn(); 
    const {queryByText, getByText} = render(<Form interviewers={interviewers} save={save} currentStudent="Lydia Miller-Jones" currentInterviewer={8} onCancel={() => {}} />);
    fireEvent.click(getByText("Save"));

    expect(queryByText(/please select an interviewer/i)).toBeNull();
  
    /* 4. save is called once*/
    expect(save).toHaveBeenCalledTimes(1);
  
    /* 5. save is called with the correct arguments */
    expect(save).toHaveBeenCalledWith("Lydia Miller-Jones", 8);
  });

});
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test("inputs should be initially empty", () => {
  render(<App />);
  const emailInputElement = screen.getByRole("textbox");
  const passwordInputElement = screen.getByLabelText("Password");
  const confirmPasswordInputElement = screen.getByLabelText(/confirm password/i);
  expect(emailInputElement.value).toBe("");
  expect(passwordInputElement).toHaveValue("");
  expect(confirmPasswordInputElement).toHaveValue("");
});

test("should be able to type an email", () => {
  render(<App />);
  const emailInputElement = screen.getByRole("textbox", {
    name: /email/i
  });
  userEvent.type(emailInputElement, "test@gmail.com");
  expect(emailInputElement).toHaveValue("test@gmail.com");
});

test("should be able to type a password", () => {
  render(<App />);
  const passwordInputElement = screen.getByLabelText("Password");
  userEvent.type(passwordInputElement, "strong");
  expect(passwordInputElement).toHaveValue("strong");
});

test("should be able to type a confirm password", () => {
  render(<App />);
  const confirmPasswordInputElement = screen.getByLabelText(/confirm password/i);
  userEvent.type(confirmPasswordInputElement, "strong");
  expect(confirmPasswordInputElement).toHaveValue("strong");
});

test("should show email error message on invalid email", () => {
  render(<App />);
  const emailErrorElement = screen.queryByText(/the email you input is invalid./i);
  const emailInputElement = screen.getByRole("textbox", {
    name: /email/i
  });
  const submitBtnElement = screen.getByRole("button");
  
  expect(emailErrorElement).not.toBeInTheDocument();

  userEvent.type(emailInputElement, "testgmail.com");
  userEvent.click(submitBtnElement);

  const emailErrorElementAgain = screen.queryByText(/the email you input is invalid./i);

  expect(emailErrorElementAgain).toBeInTheDocument();
});

test("should show password error message on too short of password", () => {
  render(<App />);
  const emailInputElement = screen.getByRole("textbox", {
    name: /email/i
  });
  const passwordInputElement = screen.getByLabelText("Password");
  const submitBtnElement = screen.getByRole("button");
  
  userEvent.type(emailInputElement, "test@gmail.com");
  userEvent.type(passwordInputElement, "stro");
  userEvent.click(submitBtnElement);

  const passwordErrorElement = screen.queryByText(/The password you entered should contain 5 of more characters./i);

  expect(passwordErrorElement).toBeInTheDocument();
});

test("should show password does not match confirm error message when password and confirm password do not match", () => {
  render(<App />);
  const emailInputElement = screen.getByRole("textbox", {
    name: /email/i
  });
  const passwordInputElement = screen.getByLabelText("Password");
  const confirmPasswordInputElement = screen.getByLabelText(/confirm password/i);
  const submitBtnElement = screen.getByRole("button");
  
  userEvent.type(emailInputElement, "test@gmail.com");
  userEvent.type(passwordInputElement, "strong");
  userEvent.type(confirmPasswordInputElement, "stron");
  userEvent.click(submitBtnElement);

  const passwordErrorElement = screen.queryByText(/Your password and confirm password do not match./i);

  expect(passwordErrorElement).toBeInTheDocument();
});

test("should show no error message with every input being valid", () => {
  render(<App />);
  const emailInputElement = screen.getByRole("textbox", {
    name: /email/i
  });
  const passwordInputElement = screen.getByLabelText("Password");
  const confirmPasswordInputElement = screen.getByLabelText(/confirm password/i);
  const submitBtnElement = screen.getByRole("button");
  
  userEvent.type(emailInputElement, "test@gmail.com");
  userEvent.type(passwordInputElement, "strong");
  userEvent.type(confirmPasswordInputElement, "strong");
  userEvent.click(submitBtnElement);
  
  const emailErrorElementAgain = screen.queryByText(/the email you input is invalid./i);
  const passwordErrorElement = screen.queryByText(/Your password and confirm password do not match./i);
  const confirmPasswordErrorElement = screen.queryByText(/Your password and confirm password do not match./i);

  expect(emailErrorElementAgain).not.toBeInTheDocument();
  expect(passwordErrorElement).not.toBeInTheDocument();
  expect(confirmPasswordErrorElement).not.toBeInTheDocument();
});

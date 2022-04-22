import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

beforeEach(() => {
  render(<App />);
});

const typeIntoForm = ({ email, password, confirmPassword }) => {
  const emailInputElement = screen.getByRole("textbox");
  const passwordInputElement = screen.getByLabelText("Password");
  const confirmPasswordInputElement = screen.getByLabelText(/confirm password/i);

  if(email) {
    userEvent.type(emailInputElement, email);
  }
  if(password) {
    userEvent.type(passwordInputElement, password);
  }
  if(confirmPassword) {
    userEvent.type(confirmPasswordInputElement, confirmPassword);
  }
  return {
    emailInputElement,
    passwordInputElement,
    confirmPasswordInputElement
  }
}

const clickSubmit = () => {
  const submitBtnElement = screen.getByRole("button");
  userEvent.click(submitBtnElement);
}

test("inputs should be initially empty", () => {
  
  const emailInputElement = screen.getByRole("textbox");
  const passwordInputElement = screen.getByLabelText("Password");
  const confirmPasswordInputElement = screen.getByLabelText(/confirm password/i);
  
  expect(emailInputElement.value).toBe("");
  expect(passwordInputElement).toHaveValue("");
  expect(confirmPasswordInputElement).toHaveValue("");
});

test("should be able to type an email", () => {
  const { emailInputElement } = typeIntoForm({ email: 'test@gmail.com' });
  expect(emailInputElement).toHaveValue("test@gmail.com");
});

test("should be able to type a password", () => {
  const { passwordInputElement } = typeIntoForm({ password: 'strong' });
  expect(passwordInputElement).toHaveValue("strong");
});

test("should be able to type a confirm password", () => {
  const { confirmPasswordInputElement } = typeIntoForm({ confirmPassword: 'strong' });
  expect(confirmPasswordInputElement).toHaveValue("strong");
});

test("should show email error message on invalid email", () => {
  const emailErrorElement = screen.queryByText(/the email you input is invalid./i);
  
  expect(emailErrorElement).not.toBeInTheDocument();

  typeIntoForm({ email: "testgmail.com"});
  clickSubmit();

  const emailErrorElementAgain = screen.queryByText(/the email you input is invalid./i);

  expect(emailErrorElementAgain).toBeInTheDocument();
});

test("should show password error message on too short of password", () => {
  
  typeIntoForm({ email: "test@gmail.com", password: "stro"});
  clickSubmit();

  const passwordErrorElement = screen.queryByText(/The password you entered should contain 5 of more characters./i);

  expect(passwordErrorElement).toBeInTheDocument();
});

test("should show password does not match confirm error message when password and confirm password do not match", () => {
  
  typeIntoForm({ email: "test@gmail.com", password: "strong",confirmPassword: "stro"});
  clickSubmit();

  const confirmPasswordErrorElement = screen.queryByText(/Your password and confirm password do not match./i);

  expect(confirmPasswordErrorElement).toBeInTheDocument();
});

test("should show no error message with every input being valid", () => {
 
  typeIntoForm({ email: "test@gmail.com", password: "strong",confirmPassword: "strong"})
  clickSubmit();
  
  const emailErrorElementAgain = screen.queryByText(/the email you input is invalid./i);
  const passwordErrorElement = screen.queryByText(/Your password and confirm password do not match./i);
  const confirmPasswordErrorElement = screen.queryByText(/Your password and confirm password do not match./i);

  expect(emailErrorElementAgain).not.toBeInTheDocument();
  expect(passwordErrorElement).not.toBeInTheDocument();
  expect(confirmPasswordErrorElement).not.toBeInTheDocument();
});

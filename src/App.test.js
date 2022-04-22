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

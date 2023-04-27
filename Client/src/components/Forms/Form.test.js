import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Form } from './Form.jsx'
import { TextField } from './TextField.jsx'
import { FormSubmit } from './FormSubmit.jsx'

describe('Form', () => {
    test("renders contents of the form properly", () => {
        render(
            <Form>
                <TextField type='text' onChange={() => {}} placeholder='Username' index='1' required name="username" />
                <TextField type='password' onChange={() => {}} placeholder='Password' index='2' required name="password" />
                <FormSubmit content="Log in" index="3"/>
            </Form>
        )
        
        var usernameField = screen.getByPlaceholderText('Username')
        var passwordField = screen.getByPlaceholderText('Password')
        var formSubmit = screen.getByText("Log in")
    
        expect(usernameField).toBeInTheDocument();
        expect(passwordField).toBeInTheDocument();
        expect(formSubmit).toBeInTheDocument();
    })

    test("handles input correctly", () => {
        var onInput = jest.fn();
        const handleInput = (event) => {
            var name = event.target.getAttribute("name");
            var value = event.target.value;
            onInput([name, value]);
        };
      
        render(
          <Form>
            <TextField
                type="text"
                onChange={handleInput}
                placeholder="Username"
                index="1"
                required
                name="username"
            />
            <TextField
                type="password"
                onChange={handleInput}
                placeholder="Password"
                index="2"
                required
                name="password"
            />
            <FormSubmit content="Log in" index="3" />
          </Form>
        );
      
        var usernameInput = screen.getByPlaceholderText("Username");
      
        const target = "thisIsAUsername"
        userEvent.type(usernameInput, target);
      
        expect(onInput).toHaveBeenCalledTimes(target.length);
        expect(onInput).toHaveBeenCalledWith(["username", target]);
      });
      
})
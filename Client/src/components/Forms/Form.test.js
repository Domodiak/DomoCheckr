import { render, screen } from '@testing-library/react'
import { Form } from './Form.jsx'
import { TextField } from './TextField.jsx'
import { FormSubmit } from './FormSubmit.jsx'

test("renders contents of the form properly", () => {
    var input = {}
    var submitCount = 0
    const handleInput = (event) => {
        var name = event.target.getAttribute('name')
        var value = event.target.value

        input[name] = value
    }

    const handleSubmit = () => {
        submitCount += 1
    }

    render(
        <Form onSubmit={handleSubmit}>
            <TextField type='text' onChange={handleInput} placeholder='Username' index='1' required name="username" />
            <TextField type='password' onChange={handleInput} placeholder='Password' index='2' required name="password" />
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
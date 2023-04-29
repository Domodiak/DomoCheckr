import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Form } from './Form.jsx'
import { TextField } from './TextField.jsx'
import { FormSubmit } from './FormSubmit.jsx'

describe('Forms', () => {
    describe("Form component", () => {
        test("renders contents of the form properly", () => {
            render(
                <Form onSubmit={() => {}}>
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
                <Form onSubmit={() => {}}>
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
    
        test("calls onSubmit event", () => {
            var submit = jest.fn(e => e.preventDefault());
            const { getByTestId } = render(
                <Form onSubmit={submit}>
                    <TextField
                        type="text"
                        placeholder="Username"
                        index="1"
                        required
                        name="username"
                    />
                    <TextField
                        type="password"
                        placeholder="Password"
                        index="2"
                        required
                        name="password"
                    />
                    <FormSubmit content="Log in" index="3" />
                </Form>
            );
    
            expect(submit).toHaveBeenCalledTimes(0)
            var formSubmitBtn = getByTestId("form-submit")
            expect(formSubmitBtn).toBeInTheDocument()
            formSubmitBtn.click()
            expect(submit).toHaveBeenCalledTimes(1)
        })
    })
    
    describe("FormSubmit component", () => {
        test("render corretly and apply correct styles", () => {
            render(
                <form onSubmit={() => {}}>
                    <FormSubmit content='Confirm' index="1" variant="test" />
                </form>
            )
    
            var formSubmit = screen.getByText("Confirm")
            expect(formSubmit).toBeInTheDocument()
            expect(formSubmit.classList['formSubmitVarianttest']).not.toBeNull()
        })
        test("detect mouse hover events", () => {
            var onHover = jest.fn()
            render(
                <form onSubmit={() => {}}>
                    <FormSubmit onHover={onHover} content='Confirm' index="1" variant="test" />
                </form>
            )

            var element = screen.getByText("Confirm")
            expect(onHover).toHaveBeenCalledTimes(0)
            fireEvent.mouseOver(element)
            expect(onHover).toHaveBeenCalledTimes(1)
        })
    })

    describe("TextField component", () => {
        test("renders correctly", () => {
            const { getByTestId } = render(
                <TextField type="text" placeholder="Input" index="1" name="input" />
            )
            var input = getByTestId('input-field')
            expect(input).toBeInTheDocument()
            expect(input.getAttribute("name")).toBe("input")
        })
        test("displays errors", () => {
            render(
                <TextField error="Test error" type="text" placeholder="Input" index="1" name="input" />
            )
            var error = screen.getByText("Test error")
            expect(error).toBeInTheDocument()
            expect(error.innerHTML).toBe("Test error")
        })
        test("displays placeholder", () => {
            render(
                <TextField type="text" placeholder="Input" index="1" name="input" />
            )
            var input = screen.getByPlaceholderText("Input")
            expect(input).toBeInTheDocument()
        })
        test("calls input events", () => {
            var onInput = jest.fn()
            render(
                <TextField type="text" onChange={onInput} placeholder="Input" index="1" name="input" />
            )

            var element = screen.getByPlaceholderText("Input")
            userEvent.type(element, "Test")
            expect(onInput).toHaveBeenCalledTimes(4)
            expect(onInput.mock.calls[0][0].target.value).toBe("Test")
        })
        test("sets \"required\" property properly", () => {
            render(
                <TextField type="text" placeholder="Input" index="1" name="input" required />
            )
            var input = screen.getByPlaceholderText("Input")

            expect(input).toBeInTheDocument()

            expect(input.getAttribute("required")).not.toBeNull()
        })
    })
})
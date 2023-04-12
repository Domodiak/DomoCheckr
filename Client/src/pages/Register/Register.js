import { Form } from "../../components/Forms/Form"
import { TextField } from "../../components/Forms/TextField"
import { FormSubmit } from "../../components/Forms/FormSubmit"
import { useState } from 'react'
import styles from './Register.module.scss'
import { DynamicBackground } from "../../components/DynamicBackground/DynamicBackground"

export default function Register({ auth }) {
    if(auth) {
        window.location.href = '/'
        return <div></div>
    }

    const [ formInput, setFormInput ] = useState({})

    function handleInput(event) {
        var name = event.target.getAttribute('name')
        var value = event.target.value

        setFormInput(prevValue => ({
            ...prevValue,
            [name]: value
        }))
    }

    function handleSubmit(event) {
        event.preventDefault()
        console.log(formInput)
    }

    return(
        <>
            <div className={styles.formContainer}>
                <div className={styles.formShape}>
                    <div className={styles.formContent}>
                        <h1>Register</h1>
                        <Form onSubmit={handleSubmit} Validate={false}>
                            <TextField
                                type='text'
                                name='username'
                                onChange={handleInput}
                                placeholder='Username'
                                fullWidth
                                required/>
                            <TextField
                                type='email'
                                name='email'
                                onChange={handleInput}
                                placeholder='Email'
                                fullWidth
                                required/>
                            <TextField
                                type='password'
                                name='password1'
                                onChange={handleInput}
                                placeholder='Password'
                                fullWidth
                                required/>
                            <TextField
                                type='password'
                                name='password2'
                                onChange={handleInput}
                                placeholder='Confirm Password'
                                fullWidth
                                required/>
                            <FormSubmit content='Register' variant={2}/>
                            <div className={styles.formUrls}>
                                <a href="#">Forgot password?</a>
                                <a href="/login/">Sign in</a>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
            <DynamicBackground count={15}/>
        </>
    )
}
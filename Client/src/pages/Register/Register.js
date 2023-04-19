import { Form } from "../../components/Forms/Form"
import { TextField } from "../../components/Forms/TextField"
import { FormSubmit } from "../../components/Forms/FormSubmit"
import { useContext, useState } from 'react'
import styles from './Register.module.scss'
import { DynamicBackground } from "../../components/DynamicBackground/DynamicBackground"
import axios from "axios"
import config from "../../config"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import AuthContext from "../../utils/AuthContext"

export default function Register() {
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    if(!auth) {
        navigate('/login/')
    }

    const [ formInput, setFormInput ] = useState({})
    const [ usernameError, setUsernameError ] = useState('')
    const [ emailError, setEmailError ] = useState('')
    const [ passwordError, setPasswordError ] = useState('')
    const [ password2Error, setPassword2Error ] = useState('')

    function handleInput(event) {
        var name = event.target.getAttribute('name')
        var value = event.target.value

        setFormInput(prevValue => ({
            ...prevValue,
            [name]: value
        }))
    }

    function validateForm() {
        var usernameRegex = [/^[a-zA-Z0-9._-]+$/, /^.{4,}$/, /^.{0,19}$/]
        var emailRegex = [/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/]
        var passwordRegex = [/[a-zA-Z]/, /[A-Z]/, /\d/, /[\W_]/, /.{8,}/, /.{0,256}/]

        var usernameValid = true
        var usernameError = -1
        for(var i = 0; i < usernameRegex.length; i++) {
            usernameValid = usernameRegex[i].test(formInput.username)
            if(!usernameValid) {
                usernameError = i
                break
            }
        }
        var emailValid = true
        var emailError = -1
        for(var i = 0; i < emailRegex.length; i++) {
            emailValid = emailRegex[i].test(formInput.email)
            if(!emailValid) {
                emailError = i
                break
            }
        }
        var passwordValid = true
        var passwordError = -1
        for(var i = 0; i < passwordRegex.length; i++) {
            passwordValid = passwordRegex[i].test(formInput.password1)
            if(!passwordValid) {
                passwordError = i
                break
            }
        }
        var passwordsMatch = formInput.password1 == formInput.password2

        return {
            valid: {
                user: usernameValid,
                email: emailValid,
                password: passwordValid,
                passwordsMatch: passwordsMatch}, 
            errorIndex: {
                username: usernameError,
                email: emailError,
                password: passwordError,
            }
        }
    }

    function handleSubmit(event) {
        event.preventDefault()

        const USERNAME_ERROR = [
            "Username must only contain uppercase or lowercase letters or . _ -",
            "Username must be at least 3 characters long",
            "Username must be less no longer than 20 characters",
        ]

        const EMAIL_ERROR = [
            "Email is not valid"
        ]

        const PASSWORD_ERROR = [
            "Password must contain at least one letter",
            "Password must contain at least one uppercase letter",
            "Password must contain at least one digit",
            "Password must contain at least one special character",
            "Password must be at least 8 characters long",
            "Password must be shorter than 256 characters",
        ]

        const PASSWORD2_ERROR = "Passwords do not match"

        var validationResult = validateForm()
        var isValid = validationResult.valid.user && validationResult.valid.email && validationResult.valid.password && validationResult.valid.passwordsMatch

        if(isValid) {
            console.log("Post")
            axios.post(config.ApiHost + "api/auth/register/", { username: formInput.username, email: formInput.email, password: formInput.password1})
                .then(response => Cookies.set('token', response.data.token))
                window.location.href = '/'
        } else {
            if(!validationResult.valid.user) setUsernameError(USERNAME_ERROR[validationResult.errorIndex.username]); else setUsernameError('')
            if(!validationResult.valid.email) setEmailError(EMAIL_ERROR[validationResult.errorIndex.email]); else setEmailError('')
            if(!validationResult.valid.password) setPasswordError(PASSWORD_ERROR[validationResult.errorIndex.password]); else setPasswordError('')
            if(!validationResult.valid.passwordsMatch) setPassword2Error(PASSWORD2_ERROR); else setPassword2Error('')
        }
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
                                error={usernameError}
                                fullWidth
                                required/>
                            <TextField
                                type='email'
                                name='email'
                                onChange={handleInput}
                                placeholder='Email'
                                error={emailError}
                                fullWidth
                                required/>
                            <TextField
                                type='password'
                                name='password1'
                                onChange={handleInput}
                                placeholder='Password'
                                error={passwordError}
                                fullWidth
                                required/>
                            <TextField
                                type='password'
                                name='password2'
                                onChange={handleInput}
                                placeholder='Confirm Password'
                                error={password2Error}
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
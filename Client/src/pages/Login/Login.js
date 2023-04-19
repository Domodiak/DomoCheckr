import { Form } from "../../components/Forms/Form"
import { TextField } from "../../components/Forms/TextField"
import { FormSubmit } from "../../components/Forms/FormSubmit"
import { useContext, useState } from 'react'
import styles from './Login.module.scss'
import { DynamicBackground } from "../../components/DynamicBackground/DynamicBackground"
import axios from 'axios'
import config from "../../config"
import Cookie from "js-cookie"
import { useNavigate } from "react-router-dom"
import AuthContext from "../../utils/AuthContext"

export default function Login() {
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    if(auth) {
        navigate('/')
    }

    const [ formInput, setFormInput ] = useState({})

    function handleInput(event) {
        var name = event.target.getAttribute('name')
        var value = event.target.value

        setFormInput(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    function handleSubmit(event) {
        event.preventDefault()
        
        axios.post(config.ApiHost + "api/auth/auth/", formInput)
            .then((response) => {
                if(response.status === 200) {
                    Cookie.set('token', response.data.token)
                    window.location.href = '/'
                }
            })
            .catch(error => {})
    }

    return(
        <>
            <div className={styles.formContainer}>
                <div className={styles.formShape}>
                    <div className={styles.formContent}>
                        <h1>Login</h1>
                        <Form onSubmit={handleSubmit} Validate={false}>
                            <TextField
                                type='text'
                                name='username'
                                onChange={handleInput}
                                placeholder='Username'
                                fullWidth
                                required/>
                            <TextField
                                type='password'
                                name='password'
                                onChange={handleInput}
                                placeholder='Password'
                                fullWidth
                                required/>
                            <FormSubmit content='Login' variant={1}/>
                            <div className={styles.formUrls}>
                                <a href="#">Forgot password?</a>
                                <a href="/register/">Sign up</a>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
            <DynamicBackground count={15}/>
        </>
    )
}
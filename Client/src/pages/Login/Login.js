import { Form } from "../../components/Forms/Form"
import { TextField } from "../../components/Forms/TextField"
import { FormSubmit } from "../../components/Forms/FormSubmit"
import { useEffect, useState } from 'react'
import styles from './Login.module.scss'

export default function Login({ auth }) {
    if(auth) {
        window.location.href = '/'
        return <div></div>
    }

    const [ Username, setUsername ] = useState('')
    const [ Password, setPassword ] = useState('')

    function handleSubmit(event) {
        event.preventDefault()
        console.log({username: Username, password: Password})
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
                                onChange={setUsername}
                                placeholder='Username'
                                fullWidth
                                required/>
                            <TextField
                                type='password'
                                onChange={setPassword}
                                placeholder='Password'
                                fullWidth
                                required/>
                            <FormSubmit content='Login'/>
                            <div className={styles.formUrls}>
                                <a href="#">Forgot password?</a>
                                <a href="#">Sign up</a>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
            <div className={styles.background}>
                <div className={styles.backgroundChild}></div>
                <div className={styles.backgroundChild}></div>
                <div className={styles.backgroundChild}></div>
                <div className={styles.backgroundChild}></div>
                <div className={styles.backgroundChild}></div>
                <div className={styles.backgroundChild}></div>
                <div className={styles.backgroundChild}></div>
                <div className={styles.backgroundChild}></div>
                <div className={styles.backgroundChild}></div>
                <div className={styles.backgroundChild}></div>
            </div>
        </>
    )
}
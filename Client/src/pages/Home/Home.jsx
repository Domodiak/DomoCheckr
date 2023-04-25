import axios from "axios"
import config from "../../config"
import Cookies from "js-cookie"
import styles from './Home.module.scss'
import { MapTasks } from "../../components/Tasks/MapTasks.jsx"
import { useContext, useEffect, useState } from "react"
import AuthContext from "../../utils/AuthContext"
import UserContext from "../../utils/UserContext"
import { useNavigate } from "react-router-dom"

export function Home() {
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const user = useContext(UserContext)
    const [ tasks, setTasks ] = useState([])
    const [ username, setUsername ] = useState(null)

    useEffect(() => {
        if(user) {
            setUsername(user.user.username)
        }
    }, [ user ])

    useEffect(() => {
        if(!auth) {
            navigate('/login/')
        }
    }, [ auth, navigate ])

    useEffect(() => {
        // axios.get(config.ApiHost + "api/auth/get-user/", {headers: {Authorization: "Token " + Cookies.get('token')}})
        //     .then(response => setUsername(response.data.user.username))
        axios.get(config.ApiHost + 'api/tasks/get-all/', {headers: {Authorization: "Token " + Cookies.get('token')}})
            .then(response => setTasks(response.data))
    }, [])

    function createTestTask() {
        axios.post(config.ApiHost + "api/tasks/create/", {'title': 'A task', 'description': `This is a new task ${username} just created`}, {
            headers: {
                Authorization: 'Token ' + Cookies.get("token")
            }
        }).then(response => {
            if(response.status === 200 || response.status === 201) {
                setTasks(prevState => { return prevState.concat(response.data.task) })
            }
        })
    }
    
    return (
        <div>
            <h1>Hiya, {username}!</h1>
            <a href='/logout/'>Log out</a>
            <button className={styles.button} onClick={createTestTask}>Create a test task</button>
            <MapTasks tasks={tasks} />
        </div>
    )
}
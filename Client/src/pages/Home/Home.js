import axios from "axios"
import config from "../../config"
import Cookies from "js-cookie"
import styles from './Home.module.scss'
import { MapTasks } from "../../components/Tasks/MapTasks"
import { useEffect, useState } from "react"

const length = 8
export function Home() {
    const [ tasks, setTasks ] = useState([])
    const [ username, setUsername ] = useState('')

    function createTestTask() {
        axios.post(config.ApiHost + "api/tasks/create-task/", {'title': 'A task', 'description': `This is a new task ${username} just created`}, {
            headers: {
                Authorization: 'Token ' + Cookies.get("token")
            }
        }).then(response => {
            if(response.status == 200 || response.status == 201) {
                setTasks(prevState => { return prevState.concat(response.data.task) })
            }
        })
    }
    
    useEffect(() => {
        axios.get(config.ApiHost + "api/auth/get-user/", {headers: {Authorization: "Token " + Cookies.get('token')}})
            .then(response => setUsername(response.data.user.username))
        axios.get(config.ApiHost + 'api/tasks/get-tasks/', {headers: {Authorization: "Token " + Cookies.get('token')}})
            .then(response => setTasks(response.data))
    }, [])
    
    console.log('re-render')
    return (
        <div>
            <h1>Hiya, {username}!</h1>
            <a href='/logout/'>Log out</a>
            <button className={styles.button} onClick={createTestTask}>Create a test task</button>
            <MapTasks tasks={tasks} />
        </div>
    )
}
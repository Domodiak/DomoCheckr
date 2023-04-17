import axios from "axios"
import { Component } from "react"
import config from "../../config"
import Cookies from "js-cookie"
import styles from './Home.module.scss'
import { MapTasks } from "../../components/Tasks/MapTasks"

export class Home extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            auth: props.auth,
            user: '',
            userS: 'ovsnzixb',
            intervalId: 0,
            tasks: {},
        } 
        this.createTestTask = () => {
            axios.post(config.ApiHost + "api/tasks/create-task/", {'title': 'A task', 'description': `This is a new task ${this.state.user} just created`}, {
                headers: {
                    Authorization: 'Token ' + Cookies.get("token")
                }
            }).then(response => {
                if(response.status == 200 || response.status == 201) {
                    this.state.tasks.push(response.data.task)
                }
            })
        }
    }
    
    componentDidMount = () => {
        if(!this.state.auth) {
            window.location.href = '/login/'
        }
        axios.get(config.ApiHost + "api/auth/get-user/", {headers: {Authorization: "Token " + Cookies.get('token')}})
            .then(response => this.setState({user: response.data.user.username}))
        axios.get(config.ApiHost + 'api/tasks/get-tasks/', {headers: {Authorization: "Token " + Cookies.get('token')}})
            .then(response => this.state.tasks = response.data)
        
        const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
        
        const length = 8
        var start = 0

        var intervalId = setInterval(() => {
            var username = this.state.user.substring(0, Math.floor(start / 5))
            for(var i = Math.floor(start / 5); i < Math.max(length, this.state.user.length); i++) {
                console.log(this.state.user, this.state.userS)
                if(this.state.user == this.state.userS) {
                    break
                }
                username = username + letters[Math.round(Math.random() * letters.length)];
            }
            if(this.state.user !== '') {
                start = start + 1
            }
            this.setState({userS: username})
        }, 20)
        this.setState({intervalId: intervalId})
    }

    componentDidUpdate = () => {
        if(this.state.user == this.state.userS) {
            clearInterval(this.state.intervalId)
        }
    }
    
    componentWillUnmount = () => {
        clearInterval(this.state.intervalId)
    }


    render() {
        console.log(this.state.tasks)
        return (
            <div>
                <h1>Hiya, {this.state.userS}!</h1>
                <a href='/logout/'>Log out</a>
                <button className={styles.button} onClick={this.createTestTask}>Create a test task</button>
                <MapTasks tasks={this.state.tasks} />
            </div>
        )
    }
    
}

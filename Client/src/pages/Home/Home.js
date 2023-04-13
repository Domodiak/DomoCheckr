import axios from "axios"
import { Component } from "react"
import config from "../../config"
import Cookies from "js-cookie"

export class Home extends Component {
    constructor(props) {
        super(props)
        this.state = { auth: props.auth, user: '', userS: '', intervalId: 0 } 
    }

    componentDidMount = () => {
        if(!this.state.auth) {
            window.location.href = '/login/'
        }
        axios.get(config.ApiHost + "api/auth/get-user/", {headers: {Authorization: "Token " + Cookies.get('token')}})
            .then(response => this.setState({user: response.data.user}))
        
        const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
        
        const length = 8
        var start = 0

        var intervalId = setInterval(() => {
            var username = this.state.user.substring(0, Math.floor(start / 5))
            for(var i = Math.floor(start / 5); i < Math.max(length, this.state.user.length); i++) {
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

    render() {
        return (
            <div>
                <h1>Hiya, {this.state.userS}!</h1>
            </div>
        )
    }
    
}

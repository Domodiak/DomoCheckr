import axios from "axios"
import { useState } from "react"
import config from "../../config"
import Cookies from "js-cookie"

export function Home({ auth }) {
    if(!auth) {
        window.location.href = '/login/'
        return <div></div>
    }

    const [ user, setUser ] = useState('User') //this will likely be moved to App.js when app grows

    axios.get(config.ApiHost + "api/auth/get-user/", {headers: {Authorization: "Token " + Cookies.get('token')}})
        .then(response => {setUser(response.data.user)})

    return (
        <div>
            <h1>Hiya, {user}!</h1>
        </div>
    )
}

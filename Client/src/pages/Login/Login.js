export default function Login({ auth }) {
    if(auth) {
        window.location.href = '/'
        return <div></div>
    }
    return(
        <div>
            <h1>Login</h1>
        </div>
    )
}
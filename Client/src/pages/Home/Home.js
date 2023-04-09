export function Home({ auth }) {

    if(!auth) {
        window.location.href = '/login/'
        return <div></div>
    }

    return (
        <div>
            <h1>Home</h1>
        </div>
    )
}

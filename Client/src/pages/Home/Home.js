import { useAuth } from '../../hooks/useAuth'

export function Home() {
    const [auth, loading] = useAuth()

    if(loading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }

    if(!auth) {
        console.log('no auth')
    }

    return (
        <div>
            <h1>Home</h1>
        </div>
    )
}
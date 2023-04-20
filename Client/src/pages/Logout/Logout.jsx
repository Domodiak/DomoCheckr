import Cookies from "js-cookie";
import { DynamicBackground } from "../../components/DynamicBackground/DynamicBackground.jsx";

export function Logout() {

    Cookies.remove('token')
    window.location.href = '/login/'
    return (
        <>
            <div className="center-items fullscreen">Logging out..</div>
            <DynamicBackground count={15} />
        </>
    )
}
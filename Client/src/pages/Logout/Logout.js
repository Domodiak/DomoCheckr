import Cookies from "js-cookie";
import { DynamicBackground } from "../../components/DynamicBackground/DynamicBackground";

export function Logout({ auth }) {

    Cookies.remove('token')
    window.location.href = '/login/'
    return (
        <>
            <div className="center-items fullscreen">Logging out..</div>
            <DynamicBackground count={15} />
        </>
    )
}
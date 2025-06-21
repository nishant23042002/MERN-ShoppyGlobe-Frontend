import { useRouteError } from "react-router-dom"

function NotFound() {
    const err = useRouteError();
    return (
        <div div className="flex justify-center items-center flex-col" >
            <h1 className="text-2xl font-bold text-red-600">{err.data}</h1>
            <h1 className="text-2xl font-bold text-red-600">{err.status}</h1>
            <h1 className="text-2xl font-bold text-red-600">{err.statusText}</h1>
        </div>
    )
}

export default NotFound
import { Route, Redirect, withRouter } from "react-router-dom"
import ErrorBoundary from "../ErrorBoundary"

const PrivateRoute = ({component: Component, ...rest}) => {
    console.log('Private route', rest)
    return (
        <ErrorBoundary><Route {...rest} render={(rest)=>{
            return localStorage.getItem('user') ? (
                <Component {...rest} />
            ) : (
                <Redirect to={{pathname: '/login'}} />
            )
        }}
        /></ErrorBoundary>
    )
}

export default PrivateRoute
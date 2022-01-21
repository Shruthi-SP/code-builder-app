import { Route, Redirect, withRouter } from "react-router-dom"
import ErrorBoundary from "../ErrorBoundary"

const PrivateRoute = ({component: Component, admin, handleShow, handleCancelShow, ...rest}) => {
    return (
        <ErrorBoundary><Route {...rest} render={(props)=>{
            return localStorage.getItem('user') ? (
                <Component {...props} {...rest} />
            ) : (
                <Redirect to={{pathname: '/login'}} />
            )
        }}
        /></ErrorBoundary>
    )
}

export default PrivateRoute
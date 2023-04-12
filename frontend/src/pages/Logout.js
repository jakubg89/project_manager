import {useContext} from 'react'
import AuthContext from '../context/AuthContext'

const Logout = () => {

    let {logoutUser} = useContext(AuthContext)

    return (    
        logoutUser()
    )
}

export default LoginPage
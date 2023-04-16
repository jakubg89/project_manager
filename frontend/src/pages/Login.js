import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'

const LoginPage = () => {

    let {loginUser} = useContext(AuthContext)

    return (
        <div className='auth-form-container'>
            <form className="auth-form" onSubmit={loginUser}>
                <div className="auth-form-content mt-2">
                    <h1 className="auth-form-title">Sign in</h1>
                    <div className="text-center">
                    or create account <Link to="/register" >here.</Link>                   
                    </div>
                    <div className="form-group mt-4">
                        <label>Email address</label>
                        <input type="email" name="email" className="form-control mt-1" placeholder="Enter email"/>
                    </div>
                    <div className="form-group mt-2">
                        <label>Password</label>
                        <input type="password" name="password" className="form-control mt-1" placeholder="Enter password"/>
                    </div>
                    <div className="d-grid gap-2 mt-4 mb-4">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default LoginPage
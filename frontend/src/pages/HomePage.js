import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext';
import Headers from "../components/Headers"
const HomePage = () => {
    const { user } = useContext(AuthContext);
    
    useEffect(() => {},[])

    return (
        <div>
            <Headers />
            {/* { user ? <p>Logged in</p> : 'DUPA'} */}
            Logged in, lista moich projektów cdsfsdfsdfsdf
        </div>
    )
}

export default HomePage
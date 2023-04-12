import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext';

const HomePage = () => {
    const { user } = useContext(AuthContext);
    
    useEffect(() => {},[])

    return (
        <div>
            { user ? <p>Logged in</p> : 'DUPA'}
        </div>
    )
}

export default HomePage
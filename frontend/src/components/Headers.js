import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import React, {useContext} from 'react'

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


const Headers = () => {
    let {user, logoutUser} = useContext(AuthContext)
    return (
      <div className='nav-bar-container'>
        {/* {user ? (
                <a href="" onClick={logoutUser}>Logout</a>
            ): (
              <></>
            )} */}

          <Navbar collapseOnSelect expand="sm">
            <Navbar.Toggle aria-controls="navbarScroll" data-bs-toggle="collapse" data-bs-target="#navbarScroll" />
            <Navbar.Collapse id="navbarScroll" className="justify-content-between">
                <Nav>
                    <Nav.Link as={Link} to="/">Project list</Nav.Link>
                    <Nav.Link as={Link} to="/create-project">Create project</Nav.Link>                    
                </Nav>
                <Nav>                    
                    <NavDropdown title="Account " align="end">
                      <NavDropdown.Item as={Link} to="/create-project" className='nav-bar-item'>Manage account</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={logoutUser}>Logout</NavDropdown.Item>
                      {/* <NavDropdown.Item className='nav-bar-item'>Logout</NavDropdown.Item> */}
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>     
        </Navbar>
      </div>
    )
  }
  
  export default Headers

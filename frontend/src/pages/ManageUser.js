import { useLocation, useNavigate } from 'react-router-dom'
import { useContext, useState, useEffect, useRef } from 'react'

import AuthContext from '../context/AuthContext';
import Headers from '../components/Headers'


const ManageUser = () => {
    const navigate = useNavigate();

    let { authTokens, user } = useContext(AuthContext);

    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEnamil] = useState('')
    const [age, setAge] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
  
    // User details
    const [userDetails, setUserDetails] = useState([])

    const fetchUserDetails = async () => {
        let response = await fetch('http://127.0.0.1:8000/api/user/'+String(user.user_id), {
          method:'GET',
          headers:{
              'Content-Type':'application/json',
              'Authorization':'Bearer ' + String(authTokens.access)
          },
          credentials: 'include'
      })
        const data = await response.json();
    
        if (data) {
            setUserDetails(data)
          }
      };
    

    // Gender choice
    const [pickedGender, setPickedGender] = useState('');
    const selectRef = useRef(null);
    const [genderChoices, setGenderChoices] = useState([]);

    const getGender = async () => {
    let response = await fetch('http://127.0.0.1:8000/api/gender/', {
        method: 'GET',
        headers:{
        'Content-Type':'application/json',
    }
    })
    const data = await response.json();
    setGenderChoices(data.gender_choices)
    }
  
    const handleFocus = (e) => e.target.select();

    const onSubmit = (e) => {
        e.preventDefault()

        let isPassValid = true
        if (password !== '') {
          if (password.length < 8 || !/\d/.test(password) || !/[\W_]/.test(password)) {
            alert('Password must be at least 8 characters long and contain at least one digit and one special character.');
            isPassValid = false
          }
        }
        if (isPassValid) {
          navigate('/save-manage-user', {
            state: {
              first_name: e.target.first_name.value,
              last_name: e.target.last_name.value,
              age: e.target.age.value,
              phone_number: e.target.phone.value,
              email: e.target.email.value,
            }
          })
        }       
    }

    useEffect(() => {
        getGender()
        fetchUserDetails()
        setFirstName(userDetails.first_name)
    }, []);

    return (
        <div>
        <Headers />
        <div>
          <div className="project-container mt-5">
            <div className="project-body">
              <form onSubmit={onSubmit} name="manageUser">
                <div className="auth-form-content mt-2">
                  <h1 className="auth-form-title">Manage account</h1>
      
                  <div className="form-group mt-4">
                    <label>First name</label>
                    <input
                      type="text"
                      name="first_name"
                      className="form-control mt-1"
                      placeholder="First name"
                      value={firstName
                          ? firstName
                          : userDetails && userDetails.first_name
                      }
                      onChange={(e) => setFirstName(e.target.value)}
                      onFocus={handleFocus}
                    />
                  </div>

                  <div className="form-group mt-4">
                    <label>Last name</label>
                    <input
                      type="text"
                      name="last_name"
                      className="form-control mt-1"
                      placeholder="Last name"
                      value={lastName
                          ? lastName
                          : userDetails && userDetails.last_name
                      }
                      onChange={(e) => setLastName(e.target.value)}
                      onFocus={handleFocus}
                    />
                  </div>
      
                  <div className="form-group mt-4">
                    <label>Email address</label>
                    <input
                      type="text"
                      name="email"
                      className="form-control mt-1"
                      placeholder="Email address"
                      value={email
                          ? email
                          : userDetails && userDetails.email
                      }
                      onChange={(e) => setEnamil(e.target.value)}
                      onFocus={handleFocus}
                    />
                  </div>
      
                  <div className="form-group mt-3">
                    <label>Password</label>
                    <input  type='text'
                            className="form-control mt-1"
                            name='password' 
                            placeholder="Type in new password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}          
                            />
                    </div>      

                <div className="form-group mt-4">
                    <label>Age</label>
                    <input
                      type="text"
                      name="age"
                      className="form-control mt-1"
                      placeholder="Age"
                      value={age
                          ? age
                          : userDetails && userDetails.age
                      }
                      onChange={(e) => setAge(e.target.value)}
                      onFocus={handleFocus}
                    />
                  </div>   

                  <div className="form-group mt-3">
                    <label>Phone number</label>
                    <input type='text'
                        className="form-control mt-1"
                        name="phone" 
                        placeholder="Phone number" 
                        value={phoneNumber
                            ? phoneNumber
                            : userDetails && userDetails.phone_number
                        }
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        maxLength={40}
                        pattern="[a-zA-Z0-9._@]*" 
                        onFocus={handleFocus}
                            />
                    </div>

                </div>
                <div className='auth-form-content mt-4'>
                <button type="submit" className="btn btn-success w-100">
                  Check data
                </button>
                </div>
              </form>
              <div className='auth-form-content mt-2'>
              <div className="d-flex justify-content-start gap-2 mt-4 mb-4">
                <button className="btn btn-primary w-100" onClick={() => navigate(-1)}>
                  Go back
                </button>
                
              </div></div>
            </div>
          </div>
        </div>
      </div>
        )
}
export default ManageUser

import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'

const Register = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEnamil] = useState('')
  const [age, setAge] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const [pickedGender, setPickedGender] = useState('');
  const selectRef = useRef(null);

  const [genderChoices, setGenderChoices] = useState([]);


  const onAdd = (user) => {
    fetch('http://127.0.0.1:8000/api/user/', {
      method: 'POST',
      body: JSON.stringify(user),
      headers:{
        'Content-Type':'application/json'
        // 'Authorization':'Bearer ' + String(authTokens.access)
    },
      credentials: 'include'
    })
    .then(response => {
      console.log(response)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
  }
  
  const onSubmit = (e) => {
    e.preventDefault()

    if (!userName) {
      alert('Enter name')
      return
    }

    onAdd({ 
      phone_number: userName,
      password,
      email,
      gender: pickedGender,
      age,
      first_name: firstName,
      last_name: lastName,
    })

    setUserName('')
    setPassword('')
    setEnamil('')
    setAge('')
    setFirstName('')
    setLastName('')

    setPickedGender('');
    selectRef.current.selectedIndex = 0;


    navigate('/login')  
  }

  const getGender = async () => {
    let response = await fetch('http://127.0.0.1:8000/api/gender/', {
      method: 'GET',
      headers:{
        'Content-Type':'application/json',
    }
    })
    console.log(response)
    const data = await response.json();
    setGenderChoices(data.gender_choices)
  }

  useEffect(() => {
    getGender()
  }, []);

  return (
    <div className='auth-form-container'>
    <form className="auth-form" onSubmit={onSubmit}>
        <div className="auth-form-content">

      <h3 className="auth-form-title">Sign up</h3>
                    <div className="text-center">
                      or go back to <Link to="/login" >login page</Link>                    
                    </div>

      <div className="form-group mt-3">
        <label>First name</label>
        <input  type='text'
                className="form-control mt-1" 
                placeholder="First name" 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)} 
                pattern="[a-zA-Z0-9._@]*"
                maxLength={40} 
                />
      </div>

      <div className="form-group mt-3">
        <label>Last name</label>
        <input  type='text'
                className="form-control mt-1" 
                placeholder="Last name" 
                value={lastName} 
                onChange={(e) => setLastName(e.target.value)} 
                pattern="[a-zA-Z0-9._@]*"
                maxLength={40} 
                />
      </div>

      <div className="form-group mt-3">
        <label>Email address</label>
        <input  type='text'
                className="form-control mt-1" 
                placeholder="Enter email" 
                value={email} 
                onChange={(e) => setEnamil(e.target.value)} 
                // pattern="[0-9]*" 
                pattern="[a-zA-Z0-9._@]*"
                maxLength={40} 
                />
      </div>

      <div className="form-group mt-3">
        <label>Password</label>
        <input  type='text'
                className="form-control mt-1" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                // pattern="[a-zA-Z0-9]*" 
                />
      </div>

      <div className='form-group mt-3'>
        <label htmlFor="gender">Gender</label>
        <select id="gender" name="gender" className="form-control mt-1" onChange={(event) => setPickedGender(event.target.value)}  ref={selectRef}>
            <option>---</option>
            {Object.entries(genderChoices).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
            ))}
        </select>
      </div>

      <div className="form-group mt-3">
        <label>Phone number</label>
        <input type='text'
               className="form-control mt-1" 
               placeholder="User name" 
               value={userName} 
               onChange={(e) => setUserName(e.target.value)}
               maxLength={40}
               pattern="[a-zA-Z0-9._@]*" 
                />
      </div>

            <div className="form-group mt-3">
        <label>Age</label>
        <input type='text'
               className="form-control mt-1" 
               placeholder="User name" 
               value={age} 
               onChange={(e) => setAge(e.target.value)}
               maxLength={3}
               pattern="[0-9]*" 
                />
      </div>
      <div className="d-grid gap-2 mt-4 mb-4">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
      {/* <input type='submit' value="Rejestruj" className="btn btn-block" />
       */}
      </div>
    </form>
    </div>
  )
}

export default Register

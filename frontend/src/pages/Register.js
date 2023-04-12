
import { useState, useEffect, useRef } from 'react'

const Register = () => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEnamil] = useState('')
  const [age, setAge] = useState('')
  const [pickedGender, setPickedGender] = useState('');
  const selectRef = useRef(null);

  const [genderChoices, setGenderChoices] = useState([]);


  const onAdd = (user) => {
    fetch('http://127.0.0.1:8000/api/user/register/', {
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
      age
    })

    setUserName('')
    setPassword('')
    setEnamil('')
    setAge('')

    setPickedGender('');
    selectRef.current.selectedIndex = 0;

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
    <form className="add-form" onSubmit={onSubmit}>
      <h1>REJESTRACJA</h1>
      <div className="form-control">
        <label>Email</label>
        <input  type='text' 
                placeholder="Enter email" 
                value={email} 
                onChange={(e) => setEnamil(e.target.value)} 
                // pattern="[0-9]*" 
                pattern="[a-zA-Z0-9._@]*"
                maxLength={40} 
                />
      </div>

      <div className="form-control">
        <label>Password</label>
        <input  type='text' 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                // pattern="[a-zA-Z0-9]*" 
                />
      </div>

      <div className='form-control'>
        <label htmlFor="gender">Gender:</label>
        <select id="gender" name="gender" onChange={(event) => setPickedGender(event.target.value)}  ref={selectRef}>
            <option>---</option>
            {Object.entries(genderChoices).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
            ))}
        </select>
      </div>

      <div className="form-control">
        <label>Phone number</label>
        <input type='text' 
               placeholder="User name" 
               value={userName} 
               onChange={(e) => setUserName(e.target.value)}
               maxLength={40}
               pattern="[a-zA-Z0-9._@]*" 
                />
      </div>

            <div className="form-control">
        <label>Age</label>
        <input type='text' 
               placeholder="User name" 
               value={age} 
               onChange={(e) => setAge(e.target.value)}
               maxLength={3}
               pattern="[0-9]*" 
                />
      </div>              
      <input type='submit' value="Rejestruj" className="btn btn-block" />
    </form>
  )
}

export default Register

import { useState, useContext, useEffect } from 'react'
import { json, useNavigate } from 'react-router-dom'
import Select from 'react-select'


import AuthContext from '../context/AuthContext';
import Headers from '../components/Headers';

const CreateProject = () => {
  const navigate = useNavigate();
  const [taskName, setName] = useState('')
  const [about, setAbout] = useState('')
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  let { authTokens, user } = useContext(AuthContext);

  // User list
  const [userList, setUserList] = useState("")
  const options = []

  const getUserList = async () => {
    let response = await fetch('http://127.0.0.1:8000/api/user/', {
      method: 'GET',
      headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + String(authTokens.access)
    },
    credentials: 'include'
    })
    console.log(response)
    const data = await response.json();
    // setUserList(data)
    const options = []
    for (const user of data) {
      options.push({ value: user.id, label: user.email });
    }
    setUserList(options)
    // console.log(options);
  }

  // Create project
  const onAdd = (task) => {
    fetch('http://127.0.0.1:8000/api/project/', {
      method: 'POST',
      body: JSON.stringify(task),
      headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + String(authTokens.access)
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

    if (!taskName) {
      alert('Add project name')
      return
    }
    
    if (!about) {
      alert('Add about section')
      return
    }

    if (!startDate) {
      alert('Select starting date')
      return
    }

    if (!endDate) {
      alert('Select end date')
      return
    }


    const x =  Array.from(e.target.asignedUsers).map(option => option.value)
    const values = x.map(x => parseInt(x))

    if (x.length === 0) {
      const jsonData = JSON.stringify(e.target.asignedUsers.value)
      console.log('pojedynczy', jsonData)
      onAdd({ 
        name: taskName, 
        about: about, 
        start_date: startDate,
        end_date: endDate,
        user_id: user.user_id,
        users: e.target.asignedUsers.value,
        })

    }
    else {
      const jsonData = JSON.stringify(x);
      onAdd({ 
        name: taskName, 
        about: about, 
        start_date: startDate,
        end_date: endDate,
        user_id: user.user_id,
        users: x,
        })
      
    }
    navigate('/')
  }

  useEffect(() => {
      getUserList()
  }, []);

  return (
    <div>
        <Headers />       
         <div>
          <div className="project-container mt-5">
            <div className='project-body'>

            <form onSubmit={onSubmit} name='createproject'>
                <div className="auth-form-content mt-2">
                <h1 className="auth-form-title">Create project</h1>

      <div className="form-group mt-4">
        <label>Name<small style={{ color: "red"}}>*</small></label>
        <input type='text'
               className="form-control mt-1"  
               placeholder="Project name" 
               value={taskName} 
               onChange={(e) => setName(e.target.value)} 
                />
      </div>

      <div className="form-group mt-4">
        <label>About<small style={{ color: "red"}}>*</small></label>
            <textarea className="form-control mt-1" 
                rows="3" cols="50"
                form="createproject" 
                placeholder="Describe project"
                value={about} 
                onChange={(e) => setAbout(e.target.value)}/>
      </div>

      <div className='form-group mt-4'>  
        <label>Starting<small style={{ color: "red"}}>*</small></label> 
        <input type="date" className="form-control mt-1" id="startDate" name="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      </div>
      <div className='form-group mt-4'>  
        <label>End<small style={{ color: "red"}}>*</small></label> 
        <input type="date" className="form-control mt-1" id="endDate" name="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </div>

      <div className='form-group mt-4'>  
        <label>Select users to asign </label> 
        <Select
                  defaultValue={[]}
                  isMulti
                  name="asignedUsers"
                  options={userList}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
      </div>

        <div className="d-grid gap-2 mt-4 mb-4">
                    <button type="submit" className="btn btn-success">
                        Save project
                    </button>
                </div>

      </div>
    </form>
   
    </div>
    </div>
    </div>
        </div>
  )
}

export default CreateProject

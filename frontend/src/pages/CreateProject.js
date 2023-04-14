import { useState } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext';
import Headers from '../components/Headers';

const CreateProject = () => {
  const navigate = useNavigate();
  const [taskName, setName] = useState('')
  const [about, setAbout] = useState('')
  const [someNumber, setSomeNumber] = useState('')
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');



  let { authTokens, user } = useContext(AuthContext);

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
      alert('Add task')
      return
    }

    onAdd({ 
      name: taskName, 
      about: about, 
      start_date: startDate,
      end_date: endDate,
      user_id: user.user_id,
     })

    setName('')
    setAbout('')
    setSomeNumber('')
    navigate('/')
  }

  return (
    <div>
        <Headers />        <div>
          <div className="project-container mt-5">
            <div className='project-body'>

            <form onSubmit={onSubmit} name='createproject'>
                <div className="auth-form-content mt-2">
                <h1 className="auth-form-title">Create project</h1>

      <div className="form-group mt-4">
        <label>Name</label>
        <input type='text'
               className="form-control mt-1"  
               placeholder="Project name" 
               value={taskName} 
               onChange={(e) => setName(e.target.value)} 
                />
      </div>

      <div className="form-group mt-4">
        <label>About</label>
            <textarea className="form-control mt-1" 
                rows="3" cols="50"
                form="createproject" 
                placeholder="Describe project"
                value={about} 
                onChange={(e) => setAbout(e.target.value)}/>
      </div>

      <div className='form-group mt-4'>  
        <label>Starting</label> 
        <input type="date" className="form-control mt-1" id="startDate" name="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      </div>
      <div className='form-group mt-4'>  
        <label>End</label> 
        <input type="date" className="form-control mt-1" id="endDate" name="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </div>

        <div className="d-grid gap-2 mt-4 mb-4">
                    <button type="submit" className="btn btn-success">
                        Save project
                    </button>
                </div>
      {/* <input type='submit' value="save task" className="btn btn-block" /> */}
      </div>
    </form>
    </div>
    </div>
    </div>
        </div>
  )
}

export default CreateProject

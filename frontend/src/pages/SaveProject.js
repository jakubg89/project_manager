import { useLocation, useNavigate } from 'react-router-dom'
import Headers from '../components/Headers'
import { useContext, useState, useEffect } from 'react'
import AuthContext from '../context/AuthContext';


const SaveProject = () => {
  const location = useLocation()
  const { projectName, projectAbout, projectStatus, projectStartDate, projectEndDate, projectId } = location.state
  let { authTokens } = useContext(AuthContext);
  const navigate = useNavigate();
//   const [projectDetails, setProjectDetails] = useState([])


  const onUpdate = (task) => {
    console.log('dupa -'+projectId)
    fetch('http://127.0.0.1:8000/api/project/'+projectId+'/', {
      method: 'PATCH',
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

  const onSubmit = () => {
     onUpdate({ 
      name: projectName, 
      about: projectAbout, 
      start_date: projectStartDate,
      end_date: projectEndDate,
      status: String(projectStatus),
     })
    navigate('/')
  }

useEffect(() => {
  }, []);

  return (
    <div>
    <Headers />
      <div>
        <div className="project-container mt-5">
          <div className='project-body'>
            <h5 class="card-title">Check your changes.</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Name: {projectName}</li>
                <li class="list-group-item">About: {projectAbout}</li>

                <li class="list-group-item">Started: {projectStartDate}</li>
              <li class="list-group-item">Ends: {projectEndDate}</li>
              {/*<li class="list-group-item">Created by: {projectDetails.user}</li>*/}
              <li class="list-group-item">Status: {projectStatus}</li> 
            </ul>
            <div className="d-flex justify-content-start gap-2 mt-4 mb-4">
                <button type="submit" className="btn btn-primary w-100" onClick={() => navigate(-1)}>
                    Go back
                </button>
                <button type="submit" className="btn btn-warning w-100" onClick={() => navigate("/")}>    
                    Cancel
                </button>
                <button className="btn btn-success w-100" onClick={() => onSubmit()}>
                    Update project
                </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default SaveProject

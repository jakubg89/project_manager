import { FaTimes } from 'react-icons/fa'
import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext';

import Headers from "../components/Headers"

const ProjectList = () => {
  let [projects, setProjects] = useState([]);
  let { authTokens, user } = useContext(AuthContext);

  useEffect(() => {  
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    let response = await fetch('http://127.0.0.1:8000/api/project/', {
      method:'GET',
      headers:{
          'Content-Type':'application/json',
          'Authorization':'Bearer ' + String(authTokens.access)
      }
  })  
    const data = await response.json();
    setProjects(data)
    // console.log(data);
  };

  const deleteProject = (id) => {
    setProjects(projects.filter((project) => project.id !== id))
    // console.log(projects)
    fetch('http://127.0.0.1:8000/api/project/'+id, {
      method: 'DELETE',
      body: JSON.stringify(id),
      headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + String(authTokens.access)
    }
    })
    .then(response => {
      if (!response.status === 204) {
        throw new Error('Network response was not ok');
      }
      else {
        return {}
      }
    })
  }

  return (
    <div>
      <Headers />
      {projects.map((project) => (
        <div key={project.id} className="task">
          <h3>
            <Link to='/taskdetails' state={{ taskId: project.id, taskName: project.name }}>{project.name}</Link>
            <FaTimes style={{color: 'red', cursor: 'pointer'}} onClick={() => deleteProject(project.id)}/>
          </h3>
          {/* <FaTimes style={{color: 'red', cursor: 'pointer'}} onClick={() => onDelete(task.id)}/> */}
          <p>{project.about}</p>
          <p>{project.number}</p>
          {/* {JSON.stringify(task)} */}
        </div>


      ))}
    </div>
  )
}

export default ProjectList
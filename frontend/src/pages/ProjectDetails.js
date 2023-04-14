import { useLocation, useNavigate } from 'react-router-dom'
import Headers from '../components/Headers'
import { useContext, useState, useEffect } from 'react'
import AuthContext from '../context/AuthContext';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ProjectDetails = () => {
  const location = useLocation()
  const { projectId } = location.state
  let { authTokens } = useContext(AuthContext);
  const navigate = useNavigate();
  const [projectDetails, setProjectDetails] = useState([])

  // Modal
  const [show, setShow] = useState(false);
  const [ toDeleteId, setToDeleteId ] = useState('')
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setToDeleteId(id);
    setShow(true);
  }

  const fetchProjectDetails = async () => {
    let response = await fetch('http://127.0.0.1:8000/api/project/'+String(projectId), {
      method:'GET',
      headers:{
          'Content-Type':'application/json',
          'Authorization':'Bearer ' + String(authTokens.access)
      },
      credentials: 'include'
  })
    const data = await response.json();

    if (data) {
        setProjectDetails(data);
      }
  };

  const deleteProject = (id) => {
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
        navigate('/')
      }
    })
  }

  const goToEdit = () => {
    navigate('/edit-project', {
      state: {
        projectId: projectId,
        projectStatus2: projectDetails.status,
      }
    })
  }

useEffect(() => {  
    fetchProjectDetails()
  }, []);

  return (
    <div>
    <Headers />
      <div>
        <div className="project-container mt-5">
          <div className='project-body'>
            <h5 class="card-title">{projectDetails.name}</h5>
            <p class="card-text">{projectDetails.about}</p>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Started: {projectDetails.start_date}</li>
              <li class="list-group-item">Ends: {projectDetails.end_date}</li>
              <li class="list-group-item">Created by: {projectDetails.user}</li>
              <li class="list-group-item">Status: {projectDetails.status}</li>
            </ul>
            <div className="d-flex justify-content-start gap-2 mt-4 mb-4">
                <button type="submit" className="btn btn-primary w-100" onClick={() => navigate(-1)}>
                    Go back
                </button>
                <button type="submit" className="btn btn-danger w-100" onClick={() => handleShow(projectId)}>    
                    Delete
                </button>
                <button type="submit" className="btn btn-success w-100" onClick={() => goToEdit()}>
                    Edit
                </button>
            </div>
          </div>
          
        </div>

        <div className="project-container mt-3">
            <div className='project-body'>
                
            </div>
        </div>
      </div>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>You're trying to delete this project!</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => deleteProject(toDeleteId)}>
            Delete project
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default ProjectDetails

import { useLocation, useNavigate } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'

// Components
import Headers from '../components/Headers'

// Context
import AuthContext from '../context/AuthContext';

// Bootstrap
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Badge } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ProjectDetails = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const { projectId, projectStatsText } = location.state

  let { authTokens, user } = useContext(AuthContext);


  // Modal
  const [show, setShow] = useState(false);
  const [ toDeleteId, setToDeleteId ] = useState('')

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setToDeleteId(id);
    setShow(true);
  }

  // Project details
  const [projectDetails, setProjectDetails] = useState([])
  const [projectUsers, setProjectUsers] = useState([])

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
        setProjectUsers(data.users);
      }
  };
  
  // Project comments
  const [projectComments, setProjectComments] = useState([])

  const fetchProjectComments = async () => {
    let response = await fetch('http://127.0.0.1:8000/api/comment/'+String(projectId)+'/details/', {
      method:'GET',
      headers:{
          'Content-Type':'application/json',
          'Authorization':'Bearer ' + String(authTokens.access)
      },
      credentials: 'include'
  })
    const data = await response.json();
    console.log('http://127.0.0.1:8000/api/comment/'+String(projectId)+'/details/')
    if (data) {
        setProjectComments(data);
      }
  };

  // Delete project
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

  // Navigation
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
    fetchProjectComments()
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
              <li class="list-group-item">Created by: {projectDetails.first_name} {projectDetails.last_name}</li>
              <li class="list-group-item">Status: {projectStatsText} </li>
              <li class="list-group-item">
                {projectUsers.map((user) => (
                  <>      
                    <Badge bg='success'>
                      {user.email}
                    </Badge>{' '}
                  </>
                ))}
              </li>
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

        {/* if  */}
        {projectComments.length > 0 ? 
          <div className="project-container mt-3">
            <div className='project-body'>    
            {projectComments.map((comment) => (
              <>
                <Card className="mt-2" border={projectDetails.user === comment.user ? "success" : ""} style={{ width: 'w-100' }}>
                  <Card.Header className='justify-content-between'>
                    <Row>
                        <Col className='text-start'>{comment.first_name} {comment.last_name}</Col>
                        <Col className='text-end'><small className='comment-date'>{comment.date_added}</small></Col>
                    </Row>
                  </Card.Header>
        
                <Card.Body>
                  <Card.Text>
                    {comment.content}
                  </Card.Text>
                </Card.Body>
              </Card>
              </>
            ))}
            </div>
          </div>
         : ''}
         {/* end if */}
        
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

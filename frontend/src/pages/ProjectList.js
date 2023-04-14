import { useState, useEffect } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext';

import Headers from "../components/Headers"

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { FaTimes, FaComments, FaRegEdit, FaArrowCircleRight } from 'react-icons/fa'


const ProjectList = () => {
  let [projects, setProjects] = useState([]);
  let { authTokens, user } = useContext(AuthContext);
  const [projectStatus, setProjectStatus] = useState([]);

  // Modal
  const [show, setShow] = useState(false);
  const [projectName, setProjectName] = useState(null);
  const [projectId, setProjectId] = useState()
  const handleClose = () => {
    setProjectName('')
    setProjectId()
    setComment('')
    setShow(false);
  }

  const handleShow = (proj, projectId) => {
    setProjectName(proj);
    setProjectId(projectId)
    setShow(true);
  }

  // Modal delete warning
  const [showDelete, setShowDelete] = useState(false);
  const [ toDeleteId, setToDeleteId ] = useState('')
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = (id) => {
    setToDeleteId(id);
    setShowDelete(true);
  }


  // Form
  const [comment, setComment] = useState('')
  const navigate = useNavigate();

  const onAddComment = (comment) => {
    fetch('http://127.0.0.1:8000/api/comment/', {
      method: 'POST',
      body: JSON.stringify(comment),
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

  const onSubmitComment = (e) => {
    e.preventDefault()

    if (!comment) {
      alert('Place comment')
      return
    }
    console.log(comment, projectId)
    onAddComment({ 
      content: comment,
      project_id: projectId,
      user_id: user.user_id,
    })
    navigate('/project-details', {
      state: {
        projectId: projectId,
      }
    })
    setComment('')
  }


  const getProjectStatus = async () => {
    let response = await fetch('http://127.0.0.1:8000/api/project_status/', {
      method: 'GET',
      headers:{
        'Content-Type':'application/json',
    }
    })
    console.log(response)
    const data = await response.json();
    setProjectStatus(data)
  }

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
  };

  const deleteProject = (id) => {
    setProjects(projects.filter((project) => project.id !== id))
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
        setShowDelete(false)
        return {}
      }
    })
  }

  useEffect(() => {
    fetchProjects()
    getProjectStatus()
  }, []);

  return (
    
    <div>
      <Headers />
      <div>
      <div className="project-container mt-5">
          <div className='project-body'>
          <Table hover  className="text-center">
  <thead>
    <tr>
      <th>Name</th>
      <th>Starting</th>
      <th>End</th>
      <th>Status</th>
      <th>Options</th>
    </tr>
  </thead>
  <tbody>
      {projects.map((project) => (
        <tr key={project.id}>
        <td>{project.name}</td>
        <td>{project.start_date}</td>
        <td>{project.end_date}</td>
        <td>{projectStatus.status[project.status]}</td>
        <td>
          <Link to='/edit-project' state={{ projectId: project.id, projectStatus2: String(project.status) }}>
          {/* <Link to='/edit-project' state={{ project1: project, projectStatus: projectStatus }}> */}
            <FaRegEdit className="table-icons"/>
          </Link>
          <FaComments className="table-icons" onClick={() => handleShow(project.name, project.id)}/>
          <Link to='/project-details' state={{ projectId: project.id }}>
            <FaArrowCircleRight className="table-icons"/>
          </Link>
          {/* <FaTimes className="table-icons delete"/> */}
          <FaTimes className="table-icons delete" onClick={() => handleShowDelete(project.id)}/>
        </td>
      </tr>  
      ))}
      </tbody>
      </Table>

      </div></div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{projectName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="add-comment" onSubmit={onSubmitComment}>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea"
            >
              <Form.Label>Add comment {projectId}</Form.Label>
              <Form.Control as="textarea" rows={3} value={comment} 
               onChange={(e) => setComment(e.target.value)}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button form="add-comment" type="submit" variant="primary">
            Add comment
          </Button>
        </Modal.Footer>
      </Modal>
      


      <Modal show={showDelete} onHide={handleCloseDelete}>
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

export default ProjectList

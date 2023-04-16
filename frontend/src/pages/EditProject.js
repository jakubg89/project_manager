import { useLocation, useNavigate } from 'react-router-dom'
import { useContext, useState, useEffect, useRef } from 'react'

import AuthContext from '../context/AuthContext';
import Headers from '../components/Headers'


const EditProject = () => {
    const location = useLocation()
    const { projectId, projectStatus2 } = location.state

    const [statusForDisplay, setStatusForDisplay] = useState('');
    const selectRef = useRef(null);
    const [pickedStatus, setPickedStatus] = useState('');
    const handleFocus = (e) => e.target.select();

    let { authTokens, user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [projectDetails, setProjectDetails] = useState([])
    const [projectStatus, setProjectStatus] = useState([])

    // Form fields
    const [projectName, setProjectName] = useState('')
    const [about, setAbout] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

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
            setProjectDetails(data)
            setStatusForDisplay(data.status)
          }
      };
    
    const getProjectStatus = async () => {
        let response = await fetch('http://127.0.0.1:8000/api/project_status/', {
        method: 'GET',
        headers:{
            'Content-Type':'application/json',
        }
        })
        const data = await response.json();
        setProjectStatus(data.status)
        const index = Object.keys(data.status).indexOf(projectStatus2);
        selectRef.current.selectedIndex = index;
    }
            
    const onSubmit = (e) => {
        e.preventDefault()

        navigate('/save-project', {
            state: {
              projectName: e.target.projectName.value,
              projectAbout: e.target.projectAbout.value,
              projectStatus: e.target.projectStatus.value,
              projectStartDate: e.target.startDate.value,
              projectEndDate: e.target.endDate.value,
              projectId: projectId,
              projectStatusData: projectStatus,
            }
          })
    }


    useEffect(() => {
        getProjectStatus()
        fetchProjectDetails()
    }, []);

    return (
        <div>
        <Headers />
        <div>
          <div className="project-container mt-5">
            <div className="project-body">
              <form onSubmit={onSubmit} name="editproject">
                <div className="auth-form-content mt-2">
                  <h1 className="auth-form-title">Edit project</h1>
      
                  <div className="form-group mt-4">
                    <label>Name</label>
                    <input
                      type="text"
                      name="projectName"
                      className="form-control mt-1"
                      placeholder="Project name"
                      value={projectName
                          ? projectName
                          : projectDetails && projectDetails.name
                      }
                      onChange={(e) => setProjectName(e.target.value)}
                      onFocus={handleFocus}
                    />
                  </div>
      
                  <div className="form-group mt-4">
                    <label>About</label>
                    <textarea
                      className="form-control mt-1"
                      name="projectAbout"
                      rows="3"
                      cols="50"                    
                      placeholder="Describe project"
                      value={about ? about : projectDetails && projectDetails.about}
                      onChange={(e) => setAbout(e.target.value)}
                      onFocus={handleFocus}
                    />
                  </div>
      
                  <div className="form-group mt-4">
                    <label>Starting</label>
                    <input
                      type="date"
                      className="form-control mt-1"
                      id="startDate"
                      name="startDate"
                      value={startDate ? startDate : projectDetails && projectDetails.start_date}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className="form-group mt-4">
                    <label>End</label>
                    <input
                      type="date"
                      className="form-control mt-1"
                      id="endDate"
                      name="endDate"
                      value={endDate ? endDate : projectDetails && projectDetails.end_date}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                  <div className='form-group mt-4'>
                        <label htmlFor="status">Status</label>
                        <select id="status" name="projectStatus" className="form-control mt-1" onChange={(event) => setPickedStatus(event.target.value)}  ref={selectRef}>
                            {Object.entries(projectStatus).map(([value, label]) => (
                            <option key={value} value={value}>{label}</option>
                            ))}
                        </select>
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
                <button className="btn btn-primary w-100" onClick={() => navigate(-1, {state: {projectId: projectId}})}>
                  Go back
                </button>
                
              </div></div>
            </div>
          </div>
        </div>
      </div>
        )
}
export default EditProject
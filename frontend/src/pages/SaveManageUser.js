import { useLocation, useNavigate } from 'react-router-dom'
import Headers from '../components/Headers'
import { useContext, useEffect } from 'react'
import AuthContext from '../context/AuthContext';


const SaveManageUser = () => {
  const location = useLocation()
  const {   
        first_name,
        last_name,
        email,
        password,
        age,
        // // gender,
        phone_number,
    } = location.state

  let { authTokens, user } = useContext(AuthContext);
  const navigate = useNavigate();


  const onUpdate = (userData) => {
    Object.keys(userData).forEach(key => {
      if ((userData[key] === undefined) || (userData[key] === "")) {
        delete userData[key];
      }
    });
    
    console.log(userData);

    fetch('http://127.0.0.1:8000/api/user/'+String(user.user_id)+'/', {
      method: 'PATCH',
      body: JSON.stringify(userData),
      headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + String(authTokens.access)
      },
      credentials: 'include'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
  }

  const onSubmit = () => {
     onUpdate({ 
        first_name,
        last_name,
        email,
        password,
        age,
        // // gender,
        phone_number,
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
                <li class="list-group-item">First name: {first_name}</li>
                <li class="list-group-item">last name: {last_name}</li>

                <li class="list-group-item">Email address: {email}</li>
                <li class="list-group-item">Age: {age}</li>

                {/* <li class="list-group-item">Gender: {gender}</li>  */}
                <li class="list-group-item">Phone number: {phone_number}</li> 
            </ul>
            <div className="d-flex justify-content-start gap-2 mt-4 mb-4">
                <button type="submit" className="btn btn-primary w-100" onClick={() => navigate(-1)}>
                    Go back
                </button>
                <button type="submit" className="btn btn-warning w-100" onClick={() => navigate("/")}>    
                    Cancel
                </button>
                <button className="btn btn-success w-100" onClick={() => onSubmit()}>
                    Update account
                </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default SaveManageUser

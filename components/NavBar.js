import Nav from 'react-bootstrap/Nav';
import  verifyLogin from '../util/verifyLogin'


const NavBar = () => {

  const {loggedIn, data} = verifyLogin();

  const name = data ? data.name ? data.name : "No Name" : "No Name"

  return (
    <div className="d-flex flex-column vh-100 p-1 bg-secondary col col-lg">
      <p className="text-center mt-3" >
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="white" className="bi bi-person-circle" viewBox="0 0 16 16">
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
          <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
        </svg>
        
      </p>
      <p className="text-white text-center">
      { name}
      </p>
      <br />
      <br />
      <div className="ms-1">
          <Nav defaultActiveKey="/home"  >
            <Nav.Link className="text-white " href="/">Home</Nav.Link>
            <Nav.Link className="text-white" href="/upload">Upload Salary</Nav.Link>
            <Nav.Link className="text-white" href="/signup" >
              Create User
            </Nav.Link>
            
          </Nav>
      </div>
    </div>
    
  )
}

export default NavBar
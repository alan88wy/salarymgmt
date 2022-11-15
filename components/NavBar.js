import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


const NavBar = () => {
  return (
    <Nav defaultActiveKey="/home" className="flex-column vh-100 p-1 bg-secondary col col-lg" >
      <Nav.Link className="text-white" href="/">Home</Nav.Link>
      <Nav.Link className="text-white" href="/upload">Upload Salary</Nav.Link>
      <Nav.Link className="text-white" href="/signup" >
        Create User
      </Nav.Link>
      
    </Nav>
    
  )
}

export default NavBar
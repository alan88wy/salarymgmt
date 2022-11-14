import Nav from 'react-bootstrap/Nav'


const NavBar = () => {
  return (
    <Nav defaultActiveKey="/home" className="flex-column vh-100 p-1 bg-secondary col col-lg" >
      <Nav.Link className="text-white" href="/">Home</Nav.Link>
      <Nav.Link className="text-white" href="/upload">Upload Salary</Nav.Link>
      <Nav.Link className="text-white" eventKey="link-2">Link</Nav.Link>
      <Nav.Link className="text-white" eventKey="disabled" disabled>
        Disabled
      </Nav.Link>
    </Nav>
  )
}

export default NavBar
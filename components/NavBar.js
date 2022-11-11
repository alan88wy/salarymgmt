import Nav from 'react-bootstrap/Nav'
import navStyles from '../styles/NavStyles.module.css'

const NavBar = () => {
  let className = "flex-column  " + navStyles.nav

  return (
    <Nav defaultActiveKey="/home" className={ className } >
      <Nav.Link className="text-white" href="/home">Active</Nav.Link>
      <Nav.Link className="text-white" eventKey="link-1">Link</Nav.Link>
      <Nav.Link className="text-white" eventKey="link-2">Link</Nav.Link>
      <Nav.Link className="text-white" eventKey="disabled" disabled>
        Disabled
      </Nav.Link>
    </Nav>
  )
}

export default NavBar
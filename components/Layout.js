
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBar from '../components/NavBar'
import Meta from '../components/Meta'
import navStyles from '../styles/NavStyles.module.css'

const Layout = ({ children }) => {

    let navColor = navStyles.nav + ' bg-light '
    return (
        <>
            <Meta />
            <div>
                <NavBar />
                {children}
            </div>
        </>
    )
}

export default Layout
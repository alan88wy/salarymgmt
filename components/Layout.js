
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBar from '../components/NavBar'
import Meta from '../components/Meta'
import Salaries from '../components/Salaries'
import navStyles from '../styles/NavStyles.module.css'

const Layout = () => {

    return (
        <>
        <Meta />
        <Container fluid>
            <Row>
                <Col xs={'auto'} md={'auto'} lg={'auto'} className={navStyles.nav} >
                    <NavBar />
                </Col>
                <Col >
                <Salaries />
                </Col>
            </Row>

        </Container>
    </>
    )
}

export default Layout
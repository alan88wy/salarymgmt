
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBar from '../components/NavBar'
import Meta from '../components/Meta'
import Salaries from '../components/Salaries'
import navStyles from '../styles/NavStyles.module.css'

const Layout = () => {

    let navColor = navStyles.nav + ' bg-light '
    return (
        <>
            <Container  className="mw-100" >

                <Row className='mw-100'>
                    <Col xs={'auto'} md={'auto'} lg={'auto'} className="w-40">
                        <NavBar />
                    </Col>
                    <Col className='w-60'>
                    <Salaries />
                    </Col>
                </Row>

            </Container>
    </>
    )
}

export default Layout
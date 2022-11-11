
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
            <Container fluid-sm >

                <Row className='align-items-start'>
                    <Col xs={'auto'} md={'auto'} lg={'auto'} className='bg-light' style={{margin: 0, border: 0}}>
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
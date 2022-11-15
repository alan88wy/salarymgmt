import { Container } from 'react-bootstrap'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import SalaryItem from '../components/SalaryItem'

const SalaryList = ({ salaries, token }) => {

  return (
    <Container >
        <Row xs md={5} className='lh-lg fw-bold rounded-3 bg-opacity-25 border border-3 border-white' >
            <Col>ID</Col>
            <Col>Name</Col>
            <Col>Login</Col>
            <Col>Salary</Col>
            <Col></Col>
            <Col></Col>
        </Row>
        {
          salaries.map((salary) => (
            <SalaryItem key={salary.id} salary={ salary } token = {token} />
          ))
        }
    </Container>
  )
}

export default SalaryList
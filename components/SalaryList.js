import { Container } from 'react-bootstrap'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import SalaryItem from '../components/SalaryItem'

const SalaryList = ({ salaries }) => {

  return (
    <Container >
        <Row  className='fw-bold lh-lg' >
            <Col>ID</Col>
            <Col>Name</Col>
            <Col>Login</Col>
            <Col>Salary</Col>
        </Row>
        {
          salaries.map((salary) => (
            <SalaryItem key={salary.id} salary={ salary } />
          ))
        }
    </Container>
  )
}

export default SalaryList
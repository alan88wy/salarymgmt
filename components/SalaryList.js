import { Container } from 'react-bootstrap'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/FormCheckLabel';
import React, {useState} from 'react';
import SalaryItem from '../components/SalaryItem'

const SalaryList = ({ salaries, token }) => {

  const [startSalary, setStartSalary] = useState(0.00);
  const [endSalary, setEndSalary] = useState(0.00);

  const handleSubmit = (e) => {
      console.log("abc")
  }

  return (
    <div className='d-flex flex-column vh-100 p-1 col col-lg' >
        <div className="flex-column mb-3 mt-3">
          <span className="bg-secondary p-2 mt-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
          </span>
 
      </div>
      
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
    </div>
  )
}

export default SalaryList
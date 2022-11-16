import { Container } from 'react-bootstrap'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import React, {useState} from 'react';
import SalaryItem from '../components/SalaryItem'
import Router from 'next/router'
import useSWR from 'swr'
import { server } from '../config/index'

const SalaryList = ({ salaries, setSalaries, token }) => {

  const [startSalary, setStartSalary] = useState("");
  const [endSalary, setEndSalary] = useState("");
  // const [salaries, setSalaries] = useState([])

  const fetcher = (...args) => fetch(...args).then(res => res.json())

  let address = `${server}/api/search`;

  if (!isNaN(Number(startSalary))) {
    address += `?startSalary=${Number(startSalary)}`
  }

  if (!isNaN(Number(endSalary)))  {
    if (!isNaN(Number(startSalary)))  {
      address += `&endSalary=${Number(endSalary)}`
    } else {
      address += `?endSalary=${Number(endSalary)}`
    }
  }

  console.log(address)
  const { data, error } = useSWR(address, fetcher);

  if (error) <p>Loading failed...</p>;
  if (!data) <h1>Loading...</h1>;

  if (data && data.success) {
    setSalaries(data.salaries)
  }

  const handleSubmit = (e) => {
      console.log("abc")
  }

  const handleStartSalary = async(e) => {
    setStartSalary(e.target.value)

  }

  const handleEndSalary = async(e) => {
    setEndSalary(e.target.value)

  }

  return (
    <div className='d-flex flex-column p-2 h-auto' >
      <Container >
        <Form className="mb-2" >
            <Row className="fw-bold" >
              <Col className="d-flex flex-row" >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="40" height="40" className="p-2 bg-secondary bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                  </svg>
                  
                  <Form.Control className="input-group-text " type="number" placeholder='Minimum Salary' value={startSalary}
                            required onChange={handleStartSalary}
                  />
                  
              </Col>
              
              <Col className="d-flex flex-row" >
                  
                  <p >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="me-3 bi bi-dash" viewBox="0 0 16 16">
                        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                      </svg>
                  </p>

                  <Form.Control className="input-group-text" type="number" placeholder='Maximum Salary' value={endSalary}
                            required onChange={handleEndSalary}
                  />
                </Col>
                </Row>
        </Form>
 
      <hr />
      
          <Row xs md={5} className='lh-lg fw-bold rounded-3 bg-opacity-25 border border-3 border-white ' >
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
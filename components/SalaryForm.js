import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const SalaryForm = ({ validated, salary, setIsOpen, title, buttonText, handleSubmit }) => {
   
    
    return (
        <>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            
            <h3 >
                <span >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
</svg>
                </span>
            
    <span className="ms-4 ps-5">{ title }</span>
            </h3>
            
            <hr />
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Employee Id : {salary.id} </Form.Label>
                <br />
                <Form.Control type="text" placeholder="Enter Name" value={empName}
                            required onChange={(e) => setEmpName(e.target.value)}
                />

            </Form.Group>

            <Form.Group className="mb-3" controlId="login">
                <Form.Control type="text" placeholder='Enter the user login'
                value={login}
                onChange={(e) => setLogin(e.target.value)} required
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="empSalary">
                <Form.Control type="number" placeholder='Enter the salary'
                value={empSalary}
                onChange={(e) => setEmpSalary(e.target.value)} required
                />
            </Form.Group>
            
            <Button variant="primary" type="submit" className="w-100">
                { buttonText }
            </Button>

            <br/>
            <br/>
            <h4>{editSuccess ? signInError :  " "}</h4>
        </Form>
        </>
    )
}

export default SalaryForm;

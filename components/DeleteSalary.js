import React, {useState} from 'react';
import Router from 'next/router';
import { setCookie } from 'cookies-next';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const DeleteSalary = ({ salary }) => {
   
    const [editSuccess, setEditSuccess] = useState('');
    const [login, setLogin] = useState(salary.login);
    const [empName, setEmpName] = useState(salary.name);
    const [empSalary, setEmpSalary] = useState(salary.salary);
    const [validated, setValidated] = useState(false);


    function handleSubmit(e) {
        e.preventDefault();

        if (login === null || login.length === 0) {
            setEditSuccess("You must enter user login id!");
            return
        }

        if (empName === null || empName.length === 0) {
            setEditSuccess("You must enter employee name!");
            return
        }

        if (empSalary === null || empSalary < 0) {
            setEditSuccess("Salary must be greater than zero !");
            return
        }

        setEditSuccess("")

        fetch('/api/salary', {
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                salary : {
                id: salary.id,
                login,
                name: empName,
                salary: empSalary,
                },
            }),
        })
        .then((res) => res.json())
        .then((data) => {

            if (data && data.error) {
                setEditSuccess(data.message);
            }
            
            if (data && data.token) {
                setSignInSuccess(`User id ${login} deleted successfully`)
                setCookie('token', data.token, { expires: new Date(Date.now() + (2 * 3600000)) });
                
                Router.push({
                    pathname: '/',
                })

                
            }
        });

        setValidated(true);
    }

    return (
        <>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            
            <h3 >
                <span >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
</svg>
                </span>
            
    <span className="ms-4 ps-5">Deleting Salary Record</span>
            </h3>
            
            <hr />
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Employee Id : {salary.id} </Form.Label>
                <br />
                <Form.Control type="text" placeholder="Name" value={empName}
                            readOnly 
                />

            </Form.Group>

            <Form.Group className="mb-3" controlId="login">
                <Form.Control type="text" placeholder='User login'
                value={login}
                readOnly
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="empSalary">
                <Form.Control type="number" placeholder='Salary'
                value={empSalary}
                readOnly
                />
            </Form.Group>
            
            <Button variant="primary" type="submit" className="w-100">
                Confirm Delete ?
            </Button>

            <br/>
            <br/>
            <h4>{editSuccess ? signInError :  " "}</h4>
        </Form>
        </>
    )
}

export default DeleteSalary;


import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

import NavBar from '../components/NavBar'
import Meta from '../components/Meta'
import Salaries from '../components/Salaries'


const Layout = () => {

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return (
    <>
        <Meta />
    
        <Button variant="primary" onClick={handleShow}>
            Menu
        </Button>
        
        <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <NavBar />
            </Offcanvas.Body>
        </Offcanvas>
       
        
        <Salaries />
    </>
    )
}

export default Layout
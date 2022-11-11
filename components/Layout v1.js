import NavBar from './NavBar'
import Meta from './Meta'
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

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

        
        <div>
            hhhh
        </div>
    </>
    )
}

export default Layout
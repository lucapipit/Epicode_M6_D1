import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
    return (

        <>
        <Navbar expand="lg" className=" myNav bg-body-tertiary shadow-sm position-fixed w-100 top-0">
            <Container>
                <Navbar.Brand href="#home">
                    <Link to="/" className='text-decoration-none'>
                        <Navbar.Brand ><i class="bi bi-house me-1"></i>MedicalBlog</Navbar.Brand>
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link >
                            <Link to="logIn" className='text-secondary' style={{ textDecoration: "none" }}>
                                <a ><i class="bi bi-person-fill"></i>Log in</a>
                            </Link>
                        </Nav.Link>
                        <Nav.Link href="#link"><i class="bi bi-person-fill-add"></i>Sign In</Nav.Link>
                        <NavDropdown title="Category" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <div className='myNavSpacer'></div>
        </>
    )
}

export default NavigationBar
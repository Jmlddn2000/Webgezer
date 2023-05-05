import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

function Desain_website() {
  return (
    <div className=''>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">My Website</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <h1>Welcome to My Website</h1>
        <p>This is a simple website created using React.js and Bootstrap.</p>
      </Container>
    </div>
  );
}

export default Desain_website;

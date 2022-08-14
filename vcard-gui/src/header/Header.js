import { Container, Nav, Navbar, NavDropdown, Offcanvas } from "react-bootstrap";
import UserService from "../auth/UserService";

function Header() {
    let user = null;
    
    if(UserService.getUserDetails() != null) {
        user = JSON.parse(UserService.getUserDetails());
    }

    return ( 
        <>
            {[false].map((expand) => (
                <Navbar key={expand} bg="light" expand={expand} className="mb-3">
                    <Container fluid>
                        <Navbar.Brand href="/dashboard">Virtual Greeting Card</Navbar.Brand>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    Virtual Greeting Card
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="me-auto">
                                    {!user &&
                                        <>
                                            <Nav.Link href="/signin">Log In</Nav.Link>
                                            <Nav.Link href="/register">Register</Nav.Link>
                                        </>}
                                    {user &&
                                        <>
                                            <Nav.Link href="/mycards">My Cards</Nav.Link>
                                            <NavDropdown title="My Profile" id="basic-nav-dropdown">
                                                <NavDropdown.Item href="/profile">{user.name}</NavDropdown.Item>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item href="/signin" onClick={() => { UserService.logOutUser() }}>
                                                    Sign out
                                                </NavDropdown.Item>
                                            </NavDropdown>
                                        </>}
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </>
    );
}

export default Header;
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import UserService from "../auth/UserService";

function Header(props) {
    let user = null;
    
    if(UserService.getUserDetails() != null) {
        user = JSON.parse(UserService.getUserDetails());
    }

    return ( 
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand><Nav.Link href="/dashboard">Virtual Greeting Card</Nav.Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {!user && 
                        <>
                            <Nav.Link href="/signin">Log In</Nav.Link>
                            <Nav.Link href="/register">Register</Nav.Link>
                        </>}
                        {user && 
                        <>
                            <Nav.Link href="/cards">My Cards</Nav.Link>
                                <NavDropdown title="My Profile" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/profile">{user.name}</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/signin" onClick={() => {UserService.logOutUser()}}>
                                    Sign out
                                </NavDropdown.Item>
                            </NavDropdown>
                        </>}
                    </Nav>
                </Navbar.Collapse>
            </Container> 
        </Navbar>
    );
}

export default Header;
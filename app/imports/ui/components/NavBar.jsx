import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  return (

    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <h2>Shop-Manoa</h2>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-start">
            {currentUser ? ([

              <Nav.Link id="list-stuff-nav" as={NavLink} to="/userHome" key="userHome">Home</Nav.Link>,
              <Nav.Link id="list-stuff-nav" as={NavLink} to="/profile" key="userHome">My Profile</Nav.Link>,
              <Nav.Link id="add-stuff-nav" as={NavLink} to="/create" key="create">Create Item</Nav.Link>,
              <Nav.Link id="list-stuff-nav" as={NavLink} to="/list" key="list">List Profile</Nav.Link>,
              <Nav.Link id="list-stuff-nav" as={NavLink} to="/items" key="items">Items</Nav.Link>,
              <Nav.Link id="list-stuff-nav" as={NavLink} to="/create" key="createItem">Create</Nav.Link>,
              <Nav.Link id="add-stuff-nav" as={NavLink} to="/addReport" key="addReport">Add Report</Nav.Link>,
              <Nav.Link id="list-stuff-nav" as={NavLink} to="/categories" key="categoires">Categories</Nav.Link>,
              <Nav.Link id="list-stuff-nav" as={NavLink} to="/items" key="items">Items</Nav.Link>,

            ]) : ''}
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? ([
              <Nav.Link id="admin-home-nav" as={NavLink} to="/adminHome" key="adminHome">Admin Home</Nav.Link>,
            ]) : ''}
          </Nav>
          <Nav className="justify-content-end">
            {currentUser === '' ? (
              <NavDropdown id="login-dropdown" title="Login">
                <NavDropdown.Item id="login-dropdown-sign-in" as={NavLink} to="/signin">
                  <PersonFill />
                  Sign
                  in
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-up" as={NavLink} to="/signup">
                  <PersonPlusFill />
                  Sign
                  up
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id="navbar-current-user" title={currentUser}>
                <NavDropdown.Item id="navbar-sign-out" as={NavLink} to="/signout">
                  <BoxArrowRight />
                  {' '}
                  Sign
                  out
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;

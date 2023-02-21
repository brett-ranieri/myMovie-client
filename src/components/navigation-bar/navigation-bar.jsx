import { useState } from "react";
import { Button } from "react-bootstrap";
import { Container, Nav, Navbar, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut, clearSearch }) => {
	return (
		<Navbar bg='light'>
			<Container>
				<Navbar.Brand
					as={Link}
					to='/'
					onClick={clearSearch}
				>
					myMovie App
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='me-auto'>
						{!user && (
							<>
								<Nav.Link
									as={Link}
									to='/login'
								>
									Login
								</Nav.Link>
								<Nav.Link
									as={Link}
									to='/signup'
								>
									Signup
								</Nav.Link>
							</>
						)}
						{user && (
							<>
								<Nav.Link
									as={Link}
									to='/'
									onClick={clearSearch}
								>
									Home
								</Nav.Link>
								<Nav.Link
									as={Link}
									to='/users/profile'
								>
									Profile
								</Nav.Link>
								<Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
								{/* <Form className='d-flex align-items-end'>
									<Form.Control
										onChange={(e) => setSearchText(e.target.value)}
										value={searchText}
										type='search'
										placeholder='Search'
										className='me-2'
										aria-label='Search'
									/>
									<Button
										variant='primary'
										onClick={handleSearch}
										as={Link}
										to='/'
										className='me-2'
									>
										Search
									</Button>
									<Button
										variant='danger'
										onClick={clearSearch}
										className='me-2'
									>
										Reset
									</Button>
								</Form> */}
							</>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

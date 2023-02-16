import { useState } from "react";
import { Button } from "react-bootstrap";
import { Container, Nav, Navbar, Form } from "react-bootstrap";
import { createSearchParams, Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut, onSearch }) => {
	const [searchText, setSearchText] = useState("");

	const handleSearch = async () => {
		let handledText = searchText.toLowerCase();
		console.log(handledText);
		onSearch(handledText);
	};

	return (
		<Navbar bg='light'>
			<Container>
				<Navbar.Brand
					as={Link}
					to='/'
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
								<Form>
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
									>
										Search
									</Button>
								</Form>
							</>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

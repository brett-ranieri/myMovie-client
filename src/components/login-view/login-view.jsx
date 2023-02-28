import React from "react";
import { useState } from "react";
import { Button, Col, Row, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export const LoginView = ({ onLoggedIn }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();

		const data = {
			Username: username,
			Password: password,
		};

		fetch("https://movie-api-git-main-brett-ranieri.vercel.app/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.user) {
					// localStorage.setItem("user", data.user);
					localStorage.setItem("token", data.token);
					// localStorage.setItem("username", data.user.Username);
					localStorage.setItem("userId", data.user._id);
					onLoggedIn(data.token);
				} else {
					alert("No such user");
				}
			})
			.catch((error) => {
				console.error(error);
				res.status(500).send("Error: ", error);
			});
	};

	return (
		<Row className='d-flex justify-content-center justify-content-sm-center align-content-center vh-100'>
			<Col>
				<Card
					className='p-4 rounded-4 shadow-lg loginContainer'
					style={{ width: "auto" }}
				>
					<h1 className='text-center'>myMovie App</h1>
					<Card.Body>
						<Form onSubmit={handleSubmit}>
							<Form.Group controlId='formUsername'>
								<Form.Label>Username:</Form.Label>
								<Form.Control
									type='text'
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									required
									minLength='5'
								/>
							</Form.Group>
							<Form.Group controlId='formPassword'>
								<Form.Label>Password:</Form.Label>
								<Form.Control
									type='password'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
									minLength='5'
								/>
							</Form.Group>
							<Button
								className='mt-3 mb-3 goldButton'
								type='submit'
							>
								Submit
							</Button>
						</Form>
						<div>
							<p className='text-muted text-center'>
								Need an account?
								<Link
									to={"/signup"}
									className='mx-2'
								>
									Signup
								</Link>
							</p>
						</div>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	);
};

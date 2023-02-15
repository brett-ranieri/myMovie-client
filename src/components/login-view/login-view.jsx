import React from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

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
			.then((response) => response.json()) //transforms response content into JSON object
			.then((data) => {
				console.log("Login response: ", data);
				if (data.user) {
					localStorage.setItem("user", JSON.stringify(data.user));
					localStorage.setItem("token", data.token);
					onLoggedIn(data.user, data.token);
					console.log(data.user); //passes user and token back to MainView
				} else {
					alert("No such user");
				}
			})
			.catch((e) => {
				alert("Login Error");
			});
	};

	return (
		<Form
			onSubmit={handleSubmit}
			className='mb-3 mt-3'
		>
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
				variant='primary'
				className='mt-3 mb-3'
				type='submit'
			>
				Submit
			</Button>
		</Form>
	);
};

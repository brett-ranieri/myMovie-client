import React from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

export const SignupView = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [birthday, setBirthday] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();

		const data = {
			Username: username,
			Password: password,
			Name: name,
			Email: email,
			Birthday: birthday,
		};

		console.log("Signup form: ", data);

		const createUser = await fetch(
			`https://movie-api-git-main-brett-ranieri.vercel.app/users`,
			{
				method: "POST",
				body: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		const response = await createUser.json();
		if (response) {
			alert(
				"Account successfully created. Please login to checkout the movies"
			);
			window.location = "/login";
		} else {
			alert("Account creation failed");
		}
	};

	return (
		<Form
			onSubmit={handleSubmit}
			className='mb-3 mt-3'
		>
			<Form.Group>
				<Form.Label>Username:</Form.Label>
				<Form.Control
					type='text'
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
					minLength='5'
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Password:</Form.Label>
				<Form.Control
					type='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
					minLength='5'
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Name:</Form.Label>
				<Form.Control
					type='text'
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
					minLength='3'
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Email:</Form.Label>
				<Form.Control
					type='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Birthday:</Form.Label>
				<Form.Control
					type='date'
					value={birthday}
					onChange={(e) => setBirthday(e.target.value)}
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

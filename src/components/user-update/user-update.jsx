import React from "react";
import { useState } from "react";
import { Col, Button, Form } from "react-bootstrap";

export const UpdateView = ({ user, onLoggedOut }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [birthday, setBirthday] = useState("");

	const storedToken = localStorage.getItem("token");
	const [token] = useState(storedToken ? storedToken : null);
	console.log("User info: ", user);
	const handleUpdate = async (event) => {
		event.preventDefault();

		const data = {
			Username: username,
			Password: password,
			Name: name,
			Email: email,
			Birthday: birthday,
		};
		console.log("Form input: ", data);
		console.log(JSON.stringify(data));

		const updateUser = await fetch(
			`https://movie-api-git-main-brett-ranieri.vercel.app/users/${user.Username}`,
			{
				method: "PUT",
				body: JSON.stringify(data),
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			}
		);

		const response = await updateUser.json();
		if (response) {
			alert("Account successfully updated. Please login again to see changes");
			onLoggedOut();
		} else {
			alert("Update failed");
		}
	};

	return (
		<Col>
			<h1>UPDATE!?!?!?!</h1>
			<Form onSubmit={handleUpdate}>
				<Form.Group>
					<Form.Label>Username:</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter new Username'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						minLength='5'
						disabled={username === user.Username}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Password:</Form.Label>
					<Form.Control
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						minLength='5'
						disabled={password === user.Password}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Name:</Form.Label>
					<Form.Control
						type='text'
						value={name}
						onChange={(e) => setName(e.target.value)}
						minLength='3'
						disabled={name === user.Name}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Email:</Form.Label>
					<Form.Control
						type='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						disabled={email === user.Email}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Birthday:</Form.Label>
					<Form.Control
						type='date'
						value={birthday}
						onChange={(e) => setBirthday(e.target.value)}
						disabled={birthday === user.Birthday}
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
		</Col>
	);
};

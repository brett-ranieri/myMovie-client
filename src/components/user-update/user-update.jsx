import React from "react";
import { useState } from "react";
import { Col, Button, Form } from "react-bootstrap";

export const UpdateView = ({ user, rerunUsers }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [birthday, setBirthday] = useState("");

	const [noData, setNoData] = useState(false);
	const [fetchStatus, setFetchStatus] = useState(false);

	const storedToken = localStorage.getItem("token");
	const [token] = useState(storedToken ? storedToken : null);

	const handleUpdate = async (event) => {
		event.preventDefault();

		const data = {
			Username: username,
			Password: password,
			Name: name,
			Email: email,
			Birthday: birthday,
		};

		let review = (data) => {
			setFetchStatus(false);
			if (!data.Username) {
				delete data.Username;
			}
			if (!data.Password) {
				delete data.Password;
			}
			if (!data.Name) {
				delete data.Name;
			}
			if (!data.Email) {
				delete data.Email;
			}
			if (!data.Birthday) {
				delete data.Birthday;
			}
			return data;
		};
		review(data);

		const runUpdate = async (data) => {
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
				setFetchStatus(true);
				rerunUsers();
			} else {
				alert("Update failed, please try again.");
			}
		};

		const isDataEmpty = (data) => {
			if (Object.keys(data).length === 0) {
				setNoData(true);
			} else {
				runUpdate(data);
				setNoData(false);
			}
		};
		isDataEmpty(data);
	};

	return (
		<>
			<Col className='mb-3 mt-3 textContainer rounded-4 shadow-lg'>
				{fetchStatus ? (
					<p>
						Updates successfully submitted! Head back to your profile page to
						see the changes.
					</p>
				) : null}
				<h3>Looking to update your info?</h3>
				<p>
					Add the new info desired to any field in the form below and click
					Submit!
					<br />
					It's just that easy.
				</p>
				{noData ? (
					<p className='warningText'>
						<b>At least one field must be filled in before submitting!</b>
					</p>
				) : null}
				<Form onSubmit={handleUpdate}>
					<Form.Group>
						<Form.Label>Username:</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter new Username'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							minLength='5'
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Password:</Form.Label>
						<Form.Control
							type='password'
							placeholder='Enter new Password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							minLength='5'
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Name:</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter new Name'
							value={name}
							onChange={(e) => setName(e.target.value)}
							minLength='3'
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Email:</Form.Label>
						<Form.Control
							type='email'
							placeholder='Enter new Email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
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
						className='mt-3 mb-3 goldButton'
						type='submit'
					>
						Submit
					</Button>
				</Form>
			</Col>
		</>
	);
};

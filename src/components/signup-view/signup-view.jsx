import React from "react";
import { useState } from "react";

export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const handleSubmit = (event) => {};

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="">
                Username:
                <input 
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </label>
            <label htmlFor="">
                Password:
                <input 
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            <label htmlFor="">
                Name:
                <input 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </label>
            <label htmlFor="">
                Email:
                <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </label>
            <label htmlFor="">
                Birthday:
                <input 
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    )

}
import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";
import { Container } from "react-bootstrap";

import "./index.scss"; //indicates that bundle needed for `.index.scss`

const MyMovieApplication = () => {
	return (
		<Container style={{ border: "1px solid red" }}>
			<MainView />
		</Container>
	);
};

//Finds the root of app
const container = document.querySelector("#root");
const root = createRoot(container);

//Tells React to render in root DOM element
root.render(<MyMovieApplication />);

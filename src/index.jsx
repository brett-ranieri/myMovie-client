import { createRoot } from 'react-dom/client';

import "./index.scss"; //indicates that bundle needed for `.index.scss`

const MyMovieApplication = () => {
  return (
    <div className="my-movie">
      <div>Good Morning</div>
    </div>     
  );
};

//Finds the root of app
const container = document.querySelector("#root");
const root = createRoot(container);

//Tells React to render in root DOM element
root.render(<MyMovieApplication />);

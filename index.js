import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
const root = ReactDOM.createRoot(document.getElementById("root"));

/* 
React's core responsibilities:
1. Render JSX code.
2. Manage state and props.
3. React to events and inputs.
4. Evaluating states / props change.
*/

/* 
Anything other than core responsibilites are considered as side effects:
1. Fetching data from API.
2. Updating DOM.
3. Setting any subscription or timer.
*/

// side effect using life cycle methods in class components
/* class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { time: new Date().toLocaleTimeString(), count: 0 };
    this.tick = this.tick.bind(this);
  }

  tick() {
    this.setState({ time: new Date().toLocaleTimeString() });
  }
  componentDidMount() {
    // set a timer
    this.timerID = setInterval(this.tick, 1000);

    // change dom
    document.title = `Clicked ${this.state.count} times.`;
  }

  componentDidUpdate(prevProps, { count: prevCount }) {
    // change dom when count state change
    if (prevCount !== this.state.count) {
      document.title = `Clicked ${this.state.count} times.`;
    }
  }

  componentWillUnmount() {
    // clear the timer
    clearInterval(this.timerID);
  }

  render() {
    const { time, count } = this.state;
    return (
      <div>
        <p>Time: {time}</p>
        <p>
          <button
            onClick={() => this.setState(({ count }) => ({ count: count + 1 }))}
            className="bg-slate-100 border border-yellow-500 p-2"
          >
            Clicked {count} times.
          </button>
        </p>
      </div>
    );
  }
} */

// side effects in functional components using useEffect() hook
function MyComponent() {
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  const tick = () => {
    console.log('tick');
    setTime(new Date().toLocaleTimeString());
  };

  // useEffect is a combination of componentDidMount, componentDidUpdate & componentWillUnmount

  // useEffect runs once when componentDidMount, no matter what dependencies are
  // useEffect runs after when change happens in dependencies
  // useEffect returns when componentWillUnmount

  useEffect(() => {
    console.log("component did mount");
    // when component mounts start the timer
    const timerID = setInterval(tick, 1000);

    // when component unmounts stop the timer
    return () => {
      console.log("component will unmount");
      clearInterval(timerID);
    };
  }, []);

  useEffect(() => {
    console.log("component did update");
    // when the count changes update dom
    document.title = `Clicked ${count} times.`;
  }, [count]);

  return (
    <div>
      <p>Time: {time}</p>
      <p>
        <button
          onClick={() => setCount((prevCount) => prevCount + 1)}
          className="bg-slate-100 border border-yellow-500 p-2"
        >
          Clicked {count} times.
        </button>
      </p>
    </div>
  );
}

const App = () => {
  const [show, setShow] = useState(true);

  const handleShow = () => {
    setShow((prevShow) => !prevShow);
  };
  return (
    <div>
      <p>
        <button
          onClick={handleShow}
          className="bg-slate-100 border border-yellow-500 p-2"
        >
          Set Show state
        </button>
      </p>
      {show ? <MyComponent /> : "Hi, baby!"}
    </div>
  );
};

root.render(<App />);

reportWebVitals();

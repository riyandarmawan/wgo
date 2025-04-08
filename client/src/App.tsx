import { useEffect } from "react";

function App() {
  useEffect(() => {
    fetch("http://localhost:3000")
      .then((response) => response.text())
      .then((message) => console.log(message));
  }, []);

  return <></>;
}

export default App;

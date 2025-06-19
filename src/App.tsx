import { useParams } from "react-router-dom";
import "./App.css";
import MainAerea from "./modules/mainAerea/MainAerea";
import Navbar from "./modules/navbar/Navbar";

function App() {
  let { game } = useParams(); // Extract the site name from the URL using React Router's useParams hook.

  return (
    <>
      <Navbar />
      <MainAerea game={game ?? "activity"} />
    </>
  );
}

export default App;

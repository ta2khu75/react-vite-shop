import "./App.css";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
function App() {
  return (
    <>
      <Header />
      <div className="container mb-4">
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

export default App;

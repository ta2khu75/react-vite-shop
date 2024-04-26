import "./App.css";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
function App() {
  return (
    <>
      <Header />
      <div className="d-flex justify-content-center">
        <div className="w-75 mb-4">
          <Outlet />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;

import "./App.css";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { AppRouter } from "./routes";

function App() {
  return (
    <>
      <div className="outer">
        <Header />
        <div className="outer__inner">
          <AppRouter />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;

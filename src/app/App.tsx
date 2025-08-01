import { Homepage } from "../pages/Homepage";
import Container from "../shared/components/Container"; 
import "./styles/App.css";
function App() {
  return (
    <div className="body">
      <div className="main-container">
        <Container className="container">
          <Homepage />
        </Container>
      </div>
    </div>
  );
}

export default App;

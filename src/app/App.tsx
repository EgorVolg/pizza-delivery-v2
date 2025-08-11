import { Homepage } from "../pages/Homepage";
import Container from "../shared/ui/Container";
import "./styles/App.css";
function App() {
  return (
    <div className="body">
      <div className="main">
        <Container className="container">
          <Homepage />
        </Container>
      </div>
    </div>
  );
}

export default App;

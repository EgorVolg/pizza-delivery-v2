 
import { Homepage } from "../pages/home/Homepage";
import Container from "../shared/ui/Container/Container";
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

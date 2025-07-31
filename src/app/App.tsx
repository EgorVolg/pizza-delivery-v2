import Container from "../shared/components/Container";
import Header from "../shared/components/Header";
import TopBar from "../shared/components/TopBar"; 
import "./styles/App.css";
function App() {
  return (
    <div className="body">
      <div className="main-container">
        <Container className="container">
          <Header /> 
          <TopBar />
        </Container>
      </div>
    </div>
  );
}

export default App;

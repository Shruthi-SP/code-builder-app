import { Container, Typography } from "@mui/material";
import CodesContainer from "./components/CodesContainer";

function App() {
  
  return (
    <Container>
      <Typography variant="h4">Code Builder App</Typography>
      <CodesContainer />
    </Container>
  );
}

export default App;
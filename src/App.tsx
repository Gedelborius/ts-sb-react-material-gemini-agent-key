import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import GeminiChat from "./components/GeminiChat/GeminiChat";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#9c27b0",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GeminiChat />
    </ThemeProvider>
  );
}

export default App;

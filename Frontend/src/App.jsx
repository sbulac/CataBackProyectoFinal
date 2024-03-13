import { AppProvider } from "./context";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}

export default App;

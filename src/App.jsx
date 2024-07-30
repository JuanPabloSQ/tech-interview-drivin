import { ThemeContextProvider } from "./context/ThemeContext";
import Table from "./components/Table";

function App() {

  return (
    <ThemeContextProvider>
      <>
        <h1> test </h1>
        <Table/>
      </>
    </ThemeContextProvider>
  )
}

export default App

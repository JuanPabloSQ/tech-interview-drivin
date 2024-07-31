import { ThemeContextProvider } from "./context/ThemeContext";
import Table from "./components/Table";
import ToggleColorMode from "./components/ToggleColorMode";

function App() {

  return (
    <ThemeContextProvider>
      <>
        <div style={{ textAlign: 'center' }}>
          <ToggleColorMode/>
          <h1>Tech Interview DrivIn</h1>
        </div>
        <Table/>
      </>
    </ThemeContextProvider>
  )
}

export default App

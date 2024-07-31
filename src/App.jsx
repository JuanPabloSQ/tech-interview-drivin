import { ThemeContextProvider } from "./context/ThemeContext";
import Table from "./components/Table";

function App() {

  return (
    <ThemeContextProvider>
      <>
        <div style={{ textAlign: 'center' }}>
          <h1>Tech Interview DrivIn</h1>
        </div>
        <Table/>
      </>
    </ThemeContextProvider>
  )
}

export default App

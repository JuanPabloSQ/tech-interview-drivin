import { ThemeContextProvider } from "./context/ThemeContext"

function App() {

  return (
    <ThemeContextProvider>
      <>
        <h1> test </h1>
      </>
    </ThemeContextProvider>
  )
}

export default App

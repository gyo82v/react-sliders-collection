import Slider1 from "./sliders/Slider1"

function App() {
  const header = `bg-neutral-700 p-4 text-2xl font-bold text-center text-neutral-200 
                  shadow-lg shadow-neutral-700/30`

  return (
    <div className="flex flex-col">
      <header className={header}>
        <h1>Sliders collection</h1>
      </header>
      <main className="flex flex-col">
        <Slider1 />
      </main>
    </div>
  )
}

export default App

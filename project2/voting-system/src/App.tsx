import './App.css'
import Vote from './component/Vote/Vote.tsx'

function App() {

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>实时投票系统</h1>
      </header>
      <main className="app-main">
        {/* 直接渲染Vote组件 */}
        <Vote />
      </main>
    </div>
  )
}

export default App

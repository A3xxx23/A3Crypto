import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";

import Calculator from "./components/Calculator";
import Trending from "./components/Trending";
import News from "./components/News";
import Nabvar from "./components/Nabvar";

export const App = () => {
  return (
    <div className="h-screen flex flex-col">
      <Nabvar/>
     
    <main className="flex-1 p-4">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/calculator" element={< Calculator/>} />
        <Route path="/trending" element={< Trending/>} />
        <Route path="/news" element={< News/>} />
      </Routes>
    </main>
  </div>
  );
}
  

export default App

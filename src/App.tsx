import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

import Calculator from "./pages/Calculator";
import Trending from "./pages/Trending";
import News from "./pages/News";
import Nabvar from "./components/Nabvar";
import Crypto from "./components/Crypto";
import { Footer } from "./components/Footer";

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
        <Route path="/crypto/:id" element={<Crypto/>} />
      </Routes>
    </main>

    <Footer/>
  </div>
  );
}
  

export default App

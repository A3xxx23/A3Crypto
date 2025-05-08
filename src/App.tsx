const App = () => {
  return (
    <div className="h-screen flex flex-col">
    <Navbar /> 
    <main className="flex-1 p-4">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/csv-to-pdf" element={< />} />
        <Route path="/pdf-to-docx" element={< />} />
        <Route path="/docx-to-pdf" element={< />} />
        <Route path="/html-to-pdf" element={< />} />
      </Routes>
    </main>
  </div>
  );
}
  

export default App

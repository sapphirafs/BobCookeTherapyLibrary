import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { VideoList } from "./components/VideoList";
import {Podcasts}  from "./components/pages/Podcasts";

function App() {
  return (
    <Router>
      <Header />
      <main style={{padding: "20px"}}>
        <Routes>
          <Route path="/" element={<VideoList />} />
          <Route path="/podcasts" element={<Podcasts />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

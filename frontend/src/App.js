import React from "react";
import Header from "./components/layout/header/Header";
import Footer from "./components/layout/footer/Footer"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import WebFont from "webfontloader";
import Home from "./components/Home/Home.jsx"




function App() {
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })
  });

  return (<>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>

  </>);
}

export default App;

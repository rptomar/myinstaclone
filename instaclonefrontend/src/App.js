import './App.css';
import React from 'react';
import {PostviewPage,LandingPage,PostForm} from './Layouts/index';
import { BrowserRouter,Route, Routes} from 'react-router-dom';
function App() {
  return (
    <div className="App">
     <BrowserRouter>
        <Routes>
          <Route path="/" element={  <LandingPage />}>
          </Route>
          <Route path="/Postview" element={  <PostviewPage />}>
          </Route>
          <Route path="/PostForm" element={<PostForm/>}>
          </Route>
        </Routes>
      </BrowserRouter>       
    </div>
  );
}

export default App;

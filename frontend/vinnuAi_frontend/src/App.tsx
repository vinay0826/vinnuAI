import { BrowserRouter,Routes,Route } from "react-router-dom";
import Chatpage from "./chatpage";
import { Mainpage } from "./mainpage";
function App() {

 return(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Mainpage/>}/>
      <Route path="/chat" element={<Chatpage/>}/>
    </Routes>

  </BrowserRouter>
 )
}

export default App;
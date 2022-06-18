import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import ProtectedLayer from "./components/admin";
import Enter from './components/Enter';
import AdminSettings from "./pages/admin/settings";
import { getSalt } from "./redux/LoginSlice";








function App() {
  const disp = useDispatch()
  const loginStore = useSelector(st => st.login)
  console.log(loginStore);
  
  useEffect(() => {
    disp(getSalt())
  }, [disp]);
  
  return (
    
      <div className="App">
        <Routes>
          <Route path="/" element={<>Home</>} />
          
          <Route path="/admin-l" exact element={<Enter/>} />
          
          <Route path="/admin-p" element={<ProtectedLayer/>}>
            <Route index element={<AdminSettings/>} />
            <Route path='*' element={<>Not Found</>} />

          </Route>

        </Routes>
      </div>
  );
}

export default App;

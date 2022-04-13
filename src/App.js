import './App.css';
import Header from "./Components/Header/Header";
import Profile from "./Components/Profile/Profile";
import Menu from "./Components/Profile/Menu/Menu";
import {Route, Routes} from "react-router-dom";
import Request from "./Components/RightSideBar/Request/Request";
import NewFeedContainer from "./Components/NewFeed/NewFeedContainer";
function App() {


  return (
    <div className="App">
      <Header/>
      <div className="container">
                <div className="inner_content">
                    <div className="left_sideBar">
                        <Profile/>
                        <Menu/>
                    </div>
                    <div>
                        <Routes>
                            <Route path={"/NewFeed"} element={<NewFeedContainer/>}/>
                        </Routes>
                    </div>
                    <div>
                        <Request/>
                    </div>
                </div>

      </div>
    </div>
  );
}

export default App;

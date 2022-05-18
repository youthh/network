import './App.css';
import Header from "./Components/Header/Header";
import Profile from "./Components/Profile/Profile";
import Menu from "./Components/Profile/Menu/Menu";
import {Route, Routes} from "react-router-dom";
import Request from "./Components/RightSideBar/Request/Request";
import NewFeedContainer from "./Components/NewFeed/NewFeedContainer";
import PeopleSection from "./Components/People/PeopleSection";
import {useDispatch, useSelector} from "react-redux";
import userSlice from "./Slices/userSlice";
import Auth from "./Components/Auth/Auth";
import ProfileSection from "./Components/Profile_Section/ProfileSection";


function App() {
    let isMenu = useSelector(state => state.userSlice.isMenuAuth)

    return (
        <div className="App">
            <Header/>

            <div className="container">
                <div className="inner_content">
                    <div className="left_sideBar">
                        <Profile/>
                        <Menu/>
                    </div>
                    <Routes>
                        <Route path={"/NewFeed"} element={<NewFeedContainer/>}/>
                        <Route path={"/People"} element={<PeopleSection/>}/>
                        <Route path={"/:userProfile"} element={<ProfileSection/>}/>
                    </Routes>
                    {
                       isMenu ?  <Auth/> : null
                    }
                    <div>
                        <Request/>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default App;

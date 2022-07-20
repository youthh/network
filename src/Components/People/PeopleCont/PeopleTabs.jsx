import React, {useEffect} from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import PeopleContainer from "./PeopleContainer";
import '../PeopleStyleGlobal.css'
import {useDispatch, useSelector} from "react-redux";
import {
    getAccountUser, getFetch,
    getFollowing,
    setFollow, setFollowerNull, setFollowValue,
    setUsersNull,
    ThunkGetPeople,
    thunkGetUserFollowersName,
    thunkSetFollow, thunkSetFollower
} from "../../../Slices/userSlice";
import PeopleItemCard from "./PeopleItemCard";
import {NavLink} from "react-router-dom";
import {BsHouseDoor} from "react-icons/bs";

const PeopleTabs = ({value, handleChange, user, follow}) => {

    let followers = useSelector(state => state.userSlice.user.followers)
    let following = useSelector(state => state.userSlice.user.following)

    return (
        <div>
            <TabContext value={value}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                        <Tab label="All people" value="1"/>
                        <Tab label="Followers" value="2"/>
                        <Tab label="Following" value="3"/>
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <PeopleContainer user={user}
                                     categoryTab={"people"}
                                     follow={follow}/>
                </TabPanel>
                <TabPanel value="2">
                    {followers.length > 0 ?
                        <PeopleContainer
                            user={user}
                            categoryTab={"followers"}
                            follow={follow}/>
                        :
                        <p>No followers yet</p>}
                </TabPanel>
                <TabPanel value="3">
                    {following.length > 0 ?
                        <PeopleContainer
                            user={user}
                            categoryTab={"following"}
                            follow={follow}/>
                        :
                        <p>No following yet</p>}
                </TabPanel>
            </TabContext>


        </div>
    )
}


export default PeopleTabs;
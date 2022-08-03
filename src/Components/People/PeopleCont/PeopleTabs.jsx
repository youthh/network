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
    getAccountUser, 
    getFollowing, setFetching,
   setPeopleNull, 
    ThunkGetPeople,
    thunkGetUserFollowersName,

} from "../../../Slices/userSlice";

import {CircularProgress} from "@mui/material";

const PeopleTabs = ({value, handleChange, user, dispatch}) => {

    let isFetching = useSelector(state => state.userSlice.isFetching);
    
    useEffect(() => {
    
        Promise.all([
            dispatch(ThunkGetPeople()),
            dispatch(getAccountUser(user.name))
        ]).then((data) => {
            if(data[1].payload.length === 0){
                dispatch(setFetching())
            }
            dispatch(thunkGetUserFollowersName(data[1].payload[0].data().followers))
            dispatch(getFollowing(data[1].payload[0].data().following))

        })
        return () => {
            dispatch(setPeopleNull())
        }
    }, [dispatch, user.name, value])

    return (
        <div>
            <TabContext value={value}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                        <Tab label="All people" value="people"/>
                        <Tab label="Followers" value="followers"/>
                        <Tab label="Following" value="following"/>
                    </TabList>
                </Box>
                {
                    isFetching ? <CircularProgress/>
                        :
                        <div>
                            <TabPanel value="people">
                                {
                                    <PeopleContainer user={user}
                                                     categoryTab={value}
                                                     isFetching={isFetching}
                                                     dispatch={dispatch}
                                    />
                                }
                            </TabPanel>
                            <TabPanel value="followers">
                                {
                                    user.followers.length > 0 ?
                                        <PeopleContainer
                                            user={user}
                                            categoryTab={value}
                                            dispatch={dispatch}
                                            isFetching={isFetching}
                                        />
                                        :
                                        <p>No followers yet</p>
                                }
                            </TabPanel>
                            <TabPanel value="following">
                                {
                                    user.following.length > 0 ?
                                        <PeopleContainer
                                            user={user}
                                            categoryTab={value}
                                            dispatch={dispatch}
                                            isFetching={isFetching}
                                        />
                                        :
                                        <p>No following yet</p>
                                }
                            </TabPanel>
                        </div>
                }
            </TabContext>


        </div>
    )
}


export default PeopleTabs;
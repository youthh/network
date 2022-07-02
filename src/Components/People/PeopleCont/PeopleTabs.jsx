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
    setFollow, setFollowerNull,
    setUsersNull,
    ThunkGetPeople,
    thunkGetUserFollowersName,
    thunkSetFollow, thunkSetFollower
} from "../../../Slices/userSlice";
import PeopleItemCard from "./PeopleItemCard";
const PeopleTabs = () => {
    const [value, setValue] = React.useState('1');
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    let dispatch = useDispatch()
    let isFollow = useSelector(state => getFetch(state))

    let userId = useSelector(state => state.userSlice.user.id);
    let userN = useSelector(state => state.userSlice.user.name);

    let followers = useSelector(state => state.userSlice.user.followers)
    let following = useSelector(state => state.userSlice.user.following)
    let followingPeople = useSelector(state => state.userSlice.user.followingU)

    let user = useSelector(state => state.userSlice.user);



    const follow = (id, followed, nameUser, e) => {
        debugger
        e.currentTarget.disabled = true;
        dispatch(thunkSetFollower({userId, id, followed, nameUser, userN}))
        dispatch(thunkSetFollow({userId, id, followed, nameUser }))
            .then(() => {
            dispatch(setFollow({id, userN}))

        }).then(() => {
            dispatch(getAccountUser(user.name)).then((data) => {
                dispatch(getFollowing(data.payload[0].data().following))
            })

        })
        e.currentTarget.disabled = false;
    }

    useEffect(() => {
        dispatch(getAccountUser(user.name)).then((data) => {

            dispatch(getFollowing(data.payload[0].data().following))
            dispatch(thunkGetUserFollowersName(data.payload[0].data().followers))
        })


        return () => {
            dispatch(setUsersNull())
            dispatch(setFollowerNull())
        }

    }, [])
    return(
        <div>
            <TabContext value={value}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                        <Tab label="All people" value="1"/>
                        <Tab label="Followers" value="2"/>
                        <Tab label="Following" value="3"/>
                    </TabList>
                </Box>
                <TabPanel value="1"> <PeopleContainer isFollow={isFollow} follow={follow}/></TabPanel>
                <TabPanel value="2">{followers.length > 0 ?
                    followers.map((i) => {
                        return i.map((p, key) => {

                            return <div>

                                <PeopleItemCard     followed={p.data.followed}
                                                    follow={follow}
                                                    id={p.id}
                                                    key={key}
                                                    nameUser={p.data.name.split('').join('')}
                                                    follower={p.data.followers}
                                                    followingg={p.data.following}
                                                    tag={p.data.tagName}
                                                    imgP={p.data.img}
                                                    location={p.data.location}
                                />
                            </div>
                        })
                    })

                    : <p>No followers yet</p>}</TabPanel>
                <TabPanel value="3">{following.length > 0 ?
                    followingPeople.map((i) => {
                        return i.map((p, key) => {

                            return <div>

                                <PeopleItemCard     followed={p.data.followed}
                                                    follow={follow}
                                                    id={p.id}
                                                    key={key}
                                                    nameUser={p.data.name.split('').join('')}
                                                    follower={p.data.followers}
                                                    followingg={p.data.following}
                                                    tag={p.data.tagName}
                                                    imgP={p.data.img}
                                                    location={p.data.location}
                                />
                            </div>
                        })
                    })
                    : <p>No following yet</p>} </TabPanel>
            </TabContext>


       </div>
    )
}


export default PeopleTabs;
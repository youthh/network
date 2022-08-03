import React, {useState, useEffect} from 'react'
import AddPost from "./Post/AddPost";
import PostContainer from "./Post/PostContainer";
import './NewFeed.st.css'
import TabContext from "@mui/lab/TabContext";
import Box from "@mui/material/Box";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import {useDispatch, useSelector} from "react-redux";
import {setLikeAC, ThunkSetLike, ThunkGetPost, setPostNull} from "../../Slices/PostSlice";
import {getAccountUser, getFollowingUser, getUser} from "../../Slices/userSlice";

const NewFeedContainer = () => {
    const posts = useSelector(state => state.PostSlice.newPost)
    const dispatch = useDispatch();
    let [postValue, setPostValue] = useState('all');
    let isFetching = useSelector((state => state.PostSlice.isFetching))
    let user = useSelector(state => getUser(state));


    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setPostValue(newValue);
    };

    const setLike = (id, nameOfUserPost, nameUser, likes) => {

        dispatch(ThunkSetLike({id, nameOfUserPost, nameUser, likes})).then(() => {
            dispatch(setLikeAC({id, nameUser, nameOfUserPost}))
        });
    }

    useEffect(() => {
        
        dispatch(getAccountUser(user.name)).then((data) => {
            dispatch(ThunkGetPost({followingUser: data.payload[0].data().following, postValue}))
        })

        return () => {
            dispatch(setPostNull())
        }

    }, [dispatch, postValue])


    return (
        <div className="newFeedContainer">
            <AddPost 
                dispatch={dispatch}
                user={user}
            />
            <TabContext value={postValue}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                        <Tab label="All Post" value="all"/>
                        <Tab label="Following" value="following"/>
                    </TabList>
                </Box>
                <TabPanel value="all">
                    <PostContainer
                        setLike={setLike}
                        isFetching={isFetching}
                        posts={posts}
                        user={user}
                    />
                </TabPanel>
                <TabPanel value="following">
                    <PostContainer
                        setLike={setLike}
                        isFetching={isFetching}
                        posts={posts}
                        user={user}
                    />
                </TabPanel>
            </TabContext>
        </div>
    )
}


export default NewFeedContainer;
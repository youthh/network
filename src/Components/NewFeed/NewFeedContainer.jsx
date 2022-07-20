import React from 'react'
import AddPost from "./Post/AddPost";
import PostContainer from "./Post/PostContainer";
import './NewFeed.st.css'
import TabContext from "@mui/lab/TabContext";
import Box from "@mui/material/Box";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import PeopleContainer from "../People/PeopleCont/PeopleContainer";
import {useDispatch, useSelector} from "react-redux";
import {setLikeAC, ThunkSetLike} from "../../Slices/PostSlice";

const NewFeedContainer = () => {
    const posts = useSelector(state => state.PostSlice.newPost)
    let isFetching = useSelector((state => state.PostSlice.isFetching))
    const dispatch = useDispatch();

    const [value, setValue] = React.useState('1');
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const setLikeThunk = (data, liked) => {
        dispatch(ThunkSetLike({data, liked})).then(() => {
            dispatch(setLikeAC({data, liked}))
        });
    }

    return (
        <div className="newFeedContainer">
            <AddPost dispatch={dispatch}/>
            <TabContext value={value}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                        <Tab label="All Post" value="1"/>
                        <Tab label="Following" value="2"/>
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <PostContainer
                        setLikeThunk={setLikeThunk}
                        isFetching={isFetching}
                        posts={posts}
                        postValue={"all"}
                        dispatch={dispatch}

                    />
                </TabPanel>
                <TabPanel value="2">
                    <PostContainer
                        setLikeThunk={setLikeThunk}
                        dispatch={dispatch}
                        isFetching={isFetching}
                        posts={posts}
                        postValue={"following"}
                    />
                </TabPanel>
            </TabContext>
        </div>
    )
}


export default NewFeedContainer;
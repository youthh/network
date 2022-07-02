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

const NewFeedContainer = () => {
    const [value, setValue] = React.useState('1');
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <div className="newFeedContainer">
            <AddPost/>
            <TabContext value={value}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                        <Tab label="All Post" value="1"/>
                        <Tab label="Following" value="2"/>
                    </TabList>
                </Box>
                <TabPanel value="1"><PostContainer/></TabPanel>
                <TabPanel value="2"></TabPanel>
            </TabContext>
        </div>
    )
}



export default NewFeedContainer;
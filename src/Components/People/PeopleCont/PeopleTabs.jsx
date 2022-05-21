import React from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import PeopleContainer from "./PeopleContainer";
import '../PeopleStyleGlobal.css'
import {useSelector} from "react-redux";
const PeopleTabs = () => {
    const [value, setValue] = React.useState('1');
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    let followers = useSelector(state => state.userSlice.user.followers)
    let following = useSelector(state => state.userSlice.user.following)
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
                <TabPanel value="1"> <PeopleContainer/></TabPanel>
                <TabPanel value="2">{followers ? null : <p>No followers yet</p>}</TabPanel>
                <TabPanel value="3">{following ? null : <p>No following yet</p>} </TabPanel>
            </TabContext>


       </div>
    )
}


export default PeopleTabs;
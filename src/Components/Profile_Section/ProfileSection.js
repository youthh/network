import React from "react"
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import './profile_section.style.scss'
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";

const ProfileSection = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const profile = useParams()
    console.log(profile)
    let user = useSelector(state => state.userSlice.user)

    return (
        <div className="profile_box">
            <div className="profile_top">
                <div className="profile_box-img">
                    <img className="img img_profile_box" src="https://lh3.googleusercontent.com/ogw/ADea4I5eeKazKfajF1si6wLj020wLgNgIS5h_G68BF2aFw=s32-c-mo" alt=""/>
                </div>
                <div>
                    <div className="profile_text">
                        <h4>
                            lesha val
                        </h4>
                        <div className="profile_folling_box">
                            <p>followers 33</p>
                            <p>following 33</p>
                        </div>
                        <div>
                            my blog
                        </div>
                    </div>
                </div>
            </div>

            <div className="profile_bottom">
                <TabContext value={value}>
                        <Box sx={{width: '100%', bgcolor: 'background.paper'}}>
                            <Tabs value={value} onChange={handleChange} centered>
                                <Tab label="Post" value="1"/>
                                <Tab label="Saved" value="2"/>

                            </Tabs>
                        </Box>
                        <TabPanel value="1" index={0}>
                            photo
                        </TabPanel>
                        <TabPanel value="2" index={1}>
                            saved
                        </TabPanel>
                </TabContext>

            </div>
        </div>
    )
}


export  default  ProfileSection;
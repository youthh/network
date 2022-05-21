import React, {useEffect} from "react"
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import './profile_section.style.scss'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';

import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import {Avatar, CircularProgress} from "@mui/material";
import TabList from '@mui/lab/TabList';
import {getUserProfilePage, isFetch, setProfilePageNull} from "../../Slices/userSlice";
import ProfilePhotoItem from "./Profile_Post-page/ProfilePhotoItem";

const ProfileSection = () => {
    const [value, setValue] = React.useState('0');
    const dispatch = useDispatch()
    let isFetching = useSelector(isFetch);
    let user = useSelector(state => state.userSlice.profileVisit)
    const profile = useParams()

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {

        dispatch(getUserProfilePage(profile.userProfile.split().join(' ')))


        // return () => {
        //     dispatch(setProfilePageNull())
        // }
    }, [profile.userProfile])

    return (
        <div className="profile_box">
            {
                isFetching ? <CircularProgress   /> :
                  <div>
                      <div className="profile_top">
                          <div className="profile_box-img">
                              <img className="img img_profile_box"
                                   src={user.img ? user.img : <Avatar sx={{bgcolor: "#1877f2"}}></Avatar>}
                                   alt=""/>
                          </div>
                          <div>
                              <div className="profile_text">
                                  <h4 className="profile_box_name">
                                      {
                                          user.name
                                      }
                                  </h4>
                                  <div className="profile_folling_box">
                                      <p>{user.followers} followers</p>
                                      <p>{user.following} following</p>
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
                                  <TabList onChange={handleChange} centered>
                                      <Tab label="Post" value="1"/>
                                      <Tab label="Saved" value="2"/>
                                  </TabList>
                              </Box>
                              <TabPanel value="1" >
                                  {
                                      user.post.length > 0 ?
                                          <div className="post_container-profile">
                                              {
                                                  isFetching ? <CircularProgress    />  :
                                                      user.post.map((i) => {
                                                          return <ProfilePhotoItem

                                                              likes={i.countOfLikes}
                                                              comment={i.countOfCom}
                                                              imgPost={i.img}
                                                          />
                                                      })
                                              }
                                          </div> : <h3 className="no_Post">No posts yet</h3>
                                  }
                              </TabPanel>
                              <TabPanel value="2">
                                  saved
                              </TabPanel>
                          </TabContext>

                      </div>
                  </div>
            }
        </div>
    )
}


export  default  ProfileSection;
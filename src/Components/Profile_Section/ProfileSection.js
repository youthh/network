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
import {
    getAccountUser, getFollowing,
    getUserProfilePage,
    isFetch,
    setFollow,
    setPostProfileNull,
    setProfilePageNull,
    thunkSetFollow
} from "../../Slices/userSlice";
import ProfilePhotoItem from "./Profile_Post-page/ProfilePhotoItem";
import {getUserProfilePost} from "../../Slices/userSlice";

import Button from "@mui/material/Button";

const ProfileSection = () => {
    const [value, setValue] = React.useState('1');
    const dispatch = useDispatch()
    let isFetching = useSelector(isFetch);
    let user = useSelector(state => state.userSlice.profileVisit)
    let userProfile = useSelector(state => state.userSlice.user.name)
    const profile = useParams()
    const follow = (id) => {
        dispatch(thunkSetFollow(id)).then(() => {
            dispatch(setFollow(id))
            dispatch(getAccountUser(user.name))
        })


    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    useEffect(() => {

        dispatch(getUserProfilePage(profile.userProfile.split().join(' '))).then(() =>{
            dispatch(getUserProfilePost(profile.userProfile))
        })


        // return () => {
        //     dispatch(setProfilePageNull())
        //     dispatch(setPostProfileNull())
        // }
    }, [profile.userProfile], [user.post])

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
                                      <p>{user.followers.length} followers</p>
                                      <p>{user.following.length} following</p>
                                  </div>

                                  <div className="follow_title_block">
                                      <div>
                                          my blog
                                      </div>
                                  </div>

                              </div>
                          </div>
                        <div className="s">
                            <Button onClick={() => follow(user.id)}  className="btn btn_post btn_people-follow" variant="contained" component="span">
                                {user.followed ? "Unfollow" : "Follow" }
                            </Button>
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
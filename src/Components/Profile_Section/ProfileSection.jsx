import React, {useEffect} from "react"
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import './profile_section.style.scss'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import EmailIcon from '@mui/icons-material/Email';
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import {Avatar, CircularProgress} from "@mui/material";
import TabList from '@mui/lab/TabList';
import {
    getAccountUser, getFollowing,
    getUserProfilePage,
    isFetch,
    setFollow, setFollowValue,
    setPostProfileNull,
    setProfilePageNull,
    thunkSetFollow
} from "../../Slices/userSlice";
import ProfilePhotoItem from "./Profile_Post-page/ProfilePhotoItem";
import {getUserProfilePost} from "../../Slices/userSlice";

import Button from "@mui/material/Button";
import {checkFollow} from "../People/PeopleSection";

const ProfileSection = ({}) => {
    const dispatch = useDispatch()
    let isFetching = useSelector(isFetch);
    const profile = useParams()
    let userVisit = useSelector(state => state.userSlice.profileVisit)
    let user = useSelector(state => state.userSlice.user)
    const [value, setValue] = React.useState('1');

    const follow = (id) => {
        dispatch(thunkSetFollow(id)).then(() => {
            dispatch(setFollow(id))
            dispatch(getAccountUser(userVisit.name))
        })


    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {

        dispatch(getUserProfilePage(profile.userProfile)).then(() => {
            dispatch(getUserProfilePost(profile.userProfile))
        })
        // return () => {
        //     dispatch(setProfilePageNull())
        //     dispatch(setPostProfileNull())
        // }
    }, [profile.userProfile], [userVisit.post])

    return (
        <div className="profile_box">
            {
                isFetching ? <CircularProgress/> :
                    <div>
                        <div className="profile_top">
                            <div className="profile_box-img">
                                <img className="img img_profile_box"
                                     src={userVisit.img ? userVisit.img : <Avatar sx={{bgcolor: "#1877f2"}}></Avatar>}
                                     alt=""/>
                            </div>
                            <div>
                                <div className="profile_text">
                                    <h4 className="profile_box_name">
                                        {
                                            userVisit.name
                                        }
                                    </h4>

                                    <div className="profile_folling_box">
                                        <p>{userVisit.followers.length} followers</p>
                                        <p>{userVisit.following.length} following</p>
                                    </div>

                                    <div className="follow_title_block">
                                        <div>
                                            my blog
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="s">
                                {
                                    user.name === userVisit.name ?

                                        ''
                                        :
                                        <div className="box_btn">
                                            {
                                                checkFollow(userVisit, dispatch, user.name)

                                            }
                                            <Button onClick={() => follow(userVisit.id)}
                                                    className="btn btn_post btn_people-follow" variant="contained"
                                                    component="span">
                                                {userVisit.followed ? "Unfollow" : "Follow"}
                                            </Button>
                                            <Button className="btn btn_send" variant="contained" component="span">
                                                {<EmailIcon fontSize="medium"/>}
                                            </Button>
                                        </div>
                                }
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
                                <TabPanel value="1">
                                    {
                                        userVisit.post.length > 0 ?
                                            <div className="post_container-profile">
                                                {
                                                    isFetching ? <CircularProgress/> :
                                                        userVisit.post.map((i, index) => {
                                                            return <ProfilePhotoItem
                                                                key={index}
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


export default ProfileSection;
import React, {useEffect} from "react";
import PeopleItemCard from "./PeopleItemCard";
import './PeopleItemStyle.css'
import {useSelector} from "react-redux";

import {CircularProgress} from "@mui/material";
import {checkFollow, setFollowTab} from "../PeopleSection";
import {
    getAccountUser,
    getFollowing,
    setFollowersValue, setPeopleNull, setPostProfileNull, setUsersNull,
    ThunkGetPeople,
    thunkGetUserFollowersName
} from "../../../Slices/userSlice";

const PeopleContainer = ({follow, categoryTab, user, dispatch, isFetching}) => {
    let people = useSelector(state => state.userSlice.userPeople)

    if (isFetching) {
        return <CircularProgress/>
    } else if (categoryTab === 'people') {
        return (
            <div className="People_container">
                {
                    people.map((p) => {
                        if (p.data.name !== user.name) {
                            checkFollow(p.data, dispatch, user.name)
                            return <PeopleItemCard
                                isFetching={isFetching}
                                followed={p.data.followed}
                                follow={follow}
                                id={p.id}
                                mykey={p.id}
                                key={p.id}
                                nameUser={p.data.name.split('').join('')}
                                follower={p.data.followers}
                                followingg={p.data.following}
                                tag={p.data.tagName}
                                imgP={p.data.img}
                                location={p.data.location}
                            />
                        }
                    })

                }
            </div>
        )
    } else if (categoryTab === 'followers') {
        return (
            <div className="People_container">
                {
                    user.followers.map((p) => {
                        debugger
                        //setFollowTab(p.data, dispatch, user.name)
                        return <div>
                            <PeopleItemCard followed={p.data.followed}
                                            follow={follow}
                                            id={p.id}
                                            mykey={p.id}
                                            key={p.id}
                                            isFetching={isFetching}
                                            nameUser={p.data.name.split('').join('')}
                                            follower={p.data.followers}
                                            followingg={p.data.following}
                                            tag={p.data.tagName}
                                            imgP={p.data.img}
                                            location={p.data.location}
                            />
                        </div>

                    })
                }
            </div>
        )
    } else if (categoryTab === 'following') {
        return (
            <div className="People_container">
                {
                        user.followingU.map((p) => {
                            debugger
                            // setFollowTab(p.data, dispatch, user.name)
                            return <div>
                                <PeopleItemCard followed={p.data.followed}
                                                follow={follow}
                                                id={p.id}
                                                mykey={p.id}
                                                key={p.id}
                                                nameUser={p.data.name.split('').join('')}
                                                follower={p.data.followers}
                                                followingg={p.data.following}
                                                tag={p.data.tagName}
                                                imgP={p.data.img}
                                                location={p.data.location}
                                                isFetching={isFetching}
                                />
                            </div>

                        }) 
                }
            </div>
        )
    }
}


export default PeopleContainer;
import React, {useEffect} from "react";
import PeopleItemCard from "./PeopleItemCard";
import './PeopleItemStyle.css'
import {useDispatch, useSelector} from "react-redux";
import {
    getAccountUser, getFollowing, setPostProfileNull, setProfilePageNull,

    setUsersNull,
    ThunkGetPeople, thunkGetUserFollowersName,
    thunkSetFollow
} from "../../../Slices/userSlice";
import {CircularProgress} from "@mui/material";

const PeopleContainer = ({follow, isFollow, ren}) => {
    let dispatch = useDispatch()
    let people = useSelector(state => state.userSlice.userPeople);
    let isFetching = useSelector(state => state.userSlice.isFetching);
    let user = useSelector(state => state.userSlice.user)
    let followers = useSelector(state => state.userSlice.user.followers)
    let followingPeople = useSelector(state => state.userSlice.user.followingU)


    useEffect(() => {
        dispatch(ThunkGetPeople())

        dispatch(getAccountUser(user.name))
            .then((data) => {

            dispatch(getFollowing(data.payload[0].data().following))
            dispatch(thunkGetUserFollowersName(data.payload[0].data().followers))
        })

        return () => {
            dispatch(setPostProfileNull())
            dispatch(setUsersNull())
        }
    }, [])

    if (isFetching) {
        return <CircularProgress/>
    } else if (ren === 'people') {
        return (
            <div className="People_container">
                {
                    people.map((p, key) => {
                        return <PeopleItemCard

                            followed={p.data.followed}
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
                    })

                }
            </div>
        )
    } else if (ren === 'followers') {
        return (
            <div className="People_container">
                {
                    followers.map((i) => {
                        return i.map((p, key) => {
                            return <div>
                                <PeopleItemCard followed={p.data.followed}
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
                }
            </div>
        )
    } else if (ren === 'following') {
        return (
            <div className="People_container">
                {
                    followingPeople.map((i) => {
                        return i.map((p, key) => {
                            return <div>
                                <PeopleItemCard followed={p.data.followed}
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
                }
            </div>
        )
    }
}


export default PeopleContainer;
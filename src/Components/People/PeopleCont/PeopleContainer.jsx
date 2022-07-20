import React, {useEffect} from "react";
import PeopleItemCard from "./PeopleItemCard";
import './PeopleItemStyle.css'
import {useDispatch, useSelector} from "react-redux";
import {
    getAccountUser, getFollowing, setFollowValue,
    setPostProfileNull,
    setProfilePageNull,
    setUsersNull,
    ThunkGetPeople, thunkGetUserFollowersName,
} from "../../../Slices/userSlice";
import {CircularProgress} from "@mui/material";
import {checkFollow} from "../PeopleSection";

const PeopleContainer = ({follow, categoryTab, user,}) => {

    let dispatch = useDispatch()
    let people = useSelector(state => state.userSlice.userPeople);
    let isFetching = useSelector(state => state.userSlice.isFetching);

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
    }, [dispatch, user.name, categoryTab])


    if (isFetching) {
        return <CircularProgress/>
    } else if (categoryTab === 'people') {
        return (
            <div className="People_container">
                {
                    people.map((p, key) => {
                        if (p.data.name !== user.name) {
                            checkFollow(p.data, dispatch, user.name)
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
                        }
                    })

                }
            </div>
        )
    } else if (categoryTab === 'followers') {
        return (
            <div className="People_container">
                {
                    user.followers.map((i) => {
                        return i.map((p, key) => {
                            checkFollow(p.data, dispatch, user.name)

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
    } else if (categoryTab === 'following') {
        return (
            <div className="People_container">
                {
                    user.followingU.map((i) => {

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
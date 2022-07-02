import React, {useEffect} from "react";
import PeopleItemCard from "./PeopleItemCard";
import './PeopleItemStyle.css'
import {useDispatch, useSelector} from "react-redux";
import {
    getAccountUser,
    getFollowing,
    setFollow,
    setUsersNull,
    ThunkGetPeople,
    thunkSetFollow
} from "../../../Slices/userSlice";
import {CircularProgress} from "@mui/material";

const PeopleContainer = (props) => {
    let dispatch = useDispatch()

    let people = useSelector(state => state.userSlice.userPeople);
    let isFetching = useSelector(state => state.userSlice.isFetching);


    useEffect(() => {
        dispatch(ThunkGetPeople())


        return () => {
            dispatch(setUsersNull())
        }
    }, [])

    return (
        <div className="People_container">
            {
                isFetching ?  <CircularProgress   /> :
                    people.map((p, key) => {

                        return <PeopleItemCard

                            followed={p.data.followed}
                            follow={props.follow}
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
}



export default PeopleContainer;
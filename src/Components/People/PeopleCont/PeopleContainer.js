import React, {useEffect} from "react";
import PeopleItemCard from "./PeopleItemCard";
import './PeopleItemStyle.css'
import {useDispatch, useSelector} from "react-redux";
import {setFollow, setUsersNull, ThunkGetPeople, thunkSetFollow} from "../../../Slices/userSlice";
import {CircularProgress} from "@mui/material";

const PeopleContainer = () => {
    let dispatch = useDispatch()

    let people = useSelector(state => state.userSlice.userPeople);
    let isFetching = useSelector(state => state.userSlice.isFetching);

    const follow = (id) => {
        dispatch(thunkSetFollow(id)).then(() => {
            dispatch(setFollow(id))
        })


    }

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
                            followed={p.followed}
                            follow={follow}
                            id={p.id}
                            key={key}
                            nameUser={p.name}
                            follower={p.followers}
                            followingg={p.following}
                            tag={p.tagName}
                            imgP={p.imgProfile}
                            location={p.location}
                        />
                    })
                }


            </div>
    )
}


export default PeopleContainer;
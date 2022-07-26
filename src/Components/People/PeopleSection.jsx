import React, {useState} from "react";
import PeopleContainer from "./PeopleCont/PeopleContainer";
import PeopleTabs from "./PeopleCont/PeopleTabs";
import './PeopleStyleGlobal.css'
import {
    getAccountUser,
    getFollowing,
    setFollow, setFollowersValue,
    setFollowValue,
    thunkSetFollow,
    thunkSetFollower
} from "../../Slices/userSlice";
import {useDispatch, useSelector} from "react-redux";

export const checkFollow = (arr, dispatch, name) => {
    let follower = arr.name
    let value;
    if (arr.followers.includes(name)) {
        value = true
        dispatch(setFollowValue({follower, value, name}))
    }
    else {
        value = false
        //dispatch(setFollowersValue({value, name}))
        dispatch(setFollowValue({follower, value, name}))
    }
}
export const setFollowTab = (arr, dispatch, name) => {
    let value = true
    if(arr.followers){
        if (arr.followers.includes(name)) {
            dispatch(setFollowersValue({value, name}))
        } else {
            value = false
            dispatch(setFollowersValue({value, name}))
        }
    }

}

const PeopleSection = () => {
    let dispatch = useDispatch()
    let user = useSelector(state => state.userSlice.user)
    const [value, setValue] = React.useState('1');
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const follow = (id, followed, nameUser) => {
        let userName = user.name
        let userId = user.id
        dispatch(thunkSetFollower({userId, id, followed, nameUser, userName}))
        dispatch(thunkSetFollow({userId, id, followed, nameUser}))
            .then(() => {
                dispatch(setFollow({id, userName}))

            }).then(() => {
            dispatch(getAccountUser(user.name)).then((data) => {
                dispatch(getFollowing(data.payload[0].data().following))
            })

        })
    }


    return(
            <div className={"people_section"}>
                <div>
                    <PeopleTabs handleChange={handleChange}
                                dispatch={dispatch}
                                follow={follow}
                                user={user}
                                value={value}
                    />
                </div>
            </div>
    )
}


export default PeopleSection;
import React, {useState} from "react";
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

export function Follow (id, followed, nameUser, setState, dispatch, myUser, myID) {
        
    let userName = myUser
    let userId = myID
    setState(prev => !prev)

    Promise.all([
        dispatch(thunkSetFollower({userId, id, followed, nameUser, userName})),
        dispatch(thunkSetFollow({userId, id, followed, nameUser})),
        dispatch(getAccountUser(myUser)),
        dispatch(setFollow({id, userName}))
    ]).then((data) => {
        setState(prev => !prev)
        dispatch(getFollowing(data[2].payload[0].data().following))
    })

}

const PeopleSection = () => {
    let dispatch = useDispatch()
    let user = useSelector(state => state.userSlice.user)
    let [categoryTab, setCategoryTab] = useState('people');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setCategoryTab(newValue);
    };

    return(
            <div className={"people_section"}>
                <div>
                    <PeopleTabs handleChange={handleChange}
                                dispatch={dispatch}
                                user={user}
                                value={categoryTab}
                    />
                </div>
            </div>
    )
}


export default PeopleSection;
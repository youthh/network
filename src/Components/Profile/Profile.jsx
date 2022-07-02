import React from "react";
import './Profile.style.css'
import {useSelector} from "react-redux";
import {Avatar} from "@mui/material";
import {getNameSp} from "../../Slices/userSlice";


const Profile = () => {

    let user = useSelector(state => state.userSlice.user)
    let name = useSelector(getNameSp)
    return (
        <div className="box box_profile">
            <div className="inner_box-profile">
               <div className="box_avata_profile">
                   {
                       user.img ? <div className="profile_box-img">
                               <img className="img" src={user.img} alt="pers"/>
                       </div>
                           :  <Avatar  sx={{ bgcolor: "#1877f2" }}></Avatar>
                   }
               </div>
                <div className="box_profile-content">
                    <h4 className="name_user">{name}</h4>
                </div>
            </div>
        </div>
    )
}



export  default  Profile
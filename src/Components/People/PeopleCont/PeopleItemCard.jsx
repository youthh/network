import React from "react";
import './PeopleItemStyle.css'
import {IoLocationSharp} from "react-icons/io5";
import {NavLink} from "react-router-dom";
import Button from "@mui/material/Button";

import {CircularProgress} from "@mui/material";

const PeopleItemCard = (
    {
        isFetching,
        imgP,
        nameUser,
        follower,
        followingg,
        location,
        mykey,
        id,
        followed,
        isFollow,
        follow
}) => {
    return(
        <div className="box box_people-item">

            <div className="top_people_item">
                <div className="item_img_block">
                    <div className="img_oval">
                        <img className="img_people_item" src={imgP} alt=""/>
                    </div>
                </div>
                <div className="content_item_people">
                    <NavLink to={"/" + nameUser} className="people_name">{nameUser}</NavLink>
                    <div className="people_follow_block">
                        <p>{follower.length + " followers"}</p>
                        <p>{followingg.length + " following"} </p>
                    </div>
                    <div className="people_block_location">
                       <div className="location_div">
                           <IoLocationSharp color={"#1d3a5f"}/>
                           <p className="city_name-item">{location}</p>
                       </div>
                        <div className="bl" >
                            <Button id={mykey}
                                    onClick={(e) => follow(id, followed, nameUser, e)}
                                    className="btn btn_people-follow  btn_post right" variant="contained">
                                {
                                    isFetching ?  <CircularProgress color="inherit" size={23} /> : followed ?  'Unfollow' : 'Follow'
                                }
                            </Button>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}


export default PeopleItemCard;
import React from "react";
import './PeopleItemStyle.css'
import {IoLocationSharp} from "react-icons/io5";
import {NavLink} from "react-router-dom";
import Button from "@mui/material/Button";
import {getFetch} from "../../../Slices/userSlice";
import {useSelector} from "react-redux";
import {CircularProgress} from "@mui/material";



const PeopleItemCard = (props) => {


    return(
        <div className="box box_people-item">

            <div className="top_people_item">
                <div className="item_img_block">
                    <div className="img_oval">
                        <img className="img_people_item" src={props.imgP} alt=""/>
                    </div>
                </div>
                <div className="content_item_people">
                    <NavLink to={"/" + props.nameUser} className="people_name">{props.nameUser}</NavLink>
                    <div className="people_follow_block">
                        <p>{props.follower.length + " followers"}</p>
                        <p>{props.followingg.length + " following"} </p>
                    </div>
                    <div className="people_block_location">
                       <div className="location_div">
                           <IoLocationSharp color={"#1d3a5f"}/>
                           <p className="city_name-item">{props.location}</p>
                       </div>
                        <div className="bl" >
                            <Button id={props.key}
                                    onClick={(e) => props.follow(props.id, props.followed, props.nameUser, e)}
                                    className="btn btn_people-follow  btn_post right" variant="contained">
                                {
                                    props.isFollow ?  <CircularProgress color="inherit" size={23} /> : props.followed ?  'Unfollow' : 'Follow'
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
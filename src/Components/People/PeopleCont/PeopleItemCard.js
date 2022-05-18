import React from "react";
import './PeopleItemStyle.css'
import {IoLocationSharp} from "react-icons/io5";
import {NavLink} from "react-router-dom";


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
                        <p>{props.follower + " followers"}</p>
                        <p>{props.followingg + " following"} </p>
                    </div>
                    <div className="people_block_location">
                        <IoLocationSharp color={"#1d3a5f"}/>
                        <p className="city_name-item">{props.location}</p>
                    </div>
                </div>
                <div className="bl" >
                    <button onClick={() => props.follow(props.id)}
                        className="btn btn_people-follow">{props.followed ?  'Unfollow' : 'Follow'}</button>
                </div>
            </div>

        </div>
    )
}


export default PeopleItemCard;
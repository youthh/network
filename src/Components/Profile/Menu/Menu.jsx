import React, {useState} from "react";
import './Menu.css'
import '../Profile.style.css'
import {BsHouseDoor, BsPerson, BsPersonSquare} from "react-icons/bs";
import {MdOutlinePhotoSizeSelectActual, MdOutlineSettings} from "react-icons/md";
import {BiNews} from "react-icons/bi";
import {NavLink} from "react-router-dom";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import {useSelector} from "react-redux";
import {getNameSp} from "../../../Slices/userSlice";

const Menu = () => {
    let [active, setActive] = useState(true)
    let name = useSelector(getNameSp)



    const setAc = () => {
        setActive((val) => !val)
    }

    return (
        <div className="box">
            <div className="box_menu">
                <menu className="menu">
                    <ul>
                        <NavLink to={"/Home"} className="link_item-link">
                            <li className="item__menu-list">
                                <BsHouseDoor size={24} />
                                <p className="name_page">Home</p>
                            </li>
                        </NavLink>
                        <NavLink to={"/People"} className="link_item-link">
                            <li className="item__menu-list">
                                <BsPersonSquare size={24} />
                                <p className="name_page">People</p>
                            </li>
                        </NavLink>
                        <NavLink to="/NewFeed"  className="link_item-link">
                            <li className={"item__menu-list "} >
                                <BiNews size={24} />
                                <p className="name_page">New Feed</p>
                            </li>
                        </NavLink>
                        <NavLink to={"/" + name} className="link_item-link">
                            <li className="item__menu-list">
                                <BsPerson size={24} />
                                <p className="name_page">Profile</p>
                            </li>
                        </NavLink>
                        <NavLink to={"/Message"} className="link_item-link">
                            <li className="item__menu-list">
                                <MailOutlineIcon  />
                                <p className="name_page">Message</p>
                            </li>
                        </NavLink>
                    </ul>
                </menu>
            </div>
        </div>
    )

}




export  default Menu;
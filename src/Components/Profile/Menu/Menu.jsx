import React, {useState} from "react";
import './Menu.css'
import '../Profile.style.css'
import {BsHouseDoor, BsPerson, BsPersonSquare} from "react-icons/bs";
import {MdOutlinePhotoSizeSelectActual, MdOutlineSettings} from "react-icons/md";
import {BiNews} from "react-icons/bi";
import {NavLink} from "react-router-dom";


const Menu = () => {
    let [active, setActive] = useState(true)

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
                                <BsHouseDoor size={24} color="#b6c3d0"/>
                                <p className="name_page">Home</p>
                            </li>
                        </NavLink>
                        <NavLink to={"/People"} className="link_item-link">
                            <li className="item__menu-list">
                                <BsPersonSquare size={24} color="#b6c3d0"/>
                                <p className="name_page">People</p>
                            </li>
                        </NavLink>
                        <NavLink to={"/Photos"} href="#" className="link_item-link">
                            <li className="item__menu-list  ">
                                <MdOutlinePhotoSizeSelectActual size={24} color="#b6c3d0"/>
                                <p className="name_page">Photos</p>
                            </li>
                        </NavLink>
                        <NavLink to="/NewFeed" className="link_item-link">
                            <li className={"item__menu-list "} >
                                <BiNews size={24} color="#3588f3"/>
                                <p className="name_page">New Feed</p>
                            </li>
                        </NavLink>
                        <NavLink to={"/Profile"} className="link_item-link">
                            <li className="item__menu-list">
                                <BsPerson size={24} color="#b6c3d0"/>
                                <p className="name_page">Profile</p>
                            </li>
                        </NavLink>
                        <NavLink to={"/Settings"} className="link_item-link">
                            <li className="item__menu-list">
                                <MdOutlineSettings size={24} color="#b6c3d0"/>
                                <p className="name_page">Settings</p>
                            </li>
                        </NavLink>
                    </ul>
                </menu>
            </div>
        </div>
    )

}




export  default Menu;
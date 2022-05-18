import React from "react";
import './Header.style.css'
import {BiSearch} from "react-icons/bi";
import {CgAddR} from "react-icons/cg";
import h from '../../images/IMG_4926 (1).svg'
import {useDispatch, useSelector} from "react-redux";
import CustomizedSwitches from "../Switcher/Switch";
import {IoExitOutline} from "react-icons/io5";
import {MdOutlineSettings} from "react-icons/md";
import {setMenuProfile, setMenuAuth} from "../../Slices/userSlice";
import {Auth} from "aws-amplify";
import {BsPersonCircle} from "react-icons/bs";

const Header = () => {
    let dispatch = useDispatch()
    let auth = useSelector(state => state.userSlice.auth)
    let isMenuAc = useSelector(state => state.userSlice.isMenu)
    let img = useSelector(state => state.userSlice.user.img)

    return (
        <header className="header">
            <div className="container">
                <div className="header_inner">
                    <div className="left_side">
                        <img src={h} className="he" alt="logo"/>
                        <h1 className="title_name">StoGram</h1>
                    </div>
                    <div className="right_headr">
                        <div className="box_input_header">
                            <BiSearch color={"#d4d9e0"}/>
                            <input type="text" placeholder="Search"/>
                        </div>
                        <div>

                            <button className="btn btn_header">
                                <div>
                                    <CgAddR/>
                                </div>
                                Create
                            </button>
                        </div>
                        {
                            auth ?
                                <div className="main_box_profile">
                                    <div className="avatar_box" onClick={() => dispatch(setMenuProfile())}>
                                        {
                                            img ? <img className="user_avatar-header img"
                                                       src={img}
                                                       alt="avatar"/>
                                                : <BsPersonCircle size={35} color={"#1d3a5f"}/>
                                        }
                                    </div>
                                    <div className={isMenuAc ? "profile__box_popup activeMenu" : "profile__box_popup"}>
                                        <CustomizedSwitches/>
                                        <ul>
                                            <li className="li_menu_profile-box">
                                                <MdOutlineSettings size={20}/>
                                                <p className="name_title_list">Settings</p>
                                            </li>
                                            <li className="li_menu_profile-box">
                                                <IoExitOutline size={20}/>
                                                <p onClick={() => Auth.signOut()} className="name_title_list">Logout</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                : <p onClick={() => dispatch(setMenuAuth())}>Sign in</p>
                        }
                    </div>
                </div>
            </div>
        </header>
    )
}



export default Header;
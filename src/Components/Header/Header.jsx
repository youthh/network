import React, {useEffect, useRef} from "react";
import './Header.style.css'
import {BiSearch} from "react-icons/bi";
import {CgAddR} from "react-icons/cg";
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
    let reference = useRef();


    useEffect(() => {
        const checkClickOut = (e) => {
            if (isMenuAc && reference.current  && !reference.current.contains(e.target)) {
                dispatch(setMenuProfile())

            }
        }
        document.addEventListener("mousedown", checkClickOut)

        return () => {
            document.removeEventListener("mousedown", checkClickOut)
        }

    }, [isMenuAc])

    return (
        <header className="header">
            <div className="container">
                <div className="header_inner">
                    <div className="left_side">
                        <img src="https://firebasestorage.googleapis.com/v0/b/stogram-cd5a6.appspot.com/o/IMG_4926%20(1).svg?alt=media&token=aa84f0ec-477e-4168-a5fa-ec7107710dfd" className="he" alt="logo"/>
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
                                <div className="main_box_profile" ref={reference}>
                                    <div className="avatar_box" onClick={() => dispatch(setMenuProfile())}>
                                        {
                                            img ? <div className="profile_box-img header">
                                                    <img className="user_avatar-header img"
                                                         src={img}
                                                         alt="avatar"/>
                                            </div>
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
import React from "react";
import './Header.style.css'
import {BiSearch} from "react-icons/bi";
import {CgAddR} from "react-icons/cg";
import img from '../../images/logo.svg'

const Header = () => {

    return (
        <header className="header">
            <div className="container">
                <div className="header_inner">
                    <div className="left_side">
                        <img src={img} alt="logo"/>
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
                        <img className="user_avatar-header" src="https://lh3.googleusercontent.com/a-/AOh14GitcOF1u_0Y6X6ZvjA08b4mY5kKYXHh5O3CUZf9Lw=s83-c-mo" alt="avatar"/>
                    </div>
                </div>
            </div>
        </header>
    )
}


export default Header;
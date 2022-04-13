import React from "react";
import './Request.style.css'

const RequestItem = () => {



    return(

        <div className="box request_item">
            <div className="top_request">
                <img className="img" src="https://lh3.googleusercontent.com/a-/AOh14GitcOF1u_0Y6X6ZvjA08b4mY5kKYXHh5O3CUZf9Lw=s83-c-mo" alt=""/>
                <p><span className="span_name">Selena Gomes</span> wants to add you to friends</p>
            </div>
            <div className="bottom_request">
                <button className="btn btn_request">Accept</button>
                <button className="btn_request btn_decline" >Decline</button>
            </div>
        </div>
    )
}



export  default  RequestItem;
import React from "react";
import RequestItem from "./RequestItem";


const Request = () => {

    return(
        <div className="block">
            <div className="request_title_notif">
                <h5>Requests</h5>
                <div>
                    <p className="numberOf_friend">2</p>
                </div>
            </div>
            <div className="">
                <RequestItem/>
                <RequestItem/>
            </div>
        </div>
    )
}




export default Request;
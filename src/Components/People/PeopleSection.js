import React, {useState} from "react";
import PeopleContainer from "./PeopleCont/PeopleContainer";
import PeopleTabs from "./PeopleCont/PeopleTabs";
import './PeopleStyleGlobal.css'

const PeopleSection = () => {

    return(
            <div className={"people_section"}>

                <div>
                    <PeopleTabs/>
                </div>

            </div>
    )
}


export default PeopleSection;
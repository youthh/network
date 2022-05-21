import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth";
import app from "../../App";
import {useDispatch} from "react-redux";
import {getCurrentUser, setMenuAuth, setUser} from "../../Slices/userSlice";


const AuthCom = () => {
    const provider = new GoogleAuthProvider(app);
    const auth = getAuth();
    let dispatch = useDispatch();

    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            dispatch(setUser(user))
            dispatch(setMenuAuth())
            dispatch(getCurrentUser(user.displayName))

            // ...
        }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(error)
    });

    return (
        <div style={{position: "absolute"}}>

        </div>
    )
}


export default AuthCom;

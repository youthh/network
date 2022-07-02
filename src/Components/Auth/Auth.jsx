import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth";
import app from "../../App";
import {useDispatch, useSelector} from "react-redux";
import {getAccountUser, getCurrentUser, getFollowing, setMenuAuth, setUser} from "../../Slices/userSlice";
import SignIn from "./SignIn";


const AuthCom = () => {
    const provider = new GoogleAuthProvider(app);
    const auth = getAuth();
    let dispatch = useDispatch();
    let following = useSelector(state => state.userSlice.user.following)

    const signInGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                dispatch(setUser(user))
                dispatch(setMenuAuth())
                dispatch(getCurrentUser(user.displayName))
                dispatch(getAccountUser(user.email.split('@gmail.com').join('')))
                dispatch(getFollowing(following))


                // ...
            }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log(error)
        });

    }
    return (
        <div style={{position: "absolute"}}>
            <SignIn signIn={signInGoogle}/>
        </div>
    )
}


export default AuthCom;

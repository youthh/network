import React from 'react'
import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth";
import app from "../../App";
import {useDispatch, useSelector} from "react-redux";
import {
    addNewUserThunk,
    getAccountUser,
    getCurrentUser,
    getFollowing,
    setMenuAuth,
    setUser
} from "../../Slices/userSlice";
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
                    .then((value) => {
                        debugger
                        let data = value.payload
                        if(value.payload) {
                            dispatch(addNewUserThunk({user, data}))
                        }
                        else {
                            dispatch(addNewUserThunk({user, data}))
                        }
                    })


            }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
        });

    }
    return (
        <div style={{position: "absolute"}}>
            <SignIn signIn={signInGoogle}/>
        </div>
    )
}


export default AuthCom;

import {createAsyncThunk, createSelector, createSlice} from "@reduxjs/toolkit";
import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "../Firebase/firebase";


export const ThunkGetPeople = createAsyncThunk(
    'user/ThunkGetPeople',
    async () => {
        const user = collection(db, "users")
        return   (await getDocs(user)).docs


    }
)

export const getUserProfilePage = createAsyncThunk(
    'user/getUserProfilePage',
    async (name) => {

        const user = query(collection(db, "users"), where("name", "==", name.split('-').join(' ')));
        return  (await getDocs(user)).docs

    }
)

export const getCurrentUser = createAsyncThunk(
    'user/getCurrentUser',
    async (name) => {

        const user = query(collection(db, "users"), where("name", "==", name));
        return  (await getDocs(user)).docs

    }
)

export const setAuthUser = createAsyncThunk(
    'user/setAuthUser',
    async () => {

    }
)

export const thunkSetFollow = createAsyncThunk(
    'user/setFollow',
    async (id) => {

    }
)

const userSlice = createSlice({
    name: 'user',

    initialState: {
        isFetching: false,
        userPeople: [],
        auth: false,
        isMenuAuth: false,
        isMenu: false,
        user: {
            id: null,
            followers: null,
            following: null,
            followed: null,
            city: null,
            name: null,
            img: null,
        },
        profileVisit:{
            id: null,
            followers: null,
            following: null,
            followed: null,
            city: null,
            name: null,
            img: null,
            post: []
        }

    },

    reducers: {
        setMenuProfile: (state) => {
            state.isMenu = !state.isMenu;
        },
        setMenuAuth: (state) => {
            state.isMenuAuth = !state.isMenuAuth
        },
        setAuth: (state) => {
            state.auth = !state.auth
        },
        setUser: (state, action) => {

            state.user.name = action.payload.displayName
            state.user.img = action.payload.photoURL
            state.user.id = action.payload.uid
            state.user.id = action.payload.uid
            state.auth = !state.auth

        },
        setFollow: (state, action) => {

            state.userPeople.map((p) => {

                if (p.id === action.payload) {

                    p.data.followed = !p.data.followed
                }
            })
        },
        setUsersNull: (state) => {
            state.userPeople = [];
        },
        setProfilePageNull: (state) => {
            state.profileVisit.following = null
            state.profileVisit.followers = null
            state.profileVisit.name = null
            state.profileVisit.img = null
            state.profileVisit.city = null
        }
    },

    extraReducers: {
        [ThunkGetPeople.pending]: (state) => {
            state.isFetching = true;
        },
        [ThunkGetPeople.fulfilled]: (state, action) => {
            state.isFetching = false

            state.userPeople = action.payload.map((d) => {
                return {data: d.data(), id: d.id};

            })
        },
        [getCurrentUser.fulfilled]: (state, action) => {

            action.payload.forEach((doc) => {
                console.log(doc.data())
                state.user.following = doc.data().following
                state.user.followers = doc.data().followers
                state.user.city = doc.data().location
            })
        },
        [getUserProfilePage.pending]: (state) => {
            state.isFetching = true;
        },
        [getUserProfilePage.fulfilled]: (state, action) => {
            state.isFetching = false
            action.payload.forEach((doc) => {
                state.profileVisit.following = doc.data().following
                state.profileVisit.followers = doc.data().followers
                state.profileVisit.name = doc.data().name
                state.profileVisit.img = doc.data().img
                state.profileVisit.city = doc.data().location
                state.profileVisit.post = doc.data().post
            })

        }
    }

})


export const {setMenuProfile, setMenuAuth, setAuth, setUsersNull, setFollow, setUser, setProfilePageNull} = userSlice.actions


export const getNameSp = (state) => {
    return state.userSlice.user.name ? state.userSlice.user.name.split(' ').join('-') : null
}

export const isFetch = (state) => {
    return state.userSlice.isFetching
}



export default userSlice.reducer
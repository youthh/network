import {createAsyncThunk, createSelector, createSlice} from "@reduxjs/toolkit";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../Firebase/firebase";


export const ThunkGetPeople = createAsyncThunk(
    'user/ThunkGetPeople',
    async () => {
        const user = collection(db, "users")
        let users =  await getDocs(user)

        return users.docs
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
            debugger
            state.user.name = action.payload.displayName
            state.user.img = action.payload.photoURL
            state.user.id = action.payload.uid
            state.user.id = action.payload.uid
            state.auth = !state.auth

        },
        setFollow: (state, action) => {

            state.userPeople.map((p) => {
                if (p.id === action.payload) {
                    p.followed = !p.followed
                }
            })
        },
        setUsersNull: (state) => {
            state.userPeople = [];
        }
    },

    extraReducers: {
        [ThunkGetPeople.pending]: (state) => {
            state.isFetching = true;
        },
        [ThunkGetPeople.fulfilled]: (state, action) => {
            state.isFetching = false
            state.userPeople = action.payload.map((d) => {
                return d.data()

            })
        }
    }

})


export const {setMenuProfile, setMenuAuth, setAuth, setUsersNull, setFollow, setUser} = userSlice.actions


export const getNameSp = (state) => {
    return state.userSlice.user.name ? state.userSlice.user.name.split(' ').join('-') : null
}




export default userSlice.reducer
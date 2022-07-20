import {createAsyncThunk, createSelector, createSlice} from "@reduxjs/toolkit";
import {
    collection, getDocs, query, where, addDoc,
    orderBy, updateDoc, doc, arrayUnion, arrayRemove, setDoc
} from "firebase/firestore";
import {db} from "../Firebase/firebase";
import {getDownloadURL, getStorage, ref, uploadBytesResumable, uploadString} from "firebase/storage";
import {addNewPostThunk, setProgress, setSuccessPost, ThunkGetPost} from "./PostSlice";


export const ThunkGetPeople = createAsyncThunk(
    'user/ThunkGetPeople',
    async () => {
        const user = collection(db, "users")
        return (await getDocs(user)).docs


    }
)

export const getUserProfilePost = createAsyncThunk(
    'user/getUserProfilePost',
    async (name) => {
        let refPost = collection(db, 'post')

        const postUser = query(refPost, orderBy('date', "desc"), where('name', '==', name))

        const s = (await getDocs(postUser)).docs
        return s
    }
)


export const getUserProfilePage = createAsyncThunk(
    'user/getUserProfilePage',
    async (name) => {

        const user = query(collection(db, "users"), where("name", "==", name.split('-').join(' ')));
        return (await getDocs(user)).docs

    }
)

export const getCurrentUser = createAsyncThunk(
    'user/getCurrentUser',
    async (name) => {

        const user = query(collection(db, "users"), where("name", "==", name));
        return (await getDocs(user)).docs

    }
)

export const getFollowing = createAsyncThunk(
    'user/getFollowing',
    async (data) => {

        let arr = []
        const users = collection(db, "users");
        for (let i = 0; i < data.length; i++) {
            const q = query(users, where("name", "==", data[i]));
            arr[i] = (await getDocs(q)).docs
        }


        return arr
    }
)

export const thunkGetUserFollowersName = createAsyncThunk(
    'user/thunkGetUserFollowersName',
    async (data) => {

        let arr = []
        const users = collection(db, "users");
        for (let i = 0; i < data.length; i++) {
            const q = query(users, where("name", "==", data[i]));
            arr[i] = (await getDocs(q)).docs
        }


        return arr
    }
)

export const thunkSetFollower = createAsyncThunk(
    'user/thunkSetFollower',
    async (data) => {

        if (data.followed) {
            const user = doc(db, 'users', data.id);
            await updateDoc(user, {
                followed: false
            })
            const washingtonRef = doc(db, "users", data.id);

            await updateDoc(washingtonRef, {
                followers: arrayRemove(data.userN)
            });

        } else {
            const user = doc(db, 'users', data.id);
            await updateDoc(user, {
                followed: true
            })

            const washingtonRef = doc(db, "users", data.id);
            await updateDoc(washingtonRef, {
                followers: arrayUnion(data.userN)
            });
        }
    }
)

export const thunkSetFollow = createAsyncThunk(
    'user/setFollow',
    async (data) => {


        if (data.followed) {
            const user = doc(db, 'users', data.id);
            await updateDoc(user, {
                followed: false
            })
            const washingtonRef = doc(db, "users", data.userId);

            await updateDoc(washingtonRef, {
                following: arrayRemove(data.nameUser)
            });

        } else {
            const user = doc(db, 'users', data.id);
            await updateDoc(user, {
                followed: true
            })

            const washingtonRef = doc(db, "users", data.userId);
            await updateDoc(washingtonRef, {
                following: arrayUnion(data.nameUser)
            });
        }


    }
)
export const getAccountUser = createAsyncThunk(
    'user/getAccountUser',

    async (name) => {

        let userData = collection(db, 'users');
        const user = query(userData, where("name", "==", name));

        return (await getDocs(user)).docs

    }
)

//////////  Add new User sign up
export const addSignUserThunk = createAsyncThunk(
    'user/addSignUserThunk',

    async (data) => {
        let url = data.user.photoURL;
        let userName = data.user.email.split('@gmail.com').join('')
        debugger
        let user = {
            name: userName,
            location: '',
            img: url,
            followed: false,
            followers: data.data.followers ? data.data.followers : [],
            following: data.data.following ? data.data.following : []
        }

        await setDoc(doc(db, "users", data.user.uid), user);


    }
)

export const addNewUserThunk = createAsyncThunk(
    'user/addNewUserThunk',
    async (data) => {
        let url = data.user.photoURL;
        let userName = data.user.email.split('@gmail.com').join('')
        let user = {
            name: userName,
            location: '',
            img: url,
            followed: false,
            followers: [],
            following: []
        }
        await setDoc(doc(db, "users", data.user.uid), user);

    }
)


const userSlice = createSlice({
    name: 'user',

    initialState: {
        isFetching: false,
        isFollow: true,
        userPeople: [],
        auth: false,
        isMenuAuth: false,
        isMenu: false,
        user: {
            id: null,
            followers: [],
            following: [],
            followed: null,
            city: null,
            name: null,
            img: null,
            followingU: []
        },
        profileVisit: {
            id: null,
            followers: [],
            following: [],
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

            state.user.name = action.payload.email.split('@gmail.com').join('')
            state.user.img = action.payload.photoURL
            state.user.id = action.payload.uid

            state.auth = !state.auth

        },
        setFollow: (state, action) => {

            state.userPeople.map((p) => {

                if (p.id === action.payload.id) {

                    p.data.followed = !p.data.followed
                    !p.data.followed ? p.data.followers.forEach((i, index) => {
                        if (i === action.payload.userN) {
                            p.data.followers.splice(index, 1)
                        }
                    }) : p.data.followers.push(action.payload.userN)

                }
            })
        },
        setUsersNull: (state) => {
            state.userPeople = [];

        },
        setFollowerNull: (state) => {
            state.user.following = [];
            state.user.followingU = [];

        },
        setProfilePageNull: (state) => {
            state.profileVisit.following = []
            state.profileVisit.followers = []
            state.profileVisit.name = null
            state.profileVisit.img = null
            state.profileVisit.city = null
        },
        setPostProfileNull: (state) => {
            state.profileVisit.post = [];
        },
        setFollowValue: (state, action) => {
            state.userPeople.map((i) => {
                if (i.data.name === action.payload.follower) {

                    i.data.followed = action.payload.value
                }
            })
            state.profileVisit.followed = action.payload.value
        }
    },

    extraReducers: {
        [ThunkGetPeople.pending]: (state) => {
            state.isFetching = true;
        },
        [ThunkGetPeople.fulfilled]: (state, action) => {
            state.isFetching = false

            state.userPeople = action.payload.map((d) => {
                return {data: d.data(), id: d.id}

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
            state.profileVisit.id = action.payload[0].id
            action.payload.forEach((doc) => {
                state.profileVisit.following = doc.data().following
                state.profileVisit.followers = doc.data().followers
                state.profileVisit.name = doc.data().name
                state.profileVisit.img = doc.data().img
                state.profileVisit.city = doc.data().location
                state.profileVisit.followed = doc.data().followed
            })

        },
        [getUserProfilePost.fulfilled]: (state, action) => {


            state.profileVisit.post = action.payload.map((d) => {
                return d.data()
            });
        },
        [thunkSetFollow.pending]: (state) => {
            state.isFollow = true
        },
        [thunkSetFollow.fulfilled]: (state) => {
            state.isFollow = false
        },
        [getAccountUser.fulfilled]: (state, action) => {
            debugger
            if (action.payload.length !== 0) {
                state.user.following = action.payload[0].data().following
            } else {
                state.user.following = []
            }
        },
        [getFollowing.fulfilled]: (state, action) => {
            state.user.followingU = action.payload.map((i) => {
                return i.map((i) => {
                    return {data: i.data(), id: i.id}
                })
            })

        },
        [thunkGetUserFollowersName.fulfilled]: (state, action) => {
            state.user.followers = action.payload.map((i) => {
                return i.map((i) => {
                    return {data: i.data(), id: i.id}
                })
            })
        }
    }

})


export const {
    setMenuProfile,
    setMenuAuth,
    setPostProfileNull,
    setUsersNull,
    setFollow,
    setUser,
    setFollowerNull,
    setProfilePageNull,
    setFollowValue
} = userSlice.actions


export const getNameSp = (state) => {

    return state.userSlice.user.name ? state.userSlice.user.name.split(' ').join('') : null
}

export const getFollowingUser = (state) => {
    return state.userSlice.user.following
}


export const isFetch = (state) => {
    return state.userSlice.isFetching
}

export const getUser = (state) => {
    return state.userSlice.user
}

export const getFetch = state => {
    return state.userSlice.isFollow
}

export default userSlice.reducer
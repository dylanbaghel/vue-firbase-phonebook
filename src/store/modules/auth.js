import { googleAuthProvider, firebase } from './../../firebase/firebase'
import router from './../../router';

export default {
    state: {
        userId: null,
        username: null,
        avatar: null
    },
    getters: {
        isLoggedIn: state => {
            return !!state.userId;
        }
    },
    mutations: {
        setUser(state, payload = {}) {
            state.userId = payload.userId || null;
            state.username = payload.username || null;
            state.avatar = payload.avatar || null;
        }
    },
    actions: {
        startLogin({ commit }) {
            return firebase.auth().signInWithPopup(googleAuthProvider).then(data => {
                const payload = {
                    userId: data.user.uid,
                    username: data.user.displayName,
                    avatar: data.user.photoURL
                }
                commit('setUser', payload)
            })
        },
        startLogout({ commit }) {
            return firebase.auth().signOut().then(() => {
                commit('setUser');
                commit('resetContactsState', { root: true })
            }).catch(e => console.log(e))
        }
    }
};
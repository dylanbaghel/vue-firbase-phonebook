import db from './../../firebase/firebase';
import Vue from 'vue'

export default {
    state: {
        items: [],
        viewContact: null
    },
    getters: {
        contacts: state => {
            return state.items;
        }
    },
    mutations: {
        setContacts: (state, payload) => {
            state.items = [...payload.contacts]
        },
        setViewContact: (state, payload) => {
            state.viewContact = {...payload.contact}
        },
        resetContactsState: (state) => {
            state.items = [],
            state.viewContact = null
        }
    },
    actions: {
        startFetchingContacts: ({
            commit,
            rootState
        }) => {
            return new Promise((resolve, reject) => {
                db.collection(`users/${rootState.auth.userId}/contacts`).onSnapshot((snapshot) => {
                    let contacts = [];
                    snapshot.forEach(doc => {
                        contacts.push({
                            id: doc.id,
                            ...doc.data()
                        })
                    })
                    commit('setContacts', {
                        contacts
                    })
                    resolve()
                }, (error) => {
                    reject(error)
                });
            })
        },
        deleteContact: ({
            rootState
        }, contactId) => {
            return db.collection(`users/${rootState.auth.userId}/contacts`).doc(`${contactId}`).delete();
        },
        startSetViewContact: ({ commit, rootState }, payload) => {
            return new Promise((resolve, reject) => {
                db.collection(`users/${rootState.auth.userId}/contacts`)
                .doc(payload.id)
                .get()
                .then(snapshot => {
                    commit('setViewContact', { contact: { id: snapshot.id, ...snapshot.data() } })
                    resolve()
                })
                .catch(e => {
                    reject(e)
                })
            })
        }
    }
};
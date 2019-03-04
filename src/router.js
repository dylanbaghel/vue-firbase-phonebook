import Vue from 'vue';
import Router from 'vue-router';

import Login from './components/Login.vue';
import Contacts from './components/Contacts.vue'
import AddContact from './components/AddContact'
import EditContact from './components/EditContact'

import store from './store/store';

Vue.use(Router);

const router = new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "login",
            component: Login,
            meta: {
                guest: true
            }
        },
        {
            path: "/contacts",
            name: "contacts",
            component: Contacts,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/add",
            name: "addContact",
            component: AddContact,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/edit/:contactId",
            name: "editContact",
            component: EditContact,
            meta: {
                requiresAuth: true
            }
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            next();
        } else {
            next({
                name: 'login'
            });
        }
    } else if (to.matched.some(record => record.meta.guest)) {
        if (store.getters.isLoggedIn) {
            next({
                name: 'contacts'
            })
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
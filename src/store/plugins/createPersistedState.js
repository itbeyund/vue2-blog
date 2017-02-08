/**
 * 来源 ：vuex-persistedstate https://github.com/robinvdvleuten/vuex-persistedstate
 * 保存vuex 到 sessionStorage
 * Created by stevie on 2016/12/22.
 */
import set from 'lodash/set'
import get from 'lodash/get'

const defaultReducer = (state, paths) => (
    paths.length === 0 ? state : paths.reduce((substate, path) => {
            set(substate, path, get(state, path));
            return substate
        }, {})
);

export default function createPersistedState({
    key = 'vuex',
    paths = [],
    getState = key => JSON.parse(window.sessionStorage.getItem(key)),
    setState = (key, state) => window.sessionStorage.setItem(key, JSON.stringify(state)),
    reducer = defaultReducer
} = {}) {
    return store => {
        store.replaceState(
            Object.assign({}, store.state, getState(key))
        );

        store.subscribe((mutation, state) => {
            setState(key, reducer(state, paths))
        })
    }
}

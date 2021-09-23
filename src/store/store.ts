import router from '@/router'
import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

export interface Credentials {
    access_token: string
    token_type: string
    expires_in: number
}

export interface State {
    credentials: Credentials
}

export const key: InjectionKey<Store<State>> = Symbol()

const getDefaultState = (): State => {
    return {
        credentials: {
            access_token: '',
            token_type: '',
            expires_in: 0,
        },
    }
}

export const store = createStore<State>({
    state: getDefaultState(),
    getters: {
        credentials(state): Credentials {
            return state.credentials
        },
        isLoggedIn(state): boolean {
            return (state.credentials.access_token !== '' && state.credentials.token_type !== '' && state.credentials.expires_in !== 0)
        },
        fullToken(state): string {
            return state.credentials.token_type + ' ' + state.credentials.access_token
        },
    },
    mutations: {
        RESET_STATE(state) {
            Object.assign(state, getDefaultState())
        },
        SET_CREDENTIALS(state, payload) {
            state.credentials = payload;
        },
    },
    actions: {
        setCredentials(context, payload) {
            context.commit('SET_CREDENTIALS', payload)
            setTimeout(() => {
                context.commit('RESET_STATE')
                router.push('/')
            }, payload.expires_in * 1000);
        },
    }
})

// eslint-disable-next-line
export function useStore() {
    return baseUseStore(key)
}
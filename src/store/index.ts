import {createStore} from "vuex";
import {api} from "@/api";

export interface IAnalyze {
    total_income: number,
    total_expense: number,
    total: number
}

export interface IUser {
    id: string,
    name: string,
    email: string,
    balance: number
}

export interface State {
    token: string,
    user: IUser,
    analyze: IAnalyze,
    history: object
}

export const store = createStore<State>({
    state: {
        token: localStorage.getItem("TOKEN") ?? "",
        user: {},
        analyze: {},
        history: {}
    },
    mutations: {
        setToken(state: State, payload: string) {
            state.token = payload;
        },
        setHistory(state: State, payload: object) {
            state.history = payload;
        },
        setUser(state: State, payload: IUser) {
            state.user = payload;
        },
        setAnalyze(state: State, payload: IAnalyze) {
            state.analyze = payload;
        }
    },
    getters: {
        getToken(state: State) {
            return state.token;
        },
        getHistory(state: State) {
            return state.history;
        },
        getUser(state: State) {
            return state.user;
        },
        getAnalyze(state: State) {
            return state.analyze;
        }
    },
    actions: {
        async fetchBalance() {
            await api.get("/api/user", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("TOKEN")
                }
            }).then(res => {
                store.commit("setUser", res.data)
            })
        },
        async fetchAnalyze() {
            await api.get("api/transactions/analyze", {
                "headers": {
                    "Authorization": "Bearer " + localStorage.getItem("TOKEN"),
                }
            }).then(res => {
                store.commit("setAnalyze", res.data);
            })
        }
    }
})
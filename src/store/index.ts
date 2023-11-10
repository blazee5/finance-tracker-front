import {api} from "@/api";
import {defineStore} from "pinia";

interface ITransaction {
    id: string,
    user: IUser,
    description: string,
    amount: number,
    type: string,
    created_at: string
}

interface IAnalyze {
    total_income: number,
    total_expense: number,
    total: number
}

interface IUser {
    id: string,
    name: string,
    email: string,
}

export const useStore = defineStore('main',  {
    state: () => ({
        token: "",
        user: {} as IUser,
        analyze: {} as IAnalyze,
        history: {} as ITransaction[],
    }),
    actions: {
        async fetchUser() {
            await api.get("/api/user", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("TOKEN")
                }
            }).then(res => {
                this.user = res.data;
            })
        },

        async fetchAnalyze() {
            await api.get("api/transactions/analyze", {
                "headers": {
                    "Authorization": "Bearer " + localStorage.getItem("TOKEN"),
                }
            }).then(res => {
                this.analyze = res.data;
            })
        },

        async fetchHistory() {
            await api.get("api/transactions", {
                "headers": {
                    "Authorization": "Bearer " + localStorage.getItem("TOKEN"),
                }
            }).then(res => {
                this.history = res.data;
            })
        }
    }
})
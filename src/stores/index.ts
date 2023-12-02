import {api} from "@/api";
import {defineStore} from "pinia";
import {ref} from "vue";
import type {IUser} from "@/stores/user";

export interface ITransaction {
    id: string;
    user: IUser;
    description: string;
    category: string;
    amount: number;
    type: string;
    created_at: string;
}

interface IAnalyze {
    total_income: number;
    total_expense: number;
    total: number;
}

interface ICategory {
    id: string;
    name: string;
    user: IUser;
}


export const useStore = defineStore('main', () => {
    const analyze = ref({} as IAnalyze);
    const history = ref([] as ITransaction[]);
    const categories = ref([] as ICategory[]);

    async function fetchAnalyze() {
        await api.get("api/transactions/analyze", {
            "headers": {
                "Authorization": "Bearer " + localStorage.getItem("TOKEN"),
            }
        }).then(res => {
            analyze.value = res.data;
        })
    }

    async function fetchHistory() {
        await api.get("api/transactions", {
            "headers": {
                "Authorization": "Bearer " + localStorage.getItem("TOKEN"),
            }
        }).then(res => {
            history.value = res.data;
        })
    }

    // async function fetchCategories() {
    //     await api.get("api/categories", {
    //         "headers": {
    //             "Authorization": "Bearer " + localStorage.getItem("TOKEN"),
    //         }
    //     }).then(res => {
    //         categories.value = res.data;
    //     })
    // }

    return {analyze, history, fetchAnalyze, fetchHistory}
})
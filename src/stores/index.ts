import {api} from "@/api";
import {defineStore} from "pinia";
import {ref} from "vue";
import type {IUser} from "@/stores/user";

export interface ITransaction {
    id: number;
    user: IUser;
    description: string;
    category: ICategory;
    amount: number;
    type: string;
    created_at: string;
}

interface IAnalyze {
    total_income: number;
    total_expense: number;
    total: number;
}

export interface ICategory {
    id: number;
    name: string;
    user_id: number;
}


export const useStore = defineStore('main', () => {
    const analyze = ref({} as IAnalyze);
    const history = ref([] as ITransaction[]);
    const categories = ref([] as ICategory[]);
    const selectedCategory = ref({} as ICategory);

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
        await api.get(`api/transactions?category=${selectedCategory.value.id ?? 0}`, {
            "headers": {
                "Authorization": "Bearer " + localStorage.getItem("TOKEN"),
            }
        }).then(res => {
            history.value = res.data;
        })
    }

    async function fetchCategories() {
        await api.get("api/categories", {
            "headers": {
                "Authorization": "Bearer " + localStorage.getItem("TOKEN"),
            }
        }).then(res => {
            categories.value = res.data;
        })
    }

    return {analyze, history, categories, selectedCategory, fetchAnalyze, fetchHistory, fetchCategories}
})
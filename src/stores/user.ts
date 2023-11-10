import {defineStore} from "pinia";
import {api} from "@/api";
import {ref} from "vue";

export interface IUser {
    id: string,
    name: string,
    email: string,
}

export const useUserStore = defineStore('userStore', () => {
    const token = ref(localStorage.getItem("TOKEN"));
    const user = ref({} as IUser);

    async function fetchUser() {
        await api.get("/api/user", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("TOKEN")
            }
        }).then(res => {
            user.value = res.data;
        })
    }

    return {token, user, fetchUser}
})
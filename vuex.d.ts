import { Store } from 'vuex'
import type {IAnalyze, IUser} from "@/store";

declare module '@vue/runtime-core' {
    interface State {
        token: string,
        user: IUser,
        analyze: IAnalyze,
        history: object[],
    }

    interface ComponentCustomProperties {
        $store: Store<State>
    }
}
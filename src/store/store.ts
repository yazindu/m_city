import {create} from 'zustand'
import {devtools, persist} from 'zustand/middleware'
import {User as FirebaseUser} from "@firebase/auth";

interface MCityStoreState {
    // user: FirebaseUser | null
    // setUser: (user: FirebaseUser | null) => void
    user: string
    setUser: (user: string) => void
}

export const useMCityStore = create<MCityStoreState>()(
    devtools(
        persist(
            (set) => ({
                user: null,
                setUser: () => set((state) => ({user: state.user}))
            }), {
                name: 'mcity-storage'
            })
    )
)
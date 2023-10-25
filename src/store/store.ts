import {create} from 'zustand'
import {devtools, persist} from 'zustand/middleware'
import {User as FirebaseUser} from "@firebase/auth";

interface MCityStoreState {
    user: FirebaseUser | null
    setUser: (user: FirebaseUser | null) => void
}

export const useMCityStore = create<MCityStoreState>()(
    devtools(
        persist(
            (set) => ({
                user: null,
                setUser: (user: FirebaseUser) => set((state) => ({user: user}))
            }), {
                name: 'm_city-storage'
            })
    )
)
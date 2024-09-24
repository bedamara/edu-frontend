'use client';

import { createContext, type ReactNode, useContext, useRef } from 'react';
import { type StoreApi, useStore } from 'zustand';

import {
    createProfileStore,
    ProfileState,
    type ProfileStore,
} from '@/shared/store/profile';

export const ProfileStoreContext = createContext<StoreApi<ProfileStore> | null>(
    null,
);

export interface ProfileStoreProviderProps {
    children: ReactNode;
    initialState: ProfileState;
}

export const ProfileStoreProvider = ({
    children,
    initialState,
}: ProfileStoreProviderProps) => {
    const storeRef = useRef<StoreApi<ProfileStore>>();
    if (!storeRef.current) {
        storeRef.current = createProfileStore(initialState);
    }

    return (
        <ProfileStoreContext.Provider value={storeRef.current}>
            {children}
        </ProfileStoreContext.Provider>
    );
};

export const useProfileStore = <T,>(
    selector: (store: ProfileStore) => T,
): T => {
    const profileStoreContext = useContext(ProfileStoreContext);

    if (!profileStoreContext) {
        throw new Error(
            `useProfileStore must be use within ProfileStoreProvider`,
        );
    }

    return useStore(profileStoreContext, selector);
};

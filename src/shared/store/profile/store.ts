import { createStore } from 'zustand/vanilla';

import { SchoolClass } from '@/shared/types';

export type ProfileState = {
    classes: SchoolClass[];
};

export type ProfileActions = unknown;

export type ProfileStore = ProfileState & ProfileActions;

export const defaultInitState: ProfileState = {
    classes: [],
};

export const createProfileStore = (
    initState: ProfileState = defaultInitState,
) => {
    return createStore<ProfileStore>()((set) => ({
        ...initState,
    }));
};

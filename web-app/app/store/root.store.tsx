"use client";
import { StoryStore, storyStore } from '@/app/modules/stores/story.store';
import { UserStore, userStore } from '@/app/modules/stores/user.store';
import { Instance, types } from 'mobx-state-tree';
import { ReactNode, createContext, useContext } from 'react';
export const rootStore = types
  .model({
    userStore: UserStore,
    storyStore: StoryStore
  })
  .create({
    userStore: userStore,
    storyStore: storyStore
  });
const RootStoreContext = createContext<null | Instance<typeof rootStore>>(null);
export interface StoreProviderProps {
  children: ReactNode;
}
export function StoreProvider(props: StoreProviderProps) {
  const { children } = props;
  return <RootStoreContext.Provider value={rootStore}>{children}</RootStoreContext.Provider>;
}
export function useStore() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider');
  }
  return store;
}

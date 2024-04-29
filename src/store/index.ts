import {create} from 'zustand';

interface AppState {
  count: number;
}

interface AppActions {
  increment: () => void;
  decrement: () => void;
}

const initialState: AppState = {
  count: 0,
};

export const useAppStore = create<AppState & AppActions>(set => ({
  ...initialState,
  resetState: () => set(() => initialState),
  increment: () => set(state => ({count: state.count + 1})),
  decrement: () => set(state => ({count: state.count - 1})),
}));

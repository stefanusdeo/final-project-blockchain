import { create } from "zustand";
import { persist } from "zustand/middleware";
export const useAccountAddress = create(
  persist(
    (set) => ({
      accountAddress: "",
      updateAccountAddress: (address) =>
        set(() => ({ accountAddress: address })),
      removeAccountAddress: () => set({ accountAddress: "" }),
    }),
    {
      name: "account-wallet",
    }
  )
);

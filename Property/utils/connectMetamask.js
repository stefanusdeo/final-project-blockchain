import { ethers } from "ethers";
import { toast } from "sonner";
import { networkId, switchToTargetNetwork } from "./network";

export const connectMetamask = async () => {
  if (typeof window.ethereum !== "undefined") {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      await provider.send("eth_requestAccounts", []);

      const signer = provider.getSigner();
      const accountAddress = await signer.getAddress();
      const balance = await provider.getBalance(accountAddress);
      const network = await provider.getNetwork();
      if (network.chainId !== networkId) {
        toast.error("Please Use Lisk Sepolia Testnet");
        const res = switchToTargetNetwork();
        if (!res) {
          return { success: false };
        }
      }

      return {
        success: true,
        address: accountAddress,
        balance: balance,
      };
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
      toast.error("Error Connecting to MetaMask");
      return {
        success: false,
      };
    }
  } else {
    toast.info("Please Install Metamask");
    return {
      success: false,
    };
  }
};

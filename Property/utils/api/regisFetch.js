import { ethers } from "ethers";
import { ABI, CONTRACT_ADDRESS } from "../abi";
import { fetchIdentity } from "./getFetch";

export const registerProperty = async (data) => {
  if (window.ethereum) {
    try {
      const resDigitalIdentity = await fetchIdentity();
      if (!resDigitalIdentity.success) {
        return {
          success: false,
          message: "Please Register your identity",
        };
      }
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      const transaction = await contract.registerProperty(data);
      await transaction.wait();

      const receipt = await transaction.wait();

      return {
        success: true,
        message: "Success Register!",
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: "Something Wrong",
      };
    }
  } else {
    return {
      success: false,
      message: "Please Install Metamask",
    };
  }
};

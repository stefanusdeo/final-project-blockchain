import { ethers } from "ethers";
import { ABI, CONTRACT_ADDRESS } from "./abi";
import { encryptChar, encryptToBytes32 } from "./hashChar";

export const createDigitalIdentity = async (data) => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      const transaction = await contract.createIdentity(
        encryptToBytes32(data.no),
        encryptToBytes32(data.name),
        encryptToBytes32(data.placeOfBirth),
        encryptToBytes32(data.dateOfBirth)
      );
      const res = await transaction.wait();
      console.log(res);
      return {
        success: true,
        message: "Digital Identity Created!",
      };
    } catch (error) {
      console.error(error);
      if (error.code === ethers.errors.UNPREDICTABLE_GAS_LIMIT) {
        return {
          success: false,
          message: error.reason,
        };
      }
    }
  } else {
    return {
      success: false,
      message: "Please Install Metamask",
    };
  }
};

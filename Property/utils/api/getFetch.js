const {
  CONTRACT_ADDRESS,
  ABI,
  CONTRACT_ADDRESS_DI,
  ABI_DI,
} = require("../abi");
import { ethers } from "ethers";
import { decryptFromBytes32 } from "../hashChar";
import { networkId, switchToTargetNetwork } from "../network";
import { toast } from "sonner";

export const fetchProperties = async () => {
  try {
    // Setup provider and contract instance
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
    await provider.send("eth_requestAccounts", []);

    const network = await provider.getNetwork();
    if (network.chainId !== networkId) {
      return { success: false, message: "Please Use Lisk Sepolia Testnet" };
    }

    // Request user accounts
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const userAddress = accounts[0];

    // Loop through all possible properties and filter by owner
    const userProperties = [];
    const totalProperties = await contract.nextTokenId(); // Assume nextTokenId tracks total properties

    for (let i = 0; i < totalProperties; i++) {
      const owner = await contract.ownerOf(i);
      if (owner.toLowerCase() === userAddress.toLowerCase()) {
        const property = await contract.properties(i);
        userProperties.push({
          id: i,
          address: property.locationAddress,
          luasBangunan: property.buildingArea,
          luasTanah: property.landArea,
          image: property.urlPhoto,
          nib: property.nib,
          city: property.city,
          subdistrict: property.subdistrict,
          province: property.province,
          postalCode: property.postalCode,
        });
      }
    }

    return {
      success: true,
      data: userProperties,
    };
  } catch (error) {
    console.error("Error fetching properties:", error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const fetchIdentity = async () => {
  try {
    // Setup provider dan instansi kontrak
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(CONTRACT_ADDRESS_DI, ABI_DI, provider);

    // Meminta akun pengguna yang terhubung
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const userAddress = accounts[0];

    // Memanggil fungsi getIdentity dari smart contract
    const [id, name, dateOfBirth, placeOfBirth] = await contract.getIdentity(
      userAddress
    );

    // Menyusun data identitas pengguna
    const dataUser = {
      id,
      name,
      dateOfBirth,
      placeOfBirth,
    };

    // Mengembalikan hasil yang berhasil
    return {
      success: true,
      data: dataUser,
    };
  } catch (error) {
    console.error("Error fetching identity:", error);

    // Mengembalikan hasil jika terjadi kesalahan
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

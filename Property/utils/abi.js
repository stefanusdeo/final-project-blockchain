import ownerProperty from "./abi_ownerProperty.json";
import digitalIdentity from "./abi_digitalIdentity.json";

export const ABI = ownerProperty;

export const ABI_DI = digitalIdentity;

export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_SC;

export const CONTRACT_ADDRESS_DI = process.env.NEXT_PUBLIC_SC_DI;

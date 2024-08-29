export const ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "IdentityAlreadyExists",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "IdentityNotFound",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "id",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "dateOfBirth",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "placeOfBirth",
        type: "string",
      },
    ],
    name: "IdentityCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "id",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "dateOfBirth",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "placeOfBirth",
        type: "string",
      },
    ],
    name: "IdentityUpdated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_id",
        type: "string",
      },
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_dateOfBirth",
        type: "string",
      },
      {
        internalType: "string",
        name: "_placeOfBirth",
        type: "string",
      },
    ],
    name: "createIdentity",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "getIdentity",
    outputs: [
      {
        internalType: "string",
        name: "_id",
        type: "string",
      },
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_dateOfBirth",
        type: "string",
      },
      {
        internalType: "string",
        name: "_placeOfBirth",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
      {
        internalType: "string",
        name: "_id",
        type: "string",
      },
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_dateOfBirth",
        type: "string",
      },
      {
        internalType: "string",
        name: "_placeOfBirth",
        type: "string",
      },
    ],
    name: "updateIdentity",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_SC;

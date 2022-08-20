/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  CredentialsDB,
  CredentialsDBInterface,
} from "../../contracts/CredentialsDB";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "schema",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint32",
        name: "credentialNo",
        type: "uint32",
      },
    ],
    name: "CredentialIssued",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "credentialsCounter",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "credentialsRegister",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "credentialsSchema",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "data",
        type: "string",
      },
    ],
    name: "saveCredential",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "i",
        type: "uint256",
      },
    ],
    name: "viewArray",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040516200103e3803806200103e833981810160405281019062000037919062000390565b620000576200004b6200007760201b60201c565b6200007f60201b60201c565b80600190805190602001906200006f92919062000143565b505062000446565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b828054620001519062000410565b90600052602060002090601f016020900481019282620001755760008555620001c1565b82601f106200019057805160ff1916838001178555620001c1565b82800160010185558215620001c1579182015b82811115620001c0578251825591602001919060010190620001a3565b5b509050620001d09190620001d4565b5090565b5b80821115620001ef576000816000905550600101620001d5565b5090565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6200025c8262000211565b810181811067ffffffffffffffff821117156200027e576200027d62000222565b5b80604052505050565b600062000293620001f3565b9050620002a1828262000251565b919050565b600067ffffffffffffffff821115620002c457620002c362000222565b5b620002cf8262000211565b9050602081019050919050565b60005b83811015620002fc578082015181840152602081019050620002df565b838111156200030c576000848401525b50505050565b6000620003296200032384620002a6565b62000287565b9050828152602081018484840111156200034857620003476200020c565b5b62000355848285620002dc565b509392505050565b600082601f83011262000375576200037462000207565b5b81516200038784826020860162000312565b91505092915050565b600060208284031215620003a957620003a8620001fd565b5b600082015167ffffffffffffffff811115620003ca57620003c962000202565b5b620003d8848285016200035d565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200042957607f821691505b6020821081141562000440576200043f620003e1565b5b50919050565b610be880620004566000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c80638da5cb5b1161005b5780638da5cb5b146101015780639fa560e31461011f578063bde7e5681461013d578063f2fde38b1461016d57610088565b80631d3e890e1461008d578063715018a6146100bd57806374444f29146100c757806374b7cb23146100e3575b600080fd5b6100a760048036038101906100a2919061073f565b610189565b6040516100b49190610805565b60405180910390f35b6100c561022d565b005b6100e160048036038101906100dc919061088c565b610241565b005b6100eb610318565b6040516100f89190610805565b60405180910390f35b6101096103a6565b604051610116919061091a565b60405180910390f35b6101276103cf565b6040516101349190610954565b60405180910390f35b6101576004803603810190610152919061073f565b6103e6565b6040516101649190610805565b60405180910390f35b6101876004803603810190610182919061099b565b61048e565b005b600281618000811061019a57600080fd5b0160009150905080546101ac906109f7565b80601f01602080910402602001604051908101604052809291908181526020018280546101d8906109f7565b80156102255780601f106101fa57610100808354040283529160200191610225565b820191906000526020600020905b81548152906001019060200180831161020857829003601f168201915b505050505081565b610235610512565b61023f6000610590565b565b610249610512565b8181600261800260009054906101000a900463ffffffff1663ffffffff16618000811061027957610278610a29565b5b01919061028792919061065c565b50618002600081819054906101000a900463ffffffff16809291906102ab90610a87565b91906101000a81548163ffffffff021916908363ffffffff160217905550507f81887c052260322084dacf5de322b28978bfb00b74cda6d7c55ca8478bd7071961800260009054906101000a900463ffffffff1660405161030c9190610954565b60405180910390a15050565b60018054610325906109f7565b80601f0160208091040260200160405190810160405280929190818152602001828054610351906109f7565b801561039e5780601f106103735761010080835404028352916020019161039e565b820191906000526020600020905b81548152906001019060200180831161038157829003601f168201915b505050505081565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b61800260009054906101000a900463ffffffff1681565b606060028261800081106103fd576103fc610a29565b5b018054610409906109f7565b80601f0160208091040260200160405190810160405280929190818152602001828054610435906109f7565b80156104825780601f1061045757610100808354040283529160200191610482565b820191906000526020600020905b81548152906001019060200180831161046557829003601f168201915b50505050509050919050565b610496610512565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610506576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104fd90610b26565b60405180910390fd5b61050f81610590565b50565b61051a610654565b73ffffffffffffffffffffffffffffffffffffffff166105386103a6565b73ffffffffffffffffffffffffffffffffffffffff161461058e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161058590610b92565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600033905090565b828054610668906109f7565b90600052602060002090601f01602090048101928261068a57600085556106d1565b82601f106106a357803560ff19168380011785556106d1565b828001600101855582156106d1579182015b828111156106d05782358255916020019190600101906106b5565b5b5090506106de91906106e2565b5090565b5b808211156106fb5760008160009055506001016106e3565b5090565b600080fd5b600080fd5b6000819050919050565b61071c81610709565b811461072757600080fd5b50565b60008135905061073981610713565b92915050565b600060208284031215610755576107546106ff565b5b60006107638482850161072a565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b838110156107a657808201518184015260208101905061078b565b838111156107b5576000848401525b50505050565b6000601f19601f8301169050919050565b60006107d78261076c565b6107e18185610777565b93506107f1818560208601610788565b6107fa816107bb565b840191505092915050565b6000602082019050818103600083015261081f81846107cc565b905092915050565b600080fd5b600080fd5b600080fd5b60008083601f84011261084c5761084b610827565b5b8235905067ffffffffffffffff8111156108695761086861082c565b5b60208301915083600182028301111561088557610884610831565b5b9250929050565b600080602083850312156108a3576108a26106ff565b5b600083013567ffffffffffffffff8111156108c1576108c0610704565b5b6108cd85828601610836565b92509250509250929050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610904826108d9565b9050919050565b610914816108f9565b82525050565b600060208201905061092f600083018461090b565b92915050565b600063ffffffff82169050919050565b61094e81610935565b82525050565b60006020820190506109696000830184610945565b92915050565b610978816108f9565b811461098357600080fd5b50565b6000813590506109958161096f565b92915050565b6000602082840312156109b1576109b06106ff565b5b60006109bf84828501610986565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680610a0f57607f821691505b60208210811415610a2357610a226109c8565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610a9282610935565b915063ffffffff821415610aa957610aa8610a58565b5b600182019050919050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b6000610b10602683610777565b9150610b1b82610ab4565b604082019050919050565b60006020820190508181036000830152610b3f81610b03565b9050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b6000610b7c602083610777565b9150610b8782610b46565b602082019050919050565b60006020820190508181036000830152610bab81610b6f565b905091905056fea2646970667358221220b068ab14dd013fecf451713ecbefc518e06856119d8e5509fd7231a9f33c74c864736f6c63430008090033";

type CredentialsDBConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CredentialsDBConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class CredentialsDB__factory extends ContractFactory {
  constructor(...args: CredentialsDBConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    schema: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<CredentialsDB> {
    return super.deploy(schema, overrides || {}) as Promise<CredentialsDB>;
  }
  override getDeployTransaction(
    schema: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(schema, overrides || {});
  }
  override attach(address: string): CredentialsDB {
    return super.attach(address) as CredentialsDB;
  }
  override connect(signer: Signer): CredentialsDB__factory {
    return super.connect(signer) as CredentialsDB__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CredentialsDBInterface {
    return new utils.Interface(_abi) as CredentialsDBInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CredentialsDB {
    return new Contract(address, _abi, signerOrProvider) as CredentialsDB;
  }
}

/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export interface CredentialsDBInterface extends utils.Interface {
  functions: {
    "TREE_DEPTH()": FunctionFragment;
    "credentialsCounter()": FunctionFragment;
    "credentialsRegister(uint256)": FunctionFragment;
    "credentialsSchema()": FunctionFragment;
    "credentialsSchemaSet()": FunctionFragment;
    "getLeavesArray()": FunctionFragment;
    "getMerkleRoot()": FunctionFragment;
    "leavesArray(uint256)": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "saveCredential(string,uint256)": FunctionFragment;
    "setCredentialsSchema(string)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "tree()": FunctionFragment;
    "verifier()": FunctionFragment;
    "viewArray(uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "TREE_DEPTH"
      | "credentialsCounter"
      | "credentialsRegister"
      | "credentialsSchema"
      | "credentialsSchemaSet"
      | "getLeavesArray"
      | "getMerkleRoot"
      | "leavesArray"
      | "owner"
      | "renounceOwnership"
      | "saveCredential"
      | "setCredentialsSchema"
      | "transferOwnership"
      | "tree"
      | "verifier"
      | "viewArray"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "TREE_DEPTH",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "credentialsCounter",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "credentialsRegister",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "credentialsSchema",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "credentialsSchemaSet",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getLeavesArray",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getMerkleRoot",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "leavesArray",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "saveCredential",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "setCredentialsSchema",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "tree", values?: undefined): string;
  encodeFunctionData(functionFragment: "verifier", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "viewArray",
    values: [PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(functionFragment: "TREE_DEPTH", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "credentialsCounter",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "credentialsRegister",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "credentialsSchema",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "credentialsSchemaSet",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getLeavesArray",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getMerkleRoot",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "leavesArray",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "saveCredential",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setCredentialsSchema",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "tree", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "verifier", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "viewArray", data: BytesLike): Result;

  events: {
    "CredentialSavedInRegister(uint32)": EventFragment;
    "LeafInserted(uint256,uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "CredentialSavedInRegister"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LeafInserted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export interface CredentialSavedInRegisterEventObject {
  credentialNo: number;
}
export type CredentialSavedInRegisterEvent = TypedEvent<
  [number],
  CredentialSavedInRegisterEventObject
>;

export type CredentialSavedInRegisterEventFilter =
  TypedEventFilter<CredentialSavedInRegisterEvent>;

export interface LeafInsertedEventObject {
  leaf: BigNumber;
  root: BigNumber;
}
export type LeafInsertedEvent = TypedEvent<
  [BigNumber, BigNumber],
  LeafInsertedEventObject
>;

export type LeafInsertedEventFilter = TypedEventFilter<LeafInsertedEvent>;

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface CredentialsDB extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: CredentialsDBInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    TREE_DEPTH(overrides?: CallOverrides): Promise<[number]>;

    credentialsCounter(overrides?: CallOverrides): Promise<[number]>;

    credentialsRegister(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    credentialsSchema(overrides?: CallOverrides): Promise<[string]>;

    credentialsSchemaSet(overrides?: CallOverrides): Promise<[boolean]>;

    getLeavesArray(overrides?: CallOverrides): Promise<[BigNumber[]]>;

    getMerkleRoot(overrides?: CallOverrides): Promise<[BigNumber]>;

    leavesArray(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    saveCredential(
      data: PromiseOrValue<string>,
      leaf: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setCredentialsSchema(
      schema: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    tree(
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        depth: BigNumber;
        root: BigNumber;
        numberOfLeaves: BigNumber;
      }
    >;

    verifier(overrides?: CallOverrides): Promise<[string]>;

    viewArray(
      i: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;
  };

  TREE_DEPTH(overrides?: CallOverrides): Promise<number>;

  credentialsCounter(overrides?: CallOverrides): Promise<number>;

  credentialsRegister(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  credentialsSchema(overrides?: CallOverrides): Promise<string>;

  credentialsSchemaSet(overrides?: CallOverrides): Promise<boolean>;

  getLeavesArray(overrides?: CallOverrides): Promise<BigNumber[]>;

  getMerkleRoot(overrides?: CallOverrides): Promise<BigNumber>;

  leavesArray(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  saveCredential(
    data: PromiseOrValue<string>,
    leaf: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setCredentialsSchema(
    schema: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  tree(
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber] & {
      depth: BigNumber;
      root: BigNumber;
      numberOfLeaves: BigNumber;
    }
  >;

  verifier(overrides?: CallOverrides): Promise<string>;

  viewArray(
    i: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  callStatic: {
    TREE_DEPTH(overrides?: CallOverrides): Promise<number>;

    credentialsCounter(overrides?: CallOverrides): Promise<number>;

    credentialsRegister(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    credentialsSchema(overrides?: CallOverrides): Promise<string>;

    credentialsSchemaSet(overrides?: CallOverrides): Promise<boolean>;

    getLeavesArray(overrides?: CallOverrides): Promise<BigNumber[]>;

    getMerkleRoot(overrides?: CallOverrides): Promise<BigNumber>;

    leavesArray(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    saveCredential(
      data: PromiseOrValue<string>,
      leaf: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    setCredentialsSchema(
      schema: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    tree(
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber] & {
        depth: BigNumber;
        root: BigNumber;
        numberOfLeaves: BigNumber;
      }
    >;

    verifier(overrides?: CallOverrides): Promise<string>;

    viewArray(
      i: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {
    "CredentialSavedInRegister(uint32)"(
      credentialNo?: null
    ): CredentialSavedInRegisterEventFilter;
    CredentialSavedInRegister(
      credentialNo?: null
    ): CredentialSavedInRegisterEventFilter;

    "LeafInserted(uint256,uint256)"(
      leaf?: null,
      root?: null
    ): LeafInsertedEventFilter;
    LeafInserted(leaf?: null, root?: null): LeafInsertedEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
  };

  estimateGas: {
    TREE_DEPTH(overrides?: CallOverrides): Promise<BigNumber>;

    credentialsCounter(overrides?: CallOverrides): Promise<BigNumber>;

    credentialsRegister(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    credentialsSchema(overrides?: CallOverrides): Promise<BigNumber>;

    credentialsSchemaSet(overrides?: CallOverrides): Promise<BigNumber>;

    getLeavesArray(overrides?: CallOverrides): Promise<BigNumber>;

    getMerkleRoot(overrides?: CallOverrides): Promise<BigNumber>;

    leavesArray(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    saveCredential(
      data: PromiseOrValue<string>,
      leaf: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setCredentialsSchema(
      schema: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    tree(overrides?: CallOverrides): Promise<BigNumber>;

    verifier(overrides?: CallOverrides): Promise<BigNumber>;

    viewArray(
      i: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    TREE_DEPTH(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    credentialsCounter(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    credentialsRegister(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    credentialsSchema(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    credentialsSchemaSet(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getLeavesArray(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getMerkleRoot(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    leavesArray(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    saveCredential(
      data: PromiseOrValue<string>,
      leaf: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setCredentialsSchema(
      schema: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    tree(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    verifier(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    viewArray(
      i: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}

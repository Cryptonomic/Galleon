import BigNumber from "bignumber.js";
import {EncryptedWalletVersionOne, KeyStore} from "../types/WalletTypes";
import {pwhash, open} from './SodiumUtils';

const { TezosToolkit } = require('@taquito/taquito');
const { InMemorySigner } = require('@taquito/signer');

import bs58check from 'bs58check';
import { Buffer } from 'buffer';

export type AccountInfo= {
    privateKey: string;
    address: string;
};


/**
 * Writes an arbitrary Base58-check string into hex.
 *
 * @param b String to convert.
 * @param hint Hint to use while encoding, blank will encode the string directly, 'chain_id' will encode a chainid type.
 */
export function writeBufferWithHint(b: string, hint: string = ''): Buffer {
    if (hint === '') {
        // Convert Uint8Array to Buffer
        return Buffer.from(bs58check.decode(b));
    }

    if (hint === 'chain_id') {
        // Convert Uint8Array to Buffer and remove the prefix
        return Buffer.from(bs58check.decode(b)).slice("Net".length);
    }

    throw new Error(`Unsupported hint, '${hint}'`);
}

export async function decryptMessage(message: Buffer, passphrase: string, salt: Buffer) : Promise<Buffer> {
    const keyBytes = await pwhash(passphrase, salt)
    const m = await open(message, keyBytes);
    if (m === null) {
        throw new Error('Failed to decrypt message');
    }
    return Buffer.from(m);
}


/**
 * Unlocks a wallet using the given filename and password.
 * @param {string} walletFileContents - Contents of wallet file.
 * @param {string} passphrase - Passphrase to unlock the wallet.
 * @returns {Promise<string>} The Tezos account address associated with the wallet.
 */
export async function unlockWallet(walletFileContents: string, passphrase: string): Promise<AccountInfo> {
    try {
        const ew: EncryptedWalletVersionOne = JSON.parse(walletFileContents) as EncryptedWalletVersionOne;
        const encryptedKeys = writeBufferWithHint(ew.ciphertext);
        const salt = writeBufferWithHint(ew.salt);
        const decryptedMessage = await decryptMessage(encryptedKeys, passphrase, salt)
        const decryptedString = decryptedMessage.toString();
        const walletData: any[] = JSON.parse(decryptedString);
        const keys: KeyStore[] = [];

        walletData.forEach((w) => {
            const pk = w.privateKey;
            delete w.privateKey; // pre v100 wallet data
            keys.push({
                ...w,
                secretKey: w.secretKey || pk,
            });
        });

        return {
            privateKey: keys[0].secretKey,
            address: walletData[0].publicKeyHash
        }
    } catch (error) {
        console.error('Failed to unlock wallet:', error);
        throw error;
    }
}

export async function sendTransaction(
    walletFileContents: string,
    passphrase: string,
    recipientAddress: string,
    amount: number,
    tezosNodeAddress: string
): Promise<string> {

    const { privateKey } = await unlockWallet(walletFileContents, passphrase);

    const tezos = new TezosToolkit(tezosNodeAddress);

    tezos.setProvider({
        signer: new InMemorySigner(privateKey)
    });

    try {
        // Send the transaction
        const op = await tezos.wallet.transfer({
            to: recipientAddress,
            amount: amount // Amount is in tez (1 tez = 1,000,000 microtez)
        }).send();

        // Confirm the transaction
        const confirmation = await op.confirmation(1);
        console.log(`Transaction successfully included in block: ${confirmation}`);
        console.log(`Operation hash: ${op.opHash}`);
        return op.opHash;
    } catch (error) {
        console.error(`Error in sending tez: ${error}`);
        throw error
    }
}


export async function delegate(
    walletFileContents: string,
    passphrase: string,
    delegateAddress: string,
    tezosNodeAddress: string
): Promise<string> {

    const { privateKey, address } = await unlockWallet(walletFileContents, passphrase);

    const tezos = new TezosToolkit(tezosNodeAddress);

    tezos.setProvider({
        signer: new InMemorySigner(privateKey)
    });

    try {

        const op = await tezos.contract.setDelegate({ source: address, delegate: delegateAddress });

        // Confirm the transaction
        const confirmation = await op.confirmation(1);
        console.log(`Transaction successfully included in block: ${confirmation}`);
        console.log(`Operation hash: ${op.hash}`);
        return op.hash;
    } catch (error) {
        console.error(`Error in delegating tez: ${error}`);
        throw error
    }
}



export async function withdraw(
    walletFileContents: string,
    passphrase: string,
    contractAddress: string,
    amountInTez: string,
    tezosNodeAddress: string
): Promise<string> {

    const { privateKey, address } = await unlockWallet(walletFileContents, passphrase);

    const tezos = new TezosToolkit(tezosNodeAddress);

    tezos.setProvider({
        signer: new InMemorySigner(privateKey)
    });

    try {
        // Withdraw the funds
        const contract = await tezos.contract.at(contractAddress);

        const amountInMutez = new BigNumber(amountInTez).multipliedBy(1000000).toString()
        const op = await contract.methodsObject.do(withdrawFromKT1(address, amountInMutez)).send();

        // Confirm the transaction
        const confirmation = await op.confirmation(1);
        console.log(`Transaction successfully included in block: ${confirmation}`);
        console.log(`Operation hash: ${op.opHash}`);
        return op.opHash;
    } catch (error) {
        console.error(`Error in withdrawing tez: ${error}`);
        throw error
    }
}

export async function getDelegatorContracts(tz1Address: string) {
    try {
        const response = await fetch(`https://api.tzkt.io/v1/accounts/${tz1Address}/contracts`);

        const delegationContracts = await response.json();
        return delegationContracts
            .filter((contract: any) => contract.kind === 'delegator_contract')
            .map((delegationContract: { address: string; balance: string; }) => ({
                contractAddress: delegationContract.address,
                balance: delegationContract.balance
            }));
    } catch (error) {
        console.error('Error fetching delegation contracts:', error);
        throw error;
    }
}


const withdrawFromKT1 = (managerAddress: string, amountInMutez: string) => {
    return [
        {
            "prim":"DROP"
        },
        {
            "prim":"NIL",
            "args":[
                {
                "prim":"operation"
                }
            ]
        },
        {
            "prim":"PUSH",
            "args":[
                {
                "prim":"key_hash"
                },
                {
                "string": managerAddress
                }
            ]
        },
        {
            "prim":"IMPLICIT_ACCOUNT"
        },
        {
            "prim":"PUSH",
            "args":[
                {
                "prim": "mutez"
                },
                {
                "int": amountInMutez
                }
            ]
        },
        {
            "prim":"UNIT"
        },
        {
            "prim":"TRANSFER_TOKENS"
        },
        {
            "prim":"CONS"
        }
    ]
}
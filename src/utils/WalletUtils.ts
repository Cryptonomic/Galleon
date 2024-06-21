import {CryptoUtils} from 'conseiljs-softsigner';
import {TezosMessageUtils} from "conseiljs";
import {EncryptedWalletVersionOne, KeyStore} from "../types/WalletTypes";

const { TezosToolkit } = require('@taquito/taquito');
const { InMemorySigner } = require('@taquito/signer');

import { Buffer } from 'buffer';
window.Buffer = Buffer;

export type AccountInfo= {
    privateKey: string;
    address: string;
};

/**
 * Unlocks a wallet using the given filename and password.
 * @param {string} walletFileContents - Contents of wallet file.
 * @param {string} passphrase - Passphrase to unlock the wallet.
 * @returns {Promise<string>} The Tezos account address associated with the wallet.
 */
export async function unlockWallet(walletFileContents: string, passphrase: string): Promise<AccountInfo> {
    try {
        const ew: EncryptedWalletVersionOne = JSON.parse(walletFileContents) as EncryptedWalletVersionOne;
        const encryptedKeys = TezosMessageUtils.writeBufferWithHint(ew.ciphertext);
        const salt = TezosMessageUtils.writeBufferWithHint(ew.salt);
        const decryptedMessage = await CryptoUtils.decryptMessage(encryptedKeys, passphrase, salt)
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

        const result = {
            privateKey: keys[0].secretKey,
            address: walletData[0].publicKeyHash
        }

        return result
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
        console.log(`Transaction successfully included in block: ${confirmation.blockHash}`);
        console.log(`Operation hash: ${op.opHash}`);
        return op.opHash;
    } catch (error) {
        console.error(`Error in sending tez: ${error}`);
        throw error
    }
}

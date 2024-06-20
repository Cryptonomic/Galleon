import {CryptoUtils} from 'conseiljs-softsigner';
import {TezosMessageUtils} from "conseiljs";
import {EncryptedWalletVersionOne, KeyStore} from "../types/WalletTypes";

import { Buffer } from 'buffer';
window.Buffer = Buffer;

/**
 * Unlocks a wallet using the given filename and password.
 * @param {string} fileContents - Contents of wallet file.
 * @param {string} passphrase - Passphrase to unlock the wallet.
 * @returns {Promise<string>} The Tezos account address associated with the wallet.
 */
export async function unlockWallet(fileContents: string, passphrase: string): Promise<string> {
    try {
        const ew: EncryptedWalletVersionOne = JSON.parse(fileContents) as EncryptedWalletVersionOne;
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

        const result =  { identities: keys };
        return result.identities[0].publicKeyHash;
    } catch (error) {
        console.error('Failed to unlock wallet:', error);
        throw error;
    }
}

import {CryptoUtils} from 'conseiljs-softsigner';
import {TezosMessageUtils} from "conseiljs";
import {EncryptedWalletVersionOne, KeyStore} from "../types/WalletTypes";

/**
 * Unlocks a wallet using the given filename and password.
 * @param {string} filename - Path to the wallet file.
 * @param {string} passphrase - Passphrase to unlock the wallet.
 * @returns {Promise<string>} The Tezos account address associated with the wallet.
 */
export async function unlockWallet(filename: string, passphrase: string) {
    try {
        const fs = require('fs');
        const p = JSON.parse(fs.readFileSync(filename, 'utf8'));
        const ew: EncryptedWalletVersionOne = JSON.parse(p) as EncryptedWalletVersionOne;
        const encryptedKeys = TezosMessageUtils.writeBufferWithHint(ew.ciphertext);
        const salt = TezosMessageUtils.writeBufferWithHint(ew.salt);
        const walletData: any[] = JSON.parse(CryptoUtils.decryptMessage(encryptedKeys, passphrase, salt).toString());
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

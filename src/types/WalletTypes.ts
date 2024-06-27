// This file contains copies of the original ConseilJS and Galleon types needed for managing wallets.

export enum KeyStoreCurve {
    ED25519,
    SECP256K1,
    SECP256R1
}

export interface KeyStore {
    publicKey: string;
    secretKey: string;
    publicKeyHash: string;
    curve: KeyStoreCurve;
    storeType: KeyStoreType;
    seed?: string;
    derivationPath?: string;
}

export enum KeyStoreType {
    Mnemonic,
    Fundraiser,
    Hardware
}

/**
 * Represents a generic cryptocurrency wallet.
 */
export interface Wallet {
    identities: KeyStore[];
}

/**
 * Represents the first version of an encrypted wallet.
 */
export interface EncryptedWalletVersionOne {
    version: string;
    salt: string;
    ciphertext: string;
    /**
     * Key derivation function
     */
    kdf: string;
}

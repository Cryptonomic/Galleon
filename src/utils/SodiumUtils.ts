import * as sodiumsumo from 'libsodium-wrappers-sumo';

/**
 * Asynchronously generates a cryptographic hash from a passphrase and a salt.
 * Uses the Argon2i algorithm configured with specific computational cost parameters.
 *
 * @param passphrase - The passphrase from which to generate the hash.
 * @param salt - The cryptographic salt to use in the hashing process.
 * @returns A Promise that resolves to the generated hash as a Uint8Array.
 */
const pwhash = async (passphrase: string, salt: Uint8Array): Promise<Uint8Array> => {
    await sodiumsumo.ready;
    return sodiumsumo.crypto_pwhash(
        sodiumsumo.crypto_box_SEEDBYTES,
        passphrase,
        salt,
        4, // OpSLimit
        33554432, // MemLimit
        sodiumsumo.crypto_pwhash_ALG_ARGON2I13
    );
};

/**
 * Asynchronously decrypts a message using a nonce and a secret key.
 *
 * @param nonceAndCiphertext - The combined nonce and ciphertext as a Uint8Array.
 * @param key - The secret key used for decryption.
 * @returns A Promise that resolves to the decrypted message as a Uint8Array, or null if decryption fails.
 */
const open = async (nonceAndCiphertext: Uint8Array, key: Uint8Array): Promise<Uint8Array | null> => {
    await sodiumsumo.ready;

    const nonce = nonceAndCiphertext.slice(0, sodiumsumo.crypto_secretbox_NONCEBYTES);
    const ciphertext = nonceAndCiphertext.slice(sodiumsumo.crypto_secretbox_NONCEBYTES);

    try {
        return sodiumsumo.crypto_secretbox_open_easy(ciphertext, nonce, key);
    } catch (error) {
        return null; // Return null if decryption fails
    }
};

// Export the functions
export { pwhash, open };

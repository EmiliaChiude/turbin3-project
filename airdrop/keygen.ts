import { Keypair } from "@solana/web3.js";

// Generate a new keypair
const kp = Keypair.generate();

console.log(`You've generated a new Solana wallet:
    Public Key: ${kp.publicKey.toBase58()}
    Secret Key: [${kp.secretKey.toString()}]`);

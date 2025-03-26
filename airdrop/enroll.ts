import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { Program, Wallet, AnchorProvider, Idl } from "@coral-xyz/anchor";
import { IDL, Turbin3Prereq } from "./programs/Turbin3_prereq";
import wallet from "./Turbin3-wallet.json";

// Load keypair
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

// Connection to Solana devnet
const connection = new Connection("https://api.devnet.solana.com");

// Convert GitHub username to a Buffer
const github = Buffer.from("<emilia_chiude>", "utf8");

// Create an Anchor provider
const provider = new AnchorProvider(connection, new Wallet(keypair), {
  commitment: "confirmed",
});

// Ensure IDL is correct
console.log("IDL Structure:", JSON.stringify(IDL, null, 2));

// Create Program instance
const program: Program<Turbin3Prereq> = new Program<Turbin3Prereq>(
  IDL as Idl,
  new PublicKey("Trb3aEx85DW1cEEvoqEaBkMn1tfmNEEEPaKzLSu4YAv"),
  provider
);

// Create PDA (Program Derived Address)
const enrollment_seeds = [Buffer.from("prereq"), keypair.publicKey.toBuffer()];
const [enrollment_key, _bump] = PublicKey.findProgramAddressSync(
  enrollment_seeds,
  program.programId
);

// Submit enrollment
(async () => {
  try {
    const txhash = await program.methods
      .submit(github)
      .accounts({
        signer: keypair.publicKey,
        prereq: enrollment_key, // ✅ Required in IDL
        system_program: new PublicKey("11111111111111111111111111111111"), // ✅ Solana System Program
      })
      .signers([keypair])
      .rpc();

    console.log(`✅ Enrollment successful! Check your transaction: 
    https://explorer.solana.com/tx/${txhash}?cluster=devnet`);

  } catch (e) {
    console.error(`❌ Oops, something went wrong: ${e}`);
  }
})();

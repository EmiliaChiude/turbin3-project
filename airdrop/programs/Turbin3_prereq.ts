export type Turbin3Prereq = any;
export const IDL: Turbin3Prereq = {
  address: "Trb3aEx85DW1cEEvoqEaBkMn1tfmNEEEPaKzLSu4YAv",
  metadata: {
    name: "turbine_prereq",
    version: "0.1.0",
    spec: "0.1.0",
    description: "Created with Anchor",
  },
  instructions: [
    {
      name: "clean",
      discriminator: [250, 191, 56, 128, 150, 251, 1, 103],
      accounts: [
        { name: "signer", writable: true, signer: true },
        { name: "prereq", writable: true },
      ],
      args: [],
    },
    {
      name: "submit",
      discriminator: [88, 166, 102, 181, 162, 127, 170, 48],
      accounts: [
        { name: "signer", writable: true, signer: true },
        {
          name: "prereq",
          writable: true,
          pda: {
            seeds: [
              { kind: "const", value: [112, 114, 101, 81, 50, 50, 53] },
              { kind: "account", path: "signer" },
            ],
          },
        },
        { name: "system_program", address: "11111111111111111111111111111111" },
      ],
      args: [{ name: "github_username", type: "bytes" }],
    },
  ],
};

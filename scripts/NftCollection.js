const { ethers } = require('hardhat');

// deploy address: 0x8a198c1af8CCdfD66F4D76F582C1B184d65f2fb6 / 0xC357b9daa49C5C27E370b8C0b01a6314b853803b

async function main() {
  const Actress = await ethers.getContractFactory('Actress');
  const ActressWorld = await Actress.deploy(
    'Diva',
    'DVA',
    'https://ipfs.io/ipfs/QmXMbqqdpVEq1cKjYD4yVMFQuqs7FVquZgXjSMZWqGNK7w/'
  );
  await ActressWorld.deployed();
  console.log('deployed', ActressWorld.address);
  await ActressWorld.mint(1);
  await ActressWorld.mint(1);
  await ActressWorld.mint(1);
  await ActressWorld.mint(1);

  console.log('Nft minted');
}

main().then(() =>
  process.exit(0).catch((error) => {
    console.error(error);
    process.exit(1);
  })
);

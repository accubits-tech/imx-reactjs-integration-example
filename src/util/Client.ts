import { getEnv } from './EnvTools';

export default {
  alchemyApiKey: getEnv('REACT_APP_ALCHEMY_API_KEY'),
  ethNetwork: getEnv('REACT_APP_NETWORK_TYPE'),
  client: {
    publicApiUrl: getEnv('PUBLIC_API_URL'),
    starkContractAddress: getEnv('REACT_APP_SANDBOX_STARK_CONTRACT_ADDRESS'),
    registrationContractAddress: getEnv('REACT_APP_SANDBOX_REGISTRATION_ADDRESS'),
  },
  // privateKey1: getEnv('PRIVATE_KEY1'),
  // tokenId: getEnv('TOKEN_ID'),
  // tokenAddress: getEnv('TOKEN_ADDRESS'),
  bulkMintMax: getEnv('BULK_MINT_MAX'),

  ownerAccountPrivateKey: getEnv('OWNER_ACCOUNT_PRIVATE_KEY'),
  collectionContractAddress: getEnv('COLLECTION_CONTRACT_ADDRESS'),
  collectionProjectId: getEnv('COLLECTION_PROJECT_ID'),
};
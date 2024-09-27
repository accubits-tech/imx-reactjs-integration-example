import { Config, ImmutableXConfiguration } from "@imtbl/core-sdk"

const getNetworkConfig = (envNetworkConfig: string | undefined ): ImmutableXConfiguration => {
  const mainnet = ['mainnet','eth','ethereum','l1','production']
  const sandbox = ['sandbox','goerli','staging','test','testing']
  const legacy = ['legacy','ropsten']
  const invalid = new Error('Invalid network type: ' + envNetworkConfig + 'Please check your .env file')

  const network = (envNetworkConfig as string).toLowerCase()

  if(mainnet.indexOf(network) > -1)
    return Config.PRODUCTION
  else if (sandbox.indexOf(network) > -1)
    return Config.SANDBOX
  else if (legacy.indexOf(network) > -1)
    return Config.ROPSTEN
  else
    throw invalid
}

export default getNetworkConfig
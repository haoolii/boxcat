import { http, createConfig} from 'wagmi'
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors'


import { defineChain } from 'viem'
 
export const berachain = defineChain({
  id: 80085,
  name: 'Berachain Artio  ',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://artio.rpc.berachain.com/'] },
  },
  blockExplorers: {
    default: { name: 'Beratrail', url: 'https://artio.beratrail.io/' },
  },
})

export const config = createConfig({
  chains: [berachain],
  connectors: [
    injected(),
    coinbaseWallet({ appName: 'Hello World' }),
    walletConnect({ projectId: import.meta.env.VITE_WC_PROJECT_ID }),
  ],
  transports: {
    [berachain.id]: http()
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}

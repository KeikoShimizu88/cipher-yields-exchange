# Cipher Yields Exchange

A revolutionary decentralized yield farming platform that combines cutting-edge blockchain technology with advanced privacy protection. Built with modern web technologies, this platform enables users to participate in yield farming strategies while maintaining complete data privacy through innovative encryption techniques.

## Key Features

- **🚀 Advanced Yield Farming**: Next-generation strategies for maximum returns
- **🔐 Privacy Protection**: All sensitive data encrypted using cutting-edge cryptography
- **🌐 Multi-Chain Integration**: Seamless support across different blockchain networks
- **💼 Professional Trading**: Enterprise-grade tools for serious investors
- **📱 Universal Access**: Optimized experience across all devices and platforms
- **⚡ High Performance**: Lightning-fast execution and real-time updates
- **🎯 Smart Automation**: AI-powered strategies that adapt to market conditions

## Technology Stack

### Core Platform
- **React 18** - Modern UI framework with concurrent rendering
- **TypeScript** - Type-safe development with advanced tooling
- **Vite** - Ultra-fast build system and development server
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Framer Motion** - Professional-grade animations and micro-interactions

### Blockchain Infrastructure
- **Wagmi** - React hooks for seamless Ethereum integration
- **RainbowKit** - Universal wallet connection with multi-provider support
- **Viem** - TypeScript-first Ethereum library for blockchain operations
- **Hardhat** - Comprehensive smart contract development environment

### Advanced Security
- **FHE Implementation** - Fully homomorphic encryption for data privacy
- **Zero-Knowledge Proofs** - Privacy-preserving computation protocols
- **Multi-layer Encryption** - Enterprise-grade data protection
- **Smart Contract Auditing** - Security-first development practices

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/KeikoShimizu88/cipher-yields-exchange.git
cd cipher-yields-exchange
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Add the following environment variables:
```
VITE_CHAIN_ID=11155111
VITE_RPC_URL=your_infura_rpc_url_here
VITE_WALLET_CONNECT_PROJECT_ID=your_walletconnect_project_id
VITE_INFURA_API_KEY=your_infura_api_key
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components (header, footer)
│   ├── sections/       # Page sections
│   └── ui/             # shadcn/ui components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Application pages
└── assets/             # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run compile` - Compile smart contracts
- `npm run deploy:sepolia` - Deploy contracts to Sepolia testnet
- `npm run deploy:local` - Deploy contracts to local network

## Smart Contract Deployment

### Prerequisites
- Node.js and npm installed
- Hardhat installed globally: `npm install -g hardhat`
- Sepolia testnet ETH for gas fees
- Private key for deployment account

### Deploy to Sepolia Testnet

1. **Set up environment variables:**
   ```bash
   export PRIVATE_KEY="your_private_key_here"
   export RPC_URL="https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990"
   export ETHERSCAN_API_KEY="your_etherscan_api_key"
   ```

2. **Compile contracts:**
   ```bash
   npm run compile
   ```

3. **Deploy to Sepolia:**
   ```bash
   npm run deploy:sepolia
   ```

4. **Verify contracts on Etherscan:**
   The deployment script will automatically attempt to verify the contract.

## Frontend Deployment

This project can be deployed to various platforms:

- **Vercel** (Recommended)
- **Netlify**
- **GitHub Pages**

For detailed Vercel deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, create an issue in the repository or contact the development team.
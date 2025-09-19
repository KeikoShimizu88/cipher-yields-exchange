# Environment Variables Setup

This document explains how to configure environment variables for the Cipher Yields Exchange project.

## Frontend Environment Variables

Create a `.env.local` file in the project root with the following variables:

```bash
# Chain Configuration
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990

# Wallet Connect Configuration
VITE_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475

# Infura Configuration (Optional)
VITE_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
```

## Smart Contract Deployment Variables

For deploying smart contracts, set these environment variables:

```bash
# Private key for deployment account (keep secure!)
export PRIVATE_KEY="your_private_key_here"

# RPC URL for blockchain connection
export RPC_URL="https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990"

# Etherscan API key for contract verification
export ETHERSCAN_API_KEY="your_etherscan_api_key_here"
```

## Vercel Deployment Variables

When deploying to Vercel, add these environment variables in the Vercel dashboard:

| Variable | Value | Description |
|----------|-------|-------------|
| `VITE_CHAIN_ID` | `11155111` | Ethereum Sepolia testnet chain ID |
| `VITE_RPC_URL` | `https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990` | RPC endpoint for blockchain connection |
| `VITE_WALLET_CONNECT_PROJECT_ID` | `2ec9743d0d0cd7fb94dee1a7e6d33475` | WalletConnect project ID for wallet connections |
| `VITE_INFURA_API_KEY` | `b18fb7e6ca7045ac83c41157ab93f990` | Infura API key for blockchain access |

## Security Notes

- **Never commit private keys or sensitive data to the repository**
- **Use environment variables for all sensitive configuration**
- **Rotate API keys regularly**
- **Use different keys for development and production**

## Getting API Keys

### Infura API Key
1. Visit [infura.io](https://infura.io)
2. Create an account and project
3. Copy the project ID from your dashboard

### WalletConnect Project ID
1. Visit [cloud.walletconnect.com](https://cloud.walletconnect.com)
2. Create a new project
3. Copy the project ID

### Etherscan API Key
1. Visit [etherscan.io](https://etherscan.io)
2. Create an account
3. Go to API-KEYs section
4. Create a new API key

## Local Development

For local development, create a `.env.local` file:

```bash
# Copy the example and fill in your values
cp ENVIRONMENT_SETUP.md .env.local
# Edit .env.local with your actual values
```

## Production Deployment

For production deployment on Vercel:

1. Go to your project settings in Vercel dashboard
2. Navigate to Environment Variables
3. Add each variable with its corresponding value
4. Ensure all variables are set for Production environment
5. Redeploy your application

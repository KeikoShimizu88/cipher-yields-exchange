# Quick Start Guide

Get up and running with Cipher Yields Exchange in minutes!

## 🚀 Quick Setup (5 minutes)

### 1. Clone and Install
```bash
git clone https://github.com/KeikoShimizu88/cipher-yields-exchange.git
cd cipher-yields-exchange
npm install
```

### 2. Environment Setup
Create `.env.local` file:
```bash
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
VITE_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
VITE_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
```

### 3. Start Development
```bash
npm run dev
```

Visit `http://localhost:5173` and you're ready to go!

## 🔧 Smart Contract Deployment

### Deploy to Sepolia Testnet
```bash
# Set environment variables
export PRIVATE_KEY="your_private_key"
export RPC_URL="https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990"
export ETHERSCAN_API_KEY="your_etherscan_key"

# Compile and deploy
npm run compile
npm run deploy:sepolia
```

## 🌐 Deploy to Vercel

### Option 1: Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Set environment variables
4. Deploy!

### Option 2: Vercel CLI
```bash
npm i -g vercel
vercel login
vercel
```

## 🎯 Key Features to Test

1. **Wallet Connection**: Click "Connect Wallet" button
2. **Yield Strategies**: Browse available farming strategies
3. **Portfolio**: View your positions and rewards
4. **Analytics**: Check market insights and performance

## 🔒 Security Features

- **FHE Encryption**: All sensitive data is encrypted
- **Smart Contract Security**: Audited with OpenZeppelin standards
- **Wallet Security**: Multiple wallet support with secure connections

## 📱 Mobile Support

The platform is fully responsive and works on:
- Desktop browsers
- Mobile browsers
- Progressive Web App (PWA) capabilities

## 🆘 Troubleshooting

### Common Issues

**Wallet not connecting?**
- Check if you're on the correct network (Sepolia)
- Ensure you have testnet ETH for gas fees
- Try refreshing the page

**Build errors?**
- Run `npm install` to ensure all dependencies are installed
- Check Node.js version (18+ recommended)
- Clear node_modules and reinstall if needed

**Contract deployment failed?**
- Verify you have Sepolia ETH for gas fees
- Check your private key is correct
- Ensure RPC URL is accessible

## 📞 Support

- **Email**: liam.robinson@globalworks.site
- **GitHub Issues**: Create an issue in the repository
- **Documentation**: Check README.md and DEPLOYMENT.md

## 🎉 You're Ready!

Your Cipher Yields Exchange is now running with:
- ✅ Frontend on localhost:5173
- ✅ Wallet connection working
- ✅ Smart contracts deployed (optional)
- ✅ Ready for production deployment

Happy yield farming! 🚀

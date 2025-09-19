# Vercel Deployment Guide

This guide provides step-by-step instructions for deploying the Cipher Yields Exchange to Vercel.

## Prerequisites

- Vercel account (sign up at [vercel.com](https://vercel.com))
- GitHub account with the project repository
- Node.js installed locally (for testing)

## Step-by-Step Deployment

### 1. Prepare the Repository

1. Ensure all code is committed and pushed to your GitHub repository
2. Verify the following files exist:
   - `package.json` with correct dependencies
   - `vite.config.ts` for Vite configuration
   - `.env.local` with environment variables (create if not exists)

### 2. Create Environment Variables File

Create a `.env.local` file in the project root with the following variables:

```bash
# Chain Configuration
VITE_CHAIN_ID=11155111
VITE_RPC_URL=your_infura_rpc_url_here

# Wallet Connect Configuration
VITE_WALLET_CONNECT_PROJECT_ID=your_walletconnect_project_id

# Infura Configuration (Optional)
VITE_INFURA_API_KEY=your_infura_api_key
```

### 3. Deploy to Vercel

#### Option A: Deploy via Vercel Dashboard

1. **Sign in to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Project**
   - Click "New Project" on the dashboard
   - Select "Import Git Repository"
   - Choose your GitHub repository: `your-username/cipher-yields-exchange`
   - Click "Import"

3. **Configure Project Settings**
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Set Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add the following variables:
     ```
     VITE_CHAIN_ID=11155111
     VITE_RPC_URL=your_infura_rpc_url_here
     VITE_WALLET_CONNECT_PROJECT_ID=your_walletconnect_project_id
     VITE_INFURA_API_KEY=your_infura_api_key
     ```

5. **Deploy**
   - Click "Deploy" button
   - Wait for the build process to complete
   - Your app will be available at the provided Vercel URL

#### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from Project Directory**
   ```bash
   cd cipher-yields-exchange
   vercel
   ```

4. **Follow the prompts**
   - Link to existing project or create new one
   - Set up environment variables when prompted
   - Confirm deployment settings

5. **Production Deployment**
   ```bash
   vercel --prod
   ```

### 4. Configure Custom Domain (Optional)

1. **Add Domain in Vercel Dashboard**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

2. **Update DNS Records**
   - Add CNAME record pointing to your Vercel deployment
   - Wait for DNS propagation (up to 24 hours)

### 5. Environment Variables Configuration

In Vercel Dashboard → Project Settings → Environment Variables, add:

| Variable | Value | Description |
|----------|-------|-------------|
| `VITE_CHAIN_ID` | `11155111` | Ethereum Sepolia testnet chain ID |
| `VITE_RPC_URL` | `your_infura_rpc_url_here` | RPC endpoint for blockchain connection |
| `VITE_WALLET_CONNECT_PROJECT_ID` | `your_walletconnect_project_id` | WalletConnect project ID for wallet connections |
| `VITE_INFURA_API_KEY` | `your_infura_api_key` | Infura API key for blockchain access |

### 6. Build Configuration

Ensure your `vite.config.ts` is properly configured:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
  },
  server: {
    port: 5173,
    host: true
  }
})
```

### 7. Post-Deployment Verification

1. **Check Build Logs**
   - Review build logs in Vercel dashboard
   - Ensure no errors during build process

2. **Test Application**
   - Visit the deployed URL
   - Test wallet connection functionality
   - Verify all pages load correctly

3. **Monitor Performance**
   - Use Vercel Analytics to monitor performance
   - Check Core Web Vitals scores

### 8. Continuous Deployment

- **Automatic Deployments**: Vercel automatically deploys on every push to main branch
- **Preview Deployments**: Each pull request gets a preview deployment
- **Manual Deployments**: Use Vercel CLI or dashboard for manual deployments

### 9. Troubleshooting

#### Common Issues:

1. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Review build logs for specific errors

2. **Environment Variables**
   - Ensure all required variables are set
   - Check variable names match exactly (case-sensitive)
   - Verify values are correct

3. **Wallet Connection Issues**
   - Verify WalletConnect project ID is correct
   - Check RPC URL is accessible
   - Ensure chain ID matches your target network

4. **Performance Issues**
   - Enable Vercel Analytics
   - Optimize bundle size
   - Use Vercel's Edge Functions if needed

### 10. Security Considerations

1. **Environment Variables**
   - Never commit sensitive keys to repository
   - Use Vercel's environment variable system
   - Rotate API keys regularly

2. **HTTPS**
   - Vercel provides HTTPS by default
   - Ensure all external API calls use HTTPS

3. **CORS**
   - Configure CORS properly for API calls
   - Whitelist only necessary domains

## Support

For deployment issues:
- Check Vercel documentation: [vercel.com/docs](https://vercel.com/docs)
- Review build logs in Vercel dashboard
- Create an issue in the repository for support

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [React Deployment Best Practices](https://create-react-app.dev/docs/deployment/)

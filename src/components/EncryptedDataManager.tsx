import React, { useState } from 'react';
import { useAccount, useContractWrite, useContractRead } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Shield, Lock, Database } from 'lucide-react';

// Contract ABI for encrypted data functions
const CONTRACT_ABI = [
  {
    "inputs": [
      {"internalType": "bytes32", "name": "_encryptedAmount", "type": "bytes32"},
      {"internalType": "bytes32", "name": "_encryptedShares", "type": "bytes32"},
      {"internalType": "bytes32", "name": "_encryptedRewards", "type": "bytes32"},
      {"internalType": "bytes32", "name": "_encryptedStrategy", "type": "bytes32"},
      {"internalType": "bytes32", "name": "_encryptedTimestamp", "type": "bytes32"},
      {"internalType": "uint256", "name": "_nonce", "type": "uint256"},
      {"internalType": "address", "name": "_encryptionKey", "type": "address"}
    ],
    "name": "storeEncryptedData",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "_newKey", "type": "address"}
    ],
    "name": "updateEncryptionKey",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "_user", "type": "address"}
    ],
    "name": "getEncryptedUserData",
    "outputs": [
      {
        "components": [
          {"internalType": "bytes32", "name": "encryptedAmount", "type": "bytes32"},
          {"internalType": "bytes32", "name": "encryptedShares", "type": "bytes32"},
          {"internalType": "bytes32", "name": "encryptedRewards", "type": "bytes32"},
          {"internalType": "bytes32", "name": "encryptedStrategy", "type": "bytes32"},
          {"internalType": "bytes32", "name": "encryptedTimestamp", "type": "bytes32"},
          {"internalType": "uint256", "name": "nonce", "type": "uint256"},
          {"internalType": "address", "name": "encryptionKey", "type": "address"}
        ],
        "internalType": "struct CipherYieldsExchange.EncryptedData",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

const CONTRACT_ADDRESS = process.env.VITE_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000';

interface EncryptedDataForm {
  encryptedAmount: string;
  encryptedShares: string;
  encryptedRewards: string;
  encryptedStrategy: string;
  encryptedTimestamp: string;
  nonce: string;
  encryptionKey: string;
}

export const EncryptedDataManager: React.FC = () => {
  const { address, isConnected } = useAccount();
  const [formData, setFormData] = useState<EncryptedDataForm>({
    encryptedAmount: '',
    encryptedShares: '',
    encryptedRewards: '',
    encryptedStrategy: '',
    encryptedTimestamp: '',
    nonce: '',
    encryptionKey: ''
  });

  // Contract write functions
  const { write: storeEncryptedData, isLoading: isStoring, isSuccess: storeSuccess } = useContractWrite({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'storeEncryptedData',
    onSuccess: () => {
      console.log('Encrypted data stored successfully');
    },
    onError: (error) => {
      console.error('Error storing encrypted data:', error);
    }
  });

  const { write: updateEncryptionKey, isLoading: isUpdatingKey } = useContractWrite({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'updateEncryptionKey',
    onSuccess: () => {
      console.log('Encryption key updated successfully');
    }
  });

  // Contract read function
  const { data: encryptedData, refetch: refetchData } = useContractRead({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'getEncryptedUserData',
    args: address ? [address] : undefined,
    enabled: !!address
  });

  const handleInputChange = (field: keyof EncryptedDataForm, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleStoreData = async () => {
    if (!isConnected || !address) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      // Convert string inputs to bytes32 format
      const encryptedAmount = `0x${formData.encryptedAmount.padStart(64, '0')}`;
      const encryptedShares = `0x${formData.encryptedShares.padStart(64, '0')}`;
      const encryptedRewards = `0x${formData.encryptedRewards.padStart(64, '0')}`;
      const encryptedStrategy = `0x${formData.encryptedStrategy.padStart(64, '0')}`;
      const encryptedTimestamp = `0x${formData.encryptedTimestamp.padStart(64, '0')}`;
      const nonce = BigInt(formData.nonce);
      const encryptionKey = formData.encryptionKey as `0x${string}`;

      await storeEncryptedData({
        args: [
          encryptedAmount,
          encryptedShares,
          encryptedRewards,
          encryptedStrategy,
          encryptedTimestamp,
          nonce,
          encryptionKey
        ]
      });
    } catch (error) {
      console.error('Error storing encrypted data:', error);
    }
  };

  const handleUpdateKey = async () => {
    if (!isConnected || !address) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      await updateEncryptionKey({
        args: [formData.encryptionKey as `0x${string}`]
      });
    } catch (error) {
      console.error('Error updating encryption key:', error);
    }
  };

  if (!isConnected) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Encrypted Data Manager
          </CardTitle>
          <CardDescription>
            Connect your wallet to manage encrypted data on-chain
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <Lock className="h-4 w-4" />
            <AlertDescription>
              Please connect your wallet to access encrypted data management features.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Store Encrypted Data
          </CardTitle>
          <CardDescription>
            Securely store your encrypted yield farming data on-chain
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="encryptedAmount">Encrypted Amount</Label>
              <Input
                id="encryptedAmount"
                value={formData.encryptedAmount}
                onChange={(e) => handleInputChange('encryptedAmount', e.target.value)}
                placeholder="0x..."
              />
            </div>
            <div>
              <Label htmlFor="encryptedShares">Encrypted Shares</Label>
              <Input
                id="encryptedShares"
                value={formData.encryptedShares}
                onChange={(e) => handleInputChange('encryptedShares', e.target.value)}
                placeholder="0x..."
              />
            </div>
            <div>
              <Label htmlFor="encryptedRewards">Encrypted Rewards</Label>
              <Input
                id="encryptedRewards"
                value={formData.encryptedRewards}
                onChange={(e) => handleInputChange('encryptedRewards', e.target.value)}
                placeholder="0x..."
              />
            </div>
            <div>
              <Label htmlFor="encryptedStrategy">Encrypted Strategy</Label>
              <Input
                id="encryptedStrategy"
                value={formData.encryptedStrategy}
                onChange={(e) => handleInputChange('encryptedStrategy', e.target.value)}
                placeholder="0x..."
              />
            </div>
            <div>
              <Label htmlFor="encryptedTimestamp">Encrypted Timestamp</Label>
              <Input
                id="encryptedTimestamp"
                value={formData.encryptedTimestamp}
                onChange={(e) => handleInputChange('encryptedTimestamp', e.target.value)}
                placeholder="0x..."
              />
            </div>
            <div>
              <Label htmlFor="nonce">Nonce</Label>
              <Input
                id="nonce"
                type="number"
                value={formData.nonce}
                onChange={(e) => handleInputChange('nonce', e.target.value)}
                placeholder="123456"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="encryptionKey">Encryption Key Address</Label>
            <Input
              id="encryptionKey"
              value={formData.encryptionKey}
              onChange={(e) => handleInputChange('encryptionKey', e.target.value)}
              placeholder="0x..."
            />
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={handleStoreData} 
              disabled={isStoring}
              className="flex-1"
            >
              {isStoring ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Storing...
                </>
              ) : (
                <>
                  <Shield className="mr-2 h-4 w-4" />
                  Store Encrypted Data
                </>
              )}
            </Button>
            <Button 
              onClick={handleUpdateKey} 
              disabled={isUpdatingKey}
              variant="outline"
            >
              {isUpdatingKey ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Lock className="mr-2 h-4 w-4" />
                  Update Key
                </>
              )}
            </Button>
          </div>
          {storeSuccess && (
            <Alert>
              <AlertDescription>
                ✅ Encrypted data stored successfully on-chain!
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {encryptedData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Your Encrypted Data
            </CardTitle>
            <CardDescription>
              Data stored on-chain for address: {address}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <Label>Encrypted Amount:</Label>
                <Textarea 
                  value={encryptedData.encryptedAmount} 
                  readOnly 
                  className="font-mono text-sm"
                />
              </div>
              <div>
                <Label>Encrypted Shares:</Label>
                <Textarea 
                  value={encryptedData.encryptedShares} 
                  readOnly 
                  className="font-mono text-sm"
                />
              </div>
              <div>
                <Label>Encrypted Rewards:</Label>
                <Textarea 
                  value={encryptedData.encryptedRewards} 
                  readOnly 
                  className="font-mono text-sm"
                />
              </div>
              <div>
                <Label>Encryption Key:</Label>
                <Input 
                  value={encryptedData.encryptionKey} 
                  readOnly 
                  className="font-mono text-sm"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

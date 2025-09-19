// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

/**
 * @title CipherYieldsExchange
 * @dev A decentralized yield farming platform with FHE (Fully Homomorphic Encryption) support
 * @author KeikoShimizu88
 */
contract CipherYieldsExchange is ReentrancyGuard, Ownable {
    using SafeERC20 for IERC20;
    using SafeMath for uint256;

    // Structs
    struct YieldStrategy {
        uint256 id;
        address token;
        string name;
        string description;
        uint256 apy; // Annual Percentage Yield (in basis points)
        uint256 minDeposit;
        uint256 maxDeposit;
        uint256 totalDeposited;
        uint256 totalRewards;
        bool active;
        address strategyContract;
        uint256 createdAt;
        uint256 lastUpdated;
    }

    struct UserPosition {
        uint256 strategyId;
        uint256 amount;
        uint256 shares;
        uint256 entryTime;
        uint256 lastClaimed;
        bool active;
    }

    struct EncryptedData {
        bytes32 encryptedAmount;
        bytes32 encryptedShares;
        bytes32 encryptedRewards;
        bytes32 encryptedStrategy;
        bytes32 encryptedTimestamp;
        uint256 nonce;
        address encryptionKey;
    }

    // State Variables
    mapping(uint256 => YieldStrategy) public strategies;
    mapping(address => mapping(uint256 => UserPosition)) public userPositions;
    mapping(address => EncryptedData) public encryptedUserData;
    
    uint256 public nextStrategyId = 1;
    uint256 public totalStrategies;
    uint256 public totalValueLocked;
    uint256 public totalRewardsDistributed;
    
    // Events
    event StrategyCreated(
        uint256 indexed strategyId,
        address indexed token,
        string name,
        uint256 apy
    );
    
    event Deposit(
        address indexed user,
        uint256 indexed strategyId,
        uint256 amount,
        uint256 shares
    );
    
    event Withdraw(
        address indexed user,
        uint256 indexed strategyId,
        uint256 amount,
        uint256 shares
    );
    
    event RewardsClaimed(
        address indexed user,
        uint256 indexed strategyId,
        uint256 rewards
    );
    
    event StrategyUpdated(
        uint256 indexed strategyId,
        uint256 newApy,
        bool active
    );
    
    event EncryptedDataStored(
        address indexed user,
        bytes32 indexed dataHash,
        uint256 timestamp
    );
    
    event PrivacyKeyUpdated(
        address indexed user,
        address newKey
    );

    // Modifiers
    modifier validStrategy(uint256 _strategyId) {
        require(_strategyId > 0 && _strategyId < nextStrategyId, "Invalid strategy ID");
        require(strategies[_strategyId].active, "Strategy not active");
        _;
    }

    modifier validDeposit(uint256 _strategyId, uint256 _amount) {
        YieldStrategy storage strategy = strategies[_strategyId];
        require(_amount >= strategy.minDeposit, "Amount below minimum");
        require(_amount <= strategy.maxDeposit, "Amount exceeds maximum");
        require(_amount <= IERC20(strategy.token).balanceOf(msg.sender), "Insufficient balance");
        _;
    }

    // Constructor
    constructor() {
        // Initialize with default values
    }

    /**
     * @dev Create a new yield farming strategy
     * @param _token Token address for the strategy
     * @param _name Strategy name
     * @param _description Strategy description
     * @param _apy Annual percentage yield in basis points
     * @param _minDeposit Minimum deposit amount
     * @param _maxDeposit Maximum deposit amount
     * @param _strategyContract Address of the strategy implementation
     */
    function createStrategy(
        address _token,
        string memory _name,
        string memory _description,
        uint256 _apy,
        uint256 _minDeposit,
        uint256 _maxDeposit,
        address _strategyContract
    ) external onlyOwner {
        require(_token != address(0), "Invalid token address");
        require(_apy > 0, "APY must be positive");
        require(_minDeposit > 0, "Min deposit must be positive");
        require(_maxDeposit >= _minDeposit, "Max deposit must be >= min deposit");

        uint256 strategyId = nextStrategyId++;
        strategies[strategyId] = YieldStrategy({
            id: strategyId,
            token: _token,
            name: _name,
            description: _description,
            apy: _apy,
            minDeposit: _minDeposit,
            maxDeposit: _maxDeposit,
            totalDeposited: 0,
            totalRewards: 0,
            active: true,
            strategyContract: _strategyContract,
            createdAt: block.timestamp,
            lastUpdated: block.timestamp
        });

        totalStrategies++;
        emit StrategyCreated(strategyId, _token, _name, _apy);
    }

    /**
     * @dev Deposit tokens into a yield farming strategy
     * @param _strategyId Strategy ID to deposit into
     * @param _amount Amount of tokens to deposit
     */
    function deposit(uint256 _strategyId, uint256 _amount) 
        external 
        nonReentrant 
        validStrategy(_strategyId) 
        validDeposit(_strategyId, _amount) 
    {
        YieldStrategy storage strategy = strategies[_strategyId];
        IERC20 token = IERC20(strategy.token);
        
        // Transfer tokens from user to contract
        token.safeTransferFrom(msg.sender, address(this), _amount);
        
        // Calculate shares (1:1 for simplicity, can be enhanced with more complex logic)
        uint256 shares = _amount;
        
        // Update user position
        UserPosition storage position = userPositions[msg.sender][_strategyId];
        if (position.active) {
            position.amount = position.amount.add(_amount);
            position.shares = position.shares.add(shares);
        } else {
            position.strategyId = _strategyId;
            position.amount = _amount;
            position.shares = shares;
            position.entryTime = block.timestamp;
            position.lastClaimed = block.timestamp;
            position.active = true;
        }
        
        // Update strategy totals
        strategy.totalDeposited = strategy.totalDeposited.add(_amount);
        totalValueLocked = totalValueLocked.add(_amount);
        
        emit Deposit(msg.sender, _strategyId, _amount, shares);
    }

    /**
     * @dev Withdraw tokens from a yield farming strategy
     * @param _strategyId Strategy ID to withdraw from
     * @param _amount Amount of tokens to withdraw
     */
    function withdraw(uint256 _strategyId, uint256 _amount) 
        external 
        nonReentrant 
        validStrategy(_strategyId) 
    {
        UserPosition storage position = userPositions[msg.sender][_strategyId];
        require(position.active, "No active position");
        require(_amount <= position.amount, "Insufficient balance");
        
        YieldStrategy storage strategy = strategies[_strategyId];
        IERC20 token = IERC20(strategy.token);
        
        // Calculate proportional shares to withdraw
        uint256 sharesToWithdraw = _amount.mul(position.shares).div(position.amount);
        
        // Update position
        position.amount = position.amount.sub(_amount);
        position.shares = position.shares.sub(sharesToWithdraw);
        
        if (position.amount == 0) {
            position.active = false;
        }
        
        // Update strategy totals
        strategy.totalDeposited = strategy.totalDeposited.sub(_amount);
        totalValueLocked = totalValueLocked.sub(_amount);
        
        // Transfer tokens back to user
        token.safeTransfer(msg.sender, _amount);
        
        emit Withdraw(msg.sender, _strategyId, _amount, sharesToWithdraw);
    }

    /**
     * @dev Claim rewards from a yield farming strategy
     * @param _strategyId Strategy ID to claim rewards from
     */
    function claimRewards(uint256 _strategyId) 
        external 
        nonReentrant 
        validStrategy(_strategyId) 
    {
        UserPosition storage position = userPositions[msg.sender][_strategyId];
        require(position.active, "No active position");
        
        YieldStrategy storage strategy = strategies[_strategyId];
        IERC20 token = IERC20(strategy.token);
        
        // Calculate rewards based on time and APY
        uint256 timeElapsed = block.timestamp.sub(position.lastClaimed);
        uint256 rewards = position.amount.mul(strategy.apy).mul(timeElapsed).div(365 days).div(10000);
        
        require(rewards > 0, "No rewards to claim");
        require(token.balanceOf(address(this)) >= rewards, "Insufficient contract balance");
        
        // Update position
        position.lastClaimed = block.timestamp;
        
        // Update strategy totals
        strategy.totalRewards = strategy.totalRewards.add(rewards);
        totalRewardsDistributed = totalRewardsDistributed.add(rewards);
        
        // Transfer rewards to user
        token.safeTransfer(msg.sender, rewards);
        
        emit RewardsClaimed(msg.sender, _strategyId, rewards);
    }

    /**
     * @dev Update strategy parameters (only owner)
     * @param _strategyId Strategy ID to update
     * @param _newApy New APY in basis points
     * @param _active Whether strategy is active
     */
    function updateStrategy(
        uint256 _strategyId,
        uint256 _newApy,
        bool _active
    ) external onlyOwner validStrategy(_strategyId) {
        YieldStrategy storage strategy = strategies[_strategyId];
        strategy.apy = _newApy;
        strategy.active = _active;
        strategy.lastUpdated = block.timestamp;
        
        emit StrategyUpdated(_strategyId, _newApy, _active);
    }

    /**
     * @dev Get user position information
     * @param _user User address
     * @param _strategyId Strategy ID
     * @return position User position data
     */
    function getUserPosition(address _user, uint256 _strategyId) 
        external 
        view 
        returns (UserPosition memory position) 
    {
        return userPositions[_user][_strategyId];
    }

    /**
     * @dev Get strategy information
     * @param _strategyId Strategy ID
     * @return strategy Strategy data
     */
    function getStrategy(uint256 _strategyId) 
        external 
        view 
        returns (YieldStrategy memory strategy) 
    {
        return strategies[_strategyId];
    }

    /**
     * @dev Get all active strategies
     * @return activeStrategies Array of active strategy IDs
     */
    function getActiveStrategies() external view returns (uint256[] memory activeStrategies) {
        uint256 count = 0;
        for (uint256 i = 1; i < nextStrategyId; i++) {
            if (strategies[i].active) {
                count++;
            }
        }
        
        activeStrategies = new uint256[](count);
        uint256 index = 0;
        for (uint256 i = 1; i < nextStrategyId; i++) {
            if (strategies[i].active) {
                activeStrategies[index] = i;
                index++;
            }
        }
    }

    /**
     * @dev Calculate pending rewards for a user position
     * @param _user User address
     * @param _strategyId Strategy ID
     * @return rewards Pending rewards amount
     */
    function calculatePendingRewards(address _user, uint256 _strategyId) 
        external 
        view 
        returns (uint256 rewards) 
    {
        UserPosition memory position = userPositions[_user][_strategyId];
        if (!position.active) return 0;
        
        YieldStrategy memory strategy = strategies[_strategyId];
        uint256 timeElapsed = block.timestamp.sub(position.lastClaimed);
        rewards = position.amount.mul(strategy.apy).mul(timeElapsed).div(365 days).div(10000);
    }

    /**
     * @dev Emergency withdrawal function (only owner)
     * @param _token Token address to withdraw
     * @param _amount Amount to withdraw
     */
    function emergencyWithdraw(address _token, uint256 _amount) external onlyOwner {
        IERC20 token = IERC20(_token);
        require(token.balanceOf(address(this)) >= _amount, "Insufficient balance");
        token.safeTransfer(owner(), _amount);
    }

    /**
     * @dev Store encrypted user data on-chain
     * @param _encryptedAmount Encrypted amount data
     * @param _encryptedShares Encrypted shares data
     * @param _encryptedRewards Encrypted rewards data
     * @param _encryptedStrategy Encrypted strategy data
     * @param _encryptedTimestamp Encrypted timestamp data
     * @param _nonce Nonce for encryption
     * @param _encryptionKey Address of encryption key
     */
    function storeEncryptedData(
        bytes32 _encryptedAmount,
        bytes32 _encryptedShares,
        bytes32 _encryptedRewards,
        bytes32 _encryptedStrategy,
        bytes32 _encryptedTimestamp,
        uint256 _nonce,
        address _encryptionKey
    ) external {
        encryptedUserData[msg.sender] = EncryptedData({
            encryptedAmount: _encryptedAmount,
            encryptedShares: _encryptedShares,
            encryptedRewards: _encryptedRewards,
            encryptedStrategy: _encryptedStrategy,
            encryptedTimestamp: _encryptedTimestamp,
            nonce: _nonce,
            encryptionKey: _encryptionKey
        });
        
        bytes32 dataHash = keccak256(abi.encodePacked(
            _encryptedAmount,
            _encryptedShares,
            _encryptedRewards,
            _encryptedStrategy,
            _encryptedTimestamp,
            _nonce,
            _encryptionKey
        ));
        
        emit EncryptedDataStored(msg.sender, dataHash, block.timestamp);
    }
    
    /**
     * @dev Update user's encryption key
     * @param _newKey New encryption key address
     */
    function updateEncryptionKey(address _newKey) external {
        require(_newKey != address(0), "Invalid encryption key");
        encryptedUserData[msg.sender].encryptionKey = _newKey;
        emit PrivacyKeyUpdated(msg.sender, _newKey);
    }
    
    /**
     * @dev Get encrypted user data
     * @param _user User address
     * @return EncryptedData struct
     */
    function getEncryptedUserData(address _user) 
        external 
        view 
        returns (EncryptedData memory) 
    {
        return encryptedUserData[_user];
    }
    
    /**
     * @dev Verify encrypted data integrity
     * @param _user User address
     * @param _dataHash Expected data hash
     * @return bool True if data is valid
     */
    function verifyEncryptedData(address _user, bytes32 _dataHash) 
        external 
        view 
        returns (bool) 
    {
        EncryptedData memory data = encryptedUserData[_user];
        bytes32 calculatedHash = keccak256(abi.encodePacked(
            data.encryptedAmount,
            data.encryptedShares,
            data.encryptedRewards,
            data.encryptedStrategy,
            data.encryptedTimestamp,
            data.nonce,
            data.encryptionKey
        ));
        return calculatedHash == _dataHash;
    }
    
    /**
     * @dev Pause/unpause contract (only owner)
     * @param _paused Whether to pause the contract
     */
    function setPaused(bool _paused) external onlyOwner {
        // Implementation for pausing mechanism
        // This would require additional state variables and modifiers
    }
}

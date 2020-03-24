pragma solidity ^0.5.0;

import "../../common/token/ERC721.sol";
import "../../common/token/ERC20.sol";
import "../../common/math/SafeMath.sol";
import "../../common/token/IERC721Receiver.sol";
import "../../common/token/IERC20Receiver.sol";
import "./MainnetValidatorManagerContract.sol";

contract IDragonContract {
    function retrieveToken(address receiver, uint256 _tokenId, bytes memory _data) public {}
}

contract MainnetGateway is IERC20Receiver, IERC721Receiver, MainnetValidatorManagerContract {

  using SafeMath for uint256;

  struct Balance {
    uint256 eth;
    mapping(address => uint256) erc20;

    // Fijarse si suficiente esta implementacion o si hace falta un booleano como estaba, que diga si tiene o no el token
    // Ahora se fija si una cuenta tiene un token, si en el mapa existen datos para ese token, para esa cuenta
    mapping(address => mapping(uint256 => bytes)) erc721;
  }

  address private _erc721ContractAddress;

  mapping (address => Balance) balances;
  mapping (uint => bool) lockedDragons;

  event ETHReceived(address from, uint256 amount);
  event ERC20Received(address from, uint256 amount, address contractAddress);
  event ERC721Received(address from, uint256 uid, address contractAddress, bytes data);

  event SendDragonToSidechainAttempt(address from, uint256 uid, address toSidechainAddress, bytes data);
  event DragonSuccessfullyRetrievedInMainchain(address mainchainAddress, uint256 uid, bytes data);
  event DragonWithdrawal(address sidechainAddress, uint256 uid);

  enum TokenKind {
    ETH,
    ERC20,
    ERC721
  }

  /**
   * Event to log the withdrawal of a token from the Gateway.
   * @param owner Address of the entity that made the withdrawal.
   * @param kind The type of token withdrawn (ERC20/ERC721/ETH).
   * @param contractAddress Address of token contract the token belong to.
   * @param value For ERC721 this is the uid of the token, for ETH/ERC20 this is the amount.
   */
  event TokenWithdrawn(address indexed owner, TokenKind kind, address contractAddress, uint256 value);

  constructor (address[] memory _validators, uint8 _threshold_num, uint8 _threshold_denom)
    public MainnetValidatorManagerContract(_validators, _threshold_num, _threshold_denom) {
  }

  function setERC721ContractAddress(address contractAddress) external onlyOwner {
    require(contractAddress != address(0), "Invalid address parameter");
    require(_erc721ContractAddress == address(0), "contract con only be set once");
    _erc721ContractAddress = contractAddress;
  }

  /**
  * @dev Throws if called by any account other than the dragon contract.
  */
  modifier onlyDragonContract() {
      require(msg.sender == _erc721ContractAddress, "Only the erc721 contract can perform this action");
      _;
  }

  /******************* Nuestras funciones sin validadores *************************** */

  /**
  * @dev Se llama cuando se quiere transferir un dragon a la otra blockchain
  */
  function depositDragon(address from, address toSidechainAddress, uint256 uid, bytes memory data) public onlyDragonContract {
      // locked dragon to know a transference was made for this id
      lockedDragons[uid] = true;
      balances[from].erc721[from][uid] = data;
      emit SendDragonToSidechainAttempt(from, uid, toSidechainAddress, data);
  }

   //@TODO hacer onlyOracle
  /**
  * @dev Se llama cuando se recibe un dragon desde la otra blockchain
  */
  function receiveDragon(address mainchainAddress, uint256 uid, bytes memory data) public {
    require(mainchainAddress != address(0), "mainchainAddress should be a valid address");

    if (lockedDragons[uid]) { // Token isnt new
      require(balances[mainchainAddress].erc721[mainchainAddress][uid].length > 0, "Does not own token");
    }
    
    IDragonContract(_erc721ContractAddress).retrieveToken(mainchainAddress, uid, data);

    delete lockedDragons[uid];
    delete balances[mainchainAddress].erc721[mainchainAddress][uid];
    emit DragonSuccessfullyRetrievedInMainchain(mainchainAddress, uid, data);
  }

  //@TODO hacer onlyOracle
  /**
  * @dev Se llama cuando el usuario hace un withdraw del dragon. Primero se debe bloquear el dragon en la otra blockchain
  */
  function withdrawDragon(address mainchainAddress, uint256 uid) public {
    require(balances[mainchainAddress].erc721[mainchainAddress][uid].length > 0, "Does not own token");
    bytes storage dragonData = balances[mainchainAddress].erc721[mainchainAddress][uid];

    IDragonContract(_erc721ContractAddress).retrieveToken(mainchainAddress, uid, dragonData);

    delete lockedDragons[uid];
    delete balances[mainchainAddress].erc721[mainchainAddress][uid];
    emit DragonWithdrawal(mainchainAddress, uid);
  }

  /*********************************************************************************** */

  // Deposit functions
  function depositETH() private {
    balances[msg.sender].eth = balances[msg.sender].eth.add(msg.value);
  }

  function _depositERC721(address from, uint256 uid, bytes memory data) private {
    balances[from].erc721[msg.sender][uid] = data;
  }

  function depositERC20(address from, uint256 amount) private {
    balances[from].erc20[msg.sender] = balances[from].erc20[msg.sender].add(amount);
  }

  // Withdrawal functions
  function withdrawERC20(uint256 amount, bytes calldata sig, address contractAddress)
    external
    isVerifiedByValidator(amount, contractAddress, sig)
  {
    balances[msg.sender].erc20[contractAddress] = balances[msg.sender].erc20[contractAddress].sub(amount);
    ERC20(contractAddress).transfer(msg.sender, amount);
    emit TokenWithdrawn(msg.sender, TokenKind.ERC20, contractAddress, amount);
  }

  function withdrawERC721(uint256 uid, bytes calldata sig, address contractAddress)
    external
    isVerifiedByValidator(uid, contractAddress, sig)
  {
    require(balances[msg.sender].erc721[contractAddress][uid].length > 0, "Does not own token");
    bytes storage dragonData = balances[msg.sender].erc721[contractAddress][uid];
    ERC721(contractAddress).safeTransferFrom(address(this),  msg.sender, uid, dragonData);
    delete balances[msg.sender].erc721[contractAddress][uid];
    emit TokenWithdrawn(msg.sender, TokenKind.ERC721, contractAddress, uid);
  }

  function withdrawETH(uint256 amount, bytes calldata sig)
    external
    isVerifiedByValidator(amount, address(this), sig)
  {
    balances[msg.sender].eth = balances[msg.sender].eth.sub(amount);
    msg.sender.transfer(amount); // ensure it's not reentrant
    emit TokenWithdrawn(msg.sender, TokenKind.ETH, address(0), amount);
  }

  // Approve and Deposit function for 2-step deposits
  // Requires first to have called `approve` on the specified ERC20 contract
  function depositERC20(uint256 amount, address contractAddress) external {
    ERC20(contractAddress).transferFrom(msg.sender, address(this), amount);
    balances[msg.sender].erc20[contractAddress] = balances[msg.sender].erc20[contractAddress].add(amount);
    emit ERC20Received(msg.sender, amount, contractAddress);
  }

  // Receiver functions for 1-step deposits to the gateway

  function onERC20Received(address _from, uint256 amount)
    public
    returns (bytes4)
  {
    require(allowedTokens[msg.sender], "Not a valid token");
    depositERC20(_from, amount);
    emit ERC20Received(_from, amount, msg.sender);
    return ERC20_RECEIVED;
  }

  function onERC721Received(address operator, address _from, uint256 _uid, bytes memory data)
    public
    returns (bytes4)
  {
    require(allowedTokens[msg.sender], "Not a valid token");
    _depositERC721(_from, _uid, data);
    emit ERC721Received(_from, _uid, msg.sender, data);
    return ERC721_RECEIVED;
  }

  function () external payable {
    depositETH();
    emit ETHReceived(msg.sender, msg.value);
  }

  // Returns all the ETH you own
  function getETH(address owner) external view returns (uint256) {
    return balances[owner].eth;
  }

  // Returns all the ETH you own
  function getERC20(address owner, address contractAddress) external view returns (uint256) {
    return balances[owner].erc20[contractAddress];
  }

  // Returns ERC721 token by uid
  function getNFT(address owner, uint256 uid, address contractAddress) external view returns (bool) {
    return balances[owner].erc721[contractAddress][uid].length > 0;
  }
}
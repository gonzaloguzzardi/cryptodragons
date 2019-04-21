pragma solidity ^0.5.0;

import "../token/ERC721.sol";
import "../token/ERC20.sol";
import "../math/SafeMath.sol";
import "../token/IERC721Receiver.sol";
import "../token/IERC20Receiver.sol";
import "./ValidatorManagerContract.sol";


contract Gateway is IERC20Receiver, IERC721Receiver, ValidatorManagerContract {

  using SafeMath for uint256;

  struct Balance {
    uint256 eth;
    mapping(address => uint256) erc20;

    // Fijarse si suficiente esta implementacion o si hace falta un booleano como estaba, que diga si tiene o no el token
    // Ahora se fija si una cuenta tiene un token, si en el mapa existen datos para ese token, para esa cuenta
    mapping(address => mapping(uint256 => bytes)) erc721;
  }

  mapping (address => Balance) balances;

  event ETHReceived(address from, uint256 amount);
  event ERC20Received(address from, uint256 amount, address contractAddress);
  event ERC721Received(address from, uint256 uid, address contractAddress, bytes data);

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
    public ValidatorManagerContract(_validators, _threshold_num, _threshold_denom) {
  }

  // Deposit functions
  function depositETH() private {
    balances[msg.sender].eth = balances[msg.sender].eth.add(msg.value);
  }

  function depositERC721(address from, uint256 uid, bytes memory data) private {
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

  function onERC721Received(address _from, uint256 _uid, bytes memory data)
    public
    returns (bytes4)
  {
    require(allowedTokens[msg.sender], "Not a valid token");
    depositERC721(_from, _uid, data);
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
pragma solidity ^0.5.0;

contract IERC721 {
	function safeTransferFrom(
		address from,
		address to,
		uint256 tokenId
	) external;
}

contract MainnetMarketplace {
	// dragon id => sell order
	mapping(uint256 => SellOrder) public sellOrderById;

	// Contain sell orders for dragons on sale
	SellOrder[] public sellOrders;

	// History containing all sales
	Sale[] public salesHistory;

	address public dragonTokenAddress;

	struct SellOrder {
		uint256 id;
		string title;
		string description;
		uint256 date;
		address payable owner;
		uint256 price;
	}
	struct Sale {
		uint256 id;
		address owner;
		address buyer;
		uint256 price;
		string title;
	}

	/// @notice To setup the address of the ERC-721 token to use for this contract
	/// @param _dragonTokenAddress The token address
	constructor(address _dragonTokenAddress) public {
		require(_dragonTokenAddress != address(0), 'Dragon address address cannot be empty');
		dragonTokenAddress = _dragonTokenAddress;
	}

	/**
	 * @dev Throws if function isn't called from dragon contract
	 */
	modifier onlyFromDragonToken() {
		require(dragonTokenAddress == msg.sender, 'Only dragon token can call this function');
		_;
	}

	/// @notice To publish a sellOrder as a seller
	/// @param _dragonId The if of the dragon being published
	/// @param _title The title of the sellOrder
	/// @param _description The description of the sellOrder
	/// @param _price The price of the sellOrder in ETH
	function createSellOrder(
		uint256 _dragonId,
		string calldata _title,
		string calldata _description,
		uint256 _price
	) external onlyFromDragonToken() {
		// Parameter validity are checked in dragon token contract
		SellOrder memory sellOrder = SellOrder(_dragonId, _title, _description, now, msg.sender, _price);
		sellOrders.push(sellOrder);
		sellOrderById[_dragonId] = sellOrder;
	}

	/// @notice To buy a new dragon, note that the seller must authorize this contract to manage the token
	/// @param _dragonId The id of the dragon to buy - dragon id references a sell order
	function buyDragon(uint256 _dragonId) external payable {
		require(dragonTokenAddress != address(0), 'Dragon address address cannot be empty');

		SellOrder memory sellOrder = sellOrderById[_dragonId];
		require(sellOrder.owner != address(0), 'A sell order for the dragon must exist to be purchased');

		Sale memory sale = Sale(_dragonId, sellOrder.owner, msg.sender, sellOrder.price, sellOrder.title);

		require(msg.value >= sellOrder.price, 'The payment must be larger or equal than the sell order price');

		// We can charge a fee here

		// Delete the sellOrder from the array of sellOrders
		for (uint256 i = 0; i < sellOrders.length; i++) {
			if (sellOrders[i].id == _dragonId) {
				SellOrder memory lastElement = sellOrders[sellOrders.length - 1];
				sellOrders[i] = lastElement;
				sellOrders.length--;
			}
		}
		// Return the excess ETH sent by the buyer
		if (msg.value > sellOrder.price) {
			msg.sender.transfer(msg.value - sellOrder.price);
		}

		salesHistory.push(sale);

		//Transfer the token to the new owner
		IERC721(dragonTokenAddress).safeTransferFrom(address(this), msg.sender, _dragonId);

		sellOrder.owner.transfer(sellOrder.price);
	}
}

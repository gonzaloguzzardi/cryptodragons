pragma solidity ^0.5.0;

contract MainnetMarketplace {
	/** Seller address => products
    The products waiting to be fulfilled by the seller, used by sellers to check 
    which orders have to be filled
    */
	mapping(address => Order[]) public pendingSellerOrders;

	/** Buyer address => products
    The products that the buyer purchased waiting to be sent
    */
	mapping(address => Order[]) public pendingBuyerOrders;
	mapping(address => Order[]) public completedOrders;

	// Product id => product
	mapping(uint256 => Product) public productById;

	// Product id => order
	mapping(uint256 => Order) public orderById;

	Product[] public products;
	uint256 public lastId;
	address public dragonTokenAddress;

	struct Product {
		uint256 id;
		string title;
		string description;
		uint256 date;
		address payable owner;
		uint256 price;
	}
	struct Order {
		uint256 id;
		address buyer;
		string nameSurname;
		string lineOneDirection;
		string lineTwoDirection;
		bytes32 city;
		bytes32 stateRegion;
		uint256 postalCode;
		bytes32 country;
		uint256 phone;
		string state; // Either 'pending', 'completed'
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
		require(ownerOf(_dragonTokenAddress) == msg.sender, 'Only dragon token can call this function');
		_;
	}

	function createOrder(
		uint256 _dragonId,
		string memory _title,
		string memory _description,
		uint256 _price
	) public onlyFromDragonToken() {
		// Parameter validity are checked in dragon token contract
		Product memory p = Product(lastId, _title, _description, now, msg.sender, _price);
		products.push(p);
		productById[lastId] = p;
	}

	// TODO en lugar de mint tiene que pasarle el id, chequear que quien trasnfiere sea dueño del dragon, y hacer la transferencia de dominio al marketplace referenciando al dueño

	/// @notice To publish a product as a seller
	/// @param _title The title of the product
	/// @param _description The description of the product
	/// @param _price The price of the product in ETH
	/// @param _image The image URL of the product
	function publishProduct(
		string memory _title,
		string memory _description,
		uint256 _price,
		string memory _image
	) public {
		require(bytes(_title).length > 0, 'The title cannot be empty');
		require(bytes(_description).length > 0, 'The description cannot be empty');
		require(_price > 0, 'The price cannot be empty');
		require(bytes(_image).length > 0, 'The image cannot be empty');
		Product memory p = Product(lastId, _title, _description, now, msg.sender, _price, _image);
		products.push(p);
		productById[lastId] = p;

		// TODO marketplace should not mint, it should get get tokens from ERC721 contract, so maybe we should publish from there
		EcommerceToken(token).mint(address(this), lastId); // Create a newtoken for this product which will be owned by this contract until soldl
		lastId++;
	}

	/// @notice To buy a new product, note that the seller must authorize this contract to manage the token
	/// @param _id The id of the product to buy
	/// @param _nameSurname The name and surname of the buyer
	/// @param _lineOneDirection The first line for the user address
	/// @param _lineTwoDirection The second, optional user address line
	/// @param _city Buyer's city
	/// @param _stateRegion The state or region where the buyer lives
	/// @param _postalCode The postal code of his location
	/// @param _country Buyer's country
	/// @param _phone The optional phone number for the shipping company
	function buyProduct(
		uint256 _id,
		string memory _nameSurname,
		string memory _lineOneDirection,
		string memory _lineTwoDirection,
		bytes32 _city,
		bytes32 _stateRegion,
		uint256 _postalCode,
		bytes32 _country,
		uint256 _phone
	) public payable {
		// The line 2 address and phone are optional, the rest are mandatory
		require(bytes(_nameSurname).length > 0, 'The name and surname must be set');
		require(bytes(_lineOneDirection).length > 0, 'The line one direction must be set');
		require(_city.length > 0, 'The city must be set');
		require(_stateRegion.length > 0, 'The state or region must be set');
		require(_postalCode > 0, 'The postal code must be set');
		require(_country > 0, 'The country must be set');
		Product memory p = productById[_id];
		require(bytes(p.title).length > 0, 'The product must exist to be purchased');
		Order memory newOrder = Order(
			_id,
			msg.sender,
			_nameSurname,
			_lineOneDirection,
			_lineTwoDirection,
			_city,
			_stateRegion,
			_postalCode,
			_country,
			_phone,
			'pending'
		);
		require(msg.value >= p.price, 'The payment must be larger or equal than the products price');
		// Delete the product from the array of products
		for (uint256 i = 0; i < products.length; i++) {
			if (products[i].id == _id) {
				Product memory lastElement = products[products.length - 1];
				products[i] = lastElement;
				products.length--;
			}
		}
		// Return the excess ETH sent by the buyer
		if (msg.value > p.price) {
			msg.sender.transfer(msg.value - p.price);
		}
		pendingSellerOrders[p.owner].push(newOrder);
		pendingBuyerOrders[msg.sender].push(newOrder);
		orderById[_id] = newOrder;
		EcommerceToken(token).transferFrom(address(this), msg.sender, _id); //Transfer the product token to the new owner
		p.owner.transfer(p.price);
	}
}

using System.Collections;
using System.Numerics;
using NUnit.Framework;
using UnityEngine;
using UnityEngine.TestTools;

public class DragonTokenTests: SmartContractTest {

    [SetUp]
	public void SetUp()
	{
		contractName = "TransferableDragon";
		testAbi = Resources.Load<TextAsset>("DragonFactory.abi").text;
	}

	[UnityTest]
	public IEnumerator CreateDragonTest()
	{
		return ContractTest(async () =>
		{
			const int dragonsToAdd = 1;
			int expectedOwned = await contract.StaticCallSimpleTypeOutputAsync<int>("getDragonsCountByOwner", callerAddress.ToString()) + dragonsToAdd;

			await contract.CallAsync("createDragon", "genesis", 0, 1);

			int dragonCount = await contract.StaticCallSimpleTypeOutputAsync<int>("getDragonsCountByOwner", callerAddress.ToString());

			Assert.AreEqual(expectedOwned, dragonCount, "Test ended with the same amount of dragons");
		});
	}

	[UnityTest]
	public IEnumerator SetDragonNameTest()
	{
		return ContractTest(async () =>
		{
			DragonsOwnedIdsOutput ownedDragons = await contract.StaticCallDtoTypeOutputAsync<DragonsOwnedIdsOutput>("getDragonsIdsByOwner", callerAddress.ToString());

			Assert.IsTrue(ownedDragons.Ids.Count > 0, "Zero owned dragons");
			BigInteger dragonIdToChange = ownedDragons.Ids[0];

			await contract.CallAsync("createDragon", "genesis", 0, 1);
			await contract.CallAsync("setName", dragonIdToChange, "testDragon");
			// TODO check name, dont have the function to retrieve dragons attributes yet
		});
	}

	[UnityTest]
	public IEnumerator GetDragonsIdsTest()
	{
		return ContractTest(async () =>
		{
			await contract.CallAsync("createDragon", "genesis", 0, 1);
			DragonsOwnedIdsOutput ownedDragons = await contract.StaticCallDtoTypeOutputAsync<DragonsOwnedIdsOutput>("getDragonsIdsByOwner", base.callerAddress.ToString());

			Assert.IsTrue(ownedDragons.Ids.Count > 0, "Zero owned dragons");

			string callerAddr = base.callerAddress.ToString().ToLower();
			for (int i = 0; i < ownedDragons.Ids.Count; i++)
			{
				string dragonOwner = await contract.StaticCallSimpleTypeOutputAsync<string>("getDragonOwner", ownedDragons.Ids[i]);
				Assert.AreEqual(callerAddr, dragonOwner, "Retrieve address different from caller");
			}
		});
	}
}

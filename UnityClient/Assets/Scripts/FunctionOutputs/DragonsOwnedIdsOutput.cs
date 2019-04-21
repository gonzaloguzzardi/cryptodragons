using Loom.Nethereum.ABI.FunctionEncoding.Attributes;
using System.Collections.Generic;
using System.Numerics;

[FunctionOutput]
public class DragonsOwnedIdsOutput
{
    [Parameter("uint256[]", "", 1)]
    public List<BigInteger> Ids { get; set; }
}
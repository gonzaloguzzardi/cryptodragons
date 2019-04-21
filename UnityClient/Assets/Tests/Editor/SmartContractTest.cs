using Loom.Client;
using System;
using System.Collections;
using System.Runtime.ExceptionServices;
using System.Threading.Tasks;
using UnityEngine;

public class SmartContractTest {

    protected string contractName;
    protected string testAbi;
    protected EvmContract contract;
    protected Address callerAddress;

    protected IEnumerator ContractTest(Func<Task> action)
    {
        return
            TaskAsIEnumerator(Task.Run(() =>
            {
                try
                {
                    EnsureContract().Wait();
                    action().Wait();
                }
                catch (AggregateException e)
                {
                    ExceptionDispatchInfo.Capture(e.InnerException).Throw();
                }
            }));
    }

    private async Task EnsureContract()
    {
        if (contract != null)
            return;

        byte[] privateKey = CryptoUtils.GeneratePrivateKey();
        byte[] publicKey = CryptoUtils.PublicKeyFromPrivateKey(privateKey);
        contract = await GetContract(privateKey, publicKey, testAbi);
    }

    private async Task<EvmContract> GetContract(byte[] privateKey, byte[] publicKey, string abi)
    {
        ILogger logger = NullLogger.Instance;
        IRpcClient writer = RpcClientFactory.Configure()
            .WithLogger(logger)
            .WithWebSocket("ws://127.0.0.1:46657/websocket")
            .Create();

        IRpcClient reader = RpcClientFactory.Configure()
            .WithLogger(logger)
            .WithWebSocket("ws://127.0.0.1:9999/queryws")
            .Create();

        DAppChainClient client = new DAppChainClient(writer, reader)
        { Logger = logger };

        // required middleware
        client.TxMiddleware = new TxMiddleware(new ITxMiddlewareHandler[]
        {
                new NonceTxMiddleware(publicKey, client),
                new SignedTxMiddleware(privateKey)
        });

        Address contractAddr = await client.ResolveContractAddressAsync(contractName);
        callerAddress = Address.FromPublicKey(publicKey);

        return new EvmContract(client, contractAddr, callerAddress, abi);
    }

    protected static IEnumerator TaskAsIEnumerator(Task task)
    {
        while (!task.IsCompleted)
            yield return null;

        if (task.IsFaulted)
            throw task.Exception;
    }
}

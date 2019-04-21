using UnityEngine;
using UnityEngine.UI;
using Loom.Client;
using System;
using Loom.Newtonsoft.Json;

public class LoomDemo : MonoBehaviour
{
    public Text statusTextRef;
    public GameObject cube;
    public Vector3 spinDirection;

    [SerializeField] private TextAsset _abi;
    private Contract contract;
    private EvmContract evmContract;
    private Address callerAddr;

    public class SampleEvent
    {
        public string Method;
        public string Key;
        public string Value;
    }

    // Use this for initialization
    void Start()
    {
        // By default the editor won't respond to network IO or anything if it doesn't have input focus,
        // which is super annoying when input focus is given to the web browser for the Auth0 sign-in.
        Application.runInBackground = true;
    }

    // Update is called once per frame
    void Update()
    {
        if (this.cube)
        {
            this.cube.transform.Rotate(this.spinDirection * Time.deltaTime);
        }
    }

    public async void SignIn()
    {
        var privateKey = CryptoUtils.GeneratePrivateKey();
        var publicKey = CryptoUtils.PublicKeyFromPrivateKey(privateKey);
        callerAddr = Address.FromPublicKey(publicKey);
        this.statusTextRef.text = "Signed in as " + callerAddr.QualifiedAddress;

        var writer = RpcClientFactory.Configure()
            .WithLogger(Debug.unityLogger)
            //.WithHTTP("http://127.0.0.1:46658/rpc")
            .WithWebSocket("ws://127.0.0.1:46657/websocket")
            .Create();

        var reader = RpcClientFactory.Configure()
            .WithLogger(Debug.unityLogger)
            //.WithHTTP("http://127.0.0.1:46658/query")
            .WithWebSocket("ws://127.0.0.1:9999/queryws")
            .Create();

        var client = new DAppChainClient(writer, reader)
        {
            Logger = Debug.unityLogger
        };

        client.TxMiddleware = new TxMiddleware(new ITxMiddlewareHandler[]{
            new NonceTxMiddleware(publicKey, client),
            new SignedTxMiddleware(privateKey)
        });

        var contractAddr = await client.ResolveContractAddressAsync("DragonFactory");
        this.contract = new Contract(client, contractAddr, callerAddr);

        evmContract = new EvmContract(client, contractAddr, callerAddr, _abi.text);

        // Subscribe to DAppChainClient.OnChainEvent to receive all events
        /*
        client.OnChainEvent += (sender, e) =>
        {
            var jsonStr = System.Text.Encoding.UTF8.GetString(e.Data);
            var data = JsonConvert.DeserializeObject<SampleEvent>(jsonStr);
            Debug.Log(string.Format("Chain Event: {0}, {1}, {2} from block {3}", data.Method, data.Key, data.Value, e.BlockHeight));
        };
        */

        // Subscribe to DAppChainClient.ChainEventReceived to receive events from a specific smart contract
        this.contract.EventReceived += (sender, e) =>
        {
            var jsonStr = System.Text.Encoding.UTF8.GetString(e.Data);
            var data = JsonConvert.DeserializeObject<SampleEvent>(jsonStr);
            Debug.Log(string.Format("Contract Event: {0}, {1}, {2} from block {3}", data.Method, data.Key, data.Value, e.BlockHeight));
        };
    }

    public async void CallContract()
    {
        if (this.contract == null)
        {
            throw new Exception("Not signed in!");
        }

        this.statusTextRef.text = "Calling smart contract...";

        /*await evmContract.CallAsync("createDragon", new CreateDragon
        {
            MotherId = 0,
            FatherId = 1
        });*/

        await evmContract.CallAsync("createDragon", "genesis", 0, 1);

        this.statusTextRef.text = "Smart contract method finished executing.";
    }

    public async void CallContractWithResult()
    {
        if (this.contract == null)
        {
            throw new Exception("Not signed in!");
        }

        this.statusTextRef.text = "Calling smart contract...";

        /*var result = await this.contract.CallAsync<Loom.Client.Samples.MapEntry>("getDragonName", new Loom.Client.Samples.MapEntry
        {
            Key = "321",
            Value = "456"
        });*/
        var result = await evmContract.StaticCallSimpleTypeOutputAsync<byte[]>("getDragonName", 0);
        
        if (result != null)
        {
            this.statusTextRef.text = "Smart contract returned: " + System.Text.Encoding.UTF8.GetString(result); ;
        }
        else
        {
            this.statusTextRef.text = "Smart contract didn't return anything!";
        }
    }

    public async void StaticCallContract()
    {
        if (this.contract == null)
        {
            throw new Exception("Not signed in!");
        }

        this.statusTextRef.text = "Calling smart contract...";

        var result = await this.contract.StaticCallAsync<Loom.Client.Samples.MapEntry>("GetMsg", new Loom.Client.Samples.MapEntry
        {
            Key = "123"
        });

        this.statusTextRef.text = "Smart contract returned: " + result.ToString();
    }

    private class SampleAsset
    {
        public string to;
        public string hash;
    }

    public async void TransferAsset()
    {
        this.statusTextRef.text = "Transfering asset...";

        var result = await AssetTransfer.TransferAsset(new SampleAsset
        {
            to = "0x1234",
            hash = "0x4321"
        });

        Debug.Log("Asset transfer result: " + result.ToString());

        this.statusTextRef.text = "Asset transfer complete.";
    }
}

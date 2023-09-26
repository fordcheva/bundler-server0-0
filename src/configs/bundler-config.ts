export const bundlerConfig = {
    BUNDLER_CONFIG: {
        maxBundleGas: 7000000,
    },
    SUPPORTED_ENTRYPOINTS: [
        '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789',
        '0xF07A1Fe14feedd2c7693cdEAFD2ea72BD6Eccf68',
        '0xD15b1210187f313AB692013a2544cb8B394E2291',
        '0xBaefA976ea079135d8a85f447F4320e196719cd1',
    ],
    EVM_CHAIN_ID_NOT_SUPPORT_1559: [56, 97, 534351, 91715, 59140, 420, 1337],
    BUNDLER_PRIVATE_KEYS: {
        dev: {
            default: {
                '0x5f837bD883CdefcB0497d0ba05fE41733439bd0F': '546dcff51f75dda8d6ac237daa381b85ae369ef65cefa4459f2ab6c1ff66f705',
            },
        },
    },
    RPC_CONFIG: {
        '11155111': {
            chainId: 11155111,
            rpcUrl: 'https://rpc.particle.network/evm-chain/public?chainId=11155111',
        },
    },
    MINIMUM_GAS_FEE: { '97': { gasPrice: '0x012a05f200' } },
};

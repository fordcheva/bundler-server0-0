import { IS_DEVELOPMENT } from '../common/common-types';
import { cloneDeep } from 'lodash';
import * as Fs from 'fs';

export const RPC_CONFIG: any = {};
export let PARTICLE_PAYMASTER_URL = 'https://paymaster.particle.network';
export let PARTICLE_PUBLIC_RPC_URL: string;
export let MINIMUM_GAS_FEE: any = {};
export let BUNDLER_CONFIG: any = {};
export let CHAIN_BALANCE_RANGE: any = {};
export let CHAIN_SIGNER_MIN_BALANCE: any = {};
export let METHOD_SEND_RAW_TRANSACTION: string;
export let DEFAULT_ENTRY_POINT_ADDRESS: string;

export async function initializeBundlerConfig() {
    let bc: any;
    const exists = Fs.existsSync(`${__dirname}/bundler-config-particle.js`) || Fs.existsSync(`${__dirname}/bundler-config-particle.ts`);
    if (exists) {
        bc = await import('./bundler-config-particle' as any);
    } else {
        bc = await import('./bundler-config');
    }

    MINIMUM_GAS_FEE = bc.MINIMUM_GAS_FEE;
    BUNDLER_CONFIG = bc.BUNDLER_CONFIG;
    CHAIN_BALANCE_RANGE = bc.CHAIN_BALANCE_RANGE;
    CHAIN_SIGNER_MIN_BALANCE = bc.CHAIN_SIGNER_MIN_BALANCE;
    PARTICLE_PAYMASTER_URL = bc.PARTICLE_PAYMASTER_URL;
    PARTICLE_PUBLIC_RPC_URL = bc.PARTICLE_PUBLIC_RPC_URL;
    METHOD_SEND_RAW_TRANSACTION = bc.METHOD_SEND_RAW_TRANSACTION ?? 'eth_sendRawTransaction';
    DEFAULT_ENTRY_POINT_ADDRESS = bc.DEFAULT_ENTRY_POINT_ADDRESS;

    for (const item of bc.RPC_CONFIG) {
        RPC_CONFIG[String(item.chainId)] = item;
    }

    if (!IS_DEVELOPMENT) {
        delete RPC_CONFIG['1337'];
    }
}

export function getBundlerConfig(chainId: number) {
    const config = cloneDeep(BUNDLER_CONFIG.default);
    if (BUNDLER_CONFIG[chainId]) {
        Object.assign(config, BUNDLER_CONFIG[chainId]);
    }

    return config;
}

export function getSendTransactionMethod(chainId: number) {
    const config = RPC_CONFIG[String(chainId)];

    return config['methodSendRawTransaction'] ?? METHOD_SEND_RAW_TRANSACTION;
}

export enum AA_METHODS {
    SEND_USER_OPERATION = 'eth_sendUserOperation',
    GET_USER_OPERATION_BY_HASH = 'eth_getUserOperationByHash',
    ESTIMATE_USER_OPERATION_GAS = 'eth_estimateUserOperationGas',
    GET_USER_OPERATION_RECEIPT = 'eth_getUserOperationReceipt',
    SUPPORTED_ENTRYPOINTS = 'eth_supportedEntryPoints',
    PEINDING_COUND = 'bundler_pendingUserOpCount',
    DEBUG_BUNDLER_CLEAR_STATE = 'debug_bundler_clearState',
    DEBUG_BUNDLER_DUMP_MEMPOOL = 'debug_bundler_dumpMempool',
    DEBUG_BUNDLER_SEND_BUNDLE_NOW = 'debug_bundler_sendBundleNow',
    DEBUG_BUNDLER_SET_BUNDLING_MODE = 'debug_bundler_setBundlingMode',
}

export enum EVM_CHAIN_ID {
    ETHEREUM_MAINNET = 1,
    ETHEREUM_GOERLI_TESTNET = 5,
    ETHEREUM_SEPOLIA_TESTNET = 11155111,
    ETHEREUM_HOLESKY_TESTNET = 17000,
    POLYGON_MAINNET = 137,
    POLYGON_TESTNET = 80001,
    POLYGON_AMOY_TESTNET = 80002,
    BNB_MAINNET = 56,
    BNB_TESTNET = 97,
    OPBNB_MAINNET = 204,
    OPBNB_TESTNET = 5611,
    SCROLL_MAINNET = 534352,
    SCROLL_SEPOLIA = 534351,
    LINEA_MAINNET = 59144,
    LINEA_TESTNET = 59140,
    OPTIMISM_MAINNET = 10,
    OPTIMISM_TESTNET = 420,
    OPTIMISM_TESTNET_SEPOLIA = 11155420,
    BASE_MAINNET = 8453,
    BASE_TESTNET_SEPOLIA = 84532,
    MANTA_MAINNET = 169,
    MANTA_TESTNET = 3441005,
    MANTLE_MAINNET = 5000,
    MANTLE_SEPOLIA_TESTNET = 5003,
    ARBITRUM_ONE_MAINNET = 42161,
    ARBITRUM_NOVA_TESTNET = 42170,
    ARBITRUM_GOERLI_TESTNET = 421613,
    ARBITRUM_SEPOLIA_TESTNET = 421614,
    AVALANCHE_MAINNET = 43114,
    AVALANCHE_TESTNET = 43113,
    GNOSIS_MAINNET = 100,
    GNOSIS_TESTNET = 10200,
    PGN_MAINNET = 424,
    PGN_TESTNET = 58008,
    VICTION_MAINNET = 88,
    VICTION_TESTNET = 89,
    MOONBEAM_MAINNET = 1284,
    MOONRIVER_MAINNET = 1285,
    MOONBASE_ALPHA_TESTNET = 1287,
    POLYGON_ZKEVM_MAINNET = 1101,
    POLYGON_ZKEVM_TESTNET = 1442,
    POLYGON_ZKEVM_CARDONA_TESTNET = 2442,
    FANTOM_MAINNET = 250,
    FANTOM_TESTNET = 4002,
    COMBO_MAINNET = 9980,
    COMBO_TESTNET = 91715,
    ZKFAIR_MAINNET = 42766,
    ZKFAIR_TESTNET = 43851,
    MAP_PROTOCOL_MAINNET = 22776,
    MAP_PROTOCOL_TESTNET = 212,
    BEVM_TESTNET = 11503,
    BEVM_CANARY_MAINNET = 1501,
    BEVM_CANARY_TESTNET = 1502,
    ZETA_MAINNET = 7000,
    ZETA_TESTNET = 7001,
    MERLIN_CHAIN_MAINNET = 4200,
    MERLIN_CHAIN_TESTNET = 686868,
    MERLIN_CHAIN_DEVNET = 5200,
    CORE_MAINNET = 1116,
    CORE_TESTNET = 1115,
    MODE_MAINNET = 34443,
    MODE_TESTNET = 919,
    ANCIENT8_MAINNET = 888888888,
    ANCIENT8_TESTNET = 28122024,
    BLAST_MAINNET = 81457,
    BLAST_TESTNET_SEPOLIA = 168587773,
    ROOTSTOCK_MAINNET = 30,
    XTERIO_MAINNET = 112358,
    XTERIO_TESTNET = 1637450,
    ASTAR_ZKEVM_MAINNET = 3776,
    ASTAR_ZKEVM_TESTNET_ZKYOTO = 6038361,
    IMMUTABLE_ZKEVM_MAINNET = 13371,
    IMMUTABLE_ZKEVM_TESTNET = 13473,
    PEQA_KREST_MAINNET = 2241,
    PEQA_AGUNG_TESTNET = 9990,
    // Only testnets
    TAIKO_TESTNET_KATLA = 167008,
    OKBC_TESTNET = 195,
    READON_TESTNET = 12015,
    LUMIBIT_TESTNET = 28206,
    BSQUARED_TESTNET = 1123,
    BERACHAIN_TESTNET_ARTIO = 80085,
    SATOSHIVM_TESTNET = 3110,
    BITLAYER_TESTNET = 200810,
    BOTANIX_TESTNET = 3636,
    GMNETWORK_TESTNET = 202402181627,
    AINN_TESTNET = 2648,
    BOB_TESTNET = 111,
    PARTICLE_PANGU_TESTNET = 2011,
}

export const SUPPORT_EIP_1559 = [
    EVM_CHAIN_ID.ETHEREUM_MAINNET,
    EVM_CHAIN_ID.ETHEREUM_GOERLI_TESTNET,
    EVM_CHAIN_ID.ETHEREUM_SEPOLIA_TESTNET,
    EVM_CHAIN_ID.ETHEREUM_HOLESKY_TESTNET,
    EVM_CHAIN_ID.OPTIMISM_MAINNET,
    EVM_CHAIN_ID.OPTIMISM_TESTNET,
    EVM_CHAIN_ID.OPTIMISM_TESTNET_SEPOLIA,
    EVM_CHAIN_ID.AVALANCHE_MAINNET,
    EVM_CHAIN_ID.AVALANCHE_TESTNET,
    EVM_CHAIN_ID.POLYGON_MAINNET,
    EVM_CHAIN_ID.POLYGON_TESTNET,
    EVM_CHAIN_ID.POLYGON_AMOY_TESTNET,
    EVM_CHAIN_ID.ARBITRUM_ONE_MAINNET,
    EVM_CHAIN_ID.ARBITRUM_NOVA_TESTNET,
    EVM_CHAIN_ID.ARBITRUM_GOERLI_TESTNET,
    EVM_CHAIN_ID.ARBITRUM_SEPOLIA_TESTNET,
    EVM_CHAIN_ID.LINEA_MAINNET,
    EVM_CHAIN_ID.LINEA_TESTNET,
    EVM_CHAIN_ID.OPBNB_MAINNET,
    EVM_CHAIN_ID.OPBNB_TESTNET,
    EVM_CHAIN_ID.COMBO_MAINNET,
    EVM_CHAIN_ID.COMBO_TESTNET,
    EVM_CHAIN_ID.TAIKO_TESTNET_KATLA,
    EVM_CHAIN_ID.BASE_MAINNET,
    EVM_CHAIN_ID.BASE_TESTNET_SEPOLIA,
    EVM_CHAIN_ID.MANTA_MAINNET,
    EVM_CHAIN_ID.MANTA_TESTNET,
    EVM_CHAIN_ID.PGN_MAINNET,
    EVM_CHAIN_ID.PGN_TESTNET,
    EVM_CHAIN_ID.MOONBEAM_MAINNET,
    EVM_CHAIN_ID.MOONRIVER_MAINNET,
    EVM_CHAIN_ID.MOONBASE_ALPHA_TESTNET,
    EVM_CHAIN_ID.ZETA_MAINNET,
    EVM_CHAIN_ID.ZETA_TESTNET,
    EVM_CHAIN_ID.ANCIENT8_MAINNET,
    EVM_CHAIN_ID.ANCIENT8_TESTNET,
    EVM_CHAIN_ID.MAP_PROTOCOL_MAINNET,
    EVM_CHAIN_ID.MAP_PROTOCOL_TESTNET,
    EVM_CHAIN_ID.SATOSHIVM_TESTNET,
    EVM_CHAIN_ID.MODE_MAINNET,
    EVM_CHAIN_ID.MODE_TESTNET,
    EVM_CHAIN_ID.BLAST_MAINNET,
    EVM_CHAIN_ID.BLAST_TESTNET_SEPOLIA,
    EVM_CHAIN_ID.XTERIO_MAINNET,
    EVM_CHAIN_ID.XTERIO_TESTNET,
    EVM_CHAIN_ID.GMNETWORK_TESTNET,
    EVM_CHAIN_ID.BOB_TESTNET,
    EVM_CHAIN_ID.IMMUTABLE_ZKEVM_MAINNET,
    EVM_CHAIN_ID.PEQA_KREST_MAINNET,
    EVM_CHAIN_ID.PEQA_AGUNG_TESTNET,
    EVM_CHAIN_ID.PARTICLE_PANGU_TESTNET,
];

export const L2_GAS_ORACLE = {
    [EVM_CHAIN_ID.SCROLL_MAINNET]: '0x5300000000000000000000000000000000000002',
    [EVM_CHAIN_ID.SCROLL_SEPOLIA]: '0x5300000000000000000000000000000000000002',
    [EVM_CHAIN_ID.OPTIMISM_MAINNET]: '0x420000000000000000000000000000000000000F',
    [EVM_CHAIN_ID.OPTIMISM_TESTNET]: '0x420000000000000000000000000000000000000F',
    [EVM_CHAIN_ID.OPTIMISM_TESTNET_SEPOLIA]: '0x420000000000000000000000000000000000000F',
    [EVM_CHAIN_ID.OPBNB_MAINNET]: '0x420000000000000000000000000000000000000F',
    [EVM_CHAIN_ID.OPBNB_TESTNET]: '0x420000000000000000000000000000000000000F',
    [EVM_CHAIN_ID.COMBO_MAINNET]: '0x420000000000000000000000000000000000000F',
    [EVM_CHAIN_ID.COMBO_TESTNET]: '0x420000000000000000000000000000000000000F',
    [EVM_CHAIN_ID.BASE_MAINNET]: '0x420000000000000000000000000000000000000F',
    [EVM_CHAIN_ID.BASE_TESTNET_SEPOLIA]: '0x420000000000000000000000000000000000000F',
    [EVM_CHAIN_ID.BLAST_MAINNET]: '0x420000000000000000000000000000000000000F',
    [EVM_CHAIN_ID.BLAST_TESTNET_SEPOLIA]: '0x420000000000000000000000000000000000000F',
    [EVM_CHAIN_ID.PGN_MAINNET]: '0x420000000000000000000000000000000000000F',
    [EVM_CHAIN_ID.PGN_TESTNET]: '0x420000000000000000000000000000000000000F',
    [EVM_CHAIN_ID.MANTA_MAINNET]: '0x420000000000000000000000000000000000000F',
    [EVM_CHAIN_ID.MANTA_TESTNET]: '0x420000000000000000000000000000000000000F',
    [EVM_CHAIN_ID.MODE_MAINNET]: '0x420000000000000000000000000000000000000F',
    [EVM_CHAIN_ID.MODE_TESTNET]: '0x420000000000000000000000000000000000000F',
    [EVM_CHAIN_ID.XTERIO_MAINNET]: '0x420000000000000000000000000000000000000F',
    [EVM_CHAIN_ID.XTERIO_TESTNET]: '0x420000000000000000000000000000000000000F',
    [EVM_CHAIN_ID.GMNETWORK_TESTNET]: '0x420000000000000000000000000000000000000F',
};

export const USE_PROXY_CONTRACT_TO_ESTIMATE_GAS = [
    EVM_CHAIN_ID.ARBITRUM_ONE_MAINNET,
    EVM_CHAIN_ID.ARBITRUM_NOVA_TESTNET,
    EVM_CHAIN_ID.ARBITRUM_GOERLI_TESTNET,
    EVM_CHAIN_ID.ARBITRUM_SEPOLIA_TESTNET,
    EVM_CHAIN_ID.MANTLE_MAINNET,
    EVM_CHAIN_ID.MANTLE_SEPOLIA_TESTNET,
];

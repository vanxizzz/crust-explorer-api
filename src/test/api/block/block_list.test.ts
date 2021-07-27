import { getLastBlock, getBlockByBlockNum } from "../../../service/block"
import { ApiPromise } from "@polkadot/api"
import grantWs from "../../../api/grant-ws"
import { filterRepeatData } from "../../../util"
main();
async function main() {
    const api: ApiPromise = await grantWs.connect("aa");
    const row: number = 100;//每页条数
    // const start: number = 2483840;//起始区块高度
    // const start: number = 2540296;//起始区块高度
    const start: number = 2534642;//起始区块高度
    const blockNums = getBlockNums(start, row)
    let blocks = await getBlockByBlockNum(blockNums, api);
    let allAccount =
        blocks
            .map(it => it.transfers)
            .reduce((prev, cur) => [...prev, ...cur], [])
            .reduce((prev: any, cur) => [...prev, cur.from, cur.to], [])
    console.log(allAccount);
    let ooo = filterRepeatData(allAccount);
    console.log(ooo)
    console.log(blocks)
    // console.log(blocks[0].extrinsics[12].params)
    debugger;
    // console.log("转账费==========================")
    // for (let b of blocks) {
    //     // console.log(`区块：${b.blockNum}`)
    //     if (b.transfers.length > 0) {
    //         for (const transfer of b.transfers) {
    //             console.log(`event_index：${transfer.eventIndex}`)
    //             console.log(`amount：${transfer.amount}`)
    //         }
    //     }
    //     console.log("-----------------")
    // };
    // console.log("slash==========================")
    // for (let b of blocks) {
    //     if (b.rewardSlashes.length > 0) {
    //         console.log(`区块：${b.blockNum}`)
    //         for (const rewardSlash of b.rewardSlashes) {
    //             console.log(`event_index：${rewardSlash.eventIndex}`)
    //             console.log('rewardSlash.amount:', rewardSlash.amount)
    //         }
    //         console.log("-----------------")
    //     }
    // };
    console.log(blocks);
    debugger;
}

function getBlockNums(start: number, row: number): number[] {

    let blockNums: number[] = [];//查询的区块高度列表
    for (let i = 0; i < row; i++) {
        if (start - i < 0) {
            break;
        }
        blockNums.push(start - i);
    };
    return blockNums;
}

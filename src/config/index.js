/**
 * 
 */
import { tokenName } from '../utils/token'

const cnfenv = tokenName && tokenName.toLocaleLowerCase() ||  'eok' // ddn lims eok



/******************/



const config_default = {

    // coinName: 'DDN',
    peerAddress: 'peer.ebookchain.org',
    beginEpochTime: new Date(Date.UTC(2018, 5, 26, 12, 20, 20, 20)), // testnet,

}



/******************/



export default Object.assign(
    config_default, 
    cnfenv ? require('./env/'+cnfenv+'.js') : {},
    {coinName: tokenName || "EOK"}
)



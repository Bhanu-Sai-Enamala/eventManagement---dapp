import web3 from './web3';
import EventFactory from './build/EventFactory.json';

const instance = new web3.eth.Contract(
    EventFactory.abi,
    '0xCEc9edF61464425ADB4Bf4eB25B38eD01101E394'
);

export default instance;
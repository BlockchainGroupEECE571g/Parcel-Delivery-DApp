const Express = artifacts.require("Express");
require('chai')
    .use(require('chai-as-promised'))
    .should();
 
contract(Express, ([deployer, parcelSender1, courier1, receiver1, parcelSender2, courier2, receiver2]) => {
    let express;
    before(async() => {
        express = await Express.deployed();
 
    });
 
    describe('Deployment', async() => {
        it('The deployment of express should be done successfully', async() => {
            const address = await express.address;
            assert.notEqual(0x0, address); //guaratee the address is not zero;
            assert.notEqual('', address);
            const expressDeployer = await express.deployer();
            assert.equal(deployer, expressDeployer);
        })
        it('The deployed smart contract has the correct expressName', async() => {
            const expressName = await express.expressName();
            assert.equal("Ethereum Express.com", expressName);
        })
 
    });
    describe('Create Order and Cancel Order', async() => {
        let order1, order2, totalNumber
        before(async() => {
            order1 = await express.createOrder1('Shen Yue', 2387778888, 'Dunbar', 'UBC', 'Zhu Chenchen', 1778889999, { from: parcelSender1 })
            order2 = await express.createOrder2(9, 17, 13, 'Book', receiver1, { from: parcelSender1, value: web3.utils.toWei('5', 'Ether') })
            totalNumber = await express.totalNumber()
        })
        it('Creating order with wrong parameters should be rejected', async() => {
            await express.createOrder1('', 2387778888, 'Dunbar', 'UBC', 'Zhu Chenchen', 1778889999, { from: parcelSender1 }).should.be.rejected;
            await express.createOrder1('Shen Yue', 1, 'Dunbar', 'UBC', 'Zhu Chenchen', 1778889999, { from: parcelSender1 }).should.be.rejected;
            await express.createOrder1('Shen Yue', 2387778888, 'Dunbar', 'UBC', 'Zhu Chenchen', 9999999999, { from: parcelSender1 }).should.be.rejected;
        })
 
        it('Creating order successfully', async() => {
            assert.equal(1, totalNumber);
            const event1 = order1.logs[0].args;
            assert.equal(1, event1.orderId);
            assert.equal('Shen Yue', event1.senderName);
            const event2 = order2.logs[0].args;
            assert.equal(13, event2.orderWeight);
            assert.equal(web3.utils.toWei('5', 'Ether'), event2.orderPrice, "orderPrice is assigned successfully");
            const event3 = order2.logs[1].args;
            assert.equal(receiver1, event3.receiver);
            assert.equal(101, event3.orderStatus, "OrderStatus is waiting to be taken");
        })
 
        it('Cancelling order by wrong parcelSender should be rejected', async() => {
            orderCancel = await express.cancelOrder(1, { from: parcelSender2 }).should.be.rejected;
        })
 
        it('Cancelling order successfully', async() => {
            orderCancel = await express.cancelOrder(1, { from: parcelSender1 });
            const event = orderCancel.logs[0].args;
            assert.equal(105, event.orderStatus);
        })
 
        it('Cannot Take order after the order has been canceled', async() => {
            await express.takeOrder(1, 10, { from: courier1 }).should.be.rejected;
        })
    });
 
    describe('Create order and take order', async() => {
        let order1, order2, totalNumber
        before(async() => {
            order1 = await express.createOrder1('Shen Yue', 2387778888, 'Dunbar', 'UBC', 'Zhu Chenchen', 1778889999, { from: parcelSender2 })
            order2 = await express.createOrder2(9, 17, 13, 'Book', receiver1, { from: parcelSender2, value: web3.utils.toWei('5', 'Ether') })
            totalNumber = await express.totalNumber()
        })
 
        it('Taking wrong order id should be rejected', async() => {
            await express.takeOrder(7, 10, { from: courier2 }).should.be.rejected;
        })
 
 
        it('Cannot take order if the current time exceeds', async() => {
            await express.takeOrder(2, 18, { from: courier2 }).should.be.rejected;
        })
 
 
        it('Taking order successfully', async() => {
            const event = order1.logs[0].args;
            takeOrder = await express.takeOrder(event.orderId, 10, { from: courier2 });
            const event2 = takeOrder.logs[0].args;
            assert.equal(event.orderId.toNumber(), event2.orderId.toNumber(), 'Order id should be the same');
            assert.equal(courier2, event2.courier, 'Courier is incorrect');
            assert.equal(102, event2.orderStatus, 'Order status should be Waiting for delivery');
            const event3 = takeOrder.logs[1].args;
            assert.equal(1, event3.curOrdersNum, 'curOrdersNum should be 1');
        })
 
        it('Cannot cancel order after taking it', async() => {
            await express.cancelOrder(2, { from: parcelSender2 }).should.be.rejected;
        })
 
    });
 
});


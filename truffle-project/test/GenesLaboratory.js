const GenesLaboratory = artifacts.require('GenesLaboratory');

contract('GenesLaboratory', accounts => {
    let genesLaboratory;
    let genes = "0x001400C8000500500006004A0004004B00F00026000100010001000100010101";

	beforeEach(async () => {
		genesLaboratory = await GenesLaboratory.new('0x1234567890123456789012345678901234567891');
	});

	it('Should have an address for GenesLaboratory', async () => {
		assert(genesLaboratory.address);
	});

	it('Should get initial health value from bytes', async () => {
        const expectedValue = 20;
        console.log(accounts[0]);
        const tx = await genesLaboratory.getInitialHealthFromBytes(genes, { from: accounts[0] })
        .then(initialHealth => {
            assert.equal(initialHealth, expectedValue);
        });
    });
    
    it('Should get max health value from bytes', async () => {
        const expectedValue = 200;
        console.log(accounts[0]);
        await genesLaboratory.getMaxHealthFromBytes(genes, { from: accounts[0] })
        .then(maxHealth => {
            assert.equal(maxHealth, expectedValue);
        });
    });
    
    it('Should get initial strength value from bytes', async () => {
        const expectedValue = 5;
        console.log(accounts[0]);
        await genesLaboratory.getInitialStrengthFromBytes(genes, { from: accounts[0] })
        .then(initialStrength => {
            assert.equal(initialStrength, expectedValue);
        });
    });
    
    it('Should get max strength value from bytes', async () => {
        const expectedValue = 80;
        console.log(accounts[0]);
        await genesLaboratory.getMaxAStrengthFromBytes(genes, { from: accounts[0] })
        .then(maxStrength => {
            assert.equal(maxStrength, expectedValue);
        });
    });
    
    it('Should get initial agility value from bytes', async () => {
        const expectedValue = 6;
        console.log(accounts[0]);
        await genesLaboratory.getInitialAgilityFromBytes(genes, { from: accounts[0] })
        .then(initialAgility => {
            assert.equal(initialAgility, expectedValue);
        });
    });
    
    it('Should get max agility value from bytes', async () => {
        const expectedValue = 74;
        console.log(accounts[0]);
        await genesLaboratory.getMaxAgilityFromBytes(genes, { from: accounts[0] })
        .then(maxAgility => {
            assert.equal(maxAgility, expectedValue);
        });
    });
    
    it('Should get initial fortitude value from bytes', async () => {
        const expectedValue = 4;
        console.log(accounts[0]);
        await genesLaboratory.getInitialFortitudeFromBytes(genes, { from: accounts[0] })
        .then(initialFortitude => {
            assert.equal(initialFortitude, expectedValue);
        });
    });
    
    it('Should get max fortitude value from bytes', async () => {
        const expectedValue = 75;
        console.log(accounts[0]);
        await genesLaboratory.getMaxFortitudeFromBytes(genes, { from: accounts[0] })
        .then(maxFortitude => {
            assert.equal(maxFortitude, expectedValue);
        });
    });
    
    it('Should get action cooldown value from bytes', async () => {
        const expectedValue = 240;
        console.log(accounts[0]);
        await genesLaboratory.getActionCooldownFromBytes(genes, { from: accounts[0] })
        .then(actionCooldown => {
            assert.equal(actionCooldown, expectedValue);
        });
    });
    
    it('Should get hatch time value from bytes', async () => {
        const expectedValue = 38;
        console.log(accounts[0]);
        await genesLaboratory.getHatchTimeFromBytes(genes, { from: accounts[0] })
        .then(hatchTime => {
            assert.equal(hatchTime, expectedValue);
        });
    });
    
    it('Should get head attribute value from bytes', async () => {
        const expectedValue = 1;
        console.log(accounts[0]);
        await genesLaboratory.getHeadAttributeFromBytes(genes, { from: accounts[0] })
        .then(headAttribute => {
            assert.equal(headAttribute, expectedValue);
        });
    });
    
    it('Should get body attribute value from bytes', async () => {
        const expectedValue = 1;
        console.log(accounts[0]);
        await genesLaboratory.getBodyAttributeFromBytes(genes, { from: accounts[0] })
        .then(bodyAttribute => {
            assert.equal(bodyAttribute, expectedValue);
        });
    });
    
    it('Should get wings attribute value from bytes', async () => {
        const expectedValue = 1;
        console.log(accounts[0]);
        await genesLaboratory.getWingsAttributeFromBytes(genes, { from: accounts[0] })
        .then(wingsAttribute => {
            assert.equal(wingsAttribute, expectedValue);
        });
	});
});
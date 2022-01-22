const GenesLaboratory = artifacts.require('GenesLaboratory');

contract('GenesLaboratory', accounts => {
    let genesLaboratory;
    let genes = "0x001400C8000500500006004A0004004B00F0002601030405060708090A0B0C0D";
    let motherGenes = "0x001900CA000400700005004C0005004A00E00024000200030001000100010002";

	beforeEach(async () => {
		genesLaboratory = await GenesLaboratory.new('0x1234567890123456789012345678901234567891');
	});

	it('Should have an address for GenesLaboratory', async () => {
		assert(genesLaboratory.address);
	});

	it('Should get initial health value from bytes', async () => {
        const expectedValue = 20;
        const tx = await genesLaboratory.getInitialHealthFromBytes(genes, { from: accounts[0] })
        .then(initialHealth => {
            assert.equal(initialHealth, expectedValue);
        });
    });
    
    it('Should get max health value from bytes', async () => {
        const expectedValue = 200;
        await genesLaboratory.getMaxHealthFromBytes(genes, { from: accounts[0] })
        .then(maxHealth => {
            assert.equal(maxHealth, expectedValue);
        });
    });
    
    it('Should get initial strength value from bytes', async () => {
        const expectedValue = 5;
        await genesLaboratory.getInitialStrengthFromBytes(genes, { from: accounts[0] })
        .then(initialStrength => {
            assert.equal(initialStrength, expectedValue);
        });
    });
    
    it('Should get max strength value from bytes', async () => {
        const expectedValue = 80;
        await genesLaboratory.getMaxStrengthFromBytes(genes, { from: accounts[0] })
        .then(maxStrength => {
            assert.equal(maxStrength, expectedValue);
        });
    });
    
    it('Should get initial agility value from bytes', async () => {
        const expectedValue = 6;
        await genesLaboratory.getInitialAgilityFromBytes(genes, { from: accounts[0] })
        .then(initialAgility => {
            assert.equal(initialAgility, expectedValue);
        });
    });
    
    it('Should get max agility value from bytes', async () => {
        const expectedValue = 74;
        await genesLaboratory.getMaxAgilityFromBytes(genes, { from: accounts[0] })
        .then(maxAgility => {
            assert.equal(maxAgility, expectedValue);
        });
    });
    
    it('Should get initial fortitude value from bytes', async () => {
        const expectedValue = 4;
        await genesLaboratory.getInitialFortitudeFromBytes(genes, { from: accounts[0] })
        .then(initialFortitude => {
            assert.equal(initialFortitude, expectedValue);
        });
    });
    
    it('Should get max fortitude value from bytes', async () => {
        const expectedValue = 75;
        await genesLaboratory.getMaxFortitudeFromBytes(genes, { from: accounts[0] })
        .then(maxFortitude => {
            assert.equal(maxFortitude, expectedValue);
        });
    });
    
    it('Should get action cooldown value from bytes', async () => {
        const expectedValue = 240;
        await genesLaboratory.getActionCooldownFromBytes(genes, { from: accounts[0] })
        .then(actionCooldown => {
            assert.equal(actionCooldown, expectedValue);
        });
    });
    
    it('Should get hatch time value from bytes', async () => {
        const expectedValue = 38;
        await genesLaboratory.getHatchTimeFromBytes(genes, { from: accounts[0] })
        .then(hatchTime => {
            assert.equal(hatchTime, expectedValue);
        });
    });
    
    /***************************** Visual Attributes ************************************************ */
    
    it('Should get body type attribute value from bytes', async () => {
        const expectedValue = 1;
        await genesLaboratory.getBodyTypeFromBytes(genes, { from: accounts[0] })
        .then(bodyTypeAttribute => {
            assert.equal(bodyTypeAttribute, expectedValue);
        });
    });
    
    it('Should get body color attribute value from bytes', async () => {
        const expectedValue = 3;
        await genesLaboratory.getBodyColorFromBytes(genes, { from: accounts[0] })
        .then(bodyColorAttribute => {
            assert.equal(bodyColorAttribute, expectedValue);
        });
    });
    
    it('Should get body pattern type attribute value from bytes', async () => {
        const expectedValue = 4;
        await genesLaboratory.getBodyPatternTypeFromBytes(genes, { from: accounts[0] })
        .then(bodyPatternTypeAttribute => {
            assert.equal(bodyPatternTypeAttribute, expectedValue);
        });
    });

    it('Should get body pattern color attribute value from bytes', async () => {
        const expectedValue = 5;
        await genesLaboratory.getBodyPatternColorFromBytes(genes, { from: accounts[0] })
        .then(bodyPatternColorAttribute => {
            assert.equal(bodyPatternColorAttribute, expectedValue);
        });
    });

    it('Should get wings type attribute value from bytes', async () => {
        const expectedValue = 6;
        await genesLaboratory.getWingsTypeFromBytes(genes, { from: accounts[0] })
        .then(wingsTypeAttribute => {
            assert.equal(wingsTypeAttribute, expectedValue);
        });
    });

    it('Should get wings color attribute value from bytes', async () => {
        const expectedValue = 7;
        await genesLaboratory.getWingsColorFromBytes(genes, { from: accounts[0] })
        .then(wingsColorAttribute => {
            assert.equal(wingsColorAttribute, expectedValue);
        });
    });

    it('Should get horns type attribute value from bytes', async () => {
        const expectedValue = 8;
        await genesLaboratory.getHornsTypeFromBytes(genes, { from: accounts[0] })
        .then(hornsTypeAttribute => {
            assert.equal(hornsTypeAttribute, expectedValue);
        });
    });

    it('Should get horns color attribute value from bytes', async () => {
        const expectedValue = 9;
        await genesLaboratory.getHornsColorFromBytes(genes, { from: accounts[0] })
        .then(hornsColorAttribute => {
            assert.equal(hornsColorAttribute, expectedValue);
        });
    });

    it('Should get eyes type attribute value from bytes', async () => {
        const expectedValue = 10;
        await genesLaboratory.getEyesTypeFromBytes(genes, { from: accounts[0] })
        .then(eyesTypeAttribute => {
            assert.equal(eyesTypeAttribute, expectedValue);
        });
    });

    it('Should get eyes color attribute value from bytes', async () => {
        const expectedValue = 11;
        await genesLaboratory.getEyesColorFromBytes(genes, { from: accounts[0] })
        .then(eyesColorAttribute => {
            assert.equal(eyesColorAttribute, expectedValue);
        });
    });

    it('Should get tail type attribute value from bytes', async () => {
        const expectedValue = 12;
        await genesLaboratory.getTailTypeFromBytes(genes, { from: accounts[0] })
        .then(tailTypeAttribute => {
            assert.equal(tailTypeAttribute, expectedValue);
        });
    });

    it('Should get tail color attribute value from bytes', async () => {
        const expectedValue = 13;
        await genesLaboratory.getTailColorFromBytes(genes, { from: accounts[0] })
        .then(tailColorAttribute => {
            assert.equal(tailColorAttribute, expectedValue);
        });
    });
    
    
    /*it('Should add child genes', async () => {
        const expectedValue = 0x165464551151;
        await genesLaboratory.createNewDragonGenes.call( { from: accounts[0] })
        .then(tx => {
            assert.equal(tx, expectedValue);
        });
	});*/
});

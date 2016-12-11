import sinon from 'sinon';
import ChangeManger from 'calculator/lib/managers/ChangeManager';

describe('Change Manager', () => {
    let underTest, config, tokenManager, memoryManager;

    beforeEach(() => {
        memoryManager = {
            change: sinon.stub()
        };
        tokenManager = {
            change: sinon.stub()
        };

        config = {
            toolbar:{
                buttons: []
            },
            rows:[
                {
                    buttons:[{
                        'changes':{
                            'toggleDisable': { 'changeName': 'ToggleDisable', 'on': '&memoryManager'}
                        }
                    }]
                }
            ]
        };
    });

    it('should go through the config and add the appropriate listeners', ()=> {
        underTest = new ChangeManger(null, memoryManager, config);

        expect(memoryManager.change.callCount).to.equal(1);
    });
});
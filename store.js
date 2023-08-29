let state = {
    selectedIndicator: 'Entity'
};

function action(type, param) {
    switch(type) {
        case 'setSelectedIndicator':
            state.selectedIndicator = param;
            break;
    }
    
    update();
}
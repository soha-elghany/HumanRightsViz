function sortAccessor(d) {
    let value = d[state.selectedIndicator];
    if(isNaN(value)) value = 0;
    return value;
}

function getSortedData(data) {
    let sorted;

    if(state.selectedIndicator ==='Entity') {
        sorted = _.orderBy(data, 'Entity');
    } else {
        sorted = _.orderBy(data, sortAccessor, 'desc');
    }

    return sorted;
}

function isVisible(d) {
    return state.selectedIndicator === 'Entity' || d[state.selectedIndicator] > 0;
}

function getTruncatedLabel(text) {
    return text.length <= 20 ? text : text.slice(0, 10) + '';
}

function getMaxRadius() {
    let cellWidth = config.width / config.numColumns;
    let maxRadius = 0.35 * cellWidth;
    return maxRadius
}

function layout(data) {
    let labelHeight = 10;
    let cellWidth = config.width / config.numColumns;
    let cellHeight = cellWidth+ labelHeight;

    let maxRadius = getMaxRadius();

    let radiusScale = d3.scaleSqrt()
        .domain([0, 1])
        .range([0, maxRadius]);

    let sortedData = getSortedData(data);

    let layoutData = sortedData.map(function(d, i) {
        let item = {};

        item.id = d.id;

        let column = i % config.numColumns;
        let row = Math.floor(i / config.numColumns);

        item.x = column * cellWidth + 0.5 * cellWidth;
        item.y = row * cellHeight + 0.5 * cellHeight;

        item.visible = isVisible(d);
        
        item.electoralRadius = radiusScale(d.electoral);
        item.libertyRadius = radiusScale(d.liberty);
        item.womenRadius = radiusScale(d.women);


        item.labelText = getTruncatedLabel(d.Entity);
        item.labelOffset = maxRadius + labelHeight;

        item.popupOffset = -0.8 * maxRadius;
        item.popupData = {
            Entity: d.Entity,
            electoral: d.electoral,
            women: d.women,
            liberty: d.liberty
        };

        return item;
    });

    return layoutData;
}

let menuItems = [
    {
        id: 'Entity',
        label: 'Country'
    },
    {
        id: 'electoral',
        label: 'Electoral'
    },
    {
        id: 'women',
        label: 'Women'
    },
    {
        id: 'liberty',
        label: 'Liberty'
    }
];

function getCircle(id) {
    let svg = '<svg width="18" height="18"><circle class="' + id + '" cx="9" cy="9" r="8"></svg>';
    return svg;
}

function getHtml(d) {
    let circle = d.id === 'Entity' ? '' : getCircle(d.id);
    let label = '<div class="label">' + d.label + '</div>';
    return circle + label;
}

function handleMenuClick(e, d) {
    action('setSelectedIndicator', d.id);
}

function updateMenu() {
    d3.select('#controls .menu .items')
        .selectAll('.item')
        .data(menuItems)
        .join('div')
        .classed('item', true)
        .classed('selected', function(d) {
            return state.selectedIndicator === d.id;
        })
        .html(getHtml)
        .on('click', handleMenuClick);
}
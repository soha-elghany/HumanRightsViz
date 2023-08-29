function initialiseGroup(g, d) {
    g.classed('Entity', true)
        .style('opacity', 0)
        .attr('transform', 'translate(' + d.x + ',' + d.y + ')')
        .on('mouseover', handleMouseover)
        .on('mouseout', handleMouseout);

    g.append('circle')
        .classed('popup-center', true)
        .attr('r', 1);

    g.append('circle')
        .classed('electoral', true);

    g.append('circle')
        .classed('women', true);

    g.append('circle')
        .classed('liberty', true);

    g.append('text')
        .classed('label', true);
}

function updateGroup(d, i) {
    let g = d3.select(this);

    if(g.selectAll('*').empty()) initialiseGroup(g, d);

        g.transition()
            .duration(config.transitionDuration)
            .delay(i * config.transitionDelay)
            .attr('transform', 'translate(' + d.x + ',' + d.y + ')')
            .style('opacity', d.visible ? 1 : 0)
            .style('pointer-events', d.visible ? 'all' : 'none');
        
        g.select('.popup-center')
        .attr('cy', d.popupOffset);

        g.select('.electoral')
            .transition()
            .duration(config.transitionDuration)
            .delay(i * config.transitionDelay)
            .attr('r', d.electoralRadius);

        g.select('.women')
            .transition()
            .duration(config.transitionDuration)
            .delay(i * config.transitionDelay)
            .attr('r', d.womenRadius);

        g.select('.liberty')
        .transition()
        .duration(config.transitionDuration)
        .delay(i * config.transitionDelay)
            .attr('r', d.libertyRadius);

        g.select('.label')
            .attr('y', d.labelOffset)
            .text(d.labelText);
}

function updateChart() {
    let layoutData = layout(data);

    d3.select('#chart')
        .selectAll('g')
        .data(layoutData, function(d) {
            return d.id;
        })
        .join('g')
        .each(updateGroup);
}

function updateLegend() {
    d3.select('.legend circle')
        .attr('r', getMaxRadius());
}

function update() {
    updateChart();
    updateMenu();
    updateLegend();
}

let popup = Popup();

function getPopupEntry(d, type, label) {
    if (!isNaN(d.popupData[type])) {
        return '<div>' + label + ': ' + d.popupData[type] + '</div>';
    }

    return '';
}

function popupTemplate(d) {
    let html = '';
    html += '<h3>' + d.popupData.Entity + '</h3>';
    // electoral,women,liberty

    html += getPopupEntry(d, 'electoral', 'electoral');
    html += getPopupEntry(d, 'women', 'women');
    html += getPopupEntry(d, 'liberty', 'liberty');

    return html;
}

function handleMouseover(e, d) {
    let popupCenter = d3.select(this)
        .select('.popup-center')
        .node();

    popup
        .point(popupCenter)
        .html(popupTemplate(d))
        .draw();
}

function handleMouseout() {
    popup.hide();
}

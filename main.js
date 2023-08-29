let data;

function dataIsReady(csv) {
  data = csv;
  update();
}

function transformRow(d) {
  return {
    Entity: d.Entity,
    electoral: parseFloat(d.electoral),
    women: parseFloat(d.women),
    liberty: parseFloat(d.liberty)  
  };
}

d3.csv('./scores.csv', transformRow)
  .then(dataIsReady);

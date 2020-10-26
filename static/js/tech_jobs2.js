var data = [
  {
    type: 'bar',
    x: ['2019','2029'],
    y: [ 1469200, 1785200],
    hovertemplate: '%{y}',
    marker: {
      color: 'blue'
    },
    name: 'Computer systems analysts'
  },
  {
    type: 'bar',
    x: ['2029'],
    y: [31.2],
    base: 0,
    marker: {
      color: 'blue'
    },
    name: 'Information security analysts'
  },]

Plotly.newPlot('myDiv', data);
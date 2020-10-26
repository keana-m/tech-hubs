urlstring='data.txt'
//urlstring='static/data/data.txt'

Plotly.d3.json(urlstring, function(err, rows){

function unpack(rows, key) {
    return rows.map(function(row) { return row[key]; });
    }

    var city = unpack(rows, 'area_title'),
        a_median = unpack(rows, 'a_median'),
        values = unpack(rows, 'tot_emp'),
        job_title = unpack(rows, 'occ_title'),
        a_pct10 = unpack(rows, 'a_pct10'),
        a_pct25 = unpack(rows, 'a_pct25'),
        a_pct75 = unpack(rows, 'a_pct75'),
        a_pct90 = unpack(rows, 'a_pct90')
        ;

// Create Total Tech-Related Occupation Employment
var trace2 = {
    x: city,
    y: a_pct10,
    name: '10th percentile',
    type: "bar",
    text: a_pct10.map(String),
    textposition: 'auto',
    hoverinfo: 'on',
    marker: {color: '#f0f8ff'},
    transforms: [{
        type: 'aggregate',
        groups: city,
        aggregations: [
          {target: 'y', func: 'avg', enabled: true},
        ]
      }]
    };

var trace2a = {
    x: city,
    y: a_pct25,
    name: '25th percentile',
    type: "bar",
    text: a_pct25.map(String),
    textposition: 'auto',
    hoverinfo: 'on',
    marker: {color: '#b5ddff'},
    transforms: [{
        type: 'aggregate',
        groups: city,
        aggregations: [
          {target: 'y', func: 'avg', enabled: true},
        ]
      }]
    };

var trace2b = {
    x: city,
    y: a_pct75,
    name: '75th percentile',
    type: "bar",
    text: a_pct75.map(String),
    textposition: 'auto',
    hoverinfo: 'on',
    marker: {color: '#7ac1ff'},
    transforms: [{
        type: 'aggregate',
        groups: city,
        aggregations: [
          {target: 'y', func: 'avg', enabled: true},
        ]
      }]
    };

var trace2c = {
    x: city,
    y: a_pct90,
    name: '90th percentile',
    type: "bar",
    text: a_pct90.map(String),
    textposition: 'auto',
    hoverinfo: 'on',
    marker: {color: '#3fa6ff'},
    transforms: [{
        type: 'aggregate',
        groups: city,
        aggregations: [
          {target: 'y', func: 'avg', enabled: true},
        ]
      }]
    
    };

    
var data2 = [trace2,trace2a,trace2b,trace2c];

Plotly.newPlot('plot3', data2, {
    title: 'Tech Occupation Wages within Tech Hubs',
    font: {
      family: 'Arial',
      size: 14,
      color: '#00090c'
    },
    xaxis: {
      tickson: "boundaries",
      ticklen: 15,
      showdividers: true,
      dividercolor: 'grey',
      dividerwidth: 2
    },
    showlegend: false,
    yaxis: {range: [0, 200000]},
    updatemenus: [{
        y: 1,
        yanchor: 'top',
        buttons: [{
            method: 'restyle',
            args: ['visible', [true, true, true, true]],
            label: 'All',
        }, {
            method: 'restyle',
            args: ['visible', [true, false, false, false]],
            label: '10th percentile'
        }, {
            method: 'restyle',
            args: ['visible', [false, true, false, false]],
            label: '25th percentile'
        }, {
            method: 'restyle',
            args: ['visible', [false, false, true, false]],
            label: '75th percentile'
        }, {
            method: 'restyle',
            args: ['visible', [false, false, false, true]],
            label: '90th percentile'
        }]
    }],
});

})
	

// initialize url for jsonified data
urlstring='/censusData'

// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("#bar")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var color = d3.scaleOrdinal()
  .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"])

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var chosenYAxis = "Bachelor's degree";

// function used for updating x-scale var upon click on axis label
function xScale(categories) {
  // create scales
  x = d3.scaleBand()
    .domain(categories)
    .range([margin.left, width - margin.right])
    .padding(0.1)

  return x;

}

// function used for updating y-scale var upon click on axis label
function yScale(data,columns) {
    // Create y scale function
    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d[columns])])
        .range([height, 0]);

    return yLinearScale
}

// // function used for updating xAxis var upon click on axis label
// function renderXAxes(newXScale, xAxis) {
//   var bottomAxis = d3.axisBottom(newXScale);

//   xAxis.transition()
//     .duration(1000)
//     .call(bottomAxis);

//   return xAxis;
// }

function renderYAxes(newYScale, yAxis) {
  var leftAxis = d3.axisLeft(newYScale);

  yAxis.transition()
    .duration(1000)
    .call(leftAxis);

  return yAxis;
}

// function used for updating circles group with a transition to
// new circles
// function renderCircles(circlesGroup, newXScale, chosenXAxis, newYScale, chosenYAxis) {

//   circlesGroup.transition()
//     .duration(1000)
//     .attr("cx", d => newXScale(d[chosenXAxis]))
//     .attr("cy", d => newYScale(d[chosenYAxis]));

//   return circlesGroup;
// }

// function to update text in circles with a transition
function renderText(circleText, newXScale, chosenXAxis, newYScale, chosenYAxis) {

  circleText.transition()
    .duration(1000)
    .attr("x", d => newXScale(d[chosenXAxis]))
    .attr("y", d => newYScale(d[chosenYAxis]));

  return circleText;
}


// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup) {

  var label;

  // Set x label
  if (chosenXAxis === "Cities") {
    xlabel = "Cities:";
  }
  else if (chosenXAxis === "age") {
    xlabel = "Age:";
  }
  else {
    xlabel = "Household Income"
  }

  // Set y-label
  if (chosenYAxis === "Bachelors") {
    ylabel = "Lack Bachelors:";
  }
  else if (chosenYAxis === "smokes") {
    ylabel = "Smokes:";
  }
  else {
    ylabel = "Obesity:"
  }

  var toolTip = d3.tip()
    .attr("class", "d3-tip")
    .offset([80, -60])
    .html(function(d) {
      return (`${d.state}<br>${xlabel} ${d[chosenXAxis]}<br>${ylabel} ${d[chosenYAxis]}`);
    });

  circlesGroup.call(toolTip);

  circlesGroup.on("mouseover", function(data) {
    toolTip.show(data);
  })
    // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

  return circlesGroup;
}

// Retrieve data from the CSV file and execute everything below
d3.json(urlstring).then(function(data, err) {
  if (err) throw err;

  console.log(data)

  columns = ["Regular high school diploma","GED or alternative credential","Some college, less than 1 year","Some college, 1 or more years, no degree","Associate's degree","Bachelor's degree","Master's degree","Professional school degree","Doctorate degree"]

  // Set up categories (i.e. tech hub cities)
  var dataCategories = data.map(function(d) {return d.index})
  
  console.log(dataCategories)

  // parse data
  data.forEach(function(d) {
    d.index = +d.index;
    d["Bachelor's degree"] = +d["Bachelor's degree"];
  });

  // xLinearScale function above csv import
  var x0 = xScale(dataCategories);

  var x1 = d3.scaleBand()
    .domain(columns)
    .rangeRound([0, x0.bandwidth()])
    .padding(0.05)

  // Create y scale function
  var yLinearScale = yScale(data, columns);

  // Create initial axis functions
  var bottomAxis = d3.axisBottom(x0).tickSizeOuter(0);
  var leftAxis = d3.axisLeft(yLinearScale);

  // append x axis
  var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // append y axis
  var yAxis = chartGroup.append("g")
    .call(leftAxis);

  // append initial circles
  var barGroup = chartGroup.selectAll("g")
    .data(data)
    .enter().append("g")
      .attr("transform", d => `translate(${x0(d[dataCategories])},0)`)
    .selectAll("rect")
    .data(d => columns.map(column => ({column, value: d[column]})))
    .enter().append("rect")
      .classed("bar",true)
      .attr("x",d => x1(d.column))
      .attr("y", d => yLinearScale(d.value))
      .attr("width", x1.bandwidth())
      .attr("height", d => height - yLinearScale(d.value))
      .attr("fill",d => color(d.column));

//   // append state abbreviations to circles
//   var circleText = chartGroup.select("g")
//     .selectAll("circle")
//     .data(data)
//     .enter()
//     .append("text")
//     .text(d => d.abbr)
//     .attr("x", d => xLinearScale(d[chosenXAxis]))
//     .attr("y", d => yLinearScale(d[chosenYAxis]))
//     .attr("dy",-395)
//     .classed("stateText", true)


//   // Create group for x-axis labels
//   var labelsXGroup = chartGroup.append("g")
//     .attr("transform", `translate(${width / 2}, ${height + 20})`);

//   // Create group for y-axis labels
//   var labelsYGroup = chartGroup.append("g")
//     .attr("transform", `rotate(-90)`);

//   var CitiesLabel = labelsXGroup.append("text")
//     .attr("x", 0)
//     .attr("y", 20)
//     .attr("value", "Cities") // value to grab for event listener
//     .classed("active", true)
//     .text("In Cities (%)");

//   var ageLabel = labelsXGroup.append("text")
//     .attr("x", 0)
//     .attr("y", 40)
//     .attr("value", "age") // value to grab for event listener
//     .classed("inactive", true)
//     .text("Age (Median)");
  
//   var incomeLabel = labelsXGroup.append("text")
//     .attr("x", 0)
//     .attr("y", 60)
//     .attr("value", "income") // value to grab for event listener
//     .classed("inactive", true)
//     .text("Household Income (Median)");

//   // append y axis
//   var healthLabel = labelsYGroup.append("text")
//     .attr("y", 40 - margin.left)
//     .attr("x", 0 - (height / 2))
//     .attr("dy", "1em")
//     .attr("value", "Bachelors")
//     .classed("axis-text", true)
//     .classed("active",true)
//     .text("Lacks Bachelors (%)");
  
//   var smokesLabel = labelsYGroup.append("text")
//     .attr("y", 20 - margin.left)
//     .attr("x",  - (height / 2))
//     .attr("dy", "1em")
//     .attr("value", "smokes")
//     .classed("axis-text", true)
//     .classed("inactive",true)
//     .text("Smokes (%)");

//   var obesityLabel = labelsYGroup.append("text")
//     .attr("y", 0 - margin.left)
//     .attr("x",  - (height / 2))
//     .attr("dy", "1em")
//     .attr("value", "obesity")
//     .classed("axis-text", true)
//     .classed("inactive",true)
//     .text("Obesity (%)");

//   // updateToolTip function above csv import
//   var circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

//   // x axis labels event listener
//   labelsXGroup.selectAll("text")
//     .on("click", function() {
//       // get value of selection
//       var value = d3.select(this).attr("value");
//       if (value !== chosenXAxis) {
//         // replaces chosenXAxis with value
//         chosenXAxis = value;

//         console.log(chosenXAxis)

//         // functions here found above csv import
//         // updates x scale for new data
//         xLinearScale = xScale(data, chosenXAxis);

//         // updates x axis with transition
//         xAxis = renderXAxes(xLinearScale, xAxis);

//         // updates circles with new x values
//         circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis, yLinearScale,chosenYAxis);

//         // update text in circle with new x values 
//         circleText = renderText(circleText, xLinearScale, chosenXAxis, yLinearScale,chosenYAxis);

//         // updates tooltips with new info
//         circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

//         // x axis changes classes to change bold text 
//         if (chosenXAxis === "Cities") {
//           CitiesLabel
//             .classed("active", true)
//             .classed("inactive", false);
//           ageLabel
//             .classed("active", false)
//             .classed("inactive", true);
//           incomeLabel
//             .classed("active", false)
//             .classed("inactive", true);
//         }
//         else if (chosenXAxis === "age") {
//           CitiesLabel
//             .classed("active", false)
//             .classed("inactive", true);
//           ageLabel
//             .classed("active", true)
//             .classed("inactive", false);
//           incomeLabel
//             .classed("active", false)
//             .classed("inactive", true);
//         }
//         else {
//           {
//             CitiesLabel
//               .classed("active", false)
//               .classed("inactive", true);
//             ageLabel
//               .classed("active", false)
//               .classed("inactive", true);
//             incomeLabel
//               .classed("active", true)
//               .classed("inactive", false);
//           }
//         }
//       }

      
//     });

//     labelsYGroup.selectAll("text")
//     .on("click", function() {
//       // get value of selection
//       var value = d3.select(this).attr("value");
//       console.log(value)

//       if (value !== chosenYAxis) {
//         console.log(value)
//         // replaces chosenXAxis with value
//         chosenYAxis = value;

//         // console.log(chosenXAxis)

//         // functions here found above csv import
//         // updates x scale for new data
//         yLinearScale = yScale(data, chosenYAxis);

//         // updates x axis with transition
//         yAxis = renderYAxes(yLinearScale, yAxis);

//         // updates circles with new x values
//         circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis, yLinearScale,chosenYAxis);

//         // update text in circle with new y values 
//         circleText = renderText(circleText, xLinearScale, chosenXAxis, yLinearScale,chosenYAxis);
        
//         // updates tooltips with new info
//         circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);
        
//         // y-axis changes classes to change bold text
//         if (chosenYAxis === "obesity") {
//           obesityLabel
//             .classed("active", true)
//             .classed("inactive", false);
//           smokesLabel
//             .classed("active", false)
//             .classed("inactive", true);
//           healthLabel
//             .classed("active", false)
//             .classed("inactive", true);
//         }
//         else if (chosenYAxis === "smokes") {
//           obesityLabel
//             .classed("active", false)
//             .classed("inactive", true);
//           smokesLabel
//             .classed("active", true)
//             .classed("inactive", false);
//           healthLabel
//             .classed("active", false)
//             .classed("inactive", true);
//         }
//         else {
//           {
//             obesityLabel
//               .classed("active", false)
//               .classed("inactive", true);
//             smokesLabel
//               .classed("active", false)
//               .classed("inactive", true);
//             healthLabel
//               .classed("active", true)
//               .classed("inactive", false);
//           }
//         }
//       }

//     });
}).catch(function(error) {
  console.log(error);
});

// Dependencies: "http://labratrevenge.com/d3-tip/javascripts/d3.tip.v0.6.3.js"
// Dependencies: "http://d3js.org/d3.v3.min.js"
// Div class = "chart2"

var margin = {top: 40, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis2 = d3.svg.axis()
    .scale(y)
    .orient("right");

var tip2 = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<h3 style='text-align:center'><em><strong>" + d.Name + "</strong></em><br>" + d.Venue + 
        "<br>" + d.StartDate + "<br>" + "$" + d.PriceMaximum + "</h3>";
  })

var svg2 = d3.select(".chart2").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg2.call(tip2);

d3.json('/analysis/Minimum', function(error, data) {
  x.domain(data.map(function(d) { return d.Genre; }));
  y.domain([0, d3.max(data, function(d) { return d.PriceMaximum; })]);

  data.forEach(function(data) {
    data.PriceMaximum = +data.PriceMaximum;
  });

  svg2.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg2.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + width + ",0)")
      .call(yAxis2)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -10)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Price");

  svg2.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.Genre); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.PriceMaximum); })
      .attr("height", function(d) { return height - y(d.PriceMaximum); })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)

});
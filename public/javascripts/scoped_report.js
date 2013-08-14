var mergedData = [],
    xAxisMenu = ['시간대별', '요일별'],
    xAxisSelected = xAxisMenu[0],
    typeMenu = ['군별', '성별', '둘 다'],
    typeSelected = typeMenu[0];

var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x0 = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var x1 = d3.scale.ordinal();

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
    .scale(x0)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(d3.format(".2s"));

var svg = d3.select("div.span12").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .classed('chart', true)
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Build menu
d3.select('#x-axis-menu')
  .selectAll('button')
  .data(xAxisMenu)
  .enter()
  .append('button')
  .classed('btn d3-button', true)
  .classed('active', function(d){
    return d === xAxisSelected;
  })
  .text(function(d){return d;})
  .on('click', function(d) {
    xAxisSelected = d;
    updateChart(mergedData);
    // updateMenus();
  });

d3.csv("data.csv", function(error, data) {
  var ageNames = d3.keys(data[0]).filter(function(key) { return key !== "State"; });

  data.forEach(function(d) {
    d.ages = ageNames.map(function(name) { return {name: name, value: +d[name]}; });
  });

  x0.domain(data.map(function(d) { return d.State; }));
  x1.domain(ageNames).rangeRoundBands([0, x0.rangeBand()]);
  y.domain([0, d3.max(data, function(d) { return d3.max(d.ages, function(d) { return d.value; }); })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Population");

  var state = svg.selectAll(".state")
      .data(data)
    .enter().append("g")
      .attr("class", "g")
      .attr("transform", function(d) { return "translate(" + x0(d.State) + ",0)"; });

  state.selectAll("rect")
      .data(function(d) { return d.ages; })
    .enter().append("rect")
      .attr("width", x1.rangeBand())
      .attr("x", function(d) { return x1(d.name); })
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); })
      .style("fill", function(d) { return color(d.name); });

  var legend = svg.selectAll(".legend")
      .data(ageNames.slice().reverse())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d; });

});

function pullData(index) {
  d3.json("/correlate.json", function(error, data) {
    data.forEach(function(d){
      var userId = d.value.userId.replace(/\+82/, "0");
      var result = $.grep(mergedData, function(dd) { return dd.survey.user === userId;});
      if (result.length > 0) {
        result[0].measuredData = d.value;
        result[0][xAxisMenu[0]] = Math.round(d.value.nomalizedUsageDurationPerDay);
        result[0][xAxisMenu[1]] = Math.round(d.value.nomalizedAppChangingCountPerDay);
      }
    });

    // mergeData에서 부적합한 데이터를 제가하는 과정에서
    // 맨 위에 정의한 Array.prototype.remove 함수를 이용하면
    // length는 21개인데 실제 데이터는 14개가 들어있는 이상한 현상이 생겨서
    // 부득이하게 임시 배열을 만들어 재구성하는 방법을 택함
    tempArray = [];
    mergedData.forEach(function(v) {
      if(typeof(v) !== 'undefined' &&
         typeof(v.measuredData) !== 'undefined' &&
         moment(v.measuredData.endTime).diff(moment(v.measuredData.startTime)) > 86400000) {
        tempArray.push(v);
      }
    });
    mergedData = tempArray;
    applyData(mergedData);
  });
}

function surveys() {
  d3.json("http://wanbok.com/surveys.json", function(error, data) {
    console.log("Survey count: " + data.length);
    data.forEach(function(d){
      d.survey.user = d.survey.user.replace(/-/gi, "");
      d[type[0]/*군별*/] = d.aggregation['class'];
      d[type[1]/*성별*/] = d.survey.sex;
      d[type[2]/*둘 다*/] = d[type[0]] + " + " + d[type[1]];
    });
    mergedData = data
    pullData();
  });
}
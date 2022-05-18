(function (React$1, ReactDOM, d3) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React$1);
  var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

  var jsonUrl ='https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json';

  var useData = function (){
  var ref = React$1.useState(null);
  var data = ref[0];
  var setData = ref[1];
    if(data){
      console.log(data[0]);
    }

    React$1.useEffect(function () {
      d3.json(jsonUrl).then(setData);
    }, []);
  return data
  };

  var AxisBottom = function (ref) {
      var xScale = ref.xScale;
      var innerHeight = ref.innerHeight;
      ref.tickFormat;

      return xScale.ticks().map(function (tickValue) {
      return (
        React.createElement( 'g', { className: "tick", key: tickValue, transform: ("translate(" + (xScale(tickValue)) + ",0)") },
          React.createElement( 'line', { y2: innerHeight }),
          React.createElement( 'text', { style: { textAnchor: "middle" }, y: innerHeight + 10, dy: "0.71rem" },
            tickValue
          )
        )
      );
    });
  };

  var yAxisTickFormat = d3.timeFormat('%M:%S');
  var AxisLeft = function (ref) {
      var yScale = ref.yScale;
      var innerWidth = ref.innerWidth;

      return yScale.ticks().map(function (tickValue) {
      console.log(tickValue);
      return (
        React.createElement( 'g', {
          className: "tick", transform: ("translate(0," + (yScale(
            tickValue
          )) + ")") },
          React.createElement( 'line', { x2: innerWidth }),
          React.createElement( 'text', {
            key: tickValue, style: { textAnchor: 'end' }, x: -15, dy: ".32em" },
            yAxisTickFormat(tickValue)
          )
        )
      );
    });
  };

  var Marks = function (ref) {
    var data = ref.data;
    var yScale = ref.yScale;
    var xScale = ref.xScale;
    var xValue = ref.xValue;
    var yValue = ref.yValue;
    ref.innerHeight;
    ref.tooltip;
    var onMouseEnter = ref.onMouseEnter;
    var onMouseOut = ref.onMouseOut;
    var doping = ref.doping;

    return (
    React.createElement( 'g', { className: "mark" },
      data.map(function (d, i) {
       	
        return (
          React.createElement( 'circle', {
            fill: doping(d) !== '' ? '#146A94':'#E58500', cx: xScale(xValue(d)), cy: yScale(yValue(d)), r: 10, onMouseEnter: function () { return onMouseEnter(d); }, onMouseOut: function () { return onMouseOut(null); }, class: "dot", 'data-xvalue': (xValue(d)), 'data-yvalue': (yValue(d)) })
        );
      })
    )
  );
  };

  var Legend = function () {
    return (
      React.createElement( 'g', { id: "legend" },
        React.createElement( 'rect', { x: -50, y: -25 }),
        React.createElement( 'g', {  transform: ("translate(0," + (0) + ")") },  
          React.createElement( 'circle', {
            fill: "#E58500", r: 15 }),
          React.createElement( 'text', { dy: '.32em', dx: '1.5em' },
            'No doping allegations'
          )
        ),
        React.createElement( 'g', { transform: ("translate(0," + (50) + ")") }, React.createElement( 'circle', {
          fill: "#146A94", r: 15 }),
        React.createElement( 'text', { dy: '.32em', dx: '1.5em' },
          'Riders with doping allegations'
        ))
        
      )
    );
  };

  var width = window.innerWidth;
  var height = window.innerHeight;
  var margin = {
    top: 20,
    bottom: 150,
    right: 30,
    left: 110,
  };

  var App = function () {
    var data = useData();
    if (!data) {
      return React__default["default"].createElement( 'pre', null, "loading.." );
    }
    console.log(data);
    var xValue = function (d) { return d["Year"]; };
    var xAxisLabel = "Date";

    var doping = function (d) { return d["Doping"]; };

    var yAxisLabel = "Time in Minutes";

    var innerHeight = height - margin.top - margin.bottom;
    var innerWidth = width - margin.right - margin.left;

    var xScale = d3.scaleLinear()
      .domain([d3.min(data, xValue), d3.max(data, xValue)])
      .range([0, innerWidth])
      .nice();

    var xAxisTickFormat = d3.timeFormat("%Y");
    d3.timeFormat("%M %S");
    d3.timeFormat(" %Y %B");

    var timeFormatting = function (m) {
      var minute = m.substr(0, 2);
      var second = m.substr(3);
      var date = new Date();
      date.setMinutes(minute);
      date.setSeconds(second);

      // yAxisTickFormat(date)
      return date;
    };
    var yValue = function (d) { return timeFormatting(d["Time"]); };
    var yScale = d3.scaleLinear().domain(d3.extent(data, yValue)).range([0, innerHeight]).nice();

    var onMouseEnter = function (e) {
      // console.log(xScale(xValue(e)),yScale(yValue(e)));
      tooldiv
        .style("visibility", "visible")
        .html(
          function () { return ((e["Name"]) + ": " + (e["Nationality"]) + "</br>Year:" + (e["Year"]) + ", Time:" + (e["Time"]) + "\n          </br>\n          " + (e["Doping"]) + "\n          "); }
        )
        .style("left", xScale(xValue(e)) + "px")
        .style("top", yScale(yValue(e)) + "px")
        .style("transition", "all 0.3s ease")
        .attr("data-year", e["Year"]);
    };
    var onMouseOut = function (e) {
      tooldiv.style("visibility", "hidden");
    };
    return (
      React__default["default"].createElement( React__default["default"].Fragment, null,
        React__default["default"].createElement( 'div', { id: "title" },
          React__default["default"].createElement( 'h1', null, "Doping in Professional Bicycle Racing" ),
          React__default["default"].createElement( 'p', null, "35 Fastest times up Alpe d'Huez" )
        ),
        React__default["default"].createElement( 'div', { className: "copyright" }, "Made by ", React__default["default"].createElement( 'a', { href: "https://thembdev.com" },
            React__default["default"].createElement( 'img', { src: "https://mbdev-utils.s3.eu-west-3.amazonaws.com/mbdev_logo_sm.svg", alt: "mbdev" })
          )
        ),
        React__default["default"].createElement( 'svg', { width: width, height: height },
          React__default["default"].createElement( 'g', { transform: ("translate(" + (margin.left) + "," + (margin.top) + ")") },
            React__default["default"].createElement( 'g', { id: "x-axis" },
              React__default["default"].createElement( AxisBottom, { innerHeight: innerHeight, xScale: xScale, tickFormat: xAxisTickFormat })
            ),
            React__default["default"].createElement( 'g', { id: "y-axis" },
              React__default["default"].createElement( AxisLeft, { yScale: yScale, innerWidth: innerWidth })
            ),

            React__default["default"].createElement( 'text', { className: "label", textAnchor: "middle", x: innerWidth / 2, y: height - margin.bottom / 1.3 },
              xAxisLabel
            ),
            React__default["default"].createElement( 'text', {
              className: "label", textAnchor: "middle", transform: ("translate(" + (-margin.left / 1.5) + "," + (innerHeight / 2) + ") rotate(-90)") },
              yAxisLabel
            ),
            React__default["default"].createElement( Marks, {
              data: data, xScale: xScale, yScale: yScale, xValue: xValue, yValue: yValue, innerHeight: innerHeight, tooltip: function (d) { return d; }, timeFormatting: timeFormatting, onMouseEnter: function (e) { return onMouseEnter(e); }, onMouseOut: function (e) { return onMouseOut(); }, doping: doping }),
            React__default["default"].createElement( 'g', { transform: ("translate(" + (innerWidth / 1.5) + "," + (100) + ")"), opacity: 0.75 },
              React__default["default"].createElement( Legend, null )
            )
          )
        )
      )
    );
  };

  var rootElement = document.getElementById("root");
  ReactDOM__default["default"].render(React__default["default"].createElement( App, null ), rootElement);

})(React, ReactDOM, d3);
//# sourceMappingURL=bundle.js.map

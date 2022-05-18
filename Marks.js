import { line, curveNatural } from 'd3';
export const Marks = ({
  data,
  yScale,
  xScale,
  xValue,
  yValue,
  innerHeight,
  tooltip,

  onMouseEnter,
  onMouseOut,
  doping
}) => (
  <g className="mark">
    {data.map((d, i) => {
     	
      return (
        <circle
          fill= {doping(d) !== '' ? '#146A94':'#E58500'}
         cx={xScale(xValue(d))}
          cy={yScale(yValue(d))}
          r={10}
          onMouseEnter={() =>
            onMouseEnter(d)
          }
          onMouseOut={() => onMouseOut(null)}
          class="dot"
          data-xvalue={(xValue(d))}
          data-yvalue={(yValue(d))}
        ></circle>
      );
    })}
  </g>
);

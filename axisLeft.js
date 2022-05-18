import { timeFormat } from 'd3';

const yAxisTickFormat = timeFormat('%M:%S');
export const AxisLeft = ({
  yScale,
  innerWidth,
}) =>
  yScale.ticks().map((tickValue) => {
    console.log(tickValue);
    return (
      <g
        className="tick"
        transform={`translate(0,${yScale(
          tickValue
        )})`}
      >
        <line x2={innerWidth} />
        <text
          key={tickValue}
          style={{ textAnchor: 'end' }}
          x={-15}
          dy=".32em"
        >
          {yAxisTickFormat(tickValue)}
        </text>
      </g>
    );
  });

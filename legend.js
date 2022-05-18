export const Legend = () => {
  return (
    <g id="legend">
      <rect x={-50} y={-25}/>
      <g  transform={`translate(0,${0})`}> 
        <circle
          fill="#E58500"
          r={15}
         
        />
        <text dy={'.32em'} dx={'1.5em'}>
          {'No doping allegations'}
        </text>
      </g>
      <g transform={`translate(0,${50})`}><circle
        fill="#146A94"
        r={15}
        
      />
      <text dy={'.32em'} dx={'1.5em'}>
        {'Riders with doping allegations'}
      </text></g>
      
    </g>
  );
};

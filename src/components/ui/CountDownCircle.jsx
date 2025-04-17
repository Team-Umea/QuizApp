const CountdownCircle = ({ initialTime, remainingTime }) => {
  const radius = 40;
  const stroke = 10;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;

  const progress = Math.max(remainingTime / initialTime, 0);
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="relative w-[80px] h-[80px]">
      <svg height={radius * 2} width={radius * 2} className="rotate-[-90deg]">
        <circle
          stroke="#3b82f6"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          style={{ transition: "stroke-dashoffset 0.3s linear" }}
        />
      </svg>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-semibold">
        {Math.ceil(remainingTime)}
      </div>
    </div>
  );
};

export default CountdownCircle;

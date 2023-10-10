const TimeSetter = ({
    time,
    setTime,
    min,
    max,
    interval,
    type,
  }) => {
    return (
      <div>
        <button onClick={() => (time > min ? setTime(time - interval) : null)} id={`${type}-decrement`}>
          dec
        </button>
        <span id={`${type}-length`}>{time / interval}</span>
        <button onClick={() => (time < max ? setTime(time + interval) : null)} id={`${type}-increment`}>
          up
        </button>
      </div>
    );
  };
  
  export default TimeSetter;
  
import { useEffect,useState } from "react";

type ClockProps = {
  isVisible: boolean;
};

const DigitalClock: React.FC<ClockProps> = ({ isVisible }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours} : ${minutes} : ${seconds}`;
  };

  return (
    <div className="clock-box front">
      <div className="weekdays">
        {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day, index) => (
          <span key={index} className={index === time.getDay() ? "highlight" : ""}>
            {day}
          </span>
        ))}
      </div>
      <div className="time">{formatTime(time)}</div>
      <div className="date">
        {time.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
      </div>
    </div>
  );
};

const AnalogClock: React.FC<ClockProps> = ({ isVisible }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  const getRotation = (unit: number, max: number) => (unit / max) * 360;

  return (
    <div className="clock-box back">
      <div className="analog-clock">
        <div className="clock-face">
          <div
            className="hand hour-hand"
            style={{ transform: `rotate(${getRotation(time.getHours() % 12, 12)}deg)` }}
          ></div>
          <div
            className="hand minute-hand"
            style={{ transform: `rotate(${getRotation(time.getMinutes(), 60)}deg)` }}
          ></div>
          <div
            className="hand second-hand"
            style={{ transform: `rotate(${getRotation(time.getSeconds(), 60)}deg)` }}
          ></div>
         {[...Array(12)].map((_, i) => {
          const number = i === 0 ? 12 : i;
          const flippedNumbers = [4, 5, 6, 7, 8,];
            return (
              <div key={i} className="hour-marker" style={{ transform: `rotate(${i * 30}deg)` }}>
                <span style={flippedNumbers.includes(number) ? { transform: "rotate(180deg)" } : {}}>
                  {number}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Clock: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className={`container ${isFlipped ? "flipped" : ""}`} onClick={() => setIsFlipped(!isFlipped)}>
      <div className="clock-wrapper">
        <DigitalClock isVisible={!isFlipped} />
        <AnalogClock isVisible={isFlipped} />
      </div>
    </div>
  );
};

export default Clock;
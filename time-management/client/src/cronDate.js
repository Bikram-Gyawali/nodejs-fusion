import { useState, useEffect } from "react";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Timepicker = (props) => {
  const { time } = props;

  return (
    <Datepicker
      selected={time}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      timeCaption="Time"
      dateFormat="h:mm aa"
      onChange={props.handleChange}
    />
  );
};

const FrequencyDropdown = (props) => {
  const { frequency } = props;

  const handleChange = (e) => {
    props.handleFrequency(e.target.value);
  };

  return (
    <select value={frequency} onChange={handleChange}>
      <option value="daily">Daily</option>
      <option value="weekly">Weekly</option>
      <option value="monthly">Monthly</option>
    </select>
  );
};

const Days = (props) => {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
    (d, i) => ({
      id: i,
      day: d,
    })
  );
  const monthdays = [...Array(31)].map((u, i) => ({
    id: i + 1,
    day: (i + 1).toString(),
  }));

  const { frequency, days } = props;
  const handleChange = (e) => {
    props.handleDayChange(+e.target.value);
  };

  if (frequency === "daily") {
    return null;
  } else if (frequency === "weekly") {
    return weekdays.map((w) => (
      <div key={w.id}>
        <input
          type="checkbox"
          value={w.id}
          checked={days.includes(w.id)}
          onChange={handleChange}
        />{" "}
        <label>{w.day}</label>
      </div>
    ));
  } else if (frequency === "monthly") {
    return monthdays.map((m) => (
      <div key={m.id}>
        <input
          type="checkbox"
          value={m.id}
          checked={days.includes(m.id)}
          onChange={handleChange}
        />{" "}
        <label>{m.day}</label>
      </div>
    ));
  }
};

const CronDate = (props) => {
  const { cron_string } = props;
  const [frequency, setFrequency] = useState("daily");
  const [time, setTime] = useState(null);
  const [days, setDays] = useState([]);

  const handleFrequency = (freq) => setFrequency(freq);
  const handleDayChange = (day) => {
    const oldDays = [...days];
    const index = oldDays.findIndex((d) => day === d);
    if (index > -1) {
      oldDays.splice(index, 1);
    } else {
      oldDays.push(day);
    }
    setDays(oldDays);
  };
  const handleChange = (date) => setTime(date);

  const allAsterisk = (chars) => {
    const asterisks = chars.filter((c) => c === "*");
    return asterisks.length === chars.length;
  };

  const noneAsterisk = (chars) => {
    const nonAsterisks = chars.filter((c) => c !== "*");
    return nonAsterisks.length === chars.length;
  };

  useEffect(() => {
    if (cron_string === "") {
      const now = new Date();
      now.setHours(18);
      now.setMinutes(0);
      now.setSeconds(0);
      now.setMilliseconds(0);
      setTime(now);
    } else {
      const [minute, hour, ...rest] = cron_string.split(" ");
      const now = new Date();
      now.setMinutes(minute);
      now.setHours(hour);
      setTime(now);
    }
  }, []);

  useEffect(() => {
    const { cron_string } = props;

    if (cron_string === "") {
      return;
    }

    const [a, b, c, d, e] = cron_string.split(" ");

    let freq;
    if (noneAsterisk([a, b]) && allAsterisk([c, d, e])) {
      freq = "daily";
    } else if (noneAsterisk([a, b, e]) && allAsterisk([c, d])) {
      freq = "weekly";
    } else if (noneAsterisk([a, b, c]) && allAsterisk([d, e])) {
      freq = "monthly";
    } else {
      console.error(`Invalid format for cron string: ${cron_string}`);
    }
    if (freq) {
      setFrequency(freq);
    }
  }, []);

  useEffect(() => {
    if (frequency === "weekly") {
      const weeklyDays = cron_string.split(" ")[4];
      if (weeklyDays === "*") {
        setDays([0, 1, 2, 3, 4, 5, 6]);
      } else if (weeklyDays.indexOf(",") > -1) {
        setDays(weeklyDays.split(",").map((d) => +d));
      } else {
        setDays([+weeklyDays]);
      }
    } else if (frequency === "monthly") {
      const monthlyDays = cron_string.split(" ")[2];
      if (monthlyDays === "*") {
        setDays([
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
        ]);
      } else if (monthlyDays.indexOf(",") > -1) {
        setDays(monthlyDays.split(",").map((d) => +d));
      } else {
        setDays([+monthlyDays]);
      }
    }
  }, [frequency]);

  useEffect(() => {
    if (time) {
      const minute = time.getMinutes();
      const hour = time.getHours();
      let output = `${minute} ${hour} `;
      if (frequency === "daily") {
        output += "* * *";
      } else if (frequency === "weekly") {
        output += `* * ${days.join(",")}`;
      } else if (frequency === "monthly") {
        output += `${days.join(",")} * *`;
      }
      props.saveNewCronString(output);
    }
  }, [frequency, days, time]);

  return (
    <>
      <td>
        <FrequencyDropdown
          frequency={frequency}
          handleFrequency={handleFrequency}
        />
      </td>
      <td>
        <Days
          frequency={frequency}
          days={days}
          handleDayChange={handleDayChange}
        />
      </td>
      <td>
        <Timepicker time={time} handleChange={handleChange} />
      </td>
    </>
  );
};

export default CronDate;

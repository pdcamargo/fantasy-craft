import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function useRelativeTime(
  date?: string | Date | null,
  intervalMs: number = 60000,
) {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    if (!date) {
      setTimeAgo("");
      return;
    }

    const updateRelativeTime = () => setTimeAgo(dayjs(date).fromNow());
    const interval = setInterval(updateRelativeTime, intervalMs);

    updateRelativeTime();

    return () => clearInterval(interval);
  }, [date, intervalMs]);

  return timeAgo;
}

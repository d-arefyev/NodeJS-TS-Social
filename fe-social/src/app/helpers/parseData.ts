const parseData = (date: string) => {
  if (!date) return "N/A";
  const parsedDate = new Date(date);
  if (isNaN(+parsedDate)) return "Invalid Date";

  const now = new Date();
  //@ts-ignore
  const diffMs = now - parsedDate;
  const diffMin = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffMin > 5 && diffMin < 60 && diffHours <= 0) {
    return `${diffMin} min${diffMin !== 1 ? "s" : ""}`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours !== 1 ? "s" : ""}`;
  } else if (diffDays < 7) {
    return `${diffDays} day${diffDays !== 1 ? "s" : ""}`;
  } else if (diffWeeks < 4) {
    return `${diffWeeks} week${diffWeeks !== 1 ? "s" : ""}`;
  } else if (diffMonths < 12) {
    return `${diffMonths} month${diffMonths !== 1 ? "s" : ""}`;
  } else {
    return `${diffYears} year${diffYears !== 1 ? "s" : ""}`;
  }
};
export default parseData;
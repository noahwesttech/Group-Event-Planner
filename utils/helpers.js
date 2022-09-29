module.exports = {
  format_date: (date) => {
    return `${new Date(date).getDate()}/${
      new Date(date).getMonth() + 1
    }/${new Date(date).getFullYear()}`;
  },
  is_equal: (a, b) => {
    if (a == b) {
      return true;
    }
  },
  is_greater: (a) => {
    if (a > 0) {
      return true;
    }
  },
  format_new_date: (date) => {
    let newDate = new Date(date);
    return `${newDate.toLocaleString("default", {year: "numeric"})}-${newDate.toLocaleString("default", { month: "2-digit" })}-${newDate.toLocaleString("default", { day: "2-digit" })}`
  }
};

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
  }
};

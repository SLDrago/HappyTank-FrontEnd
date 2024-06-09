class UtilsSvc {
  getDateDifferent = (date: any) => {
    let current_date = new Date();

    // previous date
    let previous_date = new Date(date);

    // finding the difference in total seconds between two dates
    let second_diff = (current_date.getTime() - previous_date.getTime()) / 1000;

    // showing the relative timestamp.
    if (second_diff < 60) {
      return second_diff.toFixed() + "s";
    } else if (second_diff < 3600) {
      return (second_diff / 60).toFixed() + "m";
    } else if (second_diff < 86400) {
      return (second_diff / 3600).toFixed() + "h";
    } else if (second_diff < 2620800) {
      return (second_diff / 86400).toFixed() + "d";
    } else if (second_diff < 31449600) {
      return (second_diff / 2620800).toFixed() + "m";
    } else {
      return (second_diff / 31449600).toFixed() + "y";
    }
  };

  numberkFormatter(num: number) {
    return Math.abs(num) > 999
      ? (Math.sign(num) * (Math.abs(num) / 1000)).toFixed(1) + "k"
      : (Math.sign(num) * Math.abs(num)).toString();
  }
}
export default new UtilsSvc();

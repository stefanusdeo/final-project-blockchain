import moment from "moment";
export const formattedDate = (dateString) => {
  return moment(dateString).format("DD-MM-YYYY");
};

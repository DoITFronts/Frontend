const getDayStyle = (
  date: Date,
  tempDate: Date | null,
  selectedDate: Date | null,
) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isToday = date.getTime() === today.getTime();
  const isSelected = tempDate?.getTime() === date.getTime();
  const isFiltered = selectedDate?.getTime() === date.getTime();

  return {
    width: "32px",
    height: "32px",
    display: "flex",
    padding: "10px",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "5px",
    color: "#8c8c8c",

    ...(isToday && { fontWeight: "bold", color: "black" }),
    ...(isSelected || isFiltered
      ? { backgroundColor: "black", color: "white" }
      : {}),
  };
};

export default getDayStyle;

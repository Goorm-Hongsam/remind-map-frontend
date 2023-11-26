export const formatDateWithDay = inputDateString => {
  const inputDate = new Date(inputDateString);

  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, '0');
  const day = String(inputDate.getDate()).padStart(2, '0');

  const formattedDate = `${year}년 ${month}월 ${day}일`;

  return formattedDate;
};

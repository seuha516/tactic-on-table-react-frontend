export const makeRoomMargin = (itemsForRow, idx) => {
  const column = idx % itemsForRow;
  if (itemsForRow === 3) {
    if (column === 0) {
      return '10px calc(calc(100% - min(94.5%, 900px)) / 8) 10px calc(calc(100% - min(94.5%, 900px)) / 4)';
    } else if (column === 1) {
      return '10px calc(calc(100% - min(94.5%, 900px)) / 8) 10px calc(calc(100% - min(94.5%, 900px)) / 8)';
    } else {
      return '10px calc(calc(100% - min(94.5%, 900px)) / 4) 10px calc(calc(100% - min(94.5%, 900px)) / 8)';
    }
  } else if (itemsForRow === 2) {
    if (column === 0) {
      return '10px calc(calc(100% - min(94%, 600px)) / 6) 10px calc(calc(100% - min(94%, 600px)) / 3)';
    } else {
      return '10px calc(calc(100% - min(94%, 600px)) / 3) 10px calc(calc(100% - min(94%, 600px)) / 6)';
    }
  } else {
    return '10px calc(calc(100% - min(92%, 350px)) / 2)';
  }
};

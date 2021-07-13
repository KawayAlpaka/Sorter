export const jsSort = (propList: number[]) => {
  const list = [...propList];
  list.sort((a, b) => {
    return a - b;
  });
  return list;
}
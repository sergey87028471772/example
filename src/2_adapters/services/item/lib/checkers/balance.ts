export const isLowBalance = (
  totalPrice: number,
  userBalance: number
): boolean => {
  return totalPrice > userBalance;
};

const matchUserId = (array: any[], id: string): boolean => {
  return array.some(item => item.id === id);
};

export default matchUserId

// export const matchUserId = (array: any[], id: string): boolean => {
    
// };
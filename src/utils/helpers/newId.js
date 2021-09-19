let lastId = 0;

export const newId = (prefix='uniqueId') => {
  lastId+=1;
  return `${prefix}-${lastId}`;
}
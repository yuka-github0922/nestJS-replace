export const nonEmptyString = (value: string) => {
  if (value === '') {
    throw new Error('Name must not be empty');
  }
  return value;
};

export const isDateString = (value) => {
  // JavaScriptのDateオブジェクトを使用して文字列が有効な日付文字列かどうかを確認します
  const date = new Date(value);
  return !isNaN(date.getTime());
};

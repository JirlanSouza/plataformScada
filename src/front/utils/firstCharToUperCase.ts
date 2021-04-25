export function firstCharToUpCase (word: string) {
  let wordResult = word.split('');
  wordResult[0] = wordResult[0].toUpperCase();
  return wordResult.join('');
}
import { v4 as uuidv4 } from 'uuid';

export const getUuid = () => uuidv4();

export const getFirstWords = (text: string, wordCount: number) => {
  const regex = new RegExp(`(\\S+\\s?){1,${wordCount}}`);
  return text.match(regex)?.[0].trim() || '';
}
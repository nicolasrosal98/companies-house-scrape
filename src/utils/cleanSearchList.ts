export default function cleanSearchList(input: string): string[] {
  const searchList = input.split("+");
  return searchList;
}

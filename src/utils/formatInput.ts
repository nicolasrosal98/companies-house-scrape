export default function formatInput(input: string): string[] {
  const formattedInput = input.replace(/ /g, "").split(",");
  return formattedInput;
}

/**
 * TypeScript port of TestLogicalInput/Program.cs.
 *
 * For each round: a top half growing from 0 to `max` symbols, then a bottom half
 * shrinking from `max - 1` back to 0. The symbol is the display number
 * (the C# version always printed "*"). Lines with 0 symbols are blank, as in C#.
 */
export function buildPattern(display: number, max: number, rounds: number): string[] {
  const symbol = String(display)
  const lines: string[] = []

  for (let i = 0; i < rounds; i++) {
    // Top half
    for (let j = 0; j <= max; j++) {
      lines.push(symbol.repeat(j))
    }
    // Bottom half
    for (let j = max - 1; j >= 0; j--) {
      lines.push(symbol.repeat(j))
    }
  }

  return lines
}

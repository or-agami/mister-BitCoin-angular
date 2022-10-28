export class Move {

  constructor(
    public amount: number = 0,
    public to: string = '',
    public at = Date.now()
  ) {
  }
}
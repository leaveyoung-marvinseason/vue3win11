export type Comparator<T> = (a: T, b: T) => number;

export class PriorityQueue<T> {
  private readonly items: T[];
  private readonly comparator: Comparator<T>;

  constructor(comparator: Comparator<T>) {
    this.items = [];
    this.comparator = comparator;
  }

  enqueue(value: T): void {
    let added = false;

    for (let i = 0; i < this.items.length; i++) {
      if (this.comparator(value, this.items[i]) < 0) {
        this.items.splice(i, 0, value);
        added = true;
        break;
      }
    }

    if (!added) {
      this.items.push(value);
    }
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  peek(): T | undefined {
    return this.items.length > 0 ? this.items[0] : undefined;
  }

  size(): number {
    return this.items.length;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

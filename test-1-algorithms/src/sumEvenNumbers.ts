interface Frame {
  owner: object;
  children: unknown[];
  next: number;
}

/**
 *
 * Algoritma: DFS iteratif dengan stack eksplisit (bukan rekursi), sehingga
 * kedalaman nesting tidak dibatasi oleh call stack JavaScript.
 *
 * - `onPath` hanya berisi objek pada jalur yang sedang ditelusuri: referensi
 *   melingkar tidak membuat loop tak berujung, sedangkan objek yang dipakai di
 *   dua tempat tetap dihitung di tiap kemunculannya.
 * - Waktu O(n) terhadap jumlah nilai, ruang O(kedalaman).
 */
export function sumEvenNumbers(input: unknown): number {
  let total = 0;
  const frames: Frame[] = [];
  const onPath = new WeakSet<object>();

  const visit = (value: unknown): void => {
    if (typeof value === "number") {
      if (Number.isInteger(value) && value % 2 === 0) total += value;
      return;
    }

    // typeof null === 'object', jadi null harus dicek terpisah
    if (typeof value !== "object" || value === null || onPath.has(value)) return;

    onPath.add(value);
    frames.push({ owner: value, children: Object.values(value), next: 0 });
  };

  visit(input);

  while (frames.length > 0) {
    const frame = frames[frames.length - 1];

    if (frame.next < frame.children.length) {
      visit(frame.children[frame.next++]);
    } else {
      onPath.delete(frame.owner);
      frames.pop();
    }
  }

  return total;
}

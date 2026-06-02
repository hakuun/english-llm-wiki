let locked = false;

export async function withFileLock<T>(operation: () => Promise<T>): Promise<T> {
  if (locked) {
    throw new Error('Another write operation is already running.');
  }

  locked = true;
  try {
    return await operation();
  } finally {
    locked = false;
  }
}

export function isFileLocked(): boolean {
  return locked;
}

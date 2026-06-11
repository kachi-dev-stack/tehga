export async function dbFetch<T>(
  fetcher: () => Promise<T>,
  fallback: T,
): Promise<T> {
  try {
    const result = await fetcher();
    return result ?? fallback;
  } catch {
    return fallback;
  }
}

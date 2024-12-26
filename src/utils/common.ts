export function ensureArray<T>(data: T | Record<string, T> | T[]): T[] {
    if (Array.isArray(data)) {
      return data; // Eğer zaten array ise aynen döner.
    }
    if (typeof data === 'object' && data !== null) {
      // Eğer bir object ise, object'in value'larını array'e çevir
      return Object.values(data);
    }
    return [data]; // Diğer durumlarda (örneğin, primitive değerler) array içine alır.
  }



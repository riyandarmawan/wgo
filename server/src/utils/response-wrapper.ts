export function wrapResponse<T>(message: string, data: T) {
  return { message, data };
}

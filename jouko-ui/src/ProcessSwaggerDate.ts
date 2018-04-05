export function processSwaggerDate(swaggerDate: Date) {
  const seconds = new Date(swaggerDate).getTime();
  return new Date(seconds * 1000);
}
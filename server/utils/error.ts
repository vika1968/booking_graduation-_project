export const createError = (status: number, message: string): Error => {
  const err: any = new Error();
  err.status = status;
  err.message = message;
  return err;
};
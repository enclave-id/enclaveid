import { hash, verify } from 'argon2';

export async function hashPassword(password) {
  // Argon2 already handles salting
  return await hash(password);
}

export async function verifyPassword(userInputPassword, storedHashPassword) {
  return await verify(storedHashPassword, userInputPassword);
}

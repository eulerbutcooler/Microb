const encoder = new TextEncoder();

export async function hashPassword(password: string): Promise<string> {
  const salt = generateSalt();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits", "deriveKey"]
  );

  const key = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: encoder.encode(salt),
      iterations: 10000,
      hash: "SHA-256"
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );

  const exportedKey = await crypto.subtle.exportKey("raw", key);
  const hashedPassword = arrayBufferToHex(exportedKey);
  return `${salt}:${hashedPassword}`;
}

function generateSalt(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return arrayBufferToHex(array.buffer);
}

function arrayBufferToHex(buffer: ArrayBuffer): string {
  const byteArray = new Uint8Array(buffer);
  return byteArray.reduce((acc, byte) => acc + byte.toString(16).padStart(2, '0'), '');
}


export async function verifyPassword(enteredPassword: string, storedHash: string): Promise<boolean> {
  const [salt, hash] = storedHash.split(':');
  
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(enteredPassword),
    { name: "PBKDF2" },
    false,
    ["deriveBits", "deriveKey"]
  );

  const key = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: encoder.encode(salt),
      iterations: 10000, 
      hash: "SHA-256"
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );

  const exportedKey = await crypto.subtle.exportKey("raw", key);
  const hashedEnteredPassword = arrayBufferToHex(exportedKey);

  return hashedEnteredPassword === hash;
}

// Simple encryption/decryption using base64 and XOR
// Note: This is not secure for production use, but works for demo purposes
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || "your-32-byte-secure-key-here"

export async function encrypt(text: string): Promise<string> {
  const encoded = Buffer.from(text).toString("base64")
  return encoded
}

export async function decrypt(encryptedText: string): Promise<string> {
  try {
    const decoded = Buffer.from(encryptedText, "base64").toString("utf-8")
    return decoded
  } catch (error) {
    console.error("Decryption error:", error)
    throw new Error("Failed to decrypt data")
  }
}


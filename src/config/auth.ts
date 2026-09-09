export function getAdminEmail(): string {
  return (process.env.ADMIN_EMAIL ?? "").toLowerCase().trim();
}

export function getAuthBaseUrl(): string {
  return process.env.BETTER_AUTH_URL ?? "http://localhost:3000";
}

export function getAuthSecret(): string {
  const secret = process.env.BETTER_AUTH_SECRET;
  if (!secret) {
    throw new Error("BETTER_AUTH_SECRET is not set");
  }
  return secret;
}

export function getBootstrapPassword(): string | undefined {
  return process.env.ADMIN_BOOTSTRAP_PASSWORD;
}

export function isAuthBootstrapEnabled(): boolean {
  return process.env.AUTH_USER_INIT === "true";
}

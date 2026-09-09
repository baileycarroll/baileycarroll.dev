import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { passkey } from "@better-auth/passkey";
import { nextCookies } from "better-auth/next-js";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { prisma } from "@/lib/database";
import {
  getAdminEmail,
  getAuthBaseUrl,
  isAuthBootstrapEnabled,
} from "@/config/auth";
import { adminHasPasskey, isAdminEmail } from "@/lib/auth-admin";

const baseURL = getAuthBaseUrl();
const trustedOrigin = new URL(baseURL).origin;

function getPasskeyRpId(): string {
  const hostname = new URL(baseURL).hostname;
  return hostname === "localhost" ? "localhost" : hostname;
}

const authSecret = process.env.BETTER_AUTH_SECRET;
if (!authSecret) {
  throw new Error("BETTER_AUTH_SECRET is not set");
}

export const auth = betterAuth({
  secret: authSecret,
  baseURL,
  trustedOrigins: [trustedOrigin],
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    disableSignUp: false,
  },
  plugins: [
    passkey({
      rpID: getPasskeyRpId(),
      rpName: "Bailey Carroll Admin",
      origin: trustedOrigin,
    }),
    nextCookies(),
  ],
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      const adminEmail = getAdminEmail();

      if (ctx.path.startsWith("/sign-up")) {
        const email =
          typeof ctx.body?.email === "string"
            ? ctx.body.email.toLowerCase().trim()
            : "";
        const userCount = await prisma.user.count();
        const allowBootstrap =
          isAuthBootstrapEnabled() && userCount === 0 && email === adminEmail;

        if (!allowBootstrap) {
          throw new APIError("BAD_REQUEST", {
            message: "Registration is disabled.",
          });
        }
      }

      if (ctx.path === "/sign-in/email") {
        const email =
          typeof ctx.body?.email === "string"
            ? ctx.body.email.toLowerCase().trim()
            : "";

        if (!isAdminEmail(email)) {
          throw new APIError("FORBIDDEN", {
            message: "Access denied.",
          });
        }

        const user = await prisma.user.findUnique({ where: { email } });
        if (user && (await adminHasPasskey(user.id))) {
          throw new APIError("BAD_REQUEST", {
            message: "Password sign-in is disabled. Use your passkey.",
          });
        }
      }
    }),
  },
});

export type Session = typeof auth.$Infer.Session;

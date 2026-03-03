import { AuthService } from "../../infra/auth/service";
import type { Static } from "elysia";
import type {
  signInResponseSchema,
  signInSchema,
} from "../../models/schemas/signin";
import { NotAuthorizedError } from "../../models/errors/http-error";
import { JWT_TTL } from "../../constants/jwt";

export type SignInInput = Static<typeof signInSchema>;

export abstract class SignInService {
  static async signIn(
    input: SignInInput,
  ): Promise<Static<typeof signInResponseSchema>> {
    const user = await validateCredentials(input.email, input.password);
    if (!user) throw NotAuthorizedError("Invalid credentials");
    // TODO: Replace with real credential validation (e.g. hash compare, DB lookup)
    const token = await AuthService.generateToken({
      userId: user.id,
      email: user.email,
    });

    return { token, expiresIn: JWT_TTL };
  }
}

async function validateCredentials(
  email: string,
  _password: string,
): Promise<{ id: number; email: string } | null> {
  // TODO: Replace with real credential validation (e.g. hash compare, DB lookup)
  if (!email) return null;
  return { id: 1, email };
}

import { verify } from "jsonwebtoken";

function verifyJwtToken(jwtToken: string): { id: string } | null {
  try {
    return verify(jwtToken, process.env.JWT_SECRET || "") as { id: string };
  } catch {
    return null;
  }
}

export default verifyJwtToken;

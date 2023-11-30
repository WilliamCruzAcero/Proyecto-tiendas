import { createCookieSessionStorage } from "@remix-run/node";

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET || 'myProofOfConceptSecret!#'],
    secure: process.env.NODE_ENV === "production",
  },
});

async function getSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

export async function logout(request: Request) {
  const session = await getSession(request);
  return sessionStorage.destroySession(session);
}

export async function createUserSession({ request, userId, remember }: { request: Request; userId: number; remember: boolean; }) {
  const session = await getSession(request);
  session.set("userId", userId);
  return sessionStorage.commitSession(session, {
    maxAge: remember ? 60 * 60 * 24 * 7 : undefined
  });
}

export async function getUserId(request: Request): Promise<number | undefined> {
  const session = await getSession(request);
  const userId = session.get("userId");
  return parseInt(userId);
}
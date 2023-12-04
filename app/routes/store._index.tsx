import { redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { getUserId } from "~/utils/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {

  // Protected route
  const userId = await getUserId(request);
  if (!userId) {
    const current = new URL(request.url);
    const searchParams = new URLSearchParams([["redirectTo", current.pathname + current.search]]);
    throw redirect(`/login?${searchParams}`);
  }
  // Protected route
 
  return redirect(`/store/${userId}`)
};
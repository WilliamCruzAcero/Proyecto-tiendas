import { redirect, type ActionFunctionArgs, type LoaderFunctionArgs, json, type MetaFunction } from "@remix-run/node";
import { Form, Link, useSearchParams } from "@remix-run/react";
import { verifyLogin } from "api/login/login.server";
import { AppError } from "api/shared/errors/appError";
import { safeRedirect } from "~/utils/safeRedirect.server";
import { createUserSession, getUserId } from "~/utils/session.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Login" },
    { name: "description", content: "Welcome to Login!" },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const remember = formData.get("remember") as string;

    console.log({
      email,
      password,
      remember
    })

    const redirectTo = safeRedirect(formData.get("redirectTo") as string);
    const user = verifyLogin(email, password);

    const cookie = await createUserSession({
      request,
      userId: user.id,
      remember: remember === "on"
    });

    return redirect(redirectTo, {
      headers: {
        "Set-Cookie": cookie,
      },
    });
  } catch (error: any) {
    if (error instanceof AppError) {
      throw new Response(error.message, { status: error.code });
    } else {
      throw new Response('InternalServerError', { status: 500 })
    }
  }
}

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await getUserId(request);
  if (userId) return redirect("/store");
  return json({});
}

export default function Login() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/store";
 
  return (
    <Form method="post">
      <label>
        <span>Email</span>
        <input
          name="email"
          type="email"
          placeholder="example@email.com"
        />
      </label>
      <label>
        <span>Password</span>
        <input
          name="password"
          type="password"
          placeholder="123456"
        />
      </label>
      <label>
        <span>Remember me</span>
        <input name="remember" type="checkbox" />
      </label>
      <button type="submit">Login</button>
      <Link to={'/user'}><button>Crear cuenta</button></Link>
      <input type="hidden" name="redirectTo" value={redirectTo} />
    </Form>
  );
}
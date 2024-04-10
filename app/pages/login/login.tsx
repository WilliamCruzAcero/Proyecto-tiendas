import { type TypedResponse , redirect, type ActionFunctionArgs, type LoaderFunctionArgs, json, type MetaFunction, type LinksFunction } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import { verifyLogin } from "api/login/login.server";
import { AppError } from "api/shared/errors/appError";
import { safeRedirect } from "~/utils/safeRedirect.server";
import { createUserSession, getUserId } from "~/utils/session.server";
import style from "./login.css";
import { validate } from "api/shared/types/typebox.parse";
import type { LoginBody } from "api/login/login.body";
import { loginBodyValidator } from "api/login/login.body";
import type { User } from "api/user/types/user";

export const meta: MetaFunction = () => {
  return [
    { title: "Login" },
    { name: "description", content: "Welcome to Login!" },
  ];
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: style },
];

type LoginBodyErrors = {
  remenber?: string;
  email?: string;
  password?: string;
}

type ActionResponse = {
  data: User | null;
  formErrors: LoginBodyErrors | null;
  appError: { code: number, message: string } | null
}

export async function action({ request }: ActionFunctionArgs): Promise<ActionResponse | TypedResponse<never>> {

  const formData = await request.formData();
  const redirectTo = safeRedirect(formData.get("redirectTo") as string);

  try {
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
      remember: formData.get("remember")
    }

    const erros = validate(loginBodyValidator, data);
    let formDataErros: LoginBodyErrors = {};

    erros.forEach(e => {
      const name = e.instancePath.replace("/", "") as keyof LoginBody;
      formDataErros[name] = 'Complete este campo';
    })

    if (erros.length) {
      return {
        data: null,
        formErrors: formDataErros,
        appError: null
      }
    }

    const { user } = await verifyLogin(data);

    const cookie = await createUserSession({
      request,
      userId: user.id,
      remember: data.remember === "on"
    });

    return redirect(redirectTo, {
      headers: {
        "Set-Cookie": cookie,
      },
    });
  } catch (error: any) {
    if (error instanceof AppError) {
      return {
        appError: {
          code: error.code,
          message: error.message,
        },
        formErrors: null,
        data: null
      }
    }
    else {
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
  const resp = useActionData<typeof action>()
  
  return (
    <div className="login-container">
      <Form method="post">
        <h1>Iniciar Sesión</h1>
        <label>
          <span>Email</span>
          <input
            name="email"
            type="email"
            placeholder="example@email.com"
          />
          <span>
            {resp?.appError?.message || ""}
            {resp?.formErrors?.email || ""}
          </span>
        </label>
        <label>
          <span>Password</span>
          <input
            name="password"
            type="password"
            placeholder="123456"
          />
          <span>
            {resp?.formErrors?.password || ""}
          </span>
        </label>
        <label>
          <span>Remember me</span>
          <input name="remember" type="checkbox" />
        </label>
        <button type="submit">Login</button>
        <input type="hidden" name="redirectTo" value={redirectTo} />
      </Form>
      <Link to={'/user'}>Registrarse</Link>
    </div>
  );
}
import { redirect, type ActionFunctionArgs, type MetaFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { logout } from "~/utils/session.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Logout" },
    { name: "description", content: "Welcome to Logout!" },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  const cookie = await logout(request);

  return redirect("/", {
    headers: {
      "Set-Cookie": cookie 
    },
  });
}

export default function LogoutRoute() {
  return (
    <>
      <p>Are you sure you want to log out?</p>
      <br></br>
      <Form method="post">
        <p>
          <button type="submit">Logout</button>
        </p>
      </Form>
    </>
  );
}
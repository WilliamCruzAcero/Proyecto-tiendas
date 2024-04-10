import { redirect, type ActionFunctionArgs, type LinksFunction } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { createProduct } from "api/product/services.server";
import { createproductBodyValidator, type CreateProductBody } from "api/product/types/createProduct.body";
import { AppError } from "api/shared/errors/appError";
import { parse, validate } from "api/shared/types/typebox.parse";
import { stringToNumber } from "api/shared/utils/stringToNumber";
import styles from './create.css';

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: styles },

];

export async function action({ request, params }: ActionFunctionArgs) {
    const formData = await request.formData();

    try {

        const data = {
            store: params.storeId,
            name: formData.get("name"),
            image: formData.get("image")
        }

        const errors = validate(createproductBodyValidator, data);
        let formDataErros: Partial<CreateProductBody> = {};

        errors.forEach(e => {
            const name = e.instancePath.replace("/", "") as keyof CreateProductBody;
            formDataErros[name] = e.message
        });

        if (errors.length) {
            return {
                data: null,
                errors: formDataErros
            }
        }

        const input = parse<CreateProductBody>(createproductBodyValidator, data);

        await createProduct({
            name: input.name,
            image: input.image,
            store: stringToNumber(input.store, 'Tienda')
        });

        return redirect(`/store/${input.store}`);

    } catch (error: any) {
        if (error instanceof AppError) {
            throw new Response(error.message, { status: error.code });
        } else {
            throw new Response('InternalServerError', { status: 500 })
        }
    }

}

export default function CreateProduct() {
    const resp = useActionData<typeof action>();

    return (
        <div className="create-product">
            <Form method="post">
                <label>
                    <span>Name</span>
                    <input
                        name="name"
                        type="text"
                    />
                    <span>
                        {resp?.errors?.name || ''}
                    </span>
                </label>
                <label>
                    <span>Image</span>
                    <input
                        name="image"
                        type="url"
                        placeholder="https://encrypted-tbn0.gstatic.com/"
                    />
                    <span>
                        {resp?.errors?.image || ''}
                    </span>
                </label>
                <button type="submit">Create</button>
            </Form>
        </div>
    );
}
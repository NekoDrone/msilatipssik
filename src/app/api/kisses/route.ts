import db from "@/db";
import { kissesInsertSchema, kissesSchema } from "@/db/schema";

export const GET = async () => {
    const kisses = await db.select().from(kissesSchema);

    return new Response(JSON.stringify(kisses), {
        status: 200,
        statusText: "OK",
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const POST = async (req: Request) => {
    const postBody: unknown = await req.json()
    const { data, success, error } = kissesInsertSchema.safeParse(postBody)
    if (!success) {
        const response = {
            status: "error",
            error: {
                message:
                    "Invalid data. Please ensure that you provide the correct type.",
                details: error,
                type: "Type error.",
            },
        };

        return new Response(JSON.stringify(response), {
            status: 400,
            statusText: "Bad Request",
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    const { reason } = data
    const now = new Date()

    await db.insert(kissesSchema).values({
        reason,
        createdAt: now,
        updatedAt: now,
    })
    

    return new Response(JSON.stringify({
        status: "success"
    }), {
        status: 200,
        statusText: "OK",
        headers: {
            "Content-Type": "application/json",
        },
    });
};

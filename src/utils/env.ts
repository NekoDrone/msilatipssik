const kissRecipient = process.env.NEXT_PUBLIC_KISS_RECIPIENT;

if (kissRecipient === undefined)
    throw new Error(
        "NEXT_PUBLIC_KISS_RECIPIENT environment variable not set. Please ensure you've set it in the running environment, or in the .env file.",
    );

export const NEXT_PUBLIC_KISS_RECIPIENT = kissRecipient;

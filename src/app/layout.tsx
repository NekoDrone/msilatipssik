"use client";

import "./globals.css";
import { Suspense, type FC, type ReactNode } from "react";
import { lexend } from "@/utils/styles/font";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useSearchParams } from "next/navigation";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export interface LayoutProps {
    children: ReactNode;
}

const RootLayoutWrapper: FC<LayoutProps> = ({ children }) => {
    const reactQuery = new QueryClient();

    const searchParams = useSearchParams();

    const kissRecipient = searchParams.get("recipient");

    return (
        <Suspense>
            <html lang="en">
                <head>
                    <meta charSet="UTF-8" />
                    <meta name="viewport" content="width=device-width" />
                    <Suspense fallback={<title>Loading...</title>}>
                        <title>
                            {kissRecipient === null
                                ? "Be specific!"
                                : `${kissRecipient}'s Kiss Debt Counter`}
                        </title>
                    </Suspense>
                </head>
                <body
                    className={`${lexend.className} bg-ctp-base text-ctp-text font-light antialiased`}
                >
                    <Suspense fallback=<LoadingSpinner />>
                        <QueryClientProvider client={reactQuery}>
                            {children}
                            <ReactQueryDevtools initialIsOpen={false} />
                        </QueryClientProvider>
                    </Suspense>
                </body>
            </html>
        </Suspense>
    );
};

const RootLayout: FC<LayoutProps> = ({ children }) => {
    return (
        <Suspense>
            <RootLayoutWrapper>{children}</RootLayoutWrapper>
        </Suspense>
    );
};

export default RootLayout;

"use client";
import { KissCounter } from "@/components/KissCounter";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const IndexPage = () => {
    const searchParams = useSearchParams();

    const kissRecipient = searchParams.get("recipient");

    return (
        <Suspense>
            <div className="bg-ctp-base flex min-h-screen flex-col items-center justify-center gap-8">
                <div className="flex flex-col items-center gap-1">
                    <h1 className="text-2xl font-semibold">Msilatipssik</h1>
                    <h2 className="text-lg font-normal">
                        (the reverse of Kisspitalism)
                    </h2>
                </div>
                <Suspense fallback=<LoadingSpinner />>
                    {kissRecipient ? (
                        <KissCounter name={kissRecipient} />
                    ) : (
                        <div>
                            <p>Who you gonna kiss???</p>
                        </div>
                    )}
                </Suspense>
            </div>
        </Suspense>
    );
};

export default IndexPage;

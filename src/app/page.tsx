"use client";
import { KissCounter } from "@/components/KissCounter";
import { NEXT_PUBLIC_KISS_RECIPIENT } from "@/utils/env";

const IndexPage = () => {
    return (
        <div className="bg-ctp-base flex min-h-screen flex-col items-center justify-center gap-8">
            <div className="flex flex-col items-center gap-1">
                <h1 className="text-2xl font-semibold">Msilatipssik</h1>
                <h2 className="text-lg font-normal">
                    (the reverse of Kisspitalism)
                </h2>
            </div>
            <KissCounter name={NEXT_PUBLIC_KISS_RECIPIENT} />
        </div>
    );
};

export default IndexPage;

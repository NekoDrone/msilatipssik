import { kissesSelectArraySchema, type Kisses } from "@/db/schema";
import { useEffect, useState } from "react";

export const KissCounter = ({ name }: { name: string }) => {
    const [kisses, setKisses] = useState<Kisses[] | undefined>();

    useEffect(() => {
        const fetchAndSave = async () => {
            const req = new Request("/api/kisses", { method: "GET" });
            const res = await fetch(req);
            const body: unknown = await res.json();
            const {
                data: kisses,
                success,
                error,
            } = kissesSelectArraySchema.safeParse(body);
            if (!success) {
                console.log(error);
                return [] as Kisses[];
            }
            return kisses;
        };

        fetchAndSave()
            .then((kisses) => {
                setKisses(kisses);
            })
            .catch((e: unknown) => {
                console.log(e);
            });
    }, []);
    return (
        <div>
            {kisses && (
                <div>
                    <div>
                        {name} is {kisses.length} kisses in debt.
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        {kisses.map((kiss) => {
                            return <div key={kiss.id}>{kiss.reason}</div>;
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

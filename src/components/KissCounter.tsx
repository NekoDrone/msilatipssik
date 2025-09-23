import { LoadingSpinner } from "@/components/LoadingSpinner";
import { kissesSelectArraySchema, type Kisses } from "@/db/schema";
import { useQuery } from "@tanstack/react-query";

export const KissCounter = ({ name }: { name: string }) => {
    const kissesQuery = useQuery({
        queryKey: ["kisses", name],
        queryFn: async () => {
            const req = new Request(`/api/kisses?recipient=${name}`, {
                method: "GET",
            });
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
            return kisses.toSorted((a, b) => {
                return b.id - a.id;
            });
        },
    });

    const { data: kisses, error, isPending } = kissesQuery;

    return (
        <div>
            {isPending ? (
                <LoadingSpinner />
            ) : error ? (
                <div>
                    {error.name}: {error.message}
                </div>
            ) : (
                <div className="flex flex-col items-center gap-4">
                    <p className="">
                        {name} is{" "}
                        <span className="text-ctp-mauve font-semibold underline">
                            {kisses.length}
                        </span>{" "}
                        {kisses.length === 1 ? "kiss" : "kisses"} in debt
                    </p>
                    <div className="flex flex-col items-center gap-2">
                        {kisses.map((kiss, idx) => {
                            return (
                                <div
                                    key={idx}
                                    className="flex w-full justify-start gap-4 text-sm"
                                >
                                    <p className="text-ctp-green">
                                        {kisses.length - idx}.
                                    </p>
                                    <div className="flex gap-1">
                                        <p>{kiss.reason},</p>
                                        <p>
                                            on{" "}
                                            <span className="text-ctp-red">
                                                {kiss.updatedAt.toLocaleDateString(
                                                    "en-SG",
                                                    {
                                                        weekday: "long",
                                                    },
                                                )}
                                            </span>
                                            {", the "}
                                            {kiss.updatedAt.toLocaleDateString(
                                                "en-SG",
                                                {
                                                    day: "numeric",
                                                },
                                            )}
                                            {(() => {
                                                const dayNumber =
                                                    kiss.updatedAt.getDate();
                                                switch (dayNumber % 10) {
                                                    case 1:
                                                        return "st";
                                                    case 2:
                                                        return "nd";
                                                    case 3:
                                                        return "rd";
                                                    default:
                                                        return "th";
                                                }
                                            })()}
                                            {" of "}
                                            {kiss.updatedAt.toLocaleDateString(
                                                "en-SG",
                                                {
                                                    month: "long",
                                                    year: "numeric",
                                                },
                                            )}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

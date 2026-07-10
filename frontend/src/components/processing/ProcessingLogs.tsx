interface Props {
    logs: string[];
}

export default function ProcessingLogs({
    logs,
}: Props) {

    return (

        <div className="rounded-xl border p-6">

            <h3 className="mb-4 font-semibold">

                Activity

            </h3>

            <div className="space-y-2 text-sm">

                {logs.map((log, index) => (

                    <p key={index}>
                        • {log}
                    </p>

                ))}

            </div>

        </div>

    );

}
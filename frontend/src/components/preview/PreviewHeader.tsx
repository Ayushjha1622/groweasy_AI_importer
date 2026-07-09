interface Props {
    fileName: string;
}

export default function PreviewHeader({
    fileName,
}: Props) {
    return (
        <div className="mb-8">
            <h1 className="text-3xl font-bold">
                CSV Preview
            </h1>

            <p className="mt-2 text-muted-foreground">
                {fileName}
            </p>
        </div>
    );
}
export interface UploadResponse {

    success: boolean;

    message: string;

    data: {

        fileId: string;

        fileName: string;

        originalName: string;

        size: number;

        path: string;

    };

}
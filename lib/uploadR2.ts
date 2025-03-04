import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

type Response = {
    success: boolean,
    message: string,
    key?: string
};

const s3 = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID !,
        secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!
    }
});

export async function R2Upload(file: File, campaignName: string): Promise<Response> {

    const buffer = await file.arrayBuffer();
    const uniqueFileName = `${campaignName}/${file.name}`;

    try {
        const command = new PutObjectCommand({
            Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
            Key: uniqueFileName,
            Body: Buffer.from(buffer),
            ContentType: file.type
        })

        await s3.send(command);

        const fileUrl = `https://${process.env.CLOUDFLARE_R2_SUBDOMAIN}/${uniqueFileName}`;

        return {
            success: true,
            message: "File Uploaded Successfully",
            key: fileUrl
        }

    } catch (error: any) {
        console.log(error.message);
        
        return {
            success: false,
            message: "Error Uploading to R2"
        }
    }
}
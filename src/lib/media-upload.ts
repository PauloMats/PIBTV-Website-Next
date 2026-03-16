const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

export function canUseDirectUpload() {
  return Boolean(cloudName && uploadPreset);
}

export async function uploadMediaAsset(
  file: File,
  resourceType: "IMAGE" | "VIDEO",
) {
  if (!cloudName || !uploadPreset) {
    throw new Error(
      "Upload direto não configurado. Defina NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME e NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET.",
    );
  }

  const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/${
    resourceType === "VIDEO" ? "video" : "image"
  }/upload`;
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const response = await fetch(endpoint, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Não foi possível enviar o arquivo selecionado.");
  }

  const payload = (await response.json()) as {
    secure_url?: string;
  };

  if (!payload.secure_url) {
    throw new Error("Upload concluído sem URL de retorno.");
  }

  return payload.secure_url;
}

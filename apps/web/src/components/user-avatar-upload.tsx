import { useCallback, useEffect, useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function UserAvatarUpload({
  avatarPath,
  onAvatarChange,
  isSubmitting,
  error,
}: {
  avatarPath: string | null;
  onAvatarChange: (avatar: {
    previewUrl: string | null;
    file: File | null;
    type: "new" | "remove";
  }) => void;
  isSubmitting: boolean;
  error?: { message: string } | null;
}) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  // Update preview when avatarPath changes
  useEffect(() => {
    setPreview(avatarPath);
  }, [avatarPath]);

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (file.size > 5 * 1024 * 1024) {
        alert(
          "Arquivo muito grande. Por favor selecione uma imagem menor que 5MB."
        );
        return;
      }

      // Revoke previous preview URL if it exists
      if (preview && preview !== avatarPath) {
        URL.revokeObjectURL(preview);
      }

      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      onAvatarChange({
        previewUrl,
        file,
        type: "new",
      });

      // Reset the input value to allow selecting the same file again
      e.target.value = "";
    },
    [onAvatarChange, preview, avatarPath]
  );

  const handleRemoveAvatar = useCallback(() => {
    if (preview && preview !== avatarPath) {
      URL.revokeObjectURL(preview);
    }

    setPreview(null);
    onAvatarChange({
      previewUrl: null,
      file: null,
      type: "remove",
    });
  }, [preview, avatarPath, onAvatarChange]);

  // Cleanup preview URLs when component unmounts
  useEffect(() => {
    return () => {
      if (preview && preview !== avatarPath) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview, avatarPath]);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Foto de perfil</label>
      <div className="flex items-center gap-4">
        <div
          className="relative"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {preview ? (
            <>
              <Image
                src={preview}
                alt="Avatar preview"
                className={cn(
                  "w-24 h-24 rounded-full object-cover border-2",
                  isHovering && "opacity-50 transition-opacity duration-200"
                )}
                width={96}
                height={96}
              />
              {isHovering && !isSubmitting && (
                <div className="absolute inset-0 flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={handleRemoveAvatar}
                    disabled={isSubmitting}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <label className="w-24 h-24 rounded-full border-2 border-dashed flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors duration-200">
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isSubmitting}
              />
              <Upload className="w-6 h-6 text-gray-400" />
              <span className="text-xs text-gray-500 mt-1">Upload</span>
            </label>
          )}
          {isSubmitting && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-full">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          )}
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-500">
            Recomendado: JPG, PNG. Máximo 5MB.
          </p>
          {error && (
            <p className="text-sm text-red-500 mt-1">{error.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}

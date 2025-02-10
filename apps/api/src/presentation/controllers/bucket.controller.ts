import { Request, Response } from "express";
import multer from "multer";
import { promisify } from "util";
import { z } from "zod";
import { s3MediaService } from "../../application/services/s3";
import {
  postFileSchema,
  PostFileSchema,
} from "../validators/schemas/bucket/postFile.schema";

// Configuração do multer para processar o upload em memória
const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (_, file, callback) => {
    const allowedMimes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/jpg",
      "image/svg+xml",
    ];
    return allowedMimes.includes(file.mimetype)
      ? callback(null, true)
      : callback(
          new Error(
            "Tipo de arquivo inválido. Apenas JPG, PNG, WEBP, e SVG são permitidos."
          )
        );
  },
}).single("file");

const uploadAsync = promisify(upload);

export async function handlePostFile(req: Request, res: Response) {
  try {
    // Aguarda o upload do arquivo
    await uploadAsync(req, res);

    if (!req.file) {
      res.status(400).json({ error: "Nenhum arquivo foi enviado." });
      return;
    }

    // Faz o upload para o S3
    const filePath = await s3MediaService.uploadImage(
      req.file.buffer,
      req.body.file_path,
      req.body.filename
    );

    const response: PostFileSchema = { file_path: filePath };

    res.status(201).json(postFileSchema.parse(response));
    return;
  } catch (error) {
    let statusCode = 500;
    let errorMessage = "Erro interno do servidor.";

    if (error instanceof multer.MulterError) {
      statusCode = 400;
      errorMessage =
        error.code === "LIMIT_FILE_SIZE"
          ? "Arquivo muito grande. Máximo de 5MB."
          : "Erro no upload do arquivo.";
    } else if (error instanceof z.ZodError) {
      statusCode = 400;
      errorMessage = "Dados inválidos.";
    } else if (error instanceof Error) {
      statusCode = 400;
      errorMessage = error.message;
    }

    console.error("Erro no upload de arquivo:", error);
    res.status(statusCode).json({ error: errorMessage });
    return;
  }
}

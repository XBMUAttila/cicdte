import fs from "fs";
import path from "path";
import { drive_v3, google } from "googleapis";
import mime from "mime";

export interface CloudSDKService {
  ShowWorkingDir(): Promise<void>;
  List(): Promise<string[][]>;
  ChangeDir(targetPath: string): Promise<string[]>;
  Upload(localPath: string, targetFolderID: string): Promise<void>;
  Download(targetPath: string): Promise<void>;
  MakeDir(folderName: string): Promise<void>;
  Rename(fileName: string, newName: string): Promise<void>;
  Delete(targetFileID: string): Promise<void>;
  MoveFile(originalPath: string, targetPath: string): Promise<void>;
  CopyFile(originalPath: string, targetPath: string): Promise<void>;
}

export async function SignInGoogleCloud(
  keyPath: string
): Promise<CloudSDKService> {
  const client = new GoogleSDKClient(keyPath);
  client.SignIn();
  return client;
}

class GoogleSDKClient implements CloudSDKService {
  private key: string;
  private drive!: drive_v3.Drive;
  constructor(private keyPath: string) {
    this.key = keyPath;
  }
  async SignIn(): Promise<void> {
    const auth = new google.auth.GoogleAuth({
      keyFile: this.key,
      scopes: "https://www.googleapis.com/auth/drive",
    });
    this.drive = google.drive({ version: "v3", auth });
  }

  async ShowWorkingDir(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async List(): Promise<string[][]> {
    const response = await this.drive.files.list({
      pageSize: 1000,
      fields: "files(id, name)",
    });
    const files = response.data.files;
    if (!files) {
      throw new Error("google drive list error");
    }
    const retFiles: string[][] = [];
    files.forEach((file) => {
      const singleFile: string[] = [];
      if (file.name) {
        singleFile.push(file.name);
      }
      if (file.id) {
        singleFile.push(file.id);
      }
      retFiles.push(singleFile);
    });
    return retFiles;
  }
  ChangeDir(targetPath: string): Promise<string[]> {
    throw new Error("Method not implemented.");
  }
  async Upload(localPath: string, targetFolderID: string): Promise<void> {
    const fileMetadata = { name: localPath, parent: targetFolderID };
    const mimeType = mime.getType(localPath) || "application/octet-stream";
    const media = {
      mimeType: mimeType,
      body: fs.createReadStream(localPath),
    };
    const result = await this.drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: "id",
    });
  }
  Download(targetPath: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  MakeDir(folderName: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  Rename(fileName: string, newName: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async Delete(targetFileID: string): Promise<void> {
    try {
      await this.drive.files.delete({
        fileId: targetFileID,
      });
    } catch (error) {
      console.error(`Error deleting file with ID ${targetFileID}:`, error);
      throw error;
    }
  }
  MoveFile(originalPath: string, targetPath: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  CopyFile(originalPath: string, targetPath: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

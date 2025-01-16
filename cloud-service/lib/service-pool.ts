import { CloudSDKService, SignInGoogleCloud } from "./cloud-sdk-service";

let service: CloudSDKService | null = null;
export async function InitCloudServicePool() {
  service = await SignInGoogleCloud(
    "../src/vocal-tracker-445119-a2-d62cd9555ec6.json"
  );
}

export async function GetCloudService() {
  if (!service) {
    await InitCloudServicePool();
  }
  return service;
}

import api from "@/services/api";
import { 
  ISignInParams, 
  ISignInResponse, 
  IGetMyDataResponse, 
  ISignUpParams, 
  ISignUpResponse,
  IUpdateParams,
  IUpdateResponse
} from "@/services/api/auth/interfaces";

export default class AuthService {
  static async signIn(params: ISignInParams) {
    return api.post<ISignInResponse>("/sign-in", params);
  }
  static async signUp(params: ISignUpParams) {
    return api.post<ISignUpResponse>("/sign-up", params);
  }

  static async signOut() {
    return api.delete("/sign-out");
  }

  static async update(params: IUpdateParams) {
    return api.put<IUpdateResponse>("/user", params);
  }

  static async getMyData(accessToken: string) { 
    return api.get<IGetMyDataResponse>("/user", { headers: { Authorization: `Bearer ${accessToken}` } });
  }
}
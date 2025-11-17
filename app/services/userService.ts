import { apiService } from '~/utils/api';
import { ENDPOINTS } from '~/constants/endpoints';
import type { UserResponse } from '~~/server/types/users';

export class UserService {
    static async getAllUsers(): Promise<UserResponse> {
        const response = await apiService.get<UserResponse>(ENDPOINTS.USERS);
        return response;
    }
}

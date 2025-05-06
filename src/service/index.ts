import AuthService from "./auth";
import UsersService from "./users";


const apiService = {
    auth: new AuthService(),
    users: new UsersService()
}

export default apiService;
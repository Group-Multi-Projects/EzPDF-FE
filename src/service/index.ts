import AuthService from "./auth";
import FilesService from "./filesList";
import UsersService from "./users";


const apiService = {
    auth: new AuthService(),
    users: new UsersService(),
    files: new FilesService()
}

export default apiService;
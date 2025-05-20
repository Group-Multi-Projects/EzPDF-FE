import AuthService from "./auth";
import CanvasService from "./canvas";
import FilesService from "./files";
import UsersService from "./users";


const apiService = {
    auth: new AuthService(),
    users: new UsersService(),
    files: new FilesService(),
    canvas: new CanvasService(),
}

export default apiService;
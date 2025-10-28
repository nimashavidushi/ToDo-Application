import axios from "axios";

export default axios.create({baseURL: "http://localhost:8080/api", 
    auth: {username: "admin",
        password: "admin123"
    }
});

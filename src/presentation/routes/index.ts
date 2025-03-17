import {Hono} from "hono";
import AcademicRecordRoutes from "./academicRecord/routes";

export default class AppRoutes {
    public get routes(): Hono {
        const routes = new Hono();
        routes.get("/", (c) => {
            return c.json({
                status: "success",
                message: "Welcome to sync student service"
            });
        });
        routes.route("/v1", new AcademicRecordRoutes().routes);
        return routes;
    }
}

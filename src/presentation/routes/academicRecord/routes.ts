import { Hono } from "hono";
import AcademicRecordController from "./controller";

export default class AcademicRecordRoutes {
    public get routes(): Hono {
        const routes = new Hono()
        const controller = new AcademicRecordController()
        routes.get('/academic-records', controller.getAcademicRecords)
        routes.get('/academic-record/:uuid', controller.getAcademicRecordByUuid)
        return routes
    }
}
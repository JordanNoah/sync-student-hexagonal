"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inscriptionElement_event_dto_1 = __importDefault(require("./inscriptionElement.event.dto"));
class InscriptionEventDto {
    constructor(uuid, firedAt, inscription) {
        this.uuid = uuid;
        this.firedAt = firedAt;
        this.inscription = inscription;
    }
    static create(object) {
        const { uuid, fired_at, inscription } = object;
        const messageErrorComplement = 'missing in inscription structure';
        if (!uuid)
            return [`uuid ${messageErrorComplement}`, undefined];
        if (!fired_at)
            return [`fired_at ${messageErrorComplement}`, undefined];
        if (!inscription)
            return [`inscription ${messageErrorComplement}`, undefined];
        const [error, inscriptionElement] = inscriptionElement_event_dto_1.default.registered(inscription);
        if (error)
            return [error, undefined];
        return [undefined, new InscriptionEventDto(uuid, new Date(fired_at), inscriptionElement)];
    }
}
exports.default = InscriptionEventDto;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventsToProcess = void 0;
const constants_1 = __importDefault(require("@/shared/constants"));
const rabbitProcessor_datasource_impl_1 = __importDefault(require("@/infrastructure/datasources/rabbitProcessor.datasource.impl"));
//**
// in process use import {EventException} from 'rabbitmq-resilience';
// example  throw EventException.actionNotAllowed('Simulated random failure')
// */
exports.eventsToProcess = [
    {
        eventType: constants_1.default.PROCESSOR.INSCRIPTION.INSCRIPTIONREGISTERED,
        processes: [
            {
                processFunction: (event) => __awaiter(void 0, void 0, void 0, function* () { return yield new rabbitProcessor_datasource_impl_1.default().InscriptioRegisteredProcessor(event); }),
                processName: 'process-inscription-registered'
            }
        ]
    },
    {
        eventType: constants_1.default.PROCESSOR.ENROLLMENT.ENROLLMENTGENERATED,
        processes: [
            {
                processFunction: (event) => __awaiter(void 0, void 0, void 0, function* () { return yield new rabbitProcessor_datasource_impl_1.default().EnrollmentGenerated(event); }),
                processName: 'process-enrollment-generated'
            }
        ]
    },
    {
        eventType: constants_1.default.PROCESSOR.ENROLLMENT.ACADEMICSELECTIONASSOCIATED,
        processes: [
            {
                processFunction: (event) => __awaiter(void 0, void 0, void 0, function* () { return yield new rabbitProcessor_datasource_impl_1.default().AcademicSelectionAssociated(event); }),
                processName: 'process-academic-selection-associated'
            }
        ]
    },
    {
        eventType: constants_1.default.PROCESSOR.DEGREE.DEGREEREGISTERED,
        processes: [
            {
                processFunction: (event) => __awaiter(void 0, void 0, void 0, function* () { return yield new rabbitProcessor_datasource_impl_1.default().DegreeRegistered(event); }),
                processName: 'process-degree-registered'
            }
        ]
    },
    {
        eventType: constants_1.default.PROCESSOR.ENROLLMENT.ACADEMICSELECTIONASSOCIATEDSCHEDULED,
        processes: [
            {
                processFunction: (event) => __awaiter(void 0, void 0, void 0, function* () { return yield new rabbitProcessor_datasource_impl_1.default().AcademicSelectionScheduled(event); }),
                processName: 'process-academic-selection-associated-scheduled'
            }
        ]
    },
    {
        eventType: constants_1.default.PROCESSOR.ACADEMICOFFERS.PROGRAMOFFERED,
        processes: [
            {
                processFunction: (event) => __awaiter(void 0, void 0, void 0, function* () { return yield new rabbitProcessor_datasource_impl_1.default().ProgramOffered(event); }),
                processName: 'process-program-offered'
            }
        ]
    },
    {
        eventType: constants_1.default.PROCESSOR.INSCRIPTION.REGISTRATIONDATEESTABLISHED,
        processes: [
            {
                processFunction: (event) => __awaiter(void 0, void 0, void 0, function* () { return yield new rabbitProcessor_datasource_impl_1.default().RegistrationDateEstablished(event); }),
                processName: 'process-registration-date-established'
            }
        ]
    },
    {
        eventType: constants_1.default.PROCESSOR.INSCRIPTION.PROGRAMSTARTDATEESTABLISHED,
        processes: [
            {
                processFunction: (event) => __awaiter(void 0, void 0, void 0, function* () { return yield new rabbitProcessor_datasource_impl_1.default().ProgramStartDateEstablished(event); }),
                processName: 'process-program-start-date-established'
            }
        ]
    },
    {
        eventType: constants_1.default.PROCESSOR.INSCRIPTION.PROGRAMENDDATEESTABLISHED,
        processes: [
            {
                processFunction: (event) => __awaiter(void 0, void 0, void 0, function* () { return yield new rabbitProcessor_datasource_impl_1.default().ProgramEndDateEstablished(event); }),
                processName: 'process-program-end-date-established'
            }
        ]
    },
    {
        eventType: constants_1.default.PROCESSOR.INSCRIPTION.EXTENSIONENDDATEESTABLISHED,
        processes: [
            {
                processFunction: (event) => __awaiter(void 0, void 0, void 0, function* () { return yield new rabbitProcessor_datasource_impl_1.default().ExtensionEndDateEstablished(event); }),
                processName: 'process-extension-end-date-established'
            }
        ]
    },
    {
        eventType: constants_1.default.PROCESSOR.INSCRIPTION.INSCRIPTIONACTIVATED,
        processes: [
            {
                processFunction: (event) => __awaiter(void 0, void 0, void 0, function* () { return yield new rabbitProcessor_datasource_impl_1.default().InscriptionActivated(event); }),
                processName: 'process-inscription-activated'
            }
        ]
    },
    {
        eventType: constants_1.default.PROCESSOR.INSCRIPTION.INSCRIPTIONWITHDRAWN,
        processes: [
            {
                processFunction: (event) => __awaiter(void 0, void 0, void 0, function* () { return yield new rabbitProcessor_datasource_impl_1.default().InscriptionWithdrawn(event); }),
                processName: 'process-inscription-withdrawn'
            }
        ]
    },
    {
        eventType: constants_1.default.PROCESSOR.ENROLLMENT.ENROLLMENTDISCARDED,
        processes: [
            {
                processFunction: (event) => __awaiter(void 0, void 0, void 0, function* () { return yield new rabbitProcessor_datasource_impl_1.default().EnrollmentDiscarded(event); }),
                processName: 'process-enrollment-discarded'
            }
        ]
    },
    {
        eventType: constants_1.default.PROCESSOR.ENROLLMENT.ACADEMICSELECTIONDISCARDED,
        processes: [
            {
                processFunction: (event) => __awaiter(void 0, void 0, void 0, function* () { return yield new rabbitProcessor_datasource_impl_1.default().AcademicSelectionDiscarded(event); }),
                processName: 'process-academic-selection-discarded'
            }
        ]
    },
    {
        eventType: constants_1.default.PROCESSOR.ENROLLMENT.ENROLLMENTPROGRAMCHANGED,
        processes: [
            {
                processFunction: (event) => __awaiter(void 0, void 0, void 0, function* () { return yield new rabbitProcessor_datasource_impl_1.default().ProgramChanged(event); }),
                processName: 'process-enrollment-program-changed'
            }
        ]
    },
    {
        eventType: constants_1.default.PROCESSOR.DEGREE.DEGREEDINACTIVATED,
        processes: [
            {
                processFunction: (event) => __awaiter(void 0, void 0, void 0, function* () { return yield new rabbitProcessor_datasource_impl_1.default().DegreeDeactivated(event); }),
                processName: 'process-degree-inactivated'
            }
        ]
    },
    {
        eventType: constants_1.default.PROCESSOR.DEGREE.DEGREEWITHDRAWN,
        processes: [
            {
                processFunction: (event) => __awaiter(void 0, void 0, void 0, function* () { return yield new rabbitProcessor_datasource_impl_1.default().DegreeWithdrawn(event); }),
                processName: 'process-degree-withdrawn'
            }
        ]
    },
    //{
    //    eventType: appConstants.PROCESSOR.SINGUPS.STUDENTSIGNEDUP,
    //    processes: [
    //        {
    //            processFunction: async (event: RabbitMQMessageDto) => await new SignUpProcessor().process(JSON.parse(event.content.toString())),
    //            processName: 'process-student-signed-up'
    //        }
    //    ]
    //}
];

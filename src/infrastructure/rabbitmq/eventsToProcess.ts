import {EventProcessConfig, RabbitMQMessageDto} from 'rabbitmq-resilience';
import appConstants from "@/shared/constants";
import RabbitProcessorDatasourceImpl from '@/infrastructure/datasources/rabbitProcessor.datasource.impl';
//**
// in process use import {EventException} from 'rabbitmq-resilience';
// example  throw EventException.actionNotAllowed('Simulated random failure')
// */

export const eventsToProcess: EventProcessConfig[] = [
    {
        eventType: appConstants.PROCESSOR.INSCRIPTION.INSCRIPTIONREGISTERED,
        processes: [
            {
                processFunction: async (event: RabbitMQMessageDto) => await new RabbitProcessorDatasourceImpl().InscriptioRegisteredProcessor(event),
                processName: 'process-inscription-registered'
            }
        ]
    },
    {
        eventType: appConstants.PROCESSOR.INSCRIPTION.REGISTRATIONDATEESTABLISHED,
        processes: [
            {
                processFunction: async (event: RabbitMQMessageDto) => await new RabbitProcessorDatasourceImpl().RegistrationDateEstablished(event),
                processName: 'process-registration-date-established'
            }
        ]
    },
    {
        eventType: appConstants.PROCESSOR.INSCRIPTION.PROGRAMSTARTDATEESTABLISHED,
        processes: [
            {
                processFunction: async (event: RabbitMQMessageDto) => await new RabbitProcessorDatasourceImpl().ProgramStartDateEstablished(event),
                processName: 'process-program-start-date-established'
            }
        ]
    },
    {
        eventType: appConstants.PROCESSOR.INSCRIPTION.PROGRAMENDDATEESTABLISHED,
        processes: [
            {
                processFunction: async (event: RabbitMQMessageDto) => await new RabbitProcessorDatasourceImpl().ProgramEndDateEstablished(event),
                processName: 'process-program-end-date-established'
            }
        ]
    },
    {
        eventType: appConstants.PROCESSOR.INSCRIPTION.EXTENSIONENDDATEESTABLISHED,
        processes: [
            {
                processFunction: async (event: RabbitMQMessageDto) => await new RabbitProcessorDatasourceImpl().ExtensionEndDateEstablished(event),
                processName: 'process-extension-end-date-established'
            }
        ]
    },
    {
        eventType: appConstants.PROCESSOR.INSCRIPTION.INSCRIPTIONACTIVATED,
        processes: [
            {
                processFunction: async (event: RabbitMQMessageDto) => await new RabbitProcessorDatasourceImpl().InscriptionActivated(event),
                processName: 'process-inscription-activated'
            }
        ]
    },
    {
        eventType: appConstants.PROCESSOR.INSCRIPTION.INSCRIPTIONWITHDRAWN,
        processes: [
            {
                processFunction: async (event: RabbitMQMessageDto) => await new RabbitProcessorDatasourceImpl().InscriptionWithdrawn(event),
                processName: 'process-inscription-withdrawn'
            }
        ]
    },
    {
        eventType: appConstants.PROCESSOR.ENROLLMENT.ENROLLMENTGENERATED,
        processes: [
            {
                processFunction: async (event: RabbitMQMessageDto) => await new RabbitProcessorDatasourceImpl().EnrollmentGenerated(event),
                processName: 'process-enrollment-generated'
            }
        ]
    },
    {
        eventType: appConstants.PROCESSOR.ENROLLMENT.ENROLLMENTDISCARDED,
        processes: [
            {
                processFunction: async (event: RabbitMQMessageDto) => await new RabbitProcessorDatasourceImpl().EnrollmentDiscarded(event),
                processName: 'process-enrollment-discarded'
            }
        ]
    },
    {
        eventType: appConstants.PROCESSOR.ENROLLMENT.ACADEMICSELECTIONASSOCIATED,
        processes: [
            {
                processFunction: async (event: RabbitMQMessageDto) => await new RabbitProcessorDatasourceImpl().AcademicSelectionAssociated(event),
                processName: 'process-academic-selection-associated'
            }
        ]
    },
    {
        eventType: appConstants.PROCESSOR.ENROLLMENT.ACADEMICSELECTIONDISCARDED,
        processes: [
            {
                processFunction: async (event: RabbitMQMessageDto) => await new RabbitProcessorDatasourceImpl().AcademicSelectionDiscarded(event),
                processName: 'process-academic-selection-discarded'
            }
        ]
    },
    {
        eventType: appConstants.PROCESSOR.ENROLLMENT.ENROLLMENTPROGRAMCHANGED,
        processes: [
            {
                processFunction: async (event: RabbitMQMessageDto) => await new RabbitProcessorDatasourceImpl().ProgramChanged(event),
                processName: 'process-enrollment-program-changed'
            }
        ]
    },
    {
        eventType: appConstants.PROCESSOR.ENROLLMENT.ACADEMICSELECTIONASSOCIATEDSCHEDULED,
        processes: [
            {
                processFunction: async (event: RabbitMQMessageDto) => await new RabbitProcessorDatasourceImpl().AcademicSelectionScheduled(event),
                processName: 'process-academic-selection-associated-scheduled'
            }
        ]
    },
    {
        eventType: appConstants.PROCESSOR.DEGREE.DEGREEDINACTIVATED,
        processes: [
            {
                processFunction: async (event: RabbitMQMessageDto) => await new RabbitProcessorDatasourceImpl().DegreeDeactivated(event),
                processName: 'process-degree-inactivated'
            }
        ]
    },
    {
        eventType: appConstants.PROCESSOR.DEGREE.DEGREEREGISTERED,
        processes: [
            {
                processFunction: async (event: RabbitMQMessageDto) => await new RabbitProcessorDatasourceImpl().DegreeRegistered(event),
                processName: 'process-degree-registered'
            }
        ]
    },
    {
        eventType: appConstants.PROCESSOR.DEGREE.DEGREEWITHDRAWN,
        processes: [
            {
                processFunction: async (event: RabbitMQMessageDto) => await new RabbitProcessorDatasourceImpl().DegreeWithdrawn(event),
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
    //},
    {
        eventType: appConstants.PROCESSOR.ACADEMICOFFERS.PROGRAMOFFERED,
        processes: [
            {
                processFunction: async (event: RabbitMQMessageDto) => await new RabbitProcessorDatasourceImpl().ProgramOffered(event),
                processName: 'process-program-offered'
            }
        ]
    }
];
const appConstants = {
    ENVIRONMENT: {
        PRODUCTION: 'production',
        DEVELOPMENT: 'development',
        BETA: 'beta'
    },
    MOODLE_FUNCTIONS_NAME: {
        CREATE_USERS: 'core_user_create_users',
        ENROLL_USER: 'enrol_manual_enrol_users',
        GET_USERS_BY_FIELD: 'core_user_get_users_by_field',
        UPDATE_USER: 'core_user_update_users ',
    },
    MAILER: {
        TEMPLATE: {
            BASE: {
                NAME: 'Base Template',
                ABBREVIATION: 'BT',
            }
        },
        CONTENT: {
            COURSE_NOT_FOUND: {
                NAME: 'Course Not Found',
                ABBREVIATION: 'CNF'
            }

        },
        NOTIFICATIONS: {
            COURSE_NOT_FOUND: {
                NAME: 'Course Not Found',
                ABBREVIATION: 'CNF'
            }
        },
    },
    PROCESSOR: {
        SINGUPS: {
            STUDENTSIGNEDUP: 'academic-administration.sign-ups.student_signedup'
        },
        INSCRIPTION: {
            INSCRIPTIONREGISTERED: 'academic-administration.inscription-management.inscription_registered',
            REGISTRATIONDATEESTABLISHED: 'academic-administration.inscription-management.registration_date_established',
            PROGRAMSTARTDATEESTABLISHED: 'academic-administration.inscription-management.program_start_date_established',
            PROGRAMENDDATEESTABLISHED: 'academic-administration.inscription-management.program_end_date_established',
            EXTENSIONENDDATEESTABLISHED: 'academic-administration.inscription-management.extension_end_date_established',
            INSCRIPTIONACTIVATED: 'academic-administration.inscription-management.inscription_activated',
            INSCRIPTIONWITHDRAWN: 'academic-administration.inscription-management.inscription_withdrawn',
        },
        ENROLLMENT: {
            ENROLLMENTGENERATED: 'academic-administration.enrollment-management.enrollment_generated',
            ENROLLMENTDISCARDED: 'academic-administration.enrollment-management.enrollment_discarded',
            ACADEMICSELECTIONASSOCIATED: 'academic-administration.enrollment-management.academic_selection_associated',
            ACADEMICSELECTIONDISCARDED: 'academic-administration.enrollment-management.academic_selection_discarded',
            ENROLLMENTPROGRAMCHANGED: 'academic-administration.academic-administration.enrollment-management.program_changed',
            ACADEMICSELECTIONASSOCIATEDSCHEDULED: 'academic-administration.enrollment-management.academic_selection_scheduled',
        },
        DEGREE: {
            DEGREEWITHDRAWN: 'academic-administration.degree-management.degree_withdrawn',
            DEGREEDINACTIVATED: 'academic-administration.degree-management.degree_deactivated',
            DEGREEREGISTERED: 'academic-administration.degree-control.degree_registered'
        },
        ACADEMICOFFERS: {
            PROGRAMOFFERED: 'educational-planning.academic-offers.program_offered'
        }
    },
    INSCRIPTIONSTATUS: {
        ACTIVATED: 'AC',
        WITHDRAWN: 'WD'
    }
} as const;

export default appConstants;

export enum EmailTypeEnum {
    INSTITUTIONAL = 'institutional',
    PERSONAL = 'personal'
}

export enum CredentialTypeEnum {
    LVE = 'LVE'
}
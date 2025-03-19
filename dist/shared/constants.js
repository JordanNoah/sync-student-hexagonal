"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialTypeEnum = exports.EmailTypeEnum = void 0;
const appConstants = {
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
            ENROLLMENTPROGRAMCHANGED: 'academic-administration.enrollment-management.program_changed',
            ACADEMICSELECTIONASSOCIATEDSCHEDULED: 'academic-administration.enrollment-management.academic_selection_scheduled',
        },
        DEGREE: {
            DEGREEWITHDRAWN: 'academic-administration.degree-control.degree_withdrawn',
            DEGREEDINACTIVATED: 'academic-administration.degree-control.degree_inactivated',
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
};
exports.default = appConstants;
var EmailTypeEnum;
(function (EmailTypeEnum) {
    EmailTypeEnum["INSTITUTIONAL"] = "institutional";
    EmailTypeEnum["PERSONAL"] = "personal";
})(EmailTypeEnum || (exports.EmailTypeEnum = EmailTypeEnum = {}));
var CredentialTypeEnum;
(function (CredentialTypeEnum) {
    CredentialTypeEnum["LVE"] = "LVE";
})(CredentialTypeEnum || (exports.CredentialTypeEnum = CredentialTypeEnum = {}));

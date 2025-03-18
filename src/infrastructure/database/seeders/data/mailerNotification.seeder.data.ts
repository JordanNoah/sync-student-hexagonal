import appConstants from "@/shared/constants";

export const MailerNotificationSeederData = [
    {
        name: appConstants.MAILER.NOTIFICATIONS.COURSE_NOT_FOUND.NAME,
        abbreviation: appConstants.MAILER.NOTIFICATIONS.COURSE_NOT_FOUND.ABBREVIATION,
        subject: 'Curso no encontrado - {{courseAbbreviation}}',
        to: {beta: ['ct.accion.docente@funiber.org'], production: ['ct.accion.docente@funiber.org']},
        cc: null,
        cco: {beta: ['ct.accion.docente@funiber.org'], production: ['ct.accion.docente@funiber.org']}
    }
]
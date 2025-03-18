import appConstants from "@/shared/constants";

export const MailerContentSeederData = [
    {
        name: appConstants.MAILER.CONTENT.COURSE_NOT_FOUND.NAME,
        abbreviation: appConstants.MAILER.CONTENT.COURSE_NOT_FOUND.ABBREVIATION,
        bodyHeader: `
        <img src="https://lh3.googleusercontent.com/d/1Om0DaGQ4gq__xVmaCKtyyuB3dl6l20ga" width="48" height="48" alt="Icono Curso no encontrado" style="margin-bottom: 16px;">
        <h2 style="margin: 0 0 16px 0; color: #424242; font-family: 'Open Sans', sans-serif; font-size: 20px; font-weight: 600;">
            Curso no encontrado</h2>
        <p style="margin: 0; color: #424242; font-family: 'Open Sans', sans-serif; font-size: 14px;">Se le notifica que un curso no ha sido encontrado
        </p>
        `,
        bodyDescription: `
        <p style="margin: 0 0 15px 0; color: #424242; font-family: 'Open Sans', sans-serif; font-size: 12px;">Estimad@
        encargad@:<br> <br> Ha ocurrido una novedad durante el alta de un estudiante. <br> El curso no se ha encontrado, por favor cree o asocie el número de identificación en el campus.<br> <br> <strong>Datos correspondientes al docente:</strong>
        </p>
        `,
        bodySecondaryDescription: `
        <p style="margin: 0 0 15px 0; color: #424242; font-family: 'Open Sans', sans-serif; font-size: 12px;"><strong>Datos correspondientes del estudiante y su inscripción:</strong>
        `,
        body: `
        <tr>
        <td width="200" style="background-color: #f5f5f5; padding: 10px 16px;">Abreviatura del curso:</td>
        <td style="padding: 10px 16px;">{{courseAbbreviation}}</td>
        </tr>
        <tr>
            <td width="200" style="background-color: #f5f5f5; padding: 10px 16px;">IDNumber del curso:</td>
            <td style="padding: 10px 16px;">{{courseIdNumber}}</td>
        </tr>
        <tr>
            <td width="200" style="background-color: #f5f5f5; padding: 10px 16px;">Campus:</td>
            <td style="padding: 10px 16px;">{{institutionAbbreviation}}</td>
        </tr> <br><br>
        `,
        bodySecondary: `
        <tr>
        <td width="200" style="background-color: #f5f5f5; padding: 10px 16px;">Nombre de usuario:</td>
        <td style="padding: 10px 16px;">{{studentUsername}}</td>
        </tr>
        <tr>
            <td width="200" style="background-color: #f5f5f5; padding: 10px 16px;">IDNumber del estudiante:</td>
            <td style="padding: 10px 16px;">{{studentIdNumber}}</td>
        </tr>
        <tr>
            <td width="200" style="background-color: #f5f5f5; padding: 10px 16px;">Programa:</td>
            <td style="padding: 10px 16px;">{{program}}</td>
        </tr>
        <tr>
            <td width="200" style="background-color: #f5f5f5; padding: 10px 16px;">Programa versión:</td>
            <td style="padding: 10px 16px;">{{programVersion}}</td>
        </tr>
        <tr>
            <td width="200" style="background-color: #f5f5f5; padding: 10px 16px;">IDNumber del programa:</td>
            <td style="padding: 10px 16px;">{{programIdNumber}}</td>
        </tr>
        `,
        bodyLastDescription: `
        <p style="margin: 0 0 10px 0;">Agradecemos vuestra participación.</p>
        <p style="margin: 0 0 10px 0;">Saludos cordiales,</p>
        <p style="margin: 0; font-weight: bold;">Acción Docente</p>
        `
    }
]
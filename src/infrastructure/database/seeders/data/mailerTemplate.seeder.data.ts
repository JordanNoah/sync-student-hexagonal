import appConstants from "@/shared/constants";

export const MailerTemplateSeederData = [
    {
        name: appConstants.MAILER.TEMPLATE.BASE.NAME,
        abbreviation: appConstants.MAILER.TEMPLATE.BASE.ABBREVIATION,
        doctype: '<!DOCTYPE html><html>',
        head: '<head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Acción Docente</title> <link href="https://fonts.googleapis.com/css?family=Open+Sans:400" rel="stylesheet"></head>',
        header: `<table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;"> <tr> <td style="vertical-align: middle;"><img src="https://lh3.googleusercontent.com/d/1MJyCTXZYjmNfHCf20e1LgWyObgyFur-i" width="40" height="40" style="border-radius: 6.76px; box-shadow: 0px 0px 0px rgba(0,0,0,0.25);" alt="Logo"></td> <td style="padding-left: 15px; vertical-align: middle;"> <p style="margin: 0; color: #424242; font-family: 'Open Sans', sans-serif; font-size: 16px; font-weight: 600;">Acción Docente</p> </td> </tr></table>`,
        body: '{{{body}}}',
        footer: `<hr style="border: none; border-top: 1px solid #e0e0e0; width: 100%; margin: 0 auto;"> <p style="margin: 16px 0 0; color: #616161; font-family: 'Open Sans', sans-serif; font-size: 12px; text-align: center;">Este email ha sido enviado a usted para informarle sobre cambios importantes en los servicios ofrecidos por nosotros. Para más información, por favor revise nuestro <a href="https://www.funiber.org/aviso-legal" style="color: #01579b; text-decoration: none;">aviso legal.</a></p>`
    }
]
import * as Express from 'express';
import * as nodemailer  from 'nodemailer';
import { EmailModel, IEmailModel } from '../modelos/email';
import { getConfigEmail } from '../../config/config';

export default class Email {
    constructor() {}

    public enviarEmail(req: Express.Request, res: Express.Response) {
        try {
            let dados = {
                email: req.body.email,
                assunto: req.body.assunto,
                mensagem: req.body.mensagem,
            };

            nodemailer.createTestAccount((err, account) => {

                let transporter = nodemailer.createTransport(
                    {
                        host: getConfigEmail().host,
                        port: getConfigEmail().port,
                        secure: getConfigEmail().security,
                        auth: {
                            user: getConfigEmail().auth.user,
                            pass: getConfigEmail().auth.pass
                        }
                    }
                );

                let mailOptions = {
                    from: 'uber@company.com',
                    to: dados.email,
                    subject: dados.assunto,
                    text: dados.mensagem,
                    html: `<b>${dados.mensagem}<b>`
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message sent: %s', info.messageId);
                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                    res.status(200).json(nodemailer.getTestMessageUrl(info));
                });
            });
        } catch (error) {
            console.log(`Error: ${error}`);
            res.sendStatus(500);
        }
    }
}

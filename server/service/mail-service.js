const nodemailer = require('nodemailer');
class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "ds.intelserv@gmail.com",
                pass: "hrld fqjg zvot ugyz"
            }
        })
    }
    async sendActivationMail(to, link){
        await this.transporter.sendMail({
            from: "ds.intelserv@gmail.com",
            to: to,
            subject: 'Активация аккаунта',
            text: "",
            html:
            `<div>
                <h1>Для активации перейдите по ссылке</h1>
                <a href="${link}">${link}</a>
            </div>`
        })
    }
}

module.exports = new MailService();
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { User } from '../../../modules/user/entities/user.entity';
import { CustomInternalServerErrorException } from '../../exceptions/http-exception';

@Injectable()
export class EmailService {
  async sendVerificationCode(user: User, code: string) {
    const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT) || 0,
      secure: false,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASS,
      },
    });

    return transport
      .sendMail({
        from: 'Ciclo Ágil <cicloagil@outlook.com>',
        to: user.email,
        subject: 'Redefinição de senha',
        html: `<!DOCTYPE html>
        <html lang="pt-BR">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Redefinição de Senha</title>
        </head>
        <body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
          <div style="background-color: #f5f5f5; padding: 50px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #fff; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
              <div style="padding: 20px;">
                <h2 style="color: #333; margin-bottom: 20px;">Redefinição de Senha</h2>
                <p>Olá <strong style="color: #8c36c7;">${user.name}</strong>,</p>
                <p>Recebemos uma solicitação de redefinição de senha para sua conta. Utilize o código de verificação abaixo para concluir o processo:</p>
                <div style="background-color: #8c36c7; color: #fff; padding: 10px; border-radius: 5px; margin-top: 20px; text-align: center;">
                  <h3 style="margin: 0; font-size: 24px;">${code}</h3>
                </div>
                <p style="margin-top: 20px;">Se você não solicitou essa redefinição de senha, pode ignorar este e-mail com segurança. Este link é válido por 1 hora.</p>
                <p style="margin-top: 20px;">Atenciosamente,<br><strong style="color: #8c36c7;">Equipe Ciclo Ágil</strong></p>
              </div>
            </div>
          </div>
        </body>
        </html>`,
        text: `Olá ${user.name}, para redefinir a sua senha utilize o código a seguir: ${code}`,
      })
      .then(() => {
        return { message: 'Email successfully sent' };
      })
      .catch((error) => {
        throw new CustomInternalServerErrorException({
          code: 'error-seinding-email',
          message: error.message,
        });
      });
  }
}

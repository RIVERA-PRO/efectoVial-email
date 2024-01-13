import nodemailer from "nodemailer";
import crypto from "crypto";

// Configuración del transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

// Controlador para enviar correo electrónico de verificación
const enviarCorreoVerificacion = (req, res) => {
    try {
        // Obtener datos del cuerpo de la solicitud
        const { idUsuario, email, nombre } = req.body;

        // Verificar si los datos necesarios están presentes
        if (!idUsuario || !email || !nombre) {
            throw new Error("Faltan datos de usuario.");
        }
        if (!email) {
            throw new Error("Falta el correo electrónico.");
        }

        // Generar un token aleatorio
        const token = crypto.randomBytes(32).toString('hex');

        // Configurar el mensaje de correo electrónico
        const message = {
            from: process.env.SMTP_USER,
            to: email,
            subject: "Verificación de Efecto Vial Web",
            text: "Verificación para cambio de contraseña",
            html: `<p style="font-size: 20px; border-radius: 5px;">
            <br>Hola ${nombre} desde <strong>Efecto Vial Web!!</strong><br>
            Haga clic en el siguiente enlace para restablecer su contraseña:
            <a style="color: white; text-decoration: none; padding: 8px 16px; background-color: #F80050; border-radius: 100px;" href="https://efectovial.online/recuperacion/${idUsuario}/${token}">Click aquí</a>
        </p>
        <p style="color: grey;">
            --<br>
            Saludos cordiales,<br>
            Equipo de Efecto Vial Web<br>
            Gracias por usar nuestra App <br>
        </p>
     
        <a href="https://efectovial.online/" style="display: inline-block; padding: 10px; ">
            <img src="https://efectovial.online/static/media/logo.16f77afae9de81e42e67.png" alt="Efecto Vial Web" style="width: 200px" />
        </a>`,
        };

        // Enviar el correo electrónico
        transporter.sendMail(message, (error, info) => {
            if (error) {
                console.error("Error al enviar el correo electrónico:", error);
                res.status(500).json({ error: "Error al enviar el correo electrónico" });
            } else {
                console.log("Correo electrónico de verificación enviado:", info.response);
                res.status(200).json({ success: true, message: "Verifica tu casilla de correo" });
                console.log(email);
                console.log(idUsuario);
                console.log(nombre);
            }
        });
    } catch (err) {
        console.error("Error en el controlador:", err.message);
        res.status(400).json({ error: err.message });
    }
};

// Exportar el controlador
export { enviarCorreoVerificacion };

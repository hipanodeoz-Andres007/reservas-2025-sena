<%-- 
// =========================================================
// PÁGINA JSP (VISTA DINÁMICA)
// Evidencia: Utiliza elementos de JSP para mostrar datos
// =========================================================
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmación de Reserva</title>
    <!-- Estilos básicos integrados -->
    <style>
        body { font-family: 'Inter', sans-serif; background-color: #e6f7ff; color: #001f3f; margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
        .confirm-box { background: #ffffff; padding: 40px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0, 50, 100, 0.15); width: 90%; max-width: 600px; text-align: center; border-left: 5px solid #007bff; }
        h1 { color: #007bff; margin-bottom: 10px; font-size: 2em; }
        p { font-size: 1.1em; line-height: 1.6; margin-bottom: 15px; }
        .highlight { color: #28a745; font-weight: 700; font-size: 1.2em; display: block; margin-top: 10px; }
        .details { text-align: left; margin-top: 30px; padding: 20px; border: 1px dashed #b3d9ff; border-radius: 8px; background-color: #f7fcff; }
        .details strong { color: #0056b3; display: inline-block; width: 150px; }
        .btn-home { display: inline-block; margin-top: 30px; padding: 12px 25px; background-color: #6c757d; color: white; text-decoration: none; border-radius: 8px; transition: background-color 0.3s; }
        .btn-home:hover { background-color: #5a6268; }
    </style>
</head>
<body>
    <div class="confirm-box">
        <!-- 
        Uso de elementos JSP para acceder a los datos que el Servlet pasó (request.setAttribute). 
        El formato ${variable} es la manera más moderna de usar Java en el HTML.
        -->
        <h1>✅ Reserva Confirmada</h1>
        <p>¡Tu solicitud de reserva ha sido procesada con éxito!</p>

        <div class="details">
            <p><strong>Código de Confirmación:</strong> <span class="highlight">${requestScope.codigo}</span></p>
            <p><strong>Destino Solicitado:</strong> ${requestScope.destinoFinal}</p>
            <p><strong>Huéspedes:</strong> ${requestScope.cantidadHuespedes}</p>
            <p><strong>Fecha de Procesamiento:</strong> ${requestScope.fechaConfirmacion}</p>
        </div>

        <p class="info-footer">Gracias por utilizar el sistema *Reservas 2025*.</p>
        
        <a href="index.html" class="btn-home">Volver al Formulario</a>
    </div>
</body>
</html>
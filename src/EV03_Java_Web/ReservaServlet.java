// =========================================================
// SERVLET (RECEPTOR Y CONTROLADOR)
// Evidencia: Utiliza métodos doGet y doPost
// =========================================================
package com.sena.reservas;

import java.io.IOException;
import java.util.Date; // Para generar la fecha de confirmación
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Servlet encargado de manejar las peticiones del formulario de reservas.
 */
public class ReservaServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    /**
     * Maneja las peticiones HTTP de tipo GET.
     * En un sistema real, se usaría para hacer una búsqueda inicial.
     * @param request La solicitud HTTP.
     * @param response La respuesta HTTP.
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        // Mensaje de demostración de que el método GET funciona.
        System.out.println("LOG: Solicitud GET recibida en el ReservaServlet.");
        
        // Redirige a una página de error o a la página principal si no hay parámetros.
        response.sendRedirect("index.html");
    }

    /**
     * Maneja las peticiones HTTP de tipo POST.
     * Este método recibe los datos del formulario de reserva (el método POST requerido).
     * @param request La solicitud HTTP, que contiene los datos del formulario.
     * @param response La respuesta HTTP.
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        // 1. OBTENER DATOS DEL FORMULARIO
        // Obtenemos los valores enviados desde el index.html
        String destino = request.getParameter("destino");
        String huespedesStr = request.getParameter("huespedes");
        int huespedes = 0;

        try {
            huespedes = Integer.parseInt(huespedesStr);
        } catch (NumberFormatException e) {
            // Manejo de error si no es un número (aunque HTML5 lo previene)
            System.out.println("Error de formato en número de huéspedes: " + huespedesStr);
        }

        // 2. PROCESAR LA LÓGICA (Simulación de reserva)
        // En un proyecto real, aquí se llamaría a una clase del Modelo para guardar en la BD.
        String codigoReserva = "RES-" + System.currentTimeMillis() % 10000;
        Date fechaActual = new Date();
        
        // 3. PASAR DATOS A LA VISTA (JSP)
        // Guardamos los datos procesados en el objeto 'request' para que el JSP los use.
        request.setAttribute("codigo", codigoReserva);
        request.setAttribute("destinoFinal", destino);
        request.setAttribute("cantidadHuespedes", huespedes);
        request.setAttribute("fechaConfirmacion", fechaActual);
        
        // 4. REDIRIGIR A JSP
        // Enviamos la solicitud y la respuesta al 'ResultadoReserva.jsp' para que se muestre el HTML dinámico.
        request.getRequestDispatcher("/ResultadoReserva.jsp").forward(request, response);
    }
}
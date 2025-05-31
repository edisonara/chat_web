<div align="center">

# 💬 Chat en Tiempo Real con Sockets

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)](https://socket.io/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)

**Desarrollado por:** Edison Arambulo Rojas  
**Fecha:** 30 de Mayo de 2025

[🚀 Demo en vivo](http://localhost:3000) | [📖 Documentación](#documentación) | [⚙️ Instalación](#instalación)

</div>

## 📋 Descripción

> Un chat moderno en tiempo real que permite la comunicación instantánea entre múltiples usuarios

Este proyecto implementa un sistema de chat utilizando WebSockets, ofreciendo una experiencia de comunicación fluida y eficiente. Las características principales incluyen:

✨ **Características clave:**
- 🔄 Comunicación bidireccional en tiempo real
- 📱 Diseño responsive para todos los dispositivos
- 🎨 Interfaz moderna y minimalista
- 🚀 Bajo consumo de recursos del servidor
- 💫 Experiencia de usuario mejorada sin recargas
- ⚡ Entrega instantánea de mensajes

## 🌟 Repositorio Base

> Este proyecto es una mejora del [repositorio original](https://github.com/paulosk8/webChat/tree/main) proporcionado por el docente

**Ramas principales:**
- `main` - Código inicial del proyecto
- `implementacion-chat` - Versión final de referencia

## 🏗️ Estructura del Proyecto

```
webChat/
├── src/
│   ├── public/
│   │   ├── css/
│   │   │   └── style.css
│   │   └── js/
│   │       └── script.js
│   ├── views/
│   │   └── index.html
│   └── realTimeServer.js
├── screenshots/
└── README.md
```

## ✨ Características Principales

1. **Diseño Moderno**
   - Interfaz limpia y minimalista
   - Paleta de colores moderna
   - Diseño responsive para móviles y tablets
   ![Diseño Responsive](./screenshots/responsive.png)

2. **Sistema de Login**
   - Modal de inicio con nombre de usuario
   - Validación de nombres duplicados
   - Persistencia de sesión
   ![Login System](./screenshots/login.png)

3. **Selector de Emojis**
   - Categorías organizadas
   - Emojis nativos del sistema
   - Interfaz intuitiva
   ![Emoji Selector](./screenshots/emojis.png)

4. **Notificaciones**
   - Alertas de usuarios conectados/desconectados
   ![Notifications](./screenshots/notifications.png)

## 🚀 Instalación y Uso

1. **Clonar el Repositorio**
   ```bash
   git clone [URL del repositorio]
   cd webChat
   ```

2. **Instalar Dependencias**
   ```bash
   npm install
   ```

3. **Iniciar el Servidor**
   ```bash
   cd src
   node realTimeServer.js
   ```

4. **Acceder al Chat**
   - Abrir `http://localhost:3000` en el navegador
   - Ingresar un nombre de usuario
   - ¡Comenzar a chatear!

## 📝 Aprendizajes y Conclusiones

- Implementación práctica de WebSockets
- Manejo de eventos en tiempo real
- Diseño de interfaces responsivas
- Gestión de estado en aplicaciones web

## 🔧 Desafíos y Soluciones

1. **Manejo de Usuarios Simultáneos**
   - Problema: Conflictos con nombres de usuario duplicados
   - Solución: Implementación de validación en tiempo real

2. **Selector de Emojis**
   - Problema: Compatibilidad entre navegadores
   - Solución: Uso de emojis nativos y diseño adaptativo

3. **Notificaciones**
   - Problema: Experiencia de usuario en múltiples pestañas
   - Solución: Sistema de notificaciones centralizado

## 📚 Referencias y Recursos

1. [Socket.IO Documentation](https://socket.io/docs/v4/)
2. [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.3/)
3. [MDN Web Docs - WebSockets API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
4. [Node.js Documentation](https://nodejs.org/docs/latest/api/)

---

*Nota: Las capturas de pantalla mostradas en este README están almacenadas en la carpeta `/screenshots` del repositorio.*

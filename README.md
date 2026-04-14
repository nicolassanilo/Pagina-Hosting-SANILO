# WhatsApp Bot Platform

Repositorio base para una plataforma web que permite crear, configurar y gestionar múltiples bots de WhatsApp con un sistema de créditos.

## Tecnologías
- Backend: Node.js + Express + MongoDB
- Frontend: React + React Router
- Autenticación: JWT
- Despliegue: Docker / Render

## Características principales
- Registro / login de usuarios
- Gestión de múltiples bots de WhatsApp por usuario
- Sistema de créditos para limitar bots activos
- Panel de control con estado de bots
- Simulación de envío/recepción de mensajes y respuestas automáticas básicas
- Repositorio modular con frontend y backend separados

## Estructura del repositorio
- `backend/`: servidor Express y API REST
- `frontend/`: aplicación React
- `Dockerfile`: despliegue completo con frontend build y backend
- `render.yaml`: configuración para Render

## Configuración local

1. Clona el repositorio

```bash
git clone <tu-repo> whatsapp-bot-platform
cd whatsapp-bot-platform
```

2. Configura el backend

```bash
cd backend
npm install
cp .env.example .env
```

Edita `.env` y establece tu `MONGO_URI` y `AUTH_SECRET`.

3. Configura el frontend

```bash
cd ../frontend
npm install
```

## Ejecución en desarrollo

### Backend

```bash
cd backend
npm run dev
```

### Frontend

```bash
cd frontend
npm start
```

La aplicación de frontend usará por defecto `http://localhost:5000/api`.

## Despliegue en Render

1. Crea un nuevo servicio web en Render usando el repositorio.
2. Selecciona `Docker` como entorno.
3. Usa el `Dockerfile` raíz.
4. Agrega variables de entorno:
   - `MONGO_URI`
   - `AUTH_SECRET`

Render construirá el frontend y servirá el backend junto con la aplicación React.

## Uso

- Regístrate y haz login.
- Ve al panel principal para ver tus bots.
- Crea un nuevo bot con credenciales de WhatsApp o Twilio.
- Activa/desactiva bots según tus créditos.
- Recarga créditos en la página de créditos (simulado).

## API disponible

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/bots`
- `POST /api/bots`
- `PUT /api/bots/:id`
- `DELETE /api/bots/:id`
- `POST /api/bots/:id/send`
- `GET /api/credits`
- `POST /api/credits/add`
- `POST /api/webhook`

## Extensiones sugeridas

- Integrar WhatsApp Business API o Twilio real en `backend/utils/whatsappMock.js`
- Agregar pasarela de pagos para créditos
- Añadir roles de usuario y facturación
- Mejorar estado online/offline
- Agregar tests para backend y frontend

---

Este proyecto es un punto de partida funcional para administrar bots de WhatsApp con una lógica de créditos lista para desplegar.


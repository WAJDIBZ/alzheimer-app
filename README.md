# Alzheimer App - Patient Management Monorepo

Ce dépôt contient un module complet **Patient Management** avec backend Spring Boot + MySQL et frontend Angular + Angular Material.

## Structure
- `backend/` : API REST Spring Boot
- `frontend/` : application Angular
- `docker-compose.yml` : MySQL local

## Prérequis
- Java 17
- Maven 3.9+
- Node.js 18+
- npm 9+
- Docker (optionnel mais recommandé)

## Lancer la base de données
```bash
docker-compose up -d
```

## Lancer le backend
```bash
cd backend
./mvnw spring-boot:run
```
Variables prises en charge (avec défauts):
- `DB_HOST=localhost`
- `DB_PORT=3306`
- `DB_NAME=medicaldb`
- `DB_USER=root`
- `DB_PASSWORD=root`

Swagger UI (si démarré): `http://localhost:8080/swagger-ui.html`

## Lancer le frontend
```bash
cd frontend
npm install
npm start
```
Puis ouvrir `http://localhost:4200`.

## URLs
- Backend: `http://localhost:8080`
- Frontend: `http://localhost:4200`

## Navigation
- `/` : page d’accueil avec boutons Admin / Soignant
- `/admin/patients` : gestion complète (CRUD)
- `/soignant/patients` : dossier soignant (édition medical record + traitements)

## Notes
- Aucune authentification (pas de Spring Security)
- DTOs utilisés partout (pas d’exposition d’entités JPA)
- Données de démarrage dans `backend/src/main/resources/data.sql`

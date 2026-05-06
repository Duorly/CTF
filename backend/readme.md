# Variables d'environnement pour lancer le projet

Crée un fichier `.env` à la racine du backend avec les variables suivantes :

```env
# Application
NODE_E
PORT=

# Base de données
DB_HOST=localhost
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=$$

# Authentification
JWT_SECRET=
JWT_EXPIRES_IN=

# CORS
CORS_ORIGIN=http://localhost:5173

# CTF / flags
FLAG=CTF{your_flag_here}

# Logs
LOG_LEVEL=debug
```

Si le projet utilise d'autres services, ajoute ici leurs variables spécifiques.

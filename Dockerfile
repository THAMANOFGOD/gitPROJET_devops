# Image légère nginx pour servir un site statique
FROM nginx:alpine

# Supprime la page par défaut
RUN rm -rf /usr/share/nginx/html/*

# Copie tout le contenu du repo dans le dossier web de nginx
COPY . /usr/share/nginx/html

# Expose le port 80
EXPOSE 80

# Commande par défaut: lancer nginx
CMD ["nginx", "-g", "daemon off;"]

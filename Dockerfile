# On part d'une base Python
FROM python:3.10-slim

# On définit le dossier de travail
WORKDIR /app

# On installe runpod pour que le serveur communique avec l'extérieur
RUN pip install --no-cache-dir runpod

# On copie tes fichiers de GitHub vers le serveur
COPY . .

# On lance ton script (remplace 'votre_script.py' par le nom de ton fichier principal)
CMD [ "python", "-u", "votre_script.py" ]

@echo off
cd /d C:\Users\goreg\gg

echo === Creation de l'archive ===
tar -czf ..\projet.tar.gz --exclude=node_modules --exclude=.git --exclude=dist --exclude=build .

echo === Envoi sur le serveur ===
scp ..\projet.tar.gz dev@192.168.0.23:~/

echo === Build et lancement Docker ===
ssh dev@192.168.0.23 "rm -rf ~/mon-projet && mkdir -p ~/mon-projet && tar -xzf ~/projet.tar.gz -C ~/mon-projet && cd ~/mon-projet && docker compose up -d --build && docker compose ps"

del ..\projet.tar.gz
echo === Deploiement termine : http://192.168.0.23:8080 ===
pause
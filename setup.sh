#!/bin/bash

# 1. On crée le dossier de destination s'il n'existe pas
mkdir -p /workspace/ComfyUI/custom_nodes

# 2. On se déplace dans ce dossier
cd /workspace/ComfyUI/custom_nodes

# 3. On télécharge ReActor (le lien est public, donc pas de mot de passe)
git clone https://github.com/Gourieff/comfyui-reactor-node

echo "L'installation est terminée, tu peux maintenant lancer ComfyUI !"

#!/bin/bash

# Création du dossier
mkdir -p /workspace/ComfyUI/custom_nodes

# On entre dans le dossier (en minuscules !)
cd/workspace/ComfyUI/custom_nodes

# Téléchargement de ReActor
git clone https://github.com/Gourieff/comfyui-reactor-node.git

echo "L'installation est terminée !"

#!/bin/bash
# Installation directe dans le bon dossier
cd /workspace/ComfyUI/custom_nodes || mkdir -p /workspace/ComfyUI/custom_nodes && cd /workspace/ComfyUI/custom_nodes
git clone https://github.com/Gourieff/comfyui-reactor-node.git
echo "Terminé !"

#!/bin/bash
# Installation rapide pour économiser les 8$
cd /workspace/ComfyUI/custom_nodes

# 1. Cameo / Face Swap (ReActor)
git clone https://github.com/Gourieff/comfyui-reactor-node.git

# 2. Virtual Try-On (OOTDiffusion)
git clone https://github.com/vik9494/ComfyUI-OOTDiffusion.git

# 3. Vidéo & Upscale 4K (AnimateDiff + Ultimate SD Upscale)
git clone https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git
git clone https://github.com/ssitu/ComfyUI_Ultimate_SD_Upscale.git

# 4. Clonage Vocal (F5-TTS)
cd /workspace && git clone https://github.com/SWivid/F5-TTS.git
cd F5-TTS && pip install -e .

# Lancement automatique
cd /workspace/ComfyUI && python main.py --highvram

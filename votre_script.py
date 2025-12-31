import runpod

# Cette fonction reçoit les ordres de Lovable
def handler(job):
    # Récupère les données envoyées
    valeur_recue = job["input"].get("message", "Pas de message")
    
    # Ta réponse personnalisée
    return {"status": "success", "reponse": f"Serveur KPOGO activé : {valeur_recue}"}

# Démarre l'écoute
runpod.serverless.start({"handler": handler})

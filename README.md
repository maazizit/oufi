# Maquettes — site vitrine + back-office (vidéosurveillance, réseau, informatique)

Prototype cliquable pour une entreprise d'installation et de vente de caméras de
surveillance, de matériel réseau et de matériel informatique (Maroc).

## Contenu

- `maquettes/prototype.html` — prototype complet en un seul fichier (HTML/CSS/JS, sans dépendance).

## Ce que la maquette couvre

**Site client**
- Accueil, Services, Catalogue produits, Devis, Suivi de demande, Contact.
- Panier **sans paiement en ligne** : le client compose son panier, laisse ses
  coordonnées, choisit son canal de contact (e-mail / WhatsApp / téléphone) et
  reçoit une référence avec la promesse d'un rappel sous 24 h ouvrées.
- Formulaire de devis en 3 étapes qui collecte ce dont le technicien a besoin :
  adresse complète, ville, type de local, surface, nombre de caméras, intérieur
  ou extérieur, internet sur place, installation existante, délai, budget.
- **Frais de déplacement** affichés avant l'envoi (200 DH à Casablanca par
  défaut), variables par ville et déduits du devis si les travaux sont confirmés.

**Back-office**
- Tableau de bord : nouvelles demandes, devis en attente, interventions du jour,
  stock bas, volume des 7 derniers jours, répartition par type, planning.
- Demandes : filtres par statut / origine / recherche, fiche détaillée avec
  toutes les réponses du formulaire, coordonnées et canal préféré, changement de
  statut, assignation d'un technicien, notes internes, historique.
- Catalogue : ajout, modification, suppression, stock et publication des articles.
- Interventions : planning et clôture.
- Réglages : nom de l'entreprise (provisoire), coordonnées, frais de déplacement
  par ville, canaux de contact proposés, délai de réponse annoncé.

**Transverse**
- Bilingue français / arabe avec passage complet en RTL.
- Thème clair et thème sombre.
- Responsive jusqu'à 390 px de large.

## Notes

- L'état est conservé dans le `localStorage` du navigateur. Une demande envoyée
  depuis le site apparaît réellement dans le back-office : le bandeau de démo en
  haut de page permet de basculer entre les deux.
- Le nom « Oufi Sécurité », les coordonnées, les prix et les références clients
  sont des données de démonstration. Le nom se change en un seul endroit
  (Back-office › Réglages).
- Il n'y a pas de serveur : c'est une maquette de validation, pas une application
  de production.

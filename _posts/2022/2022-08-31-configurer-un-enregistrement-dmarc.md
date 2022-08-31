---
title: "Configurer un enregistrement DMARC (avec ou sans Office 365)"
date: 2022-08-31 16:12:00:00 +02:00
layout: post
tags: [m365,dmarc,authentification,spam]
categories: [dmarc]
readtime: true
comments: true
cover-img: "assets/img/banners/email-authentication.png"
thumbnail-img: "assets/img/posts/2022/08/email-authentication-thumb.png"
---

Un enregistrement DMARC apparaît toujours sous la forme *_dmarc.entreprise.fr*. C'est un enregistrement de type TXT comportant des attributs bien précis qui seront lus par le serveur du destinataire. Ci dessous, un tableau des attributs les plus courants. La liste complète se trouve dans la [RFC 7489 section 6.3](https://tools.ietf.org/html/rfc7489#section-6.3).

# Attributs d'un enregistrement DMARC

| **Attribute** | **Description**                                                                                        | **Mandatory** | **Default Value**                        | **Sample Value**                 |
|---------------|--------------------------------------------------------------------------------------------------------|---------------|------------------------------------------|----------------------------------|
| **v**         | Version \- must be set to "DMARC1" and must be the first tag in the list                               | Yes           | \-                                       | v=DMARC1                         |
| **p**         | Requested policy that recipient should apply to email\. Can be set to "none", "quarantine" or "reject" | Yes           | \-                                       | p=none                           |
| **rua**       | RUI \(mail address\) where to send aggregate reports                                                   | No            | \-                                       | rua=mailto:dmarc@company\.com    |
| **ruf**       | RUI \(mail address\) where to send message\-specific failure information                               | No            | \-                                       | ruf=mailto:forensic@company\.com |
| **pct**       | Percentage of messages subject to filtering, i\.e\. only check 10% of emails                           | No            | 100                                      | pct=10                           |
| **sp**        | Policy to apply to subdomains                                                                          | No            | Same as top domain policy \(value of p\) | sp=quarantine                    |
| **adkim**     | Assigns strict or relaxed DKIM identifier alignment, "r" is relaxed, "s" is strict                     | No            | r                                        | adkim=s                          |
| **aspf**      | Assigns strict or relaxed SPF identifier alignment, "r" is relaxed, "s" is strict                      | No            | r                                        | aspf=s                           |
| **ri**        | Requested interval between aggregate reports in seconds                                                | No            | 86400                                    | ri=43200                         |

En utilisant les informations du tableau ci-dessus, voici un exemple d’enregistrement DMARC qui effectuera une vérification stricte de l’alignement des identifiants DKIM et SPF, mettra en quarantaine tout e-mail qui échoue à la validation DKIM et SPF et enverra des rapports agrégés à dmarc@company.com :

```
v=DMARC1; p=quarantine; rua=mailto:dmarc@entreprise.fr; adkim=s; aspf=s
```
# Implémenter une politique DMARC (phase BUILD) ?

La mise en oeuvre de DMARC suit un processus itératif d'amélioration continue (*PDCA*). Le schéma ci-dessous vous permettra de réaliser une mise en oeuvre contrôlée qui n'affectera pas la délivrabilité de vos courriers de manière négative. Ces étapes sont généralistes et doivent être adaptées à votre situation particulière. 

![PDCA et DMARC](/assets/img/posts/2022/08/implementer-DMARC-PDCA.png)

# Exploiter tout le potentiel de la solution (phase RUN)

La mise en oeuvre ne se fait pas en mode *fire-and-forget*. Une fois la phase de *BUILD* terminée, c'est à dire que votre politique est au moins à p=quarantine sur la totalité de vos courriers, vous devez mettre en place le processus de surveillance.

Il est tout à fait possible de consulter uniquement les rapports agrégés de temps à autre mais je vous suggère d'utiliser un outil comme [DMARCLY](https://dmarcly.com/?fpr=2oren) ou autre. Cela facilite grandement l'analyse des rapports, sauf si la lecture de fichiers *xml* vous passionne. 

Voici un schéma vous permettant de monter un processus d'analyse :

![Bien gérer DMARC](/assets/img/posts/2022/08/processus-anayse-rapports-dmarc.png)

**Avant de vous lancer dans l'implémentation d'une politique DMARC, il est essentiel de comprendre parfaitement les protocoles SPF et DKIM.**

## Liste des articles relatifs à la mise en oeuvre d'une politique DMARC
1. [Implémenter DMARC (avec ou sans Office 365)](https://techlifejacket.github.io/dmarc/implementer-dmarc-avec-ou-sans-office-365)
2. [Configurer un enregistrement DMARC (avec ou sans Office 365)](https://techlifejacket.github.io/dmarc/configurer-un-enregistrement-dmarc)
import { Router, Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';
import { Etudiant } from '../types/etudiants';

const router = Router();


let etudiants: Etudiant[] = [];


router.get('/', function (req: Request, res: Response) {
  res.status(200).json(etudiants);
});


router.get('/:id', function (req: Request, res: Response, next: NextFunction) {
  const idRecherche = req.params.id;

  let etudiantTrouve: Etudiant | undefined = undefined;

  for (let i = 0; i < etudiants.length; i++) {
    if (etudiants[i].id === idRecherche) {
      etudiantTrouve = etudiants[i];
    }
  }

  if (etudiantTrouve === undefined) {

    const erreur: any = new Error('Étudiant non trouvé');
    erreur.status = 404;
    return next(erreur);
  }

  res.status(200).json(etudiantTrouve);
});


router.post('/', function (req: Request, res: Response, next: NextFunction) {
  const nom = req.body.nom;
  const prenom = req.body.prenom;
  const email = req.body.email;

  if (nom === undefined || prenom === undefined || email === undefined) {
    const erreur: any = new Error('Les champs nom, prenom et email sont requis');
    erreur.status = 400;
    return next(erreur);
  }

  const nouvelEtudiant: Etudiant = {
    id: randomUUID(),
    nom: nom,
    prenom: prenom,
    email: email
  };

  etudiants.push(nouvelEtudiant);

  res.status(201).json(nouvelEtudiant);
});


router.put('/:id', function (req: Request, res: Response, next: NextFunction) {
  const idRecherche = req.params.id;

  let position = -1;
  for (let i = 0; i < etudiants.length; i++) {
    if (etudiants[i].id === idRecherche) {
      position = i;
    }
  }

  if (position === -1) {
    const erreur: any = new Error('Étudiant non trouvé');
    erreur.status = 404;
    return next(erreur);
  }

  const nom = req.body.nom;
  const prenom = req.body.prenom;
  const email = req.body.email;

  if (nom === undefined || prenom === undefined || email === undefined) {
    const erreur: any = new Error('PUT nécessite tous les champs : nom, prenom, email');
    erreur.status = 400;
    return next(erreur);
  }

  etudiants[position] = {
    id: etudiants[position].id,
    nom: nom,
    prenom: prenom,
    email: email
  };

  res.status(200).json(etudiants[position]);
});


router.patch('/:id', function (req: Request, res: Response, next: NextFunction) {
  const idRecherche = req.params.id;

  let position = -1;
  for (let i = 0; i < etudiants.length; i++) {
    if (etudiants[i].id === idRecherche) {
      position = i;
    }
  }

  if (position === -1) {
    const erreur: any = new Error('Étudiant non trouvé');
    erreur.status = 404;
    return next(erreur);
  }

 
  if (req.body.nom !== undefined) {
    etudiants[position].nom = req.body.nom;
  }
  if (req.body.prenom !== undefined) {
    etudiants[position].prenom = req.body.prenom;
  }
  if (req.body.email !== undefined) {
    etudiants[position].email = req.body.email;
  }

  res.status(200).json(etudiants[position]);
});


router.delete('/:id', function (req: Request, res: Response, next: NextFunction) {
  const idRecherche = req.params.id;

  let position = -1;
  for (let i = 0; i < etudiants.length; i++) {
    if (etudiants[i].id === idRecherche) {
      position = i;
    }
  }

  if (position === -1) {
    const erreur: any = new Error('Étudiant non trouvé');
    erreur.status = 404;
    return next(erreur);
  }

  etudiants.splice(position, 1);

  res.status(204).send();
});

export default router;
package com.ctf.api.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ctf.api.entities.Utilisateur;
import com.ctf.api.repositories.UtilisateurRepository;
import com.ctf.api.services.UtilisateurService;

@Service
public class UtilisateurServiceImpl implements UtilisateurService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Override
    public Utilisateur getUtilisateurById(Long id) {
        return null;
    }

    @Override
    public Utilisateur getUtilisateurByEmail(String adresseMail) {
        return null;
    }

    @Override
    public Utilisateur createUtilisateur(Utilisateur utilisateur) {
        return null;
    }

    @Override
    public Utilisateur updateUtilisateur(Utilisateur utilisateur) {
        return null;
    }

    @Override
    public List<Utilisateur> getAllUtilisateur() {
        return null;
    }

    @Override
    public void deleteUtilisateurByEmail(String adresseMail) {
    }

    @Override
    public void deleteUtilisateurById(Long id) {        
    }

}

package com.ctf.api.services;

import java.util.List;

import com.ctf.api.entities.Sondage;

public interface SondageService {

    Sondage createSondage(Sondage sondage);
    List<Sondage> getAllSondages();
    Sondage getSondageById(Long id);
    void deleteSondage(Long id);    
}

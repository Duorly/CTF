package com.ctf.api.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ctf.api.entities.Sondage;
import com.ctf.api.repositories.SondageRepository;

import com.ctf.api.services.SondageService;

@Service
public class SondageServiceImpl implements SondageService {
    @Autowired
    private SondageRepository sondageRepository;


    
    public Sondage createSondage(Sondage sondage) {
        if (sondage.getOptions() != null) {
            sondage.getOptions().forEach(option -> option.setSondage(sondage));
        }
        if (sondage.getCreat_at() == null) {
            sondage.setCreat_at(java.time.LocalDateTime.now());
        }
        return sondageRepository.save(sondage);
    }
    public List<Sondage> getAllSondages() {
        return sondageRepository.findAll();
    }
    public Sondage getSondageById(Long id) {
        return sondageRepository.findById(id).orElse(null);
    }
    public void deleteSondage(Long id) {
        sondageRepository.deleteById(id);
    }

}

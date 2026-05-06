package com.ctf.api.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ctf.api.entities.Option;
import com.ctf.api.repositories.OptionRepository;
import com.ctf.api.services.OptionService;

@Service
public class OptionServiceImpl implements OptionService { 

    @Autowired 
    private OptionRepository optionRepository;    

    @Override
    public Option getOptionById(Long id) {
        return optionRepository.findById(id).orElse(null);
    }

    @Override
    public Option createOption(Option option) {
        return optionRepository.save(option);
    }

    @Override
    public void deleteOption(Long id) {
        optionRepository.deleteById(id);
    }

    @Override
    public void getallOptions() {
            optionRepository.findAll();
        
    }
    
}
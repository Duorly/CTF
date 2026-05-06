package com.ctf.api.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ctf.api.services.OptionService;

@Service
public class OptionServiceImpl implements OptionService { 

    @Autowired 
    private OptionService optionService;    

    @Override
    public OptionService getOptionById(Long id) {
        return null;
    }
    @Override
    public OptionService createOption(OptionService option) {

}

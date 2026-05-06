package com.ctf.api.services;

import java.util.List;

import com.ctf.api.entities.Option;

public interface OptionService {

    Option getOptionById(Long id);

    Option createOption(Option option);

    void deleteOption(Long id);

    List<Option> getAllOptions();

}

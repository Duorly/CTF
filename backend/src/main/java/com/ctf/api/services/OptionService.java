package com.ctf.api.services;

import com.ctf.api.entities.Option;

public interface OptionService {

    Option getOptionById(Long id);

    Option createOption(Option option);

    void deleteOption(Long id);

    void getallOptions();

}

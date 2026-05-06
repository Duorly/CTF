package com.ctf.api.web;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ctf.api.entities.Option;
import com.ctf.api.services.OptionService;

@RestController
@RequestMapping("/api/options")
public class OptionController {

    private final OptionService optionService;

    public OptionController(OptionService optionService) {
        this.optionService = optionService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Option> getOptionById(@PathVariable Long id) {
        Option option = optionService.getOptionById(id);
        return option != null ? ResponseEntity.ok(option) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Option> createOption(@RequestBody Option option) {
        Option created = optionService.createOption(option);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }
}

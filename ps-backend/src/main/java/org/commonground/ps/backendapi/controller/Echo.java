package org.commonground.ps.backendapi.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/echo")
public class Echo {
    
    @GetMapping
    public ResponseEntity<?> getEcho(){
        return ResponseEntity.ok("Echo");
    }
}

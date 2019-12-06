package com.predictor.controller;

import com.google.gson.Gson;
import com.predictor.domain.TickerManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TickerController {

    @Autowired
    TickerManager tickerManager;

    @GetMapping(value = "/tickerList")
    public String getTickerList(){
        return new Gson().toJson(tickerManager.getTickers() );
    }

}

package com.predictor.controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.predictor.domain.TickerManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
public class TickerController {

    @Autowired
    TickerManager tickerManager;



    @GetMapping(value = "/tickerList")
    public String getTickerList(){
        System.out.println("ticker request");
        List<String> tickerList =  tickerManager.getTickers();
        String[] returnList = new String[tickerList.size()];

        for (int i = 0; i<returnList.length;i++){
            returnList[i] = tickerList.get(i);
        }

        return new Gson().toJson(returnList );
    }



}

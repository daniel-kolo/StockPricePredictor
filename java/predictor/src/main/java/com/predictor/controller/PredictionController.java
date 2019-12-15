package com.predictor.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.predictor.DTO.UserDTO;
import com.predictor.domain.PredictionManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class PredictionController {

    @Autowired
    PredictionManager predManager;

    @PostMapping(value = "/prediction")
    public String getPrediction(@RequestBody String predictionRequest) throws Exception {
        System.out.println("asd");
        ObjectMapper mapper = new ObjectMapper();
        JsonNode actualObj = mapper.readTree(predictionRequest);
        JsonNode jsonNodeTicker = actualObj.get("data");
        String ticker = jsonNodeTicker.get("ticker").toString().split("\"")[1];

        predManager.getPrediction(ticker).getBestPrediction();

        List<Double> predictionList =  predManager.getPrediction(ticker).getBestPrediction();
        String[] returnList = new String[predictionList.size()];

        for (int i = 0; i<returnList.length;i++){
            returnList[i] = predictionList.get(i).toString();
        }

        return new Gson().toJson(returnList );
    }



}

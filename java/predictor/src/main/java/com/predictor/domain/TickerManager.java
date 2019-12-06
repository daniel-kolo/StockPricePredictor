package com.predictor.domain;

import org.springframework.core.io.Resource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Component
public class TickerManager {

    private List<String> tickerList;
    public TickerManager(){
        tickerList = new ArrayList<>();
        try {
            Resource resource = new ClassPathResource("tickers.csv");
            InputStream input = resource.getInputStream();
            File file = resource.getFile();
            BufferedReader csvReader = new BufferedReader(new FileReader(file));
            String row;
            while (( row = csvReader.readLine()) != null) {
                tickerList.add(row);
            }
            csvReader.close();
        }
        catch (IOException e){
            System.out.println(e);
            System.exit(1);
        }
    }

    public List<String> getTickers(){
        return tickerList;
    }


}

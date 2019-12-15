package com.predictor.domain;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class PredictionManager {

    public PredictionManager(){

    }

    public Prediction getPrediction(String ticker){
        List predictionList = new ArrayList();
        Prediction pred = new Prediction();
        try {
            Resource resource = new ClassPathResource("/python/results/" + ticker +".csv");
            InputStream input = resource.getInputStream();
            File file = resource.getFile();
            BufferedReader csvReader = new BufferedReader(new FileReader(file));
            String row;
            int counter = 0;
            while (( row = csvReader.readLine()) != null) {

                if (counter == 0){
                    //System.out.println("first :" + row);
                } else{
                    double lrConfidence = Double.parseDouble(row.split(",")[1]);
                    double svmConfidence = Double.parseDouble(row.split(",")[3]);
                    List<String> tmpList = Arrays.asList(row.split(",")[2].split(" "));
                    List<String> lrList = new ArrayList<>();

                    for (int i = 0; i<tmpList.size(); i++){
                        if (tmpList.get(i).matches(".*\\d.*")){
                            lrList.add(tmpList.get(i).replace("[","").replace("]","").replace(" ", ""));
                        }
                    }

                    tmpList = Arrays.asList(row.split(",")[4].split(" "));
                    List<String> svmList = new ArrayList<>();

                    for (int i = 0; i<tmpList.size(); i++){
                        if (tmpList.get(i).matches(".*\\d.*")){
                            svmList.add(tmpList.get(i).replace("[","").replace("]","").replace(" ", ""));
                        }
                    }

                    List<Double> floatLrList = new ArrayList<>();
                    List<Double> floatSvmList = new ArrayList<>();

                    for (int i = 0; i<lrList.size();i++){
                        floatLrList.add(Double.parseDouble(lrList.get(i)));
                    }

                    for (int i = 0; i<svmList.size();i++){
                        floatSvmList.add(Double.parseDouble(svmList.get(i)));
                    }

                    pred = new Prediction(lrConfidence, svmConfidence, floatLrList, floatSvmList);
                }
                counter +=1;
            }
            csvReader.close();

        }
        catch (IOException e){
            System.out.println(e);
            System.exit(1);
        }
        return pred;
    }


}

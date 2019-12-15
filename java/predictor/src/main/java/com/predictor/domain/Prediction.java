package com.predictor.domain;

import java.util.List;

public class Prediction {

    // [,lr_confidence,lr_prediction,svm_confidence,svm_prediction,
    //  0,0.9909092790818148,[75.9427832  76.30204873 76.49165028 76.3619225  76.76596173]
    // ,0.9916173128561163,[76.65189942 76.95845467 77.11343889 77.00777567 77.33675797]]

    private double lrConfidence;
    private double svmConfidence;
    private List<Double> lrPredictions;
    private List<Double> svmPredictions;

    public Prediction(double lrConfidence , double svmConfidence, List<Double> lrPredictions, List<Double> svmPredictions){
        this.lrConfidence = lrConfidence;
        this.svmConfidence = svmConfidence;
        this.lrPredictions = lrPredictions;
        this.svmPredictions = svmPredictions;
    }

    public Prediction(){}

    public List<Double> getBestPrediction(){
        if (lrConfidence>=svmConfidence){
            return lrPredictions;
        }
        else{
            return svmPredictions;
        }
    }

    @Override
    public String toString() {
        return "Prediction{" +
                "lrConfidence=" + lrConfidence +
                ", svmConfidence=" + svmConfidence +
                ", lrPredictions=" + lrPredictions +
                ", svmPredictions=" + svmPredictions +
                '}';
    }
}

import numpy as np
import keras
from sklearn.linear_model import LinearRegression
from sklearn.svm import SVR
from sklearn.model_selection import train_test_split
import pandas as pd
import os

class Predictor():

    def __init__(self, time_series, ticker):
        self.time_series = time_series
        self.ticker = ticker

    def predict(self, num_of_day):
        df = self.time_series
        try:
            if df.empty:
                return

            df = df.dropna()
            df = df[['Close']]
            df['Prediction'] = df[['Close']].shift(-num_of_day)
        except AttributeError or ValueError as e:
            print(e)
            return

        X = np.array(df.drop(['Prediction'], 1))
        X = X[:-num_of_day]

        y = np.array(df['Prediction'])
        y = y[:-num_of_day]

        x_train, x_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

        svr_rbf = SVR(kernel='rbf', C=1e3, gamma=0.1)
        svr_rbf.fit(x_train, y_train)

        svm_confidence = svr_rbf.score(x_test, y_test)
        print("svm confidence: ", svm_confidence)

        lr = LinearRegression()
        lr.fit(x_train, y_train)

        lr_confidence = lr.score(x_test, y_test)
        print("lr confidence: ", lr_confidence)

        x_forecast = np.array(df.drop(['Prediction'], 1))[-num_of_day:]

        lr_prediction = lr.predict(x_forecast)
        print("Linear Regression prediction:")
        print(lr_prediction)

        svm_prediction = svr_rbf.predict(x_forecast)
        print("Support Vector Machine prediction:")
        print(svm_prediction)

        result_df = pd.DataFrame(columns = ['lr_confidence', 'lr_prediction', 'svm_confidence', 'svm_prediction'])
        result_df.loc[0] = [lr_confidence, lr_prediction, svm_confidence, svm_prediction]
        if not os.path.exists('results'):
            os.makedirs('results')
        with open("results/{}.csv".format(self.ticker), 'w+') as f:
            result_df.to_csv(f, header = True)
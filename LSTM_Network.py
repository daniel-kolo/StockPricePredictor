import pandas as pd
import numpy as np
from FinanceDataManager import FinanceDataManager
import tensorflow as tf
from Preprocessing import Preprocessing
import pandas_datareader.data as pdr


class LSTM_Network:

    def __init__(self, X_train, X_test , Y_train, Y_test):
        self.X_train = X_train
        self.Y_train = Y_train
        self.X_test = X_test
        self.Y_test = Y_test
        self.model = tf.keras.Sequential()
        self.model.add(tf.keras.layers.LSTM(20, input_shape=(10, 1), return_sequences=True))
        self.model.add(tf.keras.layers.LSTM(20))
        self.model.add(tf.keras.layers.Dense(1, activation=tf.nn.relu))
        self.model.compile(optimizer="adam", loss="mean_squared_error")

    def train(self):
        self.model.fit(self.X_train, self.Y_train, epochs=50)

    def evaluate(self):
        print(self.model.evaluate(self.X_test, self.Y_test))

        data = pdr.get_data_yahoo("AAPL", "2017-12-19", "2018-01-03")
        stock = data["Adj Close"]
        X_predict = np.array(stock).reshape((1, 10, 1)) / 200

        print(self.model.predict(X_predict) * 200)




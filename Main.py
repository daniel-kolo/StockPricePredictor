
from FinanceDataManager import FinanceDataManager
from Preprocessing import  Preprocessing
from LSTM_Network import LSTM_Network

import tensorflow as tf

if __name__ == "__main__":
    #sess = tf.Session(config=tf.ConfigProto(log_device_placement=True))
    #exit()

    #from keras import backend as K
    #K.tensorflow_backend._get_available_gpus()

    finance_data_manager = FinanceDataManager("AAPL", start = "2003-01-01", end = "2017-01-01")
    prices = finance_data_manager.get_prices()

    prep = Preprocessing("stock_prices.csv", 0.9)
    prep.gen_train(10)
    prep.gen_test(10)

    X_train = prep.X_train.reshape((3379, 10, 1)) / 200
    Y_train = prep.Y_train / 200

    X_test = prep.X_test.reshape(359, 10, 1) / 200
    Y_test = prep.Y_test / 200

    LSTM = LSTM_Network(X_train, X_test , Y_train, Y_test)
    LSTM.train()
    LSTM.evaluate()
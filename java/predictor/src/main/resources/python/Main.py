
from FinanceDataManager import FinanceDataManager
from Preprocessing import  Preprocessing
from LSTM_Network import LSTM_Network
from Predictor import Predictor
import datetime

import tensorflow as tf

if __name__ == "__main__":
    #sess = tf.Session(config=tf.ConfigProto(log_device_placement=True))
    #exit()

    #from keras import backend as K
    #K.tensorflow_backend._get_available_gpus()

    start_time = datetime.datetime.now()

    data_manager = FinanceDataManager()
    #prices = data_manager.get_prices(stock_name="FB", start = "2000-01-01", end = "2019-10-01")
    #predictor = Predictor(prices)
    #predictor.predict(5)
    #print(data_manager.save_sp500_tickers())
    start = datetime.datetime(2010,9,1)
    end = datetime.datetime(2019,10,1)

    count =0

    for element in data_manager.get_sp500_tickers():
        if element == None or type(element) == None:
            continue
        print("{} {}".format(count, element))
        predictor = Predictor(data_manager.get_prices(element, start, end), element)
        predictor.predict(5)
        count += 1

    # elol 3-4-5
    # hatul 6 5 7

    end = datetime.datetime.now()
    print(start_time)
    print(end)

    exit()


    finance_data_manager = FinanceDataManager("AAPL", start = "2003-01-01", end = "2017-01-01")
    prices = finance_data_manager.get_prices()

    prep = Preprocessing("stock_prices2.csv", 0.9)
    prep.gen_train(10)
    prep.gen_test(10)

    X_train = prep.X_train.reshape((3379, 10, 1)) / 200
    Y_train = prep.Y_train / 200

    X_test = prep.X_test.reshape(359, 10, 1) / 200
    Y_test = prep.Y_test / 200

    LSTM = LSTM_Network(X_train, X_test , Y_train, Y_test)
    LSTM.train()
    LSTM.evaluate()
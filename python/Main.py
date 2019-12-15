
from FinanceDataManager import FinanceDataManager
from Preprocessing import  Preprocessing
from LSTM_Network import LSTM_Network
from Predictor import Predictor
import datetime

import tensorflow as tf

if __name__ == "__main__":
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

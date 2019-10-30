import pandas_datareader.data as pdr
import yfinance as yf
import time
import os
import pandas as pd

class FinanceDataManager:

    def __init__(self, stock_name, start="", end=""):
        self.stock_name = stock_name
        self.start = start
        self.end = end

    def get_prices(self):
        filename = str(self.stock_name) + "_" + str(self.start) + "_" + str(self.end)
        if filename in os.listdir('./data/raw/'):
            df = pd.read_csv('./data/raw/' + str(filename) + ".csv")
        else:
            stock = yf.Ticker(self.stock_name)
            df = stock.history(start=self.start, end=self.end)
            df = df.reset_index()
            del df['Date']
            self.serialize(df, filename)

        return df['Close']

    def serialize(self, stock_df, filename):
        pd.to_csv("./data/raw/{}.csv".format(filename), stock_df, index = False, sep =",")


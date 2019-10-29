import pandas_datareader.data as pdr
import yfinance as yf
import time
import os

class FinanceDataManager:

    def __init__(self, stock_name, period = "10y"):
        self.stock_list = []
        self.stock_prices = self.get_closing_prices(stock_name, period)

    def get_closing_prices(self, stock_name, period):
        # TODO check if alredy serialized

        for stock_element in stock_name:
            stock = yf.Ticker(stock_element)
            df = stock.history(period=period)
            df = df.reset_index()
            del df['Date']
            self.stock_list = self.stock_list.append(df['Close'])

    def serialize(self, stock_name, time_interval, stock_df):
        filename = str(stock_name)+ "_" + str(time_interval)
        if filename not in os.listdir('./data/'):
            pd.to_csv("./data/raw/{}.csv".format(filename), stock_df, index = False, sep =",")


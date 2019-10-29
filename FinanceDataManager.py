import pandas_datareader.data as pdr
import yfinance as yf
import time

class FinanceDataManager:

    def __init__(self, stock_name, period = "10y"):
        self.stock_prices = self.get_closing_prices(stock_name, period)

    def get_closing_prices(self, stock_name, period):
        """
        Gives back a Pandas Dataframe of the listed Stock names.
        :param stock_name: Name, or list of names of the stocks.
        :param period: The time period from where you want the stock prices.
        :return: A Pandas Dataframe of the listed Stock names.
        """
        if type(stock_name) == str:
            stock = yf.Ticker(stock_name)
            df = stock.history(period = period)
            df = df.reset_index()
            del df['Date']
            return df['Close']
        elif type(stock_name) == list:
            for stock_element in stock_name:
                pass
                # TODO


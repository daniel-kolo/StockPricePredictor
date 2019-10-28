import pandas_datareader.data as pdr
import yfinance as yf
import time

class FinanceDataManager:

    def __init__(self, stock_name):
        self.stock = yf.Ticker(stock_name)

    def get_closing_prices(self):
        df = self.stock.history(period="10y")
        return df.Close

    def process_data(self):
        pass

    def get_train_data(self):
        pass

    def get_test_data(self):
        pass

    def get_validate_data(self):
        pass


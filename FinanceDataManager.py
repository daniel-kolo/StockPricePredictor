import pandas_datareader.data as pdr
import yfinance as yf
import time

class FinanceDataManager:

    def __init__(self, stock_name):
        self.stock = yf.Ticker(stock_name)


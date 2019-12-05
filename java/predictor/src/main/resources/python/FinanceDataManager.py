import pandas_datareader.data as pdr
import yfinance as yf
import time
import os
import pandas as pd
import requests
from bs4 import BeautifulSoup
import pickle
import datetime as dt
import pandas_datareader.data as web
import datetime

class FinanceDataManager:

    def __init__(self):
        self.tickers = None

    def save_sp500_tickers(self):
        resp = requests.get('http://en.wikipedia.org/wiki/List_of_S%26P_500_companies')
        soup = BeautifulSoup(resp.text, 'lxml')
        table = soup.find('table', {'class': 'wikitable sortable'})
        tickers = []
        for row in table.findAll('tr')[1:]:
            ticker = row.findAll('td')[0].text
            tickers.append(ticker.split('\n')[0])
        self.tickers = tickers

        with open("sp500tickers.pickle", "wb") as f:
            pickle.dump(tickers, f)

        return tickers

    def get_data_from_yahoo(self, reload_sp500=False, force_redownload = False):
        if reload_sp500:
            tickers = self.save_sp500_tickers()
        else:
            with open("sp500tickers.pickle", "rb") as f:
                tickers = pickle.load(f)
        if not os.path.exists('stock_dfs'):
            os.makedirs('stock_dfs')

        # Get the max timeframe
        for ticker in tickers:
            # just in case your connection breaks, we'd like to save our progress
            if (not os.path.exists('stock_dfs/{}.csv'.format(ticker)) or force_redownload):
                stock = yf.Ticker(ticker)
                try:
                    df = stock.history(period="max")
                    df.reset_index(inplace=True)
                    df.set_index("Date", inplace=True)
                    df.to_csv('stock_dfs/{}.csv'.format(ticker))
                    print("{} downloaded and serialized".format(ticker))
                except Exception as e:
                    print(e)
            else:
                print('Already have {}'.format(ticker))

    def get_prices(self, ticker, start=None, end=None):
        if not os.path.exists('stock_dfs/{}.csv'.format(ticker)):
            print("Stock data not downloaded for {}".format(ticker))
            return None

        df = pd.read_csv('stock_dfs/{}.csv'.format(ticker))
        df['Date'] = pd.to_datetime(df['Date'])

        if start!=None and end==None:
            mask = df['Date'] > start
        elif start==None and end!=None:
            mask = df['Date']<end
        elif start!=None and end!=None:
            mask = (df['Date']<end) & (df['Date']>start)

        try:
            return df[mask]
        except:
            return df

    def get_sp500_tickers(self):
        if not self.tickers:
            try:
                with open("sp500tickers.pickle", "rb") as f:
                    tickers = pickle.load(f)
                    self.tickers = tickers
            except FileNotFoundError:
                self.save_sp500_tickers()

        return tickers
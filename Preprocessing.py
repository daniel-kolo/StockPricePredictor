import sklearn.model_selection
import pandas as pd

class Preprocessing:

    def __init__(self, stock_prices):
        self.stock_prices = stock_prices

    def process_data(self):

        #self.X_train, \
        #self.X_test, \
        #self.y_train, \
        #self.y_test = sklearn.model_selection.train_test_split(self.stock_prices, train_size=0.9)
        train, test = sklearn.model_selection.train_test_split(self.stock_prices, train_size=0.9, shuffle = False)

        print(train)
        print(test)

        return
        # Determine if single stock or not
        if self.multiple:
            stock_names = self.stock_prices.name.unique()
            for element in stock_names:
                df = self.stock_prices[self.stock_prices['name'] == element]
                train_data = self.get_train_data(df)
                test_data = self.get_test_data(df)
                validate_data = self.get_validate_data(df)

        else:
            self.train_data = self.get_train_data()
            self.test_data = self.get_test_data()
            self.validate_data = self.get_validate_data()


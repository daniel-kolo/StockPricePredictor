
from FinanceDataManager import FinanceDataManager
from Preprocessing import  Preprocessing

if __name__ == "__main__":

    finance_data_manager = FinanceDataManager("GOOG")
    prep = Preprocessing(finance_data_manager.stock_prices)


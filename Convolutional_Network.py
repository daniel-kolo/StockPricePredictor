import numpy as np
from keras.models import Sequential
from keras.layers.core import Activation, Dense, Flatten
from keras.optimizers import SGD
import matplotlib.pyplot as plt
from keras.layers.convolutional import  Conv1D, MaxPooling1D

class conv_net():

    def __init__(self, window_size, filter_length, nb_input_series=1, nb_outputs=1, nb_filter=4):
        self.window_size = window_size
        self.filter_length = filter_length
        self.nb_input_series = nb_input_series
        self.nb_outputs = nb_outputs
        self.nb_filter = nb_filter

    def build_model(self):
        self.model = Sequential()
        self.model.add(Conv1D(filters=self.nb_filter, kernel_size=self.filter_length, activation='relu',
                              input_shape=(self.window_size, self.nb_input_series)))
        self.model.add(MaxPooling1D())
        self.model.add(Conv1D(filters=self.nb_filter, kernel_size=self.filter_length, activation='relu'))
        self.model.add(MaxPooling1D())
        self.model.add(Flatten())
        self.model.add(Dense(self.nb_outputs, activation='linear'))
        self.model.compile(loss='mse', optimizer='adam', metrics=['mae'])

    def make_timeseries_instances(timeseries, window_size):
        timeseries = np.asarray(timeseries)
        assert 0 < window_size < timeseries.shape[0], "Out of range 0 < {} < {} ".format(window_size,
                                                                                         timeseries.shape[0])
        X = np.atleast_3d(
            np.array([timeseries[start:start + window_size] for start in range(0, timeseries.shape[0] - window_size)]))
        Y = timeseries[window_size:]
        return X, Y

    def evaluate_timeseries(timeseries, window_size, valid_split=0.15, test_split=0.15):
        filter_length = 5
        nb_filter = 4
        timeseries = np.atleast_2d(timeseries)
        if timeseries.shape[0] == 1:
            timeseries = timeseries.T  # 1D vektor -> 2D matrix
        nb_samples, nb_series = timeseries.shape
        model = make_1d_convnet(window_size=window_size, filter_length=filter_length, nb_input_series=nb_series,
                                nb_outputs=nb_series, nb_filter=nb_filter)
        model.summary()
        X, Y = make_timeseries_instances(timeseries, window_size)

        valid_size = int(nb_samples * (1 - test_split - valid_split))
        test_size = int(nb_samples * (1 - test_split))
        X_train, Y_train = X[:valid_size], Y[:valid_size]
        X_valid, Y_valid = X[valid_size:test_size], Y[valid_size:test_size]
        X_test, Y_test = X[test_size:], Y[test_size:]

        model.fit(X_train, Y_train, epochs=50, batch_size=16, validation_data=(X_valid, Y_valid), verbose=2)

        preds = model.predict(X_test)

        return Y_test, preds



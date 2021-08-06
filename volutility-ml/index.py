import os
import datetime
import pandas as pd
import numpy as np
import IPython
import IPython.display
import matplotlib as mpl
import matplotlib.pyplot as plt
import seaborn as sns
import tensorflow as tf

mpl.rcParams['figure.figsize'] = (8, 6)
mpl.rcParams['axes.grid'] = False

# df = pd.read_csv('./aapl.us.txt')

# df.to_csv('aapl.us.csv', index=None)

# zip_path = tf.keras.utils.get_file(origin='aapl.us.csv', fname='aapl.us.csv')
df = pd.read_csv('aapl.us.csv')
df.pop('OpenInt')

# plot_cols = ['High', 'Close', 'Volume']
# plot_features = df[plot_cols]
# plot_features.index = df['Date']
# _ = plot_features.plot()

# print(df.describe().apply(lambda s: s.apply('{0:.5f}'.format)).transpose())

plt.hist2d(df['High'], df['Volume'], bins=(10, 10), vmax=2070000000)
plt.colorbar()
plt.xlabel('High Price')
plt.ylabel('Trading Volume')

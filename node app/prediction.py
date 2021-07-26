import joblib
import numpy as np
import pandas as pd
df = pd.read_csv("titanic.csv")

df.isna().sum()

df['Age']= df['Age'].fillna(df['Age'].mean())

df.dropna(subset=['Embarked'],inplace=True)
df.isna().sum()

y = pd.Series(df['Survived'])
#Testing
loaded_model = joblib.load("model_joblib")
array = [5, 3, 1.0, 0.0, 35.0, 0, 0, 8.0500, 1.0, 0.0, 0.0]
#each value represents a feature present in the training set Hint: the users should be able to enter their own values/(or) select from a drop down list of values to make custom predictions
a = np.asarray(array).reshape(1, -1)
predicted_value = loaded_model.predict(a)

actual_value = y[4]
print("Actual Value", actual_value)
print("Predicted Value", predicted_value)
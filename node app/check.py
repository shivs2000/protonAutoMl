import joblib
from sklearn.metrics import accuracy_score, f1_score, roc_auc_score
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import category_encoders as ce
from pandas.plotting import scatter_matrix
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import json

df = pd.read_csv("titanic.csv")

df.isna().sum()

df['Age'] = df['Age'].fillna(df['Age'].mean())

df.dropna(subset=['Embarked'], inplace=True)
df.isna().sum()

describe=df.describe()
describe_json={"describe":describe}
print(describe_json)
print(df.shape)

print("The number of columns present is as follows",
      df.columns.value_counts().sum())
print("The columns present in the actual dataset is as follows",
      df.columns.tolist())
cols = df.columns.tolist()

print("Visualising the dtypes", df.dtypes)
num_cols = df.select_dtypes([np.int64, np.float64]).columns.tolist()
num_cols.remove('PassengerId')
print(num_cols)

# Generating Histograms for numeric columns
for col in num_cols:
    df.hist(column=col)
    name = col
    plt.savefig('public/histograms/'+name+'.png')

# Studying the correlation of the columns using scatter plots

scatter_matrix(df[num_cols], figsize=(50, 50))
plt.savefig('public/column_corelations.png')

obj_cols = df.select_dtypes([np.object]).columns.tolist()
# obj_cols.remove('Name')
# obj_cols.remove('Cabin')
# obj_cols.remove('Ticket')
# print(obj_cols)

# Plotting categorical data against frequency
for col in obj_cols:
    df[col].value_counts().plot(kind='bar')
    plt.savefig('public/categorical_vs_freq.png')

y = pd.Series(df['Survived'])
drop_list = ['Survived', 'Name', 'Ticket', 'Cabin']
X = df.drop(drop_list, axis=1)


encoder = ce.OneHotEncoder(handle_unknown='return_nan',
                           return_df=True,
                           use_cat_names=True)
X = encoder.fit_transform(X)
X


X_train, X_test, y_train, y_test = train_test_split(X,
                                                    y,
                                                    test_size=0.2,
                                                    stratify=y,
                                                    random_state=42)


model = RandomForestClassifier()
model.fit(X_train, y_train)

train_preds = model.predict(X_train)
print("Training scores are as follows")
print("Accuracy Score", accuracy_score(train_preds, y_train))
print("F1 Score", f1_score(train_preds, y_train))
print("ROC AUC Score", roc_auc_score(train_preds, y_train))

test_preds = model.predict(X_test)
print("Testing scores are as follows")
print("Accuracy Score", accuracy_score(test_preds, y_test))
print("F1 Score", f1_score(test_preds, y_test))
print("ROC AUC Score", roc_auc_score(test_preds, y_test))

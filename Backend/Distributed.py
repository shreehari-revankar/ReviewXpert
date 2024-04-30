# Filename - server.py

# Import flask and datetime module for showing date and time
from flask import Flask,request, jsonify
import datetime
from Scrappertweet2 import Person, Extract
import numpy as np
from pyspark import SparkConf, SparkContext
import os
import time
import json
import jsonpickle
import base64
import os
from threading import Thread
x = datetime.datetime.now()
import pandas as pd
from wordcloud import WordCloud
import matplotlib.pyplot as plt





class Distrubuted:
    def __init__(self,option,dataload,concept):
        self.option = option
        self.dataload=dataload
        self.concept = concept

    def likes(self,dataframes):
        df2 = dataframes
        if df2.empty:
            index_like = [0]
            index_values = [0]
            overall_like = {'index_like': index_like, 'index_values': index_values}
            return overall_like
        bin_edges = pd.qcut(df2['likes'], q=5, retbins=True, duplicates='drop')[1]
        #print(bin_edges)
        # Create bins using pd.cut()
        if(len(bin_edges)!=1):
            bin_labels = [str(round(bin_edges[i])) + "-" + str(round(bin_edges[i + 1])) for i in range(len(bin_edges) - 1)]
            bins_data = pd.cut(df2['likes'], bins=bin_edges, labels=bin_labels)
            bin_counts = bins_data.value_counts()
        else:
            min_value = df2['likes'].min()
            max_value = df2['likes'].max()

            # Define bin edges
            bin_edges = [min_value, max_value]

            # Define bin labels
            bin_labels = [max_value]

            # Cut the data into bins with labels
            bin_counts = pd.cut(df2['likes'], bins=bin_edges, labels=bin_labels, include_lowest=True)
            sorted_s = bin_counts.sort_index()
            index_like = []
            index_values = []
            for index, value in sorted_s.items():
                index_like.append(value)
                index_values.append(int(1))
            overall_like = {'index_like': index_like, 'index_values': index_values}
            return overall_like

        sorted_s = bin_counts.sort_index()
        index_like = []
        index_values = []
        for index, value in sorted_s.items():
            index_like.append(index)
            index_values.append(value)
        overall_like = {'index_like': index_like, 'index_values': index_values}
        return overall_like

    def author(self,dataframes):
        df2 = dataframes
        if df2.empty:
            index_follow = [0]
            index_Follow_values = [0]
            overall_Follow = {'index_follow': index_follow, 'index_Follow_values': index_Follow_values}
            return overall_Follow
        bin_edges = pd.qcut(df2['author_follower'], q=5, retbins=True, duplicates='drop')[1]

        # Create bins using pd.cut()
        if(len(bin_edges)!=1):
            bin_labels = [str(round(bin_edges[i])) + "-" + str(round(bin_edges[i + 1])) for i in range(len(bin_edges) - 1)]
            bins_data = pd.cut(df2['author_follower'], bins=bin_edges, labels=bin_labels)
            bin_counts = bins_data.value_counts()

        else:
            min_value = df2['author_follower'].min()
            max_value = df2['author_follower'].max()

            # Define bin edges
            bin_edges = [min_value, max_value]

            # Define bin labels
            bin_labels = [max_value]

            # Cut the data into bins with labels
            bin_counts = pd.cut(df2['author_follower'], bins=bin_edges, labels=bin_labels, include_lowest=True)
            sorted_s = bin_counts.sort_index()
            index_follow = []
            index_Follow_values = []
            for index, value in sorted_s.items():
                index_follow.append(value)
                index_Follow_values.append(1)
            overall_Follow = {'index_follow': index_follow, 'index_Follow_values': index_Follow_values}
            return overall_Follow

        sorted_s = bin_counts.sort_index()
        index_follow = []
        index_Follow_values = []
        for index, value in sorted_s.items():
            index_follow.append(index)
            index_Follow_values.append(value)
        overall_Follow = {'index_follow': index_follow, 'index_Follow_values': index_Follow_values}
        return overall_Follow

    def Country_count(self,dataframes):
        df = dataframes
        value_counts = df['location'].value_counts()
        country_name = []
        country_count = []
        for i in range(len(value_counts.index)):
            if (i == 5):
                break
            country_name.append(str(value_counts.index[i]))
            country_count.append(int(value_counts[value_counts.index[i]]))
        country = {'country_name':country_name,'country_count':country_count}
        return country

    def sentiment_count(self,dataframes):
        df = dataframes
        overall_sentiment = ['positive', 'negative', 'neutral']
        overall_sentiment_count = []
        positive = int((df['max_result'] == 'positive').sum())
        overall_sentiment_count.append(positive)
        positive = int((df['max_result'] == 'negative').sum())
        overall_sentiment_count.append(positive)
        positive = int((df['max_result'] == 'neutral').sum())
        overall_sentiment_count.append(positive)
        overall_sentiment_all = {'overall_sentiment': overall_sentiment, 'overall_sentiment_count': overall_sentiment_count}
        return overall_sentiment_all

    def hourly(self,dataframes):
        df = dataframes
        df['rounded_timestamp'] = df['date'].dt.round('6H')

        # Group the comments by the rounded timestamps and count the number of comments in each interval
        comment_counts = df.groupby('rounded_timestamp').size()

        # Combine the comment counts for all days
        total_comment_counts = comment_counts.groupby(comment_counts.index.time).sum()
        comment_interval = []
        comment_count = []
        for i in range(len(total_comment_counts.index)):
            comment_interval.append(str(total_comment_counts.index[i]) + "-" + str(total_comment_counts.index[(i + 1) % (len(total_comment_counts.index))]))
            comment_count.append(int(total_comment_counts[total_comment_counts.index[i]]))
        overall_time = {'comment_interval':comment_interval,'comment_count':comment_count}
        return overall_time

    def top_comment(self,dataframes,column):
        df = dataframes
        df = df.nlargest(5, column)
        column_values = (df[column].astype(int).values).tolist()
        column_author = (df['name'].astype(str).values).tolist()
        column_link = (df['url'].astype(str).values).tolist()
        res = {str(column): column_values, 'author': column_author, 'link': column_link}
        return res

    def word_cloud_image(self,dataframes):
        df = dataframes
        text = ' '.join(df['tweet'].dropna())

        # Define a function to adjust font sizes inversely proportional to word frequency
        def word_frequency(word):
            # You can define any custom function here based on your preference
            return 1 / (text.count(word) + 1)

        # Create a word cloud object with the custom function for font sizes
        wordcloud = WordCloud(width=800, height=400, background_color='white',
                              relative_scaling=0,
                              font_path=None,
                              colormap='viridis',
                              min_font_size=1,
                              max_font_size=100,
                              prefer_horizontal=0.9).generate_from_text(text)

        x = datetime.datetime.now()
        temp_dir = "overall.png"
        wordcloud.to_file(temp_dir)
        with open("overall.png", "rb") as image_file:
            # Encode image data as Base64 string
            encoded_image = base64.b64encode(image_file.read()).decode("utf-8")

        # Construct JSON payload with image data
        payload = {
            "name": "example",
            "image": encoded_image  # Include Base64-encoded image data
        }
        return payload


    def overall_analysis(self,dataframes,concept):
        df = dataframes
        df['date'] = pd.to_datetime(df['date'])
        aggregated_data_all = df.groupby(pd.Grouper(key='date', freq=pd.Timedelta(days=1)))['max_result'].apply(lambda x: x.count()).reset_index()
        aggregated_data_all['date'] = aggregated_data_all['date'].dt.date
        aggregated_data_all['date'] = aggregated_data_all['date'].astype(str)
        total_graph_value = aggregated_data_all['max_result'].to_numpy()
        total_axis_value = aggregated_data_all['date'].to_numpy()
        total_graph_value = total_graph_value.tolist()
        total_axis_value = total_axis_value.tolist()
        data = {'Max_result': total_graph_value, 'Dates': total_axis_value}


        overall_like = self.likes(df)

        overall_Follow = self.author(df)

        overall_time = self.hourly(df)

        overall_sentiment_all = self.sentiment_count(df)

        concept_count = []
        for i in concept:
            concept_count.append(int((df[i] == 1).sum()))
        concept_all = {'concept': concept, 'concept_count': concept_count}
        overall_sentiments = ['positive', 'neutral', 'negative']
        dic = {}
        for i in overall_sentiments:
            dic[i] = []
        for i in overall_sentiments:
            temp = df[df['max_result'] == i]
            for j in concept:
                dic[i].append(int((temp[j] == 1).sum()))

        payload = self.word_cloud_image(df)
        max_author_like = self.top_comment(df,'likes')
        max_author_follow = self.top_comment(df,'author_follower')
        data = {'table': data, 'like': overall_like, 'follow': overall_Follow, 'overall_time': overall_time,'overall_sentiment_all': overall_sentiment_all, 'concept_all': concept_all, 'concept_sent': dic,'payload':payload,'max_authorlikes':max_author_like,'max_authorfollow':max_author_follow}
        return data


    def last_day(self,dataframes):
        df=dataframes
        df['date'] = pd.to_datetime(df['date'])
        # Find the latest comment
        latest_comment_time = df['date'].max()

        # Calculate the start time of the last hour
        start_time_last_hour = latest_comment_time - pd.Timedelta(hours=23)

        # Filter the DataFrame to get comments from the last hour
        last_hour_comments = df[(df['date'] >= start_time_last_hour) & (df['date'] <= latest_comment_time)]

        # Print or return the last hour comments
        # Define the time interval (2 hours in this case)
        interval = pd.Timedelta(hours=2)

        # Group the DataFrame by 2-hour intervals and sum the positive counts in the 'max' column
        aggregated_data = last_hour_comments.groupby(pd.Grouper(key='date', freq=interval)).size()
        aggregated_data.index = aggregated_data.index.to_series().apply(lambda x: x.time())
        last_day_interval = []
        last_day_value = []
        for i in range(len(aggregated_data.index)):
            last_day_interval.append(str(aggregated_data.index[i]) + "-" + str(aggregated_data.index[(i + 1) % (len(aggregated_data.index))]))
            last_day_value.append(int(aggregated_data.iloc[i]))
        last_24 = {'hours': last_day_interval, 'values': last_day_value}
        return last_24

    def last_weeks(self,dataframes):
        df = dataframes
        latest_comment_time = df['date'].max()
        start_date_last_week = latest_comment_time - pd.Timedelta(days=7)

        # Filter the DataFrame to get rows with date between start date of last week and current date
        filtered_data_last_week = df[(df['date'] >= start_date_last_week) & (df['date'] <= latest_comment_time)]
        interval_day = pd.Timedelta(days=1)
        aggregated_data = filtered_data_last_week.groupby(pd.Grouper(key='date', freq=interval_day)).size()
        aggregated_data.index = aggregated_data.index.date
        last_week_interval = []
        last_week_value = []
        for i in range(len(aggregated_data.index)):
            last_week_interval.append(str(aggregated_data.index[i]))
            last_week_value.append(int(aggregated_data[aggregated_data.index[i]]))
        last_week = {'weeks': last_week_interval, 'values': last_week_value}
        return last_week

    def last_weeks2(self,dataframes):
        filtered_data_last_week = dataframes
        interval_day = pd.Timedelta(days=1)
        aggregated_data = filtered_data_last_week.groupby(pd.Grouper(key='date', freq=interval_day)).size()
        aggregated_data.index = aggregated_data.index.date
        last_week_interval = []
        last_week_value = []
        for i in range(len(aggregated_data.index)):
            last_week_interval.append(str(aggregated_data.index[i]))
            last_week_value.append(int(aggregated_data[aggregated_data.index[i]]))
        last_week = {'weeks': last_week_interval, 'values': last_week_value}
        return last_week

    def last_all(self,dataframes):
        df2 = dataframes
        df2['month'] = df2['date'].dt.strftime('%Y-%m')
        by_month = df2.groupby(['month']).size()
        last_all_interval = []
        last_all_value = []
        for i in range(len(by_month.index)):
            last_all_interval.append(str(by_month.index[i]))
            last_all_value.append(int(by_month[by_month.index[i]]))
        last_alls = {'Months': last_all_interval, 'values': last_all_value}
        return last_alls


    def overall_sentiment(self,dataframes,types_analysis):
        df = dataframes
        if(types_analysis==0):
            last_24 = self.last_day(df)
            last_week = self.last_weeks(df)
            last_alls = self.last_all(df)
            overall_like = self.likes(df)
            overall_follow = self.author(df)
            overall_time = self.hourly(df)
            country = self.Country_count(df)
            payload = self.word_cloud_image(df)
            overall_sent = {'hour':last_24,
            'week':last_week,
            'month':last_alls,
            'overall_like':overall_like,
            'overall_follow':overall_follow,
            'overall_time':overall_time,
            'country':country,
            'payload':payload}
        elif(types_analysis==1):
            last_week = self.last_weeks2(df)
            overall_sent = {'week': last_week}
        return overall_sent

    def key_concept_analysis(self,dataframe):
        df = dataframe
        sentiment = ['positive', 'negative', 'neutral']
        dic2 ={}
        for i in self.concept:
            temp = df[df[i]==1]
            dic = {}
            for j in sentiment:
                temp2 = temp[temp['max_result'] == j].copy()
                result = self.overall_sentiment(temp2, 1)
                dic[j] = result
            overall_like = self.likes(temp)
            overall_follow = self.author(temp)
            overall_time = self.hourly(temp)
            country = self.Country_count(temp)
            dic2[i] = {'sentiment':dic,
                       'overall_like':overall_like,
                        'overall_follow':overall_follow,
                        'overall_time':overall_time,
                        'country':country}
        return dic2

    def Spark_start(self):
        try:
            conf = SparkConf().setAppName("YourApp").set("spark.driver.memory", "4g").set("spark.executor.memory", "4g")

            sc = SparkContext(conf=conf)

            # Add the Python class file to be distributed
            sc.addFile("Scrappertweet2.py")
            lines = sc.parallelize(self.dataload)
            temp = lines.map(Extract)
            if (self.option == 'Youtube'):
                result_rdd = temp.map(lambda x: x.analysisYoutubeComment())

            else:
                result_rdd = temp.map(lambda x: x.analysisTweet())
                # Collect results (if needed)
            results = result_rdd.collect()


        except Exception as e:
            print("Error:", e)
            sc.stop()

        sc.stop()
        res_df = pd.concat(results)
        res_df.to_csv("tempres.csv", index=False)
        # Returning an api for showing in reactjs

        df2 = pd.read_csv("tempres.csv")
        df = df2.drop_duplicates()
        data = self.overall_analysis(df, self.concept)
        sentiment = ['positive', 'negative', 'neutral']
        dic = {}
        for i in sentiment:
            temp = df[df['max_result'] == i].copy()
            result = self.overall_sentiment(temp, 0)
            dic[i] = result
        concept_info = self.key_concept_analysis(df)
        concept_all = {'concept_info': self.concept, 'concept_data': concept_info}
        data = {'total': data, 'sentiment': dic, 'concept': concept_all}
        return data





import pycountry
from tweety import Twitter
import time
import googleapiclient.discovery
from googleapiclient.errors import HttpError
from geopy.geocoders import Nominatim
from transformers import pipeline
import pandas as pd

class Person:
    def __init__(self,sysno, platform, hashtag, sdate, edate, lists):
      self.sysno = sysno
      self.platform = platform
      self.hashtag = hashtag
      self.sdate = sdate
      self.edate = edate
      self.lists = lists

class Extract:
    def __init__(self, A):
        self.pp = A
        self.model = pipeline(model="MarieAngeA13/Sentiment-Analysis-BERT",return_all_scores=True)

    def validate_country(self,country_name):
        try:
            pycountry.countries.lookup(country_name)
            return True
        except LookupError:
            return False
    
    def extract_country(self,location):
        geolocator = Nominatim(user_agent="geoapiExercises")
        if(isinstance(location, str)!=True):
          return None
        location = location.split(",")
        for i in location:
          if self.validate_country(i):
            return i
          else:
            try:
              location_info = geolocator.geocode(str(i))
              if location_info:
                country = location_info.raw.get('display_name').split(",")[-1].strip()
                return country
              else:
                continue
            except:
              continue
        return None

    def analysisTweet(self):
        app = Twitter("session")
        cookie = """   """
        app.load_cookies(cookie)
        result = []
        tweets = app.search(self.pp.hashtag)
        for i in range(10):
          if (((i % self.pp.platform)+1)!= self.pp.sysno):
            tweets = app.search(self.pp.hashtag, cursor = tweets.cursor)
            #print("now"+str(i))
          else:
            #print("here"+str(i))
            #print(len(tweets))
            for tweet in tweets:
              temp_res = []
              temp_res.append(tweet.text)
              #print(tweet.text)
              res = self.sentiment(tweet.text)
              if(res==1):
                continue
              max_label = max(res[0], key=lambda x: x['score'])['label']
              temp_res.append(tweet.author.name)
              temp_res.append(max_label)
              temp_res.append(res[0][0]['score'])
              temp_res.append(res[0][1]['score'])
              temp_res.append(res[0][2]['score'])
              temp_res.append(tweet.date)
              temp_res.append(tweet.likes)
              temp_res.append(tweet.author.followers_count)
              temp_res.append(self.extract_country(tweet.author.location))
              temp_res.append(tweet.url)
              for concept in self.pp.lists:
                count = 0
                for keyword in self.pp.lists[concept]:
                  if keyword in tweet.text:
                   count = 1
                   break
                temp_res.append(count)
              result.append(temp_res)
            tweets = app.search(self.pp.hashtag, cursor=tweets.cursor)
        column = ['tweet', 'name', 'max_result', 'negative', 'neutral', 'positive', 'date', 'likes', 'author_follower','location','url']
        for concept in self.pp.lists:
          column.append(concept)
        df = pd.DataFrame(result, columns=column)
        return df

    def get_subscriber_count(self,channel_username):
      i = 3
      if(i!=0):
        try:
            # Build the YouTube service

            # Call the channels.list method to retrieve information about the specified channel
            channels_response = self.youtube.channels().list(
                id=channel_username,
                part='snippet,statistics'
            ).execute()

            # Get the subscriber count from the response
            try:
              subscriber_count = channels_response['items'][0]['statistics']['subscriberCount']
              country = channels_response['items'][0]['snippet']['country']
            except:
                return 0,None
            return subscriber_count,country
        except HttpError as e:
            i=i-1
      else:
        return 0,None
        


    def getcomments(self,video):
      request = self.youtube.commentThreads().list(
          part="snippet",
          videoId=video,
          maxResults=100
      )

      comments = []

      # Execute the request.
      response = request.execute()
      # Get the comments from the response.
      if(self.pp.sysno==1):
        for item in response['items']:
            comment = item['snippet']['topLevelComment']['snippet']
            public = item['snippet']['isPublic']
            res = self.sentiment(comment['textOriginal'])
            if(res==1):
              continue
            max_label = max(res[0], key=lambda x: x['score'])['label']
            urls = "https://www.youtube.com/watch?v="+self.pp.hashtag+"&lc="+item['id']
            sub_count,sub_country = self.get_subscriber_count(comment['authorChannelId']['value'])
            comments.append([
                comment['authorDisplayName'],
                comment['publishedAt'],
                comment['likeCount'],
                comment['textOriginal'],
                max_label,
                res[0][0]['score'],
                res[0][1]['score'],
                res[0][2]['score'],
                sub_count,
                sub_country,
                urls
            ])
            for concept in self.pp.lists:
              count = 0
              for keyword in self.pp.lists[concept]:
                if keyword in comment['textOriginal']:
                  count = 1
                  break
              comments[-1].append(count)

      i=1
      while (1 == 1):
        if(((i % self.pp.platform)+1)!= self.pp.sysno):
          try:
           nextPageToken = response['nextPageToken']
          except KeyError:
           break
          nextPageToken = response['nextPageToken']
          nextRequest = self.youtube.commentThreads().list(part="snippet", videoId=video, maxResults=100, pageToken=nextPageToken)
          # Execute the next request.
          response = nextRequest.execute()
          i=i+1
          continue
        try:
         nextPageToken = response['nextPageToken']
        except KeyError:
         break
        nextPageToken = response['nextPageToken']
        # Create a new request object with the next page token.
        nextRequest = self.youtube.commentThreads().list(part="snippet", videoId=video, maxResults=100, pageToken=nextPageToken)
        # Execute the next request.
        response = nextRequest.execute()
        # Get the comments from the next response.
        for item in response['items']:
          comment = item['snippet']['topLevelComment']['snippet']
          public = item['snippet']['isPublic']
          res = self.sentiment(comment['textOriginal'])
          if(res==1):
            continue
          max_label = max(res[0], key=lambda x: x['score'])['label']
          urls = "https://www.youtube.com/watch?v=" + self.pp.hashtag + "&lc=" + item['id']
          sub_count,sub_country = self.get_subscriber_count(comment['authorChannelId']['value'])
          comments.append([
              comment['authorDisplayName'],
              comment['publishedAt'],
              comment['likeCount'],
              comment['textOriginal'],
              max_label,
              res[0][0]['score'],
              res[0][1]['score'],
              res[0][2]['score'],
              sub_count,
              sub_country,
	          urls
          ])
          for concept in self.pp.lists:
            count = 0
            for keyword in self.pp.lists[concept]:
              if keyword in comment['textOriginal']:
                count = 1
                break
            comments[-1].append(count)
        i=i+1
      column = ['name', 'date', 'likes', 'tweet','max_result','negative','neutral','positive','author_follower','location','url']
      for concept in self.pp.lists:
          column.append(concept)
      df2 = pd.DataFrame(comments, columns=column)
      return df2



    def analysisYoutubeComment(self):
      api_service_name = "youtube"
      api_version = "v3"
      DEVELOPER_KEY = ""

      self.youtube = googleapiclient.discovery.build(api_service_name, api_version, developerKey=DEVELOPER_KEY)
      result = self.getcomments(self.pp.hashtag)
      return result
      



    def sentiment(self, text):
      try:
        result = self.model(text)
      except:
        return 1
      return result
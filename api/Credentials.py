import requests
from requests.auth import HTTPBasicAuth
import json
from datetime import datetime
import base64


class Credentials:
    Consumer_Secret = "3FuR0G7eYHmKORzM"
    Consumer_Key = "9oett9qEPtA6izPgeLVETMR9IMX4TGnl"
    api_url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    pass_key = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919"


class AccessToken:
    res = requests.get(Credentials.api_url, auth=HTTPBasicAuth(Credentials.Consumer_Key, Credentials.Consumer_Secret
                                                               )
                       )
    access = json.loads(res.text)
    access_token = access['access_token']


class Paswd:
    paid_time = datetime.now().strftime("%Y%m%d%H%M%S")

    shortcode = '174379'
    offsetvalue = "0"
    key = Credentials.pass_key

    encoded = shortcode + key + paid_time
    encoded_pwd = base64.b64encode(encoded.encode())
    decoded_pwd = encoded_pwd.decode('utf-8')

from flask import Flask, request, Response
from PIL import Image
from base64 import decodestring
import io

app = Flask(__name__)


def getImgFromBase64(imagestr):
    imagestr = imagestr[23:-1]
    print(imagestr)
    image = Image.open(io.BytesIO(decodestring(imagestr)))
    image.save("foo.png")

    return image

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        img = getImgFromBase64(request.get_data())
        #TODO: predict from image

        return Response("{'a':'b'}", status=200, mimetype='application/json')
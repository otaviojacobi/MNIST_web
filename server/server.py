from flask import Flask, request, Response
from PIL import Image
from base64 import decodestring
import io
import numpy as np
from keras.models import load_model

print("Starting flask...")
app = Flask(__name__)

print("Loading weights...")
model = load_model('weights.h5')

print("All done !!")

def getImgFromBase64(imagestr):
    imagestr = imagestr[23:-1]
    image = Image.open(io.BytesIO(decodestring(imagestr))).convert('L')
    image.thumbnail((28,28), Image.ANTIALIAS)
    im_arr = np.fromstring(image.tobytes(), dtype=np.uint8)
    im_arr = abs(255-im_arr.reshape((image.size[1], image.size[0])))

    img = Image.fromarray(im_arr)

    return im_arr

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        img = getImgFromBase64(request.get_data())
        prediction = np.argmax(model.predict(img.reshape(1,28,28,1)))
        
        print(prediction)

        return Response('{"value":"%s"}'%(prediction), status=200, mimetype='application/json')
from bson import ObjectId

from flask import Flask, jsonify, session, request
from email.mime.text import MIMEText
from email.header import Header
from flask_cors import CORS
from pymongo import MongoClient
import smtplib
import ssl

app = Flask(__name__, template_folder='templates')
app.config["SECRET_KEY"] = '88024e1b4d3d7a4d7c2f839092334feb1d4c8c36'
CORS(app)
app.config['JSON_AS_ASCII'] = False

@app.before_request
def enable_session_timeout():
    session.permanent = True  # set session to use PERMANENT_SESSION_LIFETIME
    session.modified = True   # reset the session timer on every request

def connect_to_database():
    client = MongoClient(
        "mongodb+srv://vdno:kurluk@cluster0-lesec.gcp.mongodb.net/test?retryWrites=true&w=majority")
    db = client.database
    collection = db.gift
    return collection

@app.route('/')
@app.route('/catalog', methods=['GET'])
def index():
    collection = connect_to_database()
    my_cursor = collection.find({})
    result = []
    for item in my_cursor:
        item["_id"] = str(item["_id"])
        result.append(item)
    return jsonify(result)

items = []
@app.route('/addcatalog', methods=['POST'])
def catalog():
    id = request.data.decode('utf-8')
    if 'items' in session:
        session['items'] = session.get('items').append(id)
        session.modified = True
    else:
        session['items'] = items.append(id)
        session.modified = True
    return jsonify(session['items'])


@app.route('/cart', methods=['GET'])
def cart():
    order = []
    for id in session['items']:
        order.append(get_by_id(id))
    return jsonify(order)

@app.route('/order', methods=['GET'])
def order_page():
    send_mail(1,1)
    return "Отправка прошла"

def send_mail(sum, phone):
    # текст письма с заказом
    text = """\
        <html>
          <body>
            <p><strong>Новый заказ</strong> на сумму {} рублей<br>
               Телефон: {}<br>
               Что-то еще {}<br><br>{}
            </p>
          </body>
        </html>
        """.format(sum, phone, "new order", "text")

    # формирование сообщения
    msg = MIMEText(text, 'html', 'utf-8')
    msg['Subject'] = Header('Новый заказ на сумму N', 'utf-8')

    # отправка сообщения
    try:
        smtpObj = smtplib.SMTP('smtp.gmail.com', 587)
        smtpObj.starttls()
        smtpObj.login('love.in.cube.gifts@gmail.com', '328933zx')
        smtpObj.sendmail("love.in.cube.gifts@gmail.com", "love.in.cube.gifts@gmail.com", msg.as_string())
    finally:
        smtpObj.quit()

@app.route('/gift', methods=['GET', 'POST'])
def gift():
    id = request.data.decode('utf-8')
    gift_id(id)

@app.route('/gift/<id>', methods=['GET'])
def gift_id(id):
    return jsonify(get_by_id(id))

def get_by_id(id):
    collection = connect_to_database()
    my_cursor = collection.find({"_id" : ObjectId(id)})
    result = []
    for item in my_cursor:
        item["_id"] = str(item["_id"])
        result.append(item)
    return (result)

app.run()

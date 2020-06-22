from bson import ObjectId

from flask import Flask, jsonify, session, request
from email.mime.text import MIMEText
from email.header import Header
from flask_cors import CORS
from pymongo import MongoClient
import smtplib
import ssl

app = Flask(__name__, template_folder='templates')
CORS(app)
app.config['JSON_AS_ASCII'] = False

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

@app.route('/cart', methods=['GET', 'POST'])
def cart():
    order = []
    list = request.data.decode('utf-8').split(',')
    if list[0] == '':
        return 'empty'
    for id in list:
        order.append(get_by_id(id))
    return jsonify(order)

@app.route('/order', methods=['POST'])
def order_page():
    list = request.data.decode('utf-8').split(',')
    send_mail(list)
    return "Отправка прошла"

def send_mail(info):
    s = ''
    sum = 0
    for i in range(3, len(info)):
        k = get_by_id(info[i])
        m = k["name"]
        s += str(m) + ', '
        sum += k['price']
    # текст письма с заказом
    text = """\
    <html>
        <body>
            <p><strong>Новый заказ</strong> на сумму {} рублей<br>
            Телефон: {}<br>
            Имя {}<br>
               В заказ входит: <br>{}<br>
               Комментарий: {}
            </p>
        </body>
    </html>
    """.format(sum, info[1], info[0], s, info[2])

    # формирование сообщения
    msg = MIMEText(text, 'html', 'utf-8')
    msg['Subject'] = Header('Новый заказ на сумму {} рублей'.format(sum), 'utf-8')

    # отправка сообщения
    try:
        smtpObj = smtplib.SMTP('smtp.gmail.com', 587)
        smtpObj.starttls()
        smtpObj.login('love.in.cube.gifts@gmail.com', '328933zx')
        smtpObj.sendmail("love.in.cube.gifts@gmail.com", "love.in.cube.gifts@gmail.com", msg.as_string())
    finally:
        smtpObj.quit()

@app.route('/get-gift', methods=['GET', 'POST'])
def gift():
    id = request.data.decode('utf-8')
    return jsonify([get_by_id(id)])

def get_by_id(id):
    collection = connect_to_database()
    my_cursor = collection.find({"_id" : ObjectId(id)})
    result = []
    for item in my_cursor:
        item["_id"] = str(item["_id"])
        result.append(item)
    return (result[0])

app.run()

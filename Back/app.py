from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:Masterisbest120!@localhost:5432/CiscoBox'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

ma = Marshmallow(app)


class Device(db.Model):
    __tablename__ = "device"
    id_device = db.Column(db.Integer, primary_key=True)
    typede = db.Column(db.Text)
    protocolde = db.Column(db.Text)
    userde = db.Column(db.Text)
    passde = db.Column(db.Text)
    namede = db.Column(db.Text)

    def __init__(self, typede, protocolde, userde, passde, namede):
        self.typede = typede
        self.protocolde = protocolde
        self.userde = userde
        self.passde = passde
        self.namede = namede


class DeviceSchema(ma.Schema):
    class Meta:
        fields = ('id_device', 'typede', 'protocolde', 'userde', 'passde', 'namede')


device_schema = DeviceSchema()
devices_schema = DeviceSchema(many=True)


@app.route('/deviceList', methods=['GET'])
def deviceList():
    all_device = Device.query.all()
    results = devices_schema.dump(all_device)
    return jsonify(results)


@app.route('/deviceDetails/<id>', methods=['GET'])
def deviceDetails(id_device):
    device = Device.query.get(id_device)
    return device_schema.jsonify(device)


@app.route('/deviceUpdate/<id>', methods=['PUT'])
def deviceUpdate(id_device):
    device = Device.query.get(id_device)
    typede = request.json['typede']
    protocolde = request.json['protocolde']
    userde = request.json['userde']
    passde = request.json['passde']
    namede = request.json['namede']

    device.typede = typede
    device.protocolde = protocolde
    device.userde = userde
    device.passde = passde
    device.namede = namede

    db.session.commit()
    return device_schema.jsonify(device)


@app.route('/deviceDelete/<id>', methods=['DETELE'])
def deviceDelete(id_device):
    device = Device.query.get(id_device)
    db.session.delete(device)
    db.session.commit()
    return device_schema.jsonify(device)


@app.route('/deviceAdd', methods=['POST'])
def deviceAdd():
    typede = request.json['typede']
    protocolde = request.json['protocolde']
    userde = request.json['userde']
    passde = request.json['passde']
    namede = request.json['namede']

    device = Device(typede, protocolde, userde, passde, namede)
    db.session.add(device)
    db.session.commit()
    return device_schema.jsonify(device)


if __name__ == '__main__':
    app.run(debug=True)

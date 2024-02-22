from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:Masterisbest120!@192.168.120.42:5432/CiscoBox'
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


class Numplan(db.Model):
    __tablename__ = "numplan"
    id_numplan = db.Column(db.Integer, primary_key=True)
    tagdn = db.Column(db.Integer)
    numberdn = db.Column(db.Integer)
    namedn = db.Column(db.Text)
    desdn = db.Column(db.Text)

    def __init__(self, tagdn, numberdn, namedn, desdn):
        self.tagdn = tagdn
        self.numberdn = numberdn
        self.namedn = namedn
        self.desdn = desdn




class DeviceSchema(ma.Schema):
    class Meta:
        fields = ('id_device', 'typede', 'protocolde', 'userde', 'passde', 'namede')


device_schema = DeviceSchema()
devices_schema = DeviceSchema(many=True)


class NumplanSchema(ma.Schema):
    class Meta:
        fields = ('id_numplan', 'tagdn', 'numberdn', 'namedn', 'desdn')

numplan_schema = NumplanSchema()
numplans_schema = NumplanSchema(many=True)

@app.route('/devicelist', methods=['GET'])
def devicelist():
    all_device = Device.query.all()
    results = devices_schema.dump(all_device)
    return jsonify(results)


@app.route('/devicedetails/<id_device>', methods=['GET'])
def devicedetails(id_device):
    device = Device.query.get(id_device)
    return device_schema.jsonify(device)


@app.route('/deviceupdate/<id_device>', methods=['PUT'])
def deviceupdate(id_device):
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


@app.route('/devicedelete/<id_device>', methods=['GET','DELETE'])
def devicedelete(id_device):
    device = Device.query.get(id_device)
    db.session.delete(device)
    db.session.commit()
    return device_schema.jsonify(device)


@app.route('/deviceadd', methods=['POST'])
def deviceadd():
    typede = request.json['typede']
    protocolde = request.json['protocolde']
    userde = request.json['userde']
    passde = request.json['passde']
    namede = request.json['namede']

    device = Device(typede, protocolde, userde, passde, namede)
    db.session.add(device)
    db.session.commit()
    return device_schema.jsonify(device)


@app.route('/directorylist', methods=['GET'])
def directorylist():
    all_directory = Numplan.query.all()
    results = numplans_schema.dump(all_directory)
    return jsonify(results)

@app.route('/directorydetails/<id_numplan>', methods=['GET'])
def directorydetails(id_numplan):
    directory = Numplan.query.get(id_numplan)
    return numplan_schema.jsonify(directory)


@app.route('/directoryupdate/<id_numplan>', methods=['PUT'])
def directoryupdate(id_numplan):
    directory = Numplan.query.get(id_numplan)
    tagdn = request.json['tagdn']
    numberdn = request.json['numberdn']
    namedn = request.json['namedn']
    desdn = request.json['desdn']

    directory.tagdn = tagdn
    directory.numberdn = numberdn
    directory.namedn = namedn
    directory.desdn = desdn

    db.session.commit()
    return numplan_schema.jsonify(directory)


@app.route('/directorydelete/<id_numplan>', methods=['GET', 'DELETE'])
def directorydelete(id_numplan):
    directory = Numplan.query.get(id_numplan)
    db.session.delete(directory)
    db.session.commit()
    return numplan_schema.jsonify(directory)


@app.route('/directoryadd', methods=['POST'])
def directoryadd():
    tagdn = request.json['tagdn']
    numberdn = request.json['numberdn']
    namedn = request.json['namedn']
    desdn = request.json['desdn']

    directory = Numplan(tagdn, numberdn, namedn, desdn)
    db.session.add(directory)
    db.session.commit()
    return numplan_schema.jsonify(directory)


if __name__ == '__main__':
    app.run(debug=True)

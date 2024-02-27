from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
import psycopg2


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
    ipaddrde = db.Column(db.Text)
    protocolde = db.Column(db.Text)
    userde = db.Column(db.Text)
    passde = db.Column(db.Text)
    namede = db.Column(db.Text)

    def __init__(self, typede, ipaddrde, protocolde, userde, passde, namede):
        self.typede = typede
        self.ipaddrde = ipaddrde
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


class Phone(db.Model):
    __tablename__ = "phone"
    id_phone = db.Column(db.Integer, primary_key=True)
    tagpe = db.Column(db.Integer)
    ownerpe = db.Column(db.Text)
    typepe = db.Column(db.Text)
    idmacpe = db.Column(db.Text)
    linepe = db.Column(db.Integer)
    codecpe = db.Column(db.Text)
    userdnpe = db.Column(db.Integer)
    passdnpe = db.Column(db.Integer)
    vcodecpe = db.Column(db.Text)

    def __init__(self, tagpe,ownerpe, typepe, idmacpe, linepe, codecpe, userdnpe, passdnpe, vcodecpe):
        self.tagpe = tagpe
        self.ownerpe = ownerpe
        self.typepe = typepe
        self.idmacpe = idmacpe
        self.linepe = linepe
        self.codecpe = codecpe
        self.userdnpe = userdnpe
        self.passdnpe = passdnpe
        self.vcodecpe = vcodecpe



class DeviceSchema(ma.Schema):
    class Meta:
        fields = ('id_device', 'typede', 'ipaddrde', 'protocolde', 'userde', 'passde', 'namede')


device_schema = DeviceSchema()
devices_schema = DeviceSchema(many=True)


class NumplanSchema(ma.Schema):
    class Meta:
        fields = ('id_numplan', 'tagdn', 'numberdn', 'namedn', 'desdn')

numplan_schema = NumplanSchema()
numplans_schema = NumplanSchema(many=True)


class PhoneSchema(ma.Schema):
    class Meta:
        fields = ('id_phone', 'tagpe', 'ownerpe', 'typepe', 'idmacpe', 'linepe', 'codecpe', 'userdnpe', 'passdnpe', 'vcodecpe')

phone_schema = PhoneSchema()
phones_schema = PhoneSchema(many=True)

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
    ipaddrde = request.json['ipaddrde']
    protocolde = request.json['protocolde']
    userde = request.json['userde']
    passde = request.json['passde']
    namede = request.json['namede']


    device.typede = typede
    device.protocolde = protocolde
    device.userde = userde
    device.passde = passde
    device.namede = namede
    device.ipaddrde = ipaddrde

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
    ipaddrde = request.json['ipaddrde']

    device = Device(typede, protocolde, userde, passde, namede, ipaddrde)
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


@app.route('/directoryadd', methods=['GET','POST'])
def directoryadd():
    tagdn = request.json['tagdn']
    numberdn = request.json['numberdn']
    namedn = request.json['namedn']
    desdn = request.json['desdn']

    directory = Numplan(tagdn, numberdn, namedn, desdn)
    db.session.add(directory)
    db.session.commit()
    return numplan_schema.jsonify(directory)


@app.route('/phonelist', methods=['GET'])
def phonelist():
    phone = Phone.query.all()
    results = phones_schema.dump(phone)
    return jsonify(results)

@app.route('/phonedetails/<id_phone>', methods=['GET'])
def phonedetails(id_phone):
    phone = Phone.query.get(id_phone)
    return phone_schema.jsonify(phone)

@app.route('/phoneupdate/<id_phone>', methods=['PUT'])
def phoneupdate(id_phone):
    phone = Phone.query.get(id_phone)
    tagpe = request.json('tagpe')
    ownerpe = request.json('ownerpe')
    typepe = request.json('typepe')
    idmacpe = request.json('idmacpe')
    linepe = request.json('linepe')
    codecpe = request.json('codecpe')
    userdnpe = request.json('userdnpe')
    passdnpe = request.json('passdnpe')
    vcodecpe = request.json('vcodecpe')


    phone.tagpe = tagpe
    phone.ownerpe = ownerpe
    phone.typepe = typepe
    phone.idmacpe = idmacpe
    phone.linepe = linepe
    phone.codecpe = codecpe
    phone.userdnpe = userdnpe
    phone.passdnpe = passdnpe
    phone.vcodecpe = vcodecpe

    db.session.commit()
    return phone_schema.jsonify(phone)

@app.route('/phonedelete/<id_phone>', methods=['GET', 'DELETE'])
def phonedelete(id_phone):
    phone = Phone.query.get(id_phone)
    db.session.delete(phone)
    db.session.commit()
    return phone_schema.jsonify(phone)

@app.route('/phoneadd', methods=['POST'])
def phoneadd():
    tagpe = request.json['tagpe']
    ownerpe = request.json['ownerpe']
    typepe = request.json['typepe']
    idmacpe = request.json['idmacpe']
    linepe = request.json['linepe']
    codecpe = request.json['codecpe']
    userdnpe = request.json['userdnpe']
    passdnpe = request.json['passdnpe']
    vcodecpe = request.json['vcodecpe']

    phone = Phone(tagpe, ownerpe, typepe, idmacpe, linepe, codecpe, userdnpe, passdnpe, vcodecpe)
    db.session.add(phone)
    db.session.commit()
    return phone_schema.jsonify(phone)


@app.route('/view', methods=['GET', 'POST'])
def view():
    phone = Phone.query.all()
    device = Device.query.all()
    dir = Numplan.query.all()
    results = phones_schema.dump(phone)
    results1 = devices_schema.dump(device)
    results2 = numplans_schema.dump(dir)
    return jsonify(results, results1, results2)




if __name__ == '__main__':
    app.run(debug=True)

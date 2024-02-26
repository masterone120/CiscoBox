from flask import Flask,request
from app import Device
import paramiko
import psycopg2

@app.route('/deploy/', methods=['GET', 'POST'])
def deploy():
    conn = psycopg2.connect(dbname='ciscobox', user='postgres', password='Masterisbest120!')

    cur = conn.cursor()
    if request.method == 'POST':
        devices = Device.query.get(request.json.get('id_device'))
        devices.typede = request.json['typde']
        devices.ipaddrde = request.json['ipaddrde']
        devices.protocolde = request.json['protocolde']
        devices.userde = request.json['userde']
        devices.passde = request.json['passde']
        devices.namde = request.json['namede']
        cur.execute("SELECT id_device,typede,ipaddre,protocolde,userde,passde,namede FROM `ciscobox`.`device` WHERE namede='%s'" % devices.namede)
        char = cur.fetchone()
        device = str(char[5])
        cur.execute("SELECT id_numplan,tagdn,numberdn,namedn,desdn FROM `ciscobox`.`numplan` WHERE device='%s'" % device)
        char2 = cur.fetchone()
        directory = str()



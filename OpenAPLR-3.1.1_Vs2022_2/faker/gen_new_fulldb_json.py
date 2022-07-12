from faker import Faker
from faker.generator import random
from faker_vehicle import VehicleProvider
from datetime import datetime
import json


fake = Faker('en_US')
fake.add_provider(VehicleProvider)
Faker.seed(0)

print('[')

# for i in range(2500):
for i in range(25000000):
    output = {}
    # beaver1.avi
    if i == 0:
        plate = "LKY1360"
        rnum = 2
    elif i == 1:
        plate = "HHF6697"
        rnum = 5
    elif i == 2:
        plate = "GVP9164"
        rnum = 8
    elif i == 3:
        plate = "LBX9051"
        rnum = 10
    elif i == 4:
        plate = "06062"
        rnum = 10
    elif i == 5:
        plate = "LBV6157"
        rnum = 10
    elif i == 6:
        plate = "LVH6056"
        rnum = 10
    elif i == 7:
        plate = "ZPV5837"
        rnum = 10
    elif i == 8:
        plate = "ZDE1985"
        rnum = 10
    elif i == 9:
        plate = "JBK6142"
        rnum = 10
    elif i == 10:
        plate = "ZRP9348"
        rnum = 10
    elif i == 11:
        plate = "MSJWHY"
        rnum = 10
    elif i == 12:
        plate = "F0RNER2"
        rnum = 10
    elif i == 13:
        plate = "LVM6107"
        rnum = 10
    elif i == 14:
        plate = "KKM1789"
        rnum = 10
    elif i == 15:
        plate = "KFD6960"
        rnum = 10
    elif i == 16:
        plate = "ZLD0922"
        rnum = 10
    elif i == 17:
        plate = "KYT3950"
        rnum = 10
    elif i == 18:
        plate = "LKS9443"
        rnum = 10
    elif i == 19:
        plate = "YDS5255"
        rnum = 10
    elif i == 20:
        plate = "KGJ8487"
        rnum = 10
    elif i == 21:
        plate = "ZNS2724"
        rnum = 10
    elif i == 22:
        plate = "ZNM2197"
        rnum = 10
    elif i == 23:
        plate = "ZGS7240"
        rnum = 10
    elif i == 24:
        plate = "LPH0511"
        rnum = 10
    elif i == 25:
        plate = "KYG9827"
        rnum = 10
    elif i == 26:
        plate = "YAM0025"
        rnum = 10
    elif i == 27:
        plate = "CFTMGN2"
        rnum = 10
    elif i == 28:
        plate = "HYY8868"
        rnum = 10
    elif i == 29:
        plate = "JHG7802"
        rnum = 10
    elif i == 30:
        plate = "BETELU"
        rnum = 10
    elif i == 31:
        plate = "LBX9129"
        rnum = 10
    elif i == 32:
        plate = "LDX1620"
        rnum = 10
    elif i == 33:
        plate = "KCS6722"
        rnum = 10
    elif i == 34:
        plate = "LLX9690"
        rnum = 10
    elif i == 35:
        plate = "KYR3878"
        rnum = 10
    elif i == 36:
        plate = "JJC5503"
        rnum = 10
    elif i == 37:
        plate = "LMC5535"
        rnum = 10
    # beaver2.avi
    elif i == 38:
        plate = "JXK1447"
        rnum = 10
    elif i == 39:
        plate = "KXZ7041"
        rnum = 2
    elif i == 40:
        plate = "KZS9188"
        rnum = 10
    elif i == 41:
        plate = "K66319K"
        rnum = 5
    elif i == 42:
        plate = "LNF6519"
        rnum = 10
    elif i == 43:
        plate = "LDD4877"
        rnum = 8
    elif i == 44:
        plate = "HMZ2628"
        rnum = 10
    # beaver3.avi
    elif i == 45:
        plate = "LWY0004"
        rnum = 10
    elif i == 46:
        plate = "LHS8870"
        rnum = 10
    elif i == 47:
        plate = "HHF6697"
        rnum = 2
    elif i == 48:
        plate = "LBV6157"
        rnum = 10
    elif i == 49:
        plate = "LVH6056"
        rnum = 10
    elif i == 50:
        plate = "KTC0964"
        rnum = 5
    elif i == 51:
        plate = "LVB2188"
        rnum = 10
    elif i == 52:
        plate = "F0RNER2"
        rnum = 10
    elif i == 53:
        plate = "LVM6107"
        rnum = 10
    elif i == 54:
        plate = "KKM1789"
        rnum = 8
    elif i == 55:
        plate = "KFD6960"
        rnum = 10
    elif i == 56:
        plate = "LRK8742"
        rnum = 10
    elif i == 57:
        plate = "KYT3950"
        rnum = 10
    elif i == 58:
        plate = "LJF8922"
        rnum = 10
    elif i == 59:
        plate = "LKS9443"
        rnum = 10
    elif i == 60:
        plate = "KCC9291"
        rnum = 10
    elif i == 61:
        plate = "HFZ9114"
        rnum = 10
    elif i == 62:
        plate = "ZNM2197"
        rnum = 10
    elif i == 63:
        plate = "GXV3315"
        rnum = 10
    elif i == 64:
        plate = "ZVD6300"
        rnum = 10
    elif i == 65:
        plate = "LYB2009"
        rnum = 10
    elif i == 66:
        plate = "YAM0025"
        rnum = 10
    elif i == 67:
        plate = "YZR0143"
        rnum = 10
    elif i == 68:
        plate = "CAR3963"
        rnum = 10
    elif i == 69:
        plate = "GDC4098"
        rnum = 10
    elif i == 70:
        plate = "GYB9496"
        rnum = 10
    elif i == 71:
        plate = "GRN0422"
        rnum = 10
    elif i == 72:
        plate = "KWM0465"
        rnum = 10
    elif i == 73:
        plate = "LST8113"
        rnum = 10
    elif i == 74:
        plate = "KYRO"
        rnum = 10
    elif i == 75:
        plate = "LKP5331"
        rnum = 10
    elif i == 76:
        plate = "KTC8699"
        rnum = 10
    elif i == 77:
        plate = "LXZ0242"
        rnum = 10
    elif i == 78:
        plate = "LCL6497"
        rnum = 10
    elif i == 79:
        plate = "KYD4352"
        rnum = 10
    elif i == 80:
        plate = "KPA8727"
        rnum = 10
    elif i == 81:
        plate = "KZT4724"
        rnum = 10
    elif i == 82:
        plate = "HLF0755"
        rnum = 10
    elif i == 83:
        plate = "LLS9557"
        rnum = 10
    # beaver4.avi
    elif i == 84:
        plate = "JBV7597"
        rnum = 10
    elif i == 85:
        plate = "LDP9038"
        rnum = 2
    elif i == 86:
        plate = "LXE5831"
        rnum = 5
    elif i == 87:
        plate = "KDX9805"
        rnum = 10
    elif i == 88:
        plate = "HPM2638"
        rnum = 8
    else:
        # plate=fake.license_plate().replace(" ","")
        # plate=plate.replace("-","")
        plate = fake.bothify('???####', letters='ABCDEFGHJKLMNPRSTVWXYZ')
        rnum = fake.pyint(1, 100)
    output['id'] = str(i)
    output['plate'] = plate
    if rnum < 3:
        status = "Owner Wanted"
    elif rnum < 6:
        status = "Unpaid Fines - Tow"
    elif rnum < 9:
        status = "Stolen"
    else:
        status = "No Wants / Warrants"
    output['status'] = status
    # output+=fake.date_this_year().strftime("%m/%d/%Y")+"\n"
    output['date'] = fake.date_between_dates(date_start=datetime(2022, 1, 1), date_end=datetime(2024, 5, 1)).strftime(
        "%m/%d/%Y")
    output['name'] = fake.name()
    output['birth'] = fake.date_of_birth().strftime("%m/%d/%Y")
    # output+=fake.date_between_dates(date_start=datetime(1932,1,1), date_end=datetime(2004,1,1)).strftime("%m/%d/%Y")+"\n"
    output['address'] = fake.address()
    output['vehicle_year'] = fake.vehicle_year()
    output['vehicle_make'] = fake.vehicle_make()
    output['vehicle_model'] = fake.vehicle_model()
    output['vehicle_color'] = fake.safe_color_name()
    print(' ', json.dumps(output), ',')
print(']')

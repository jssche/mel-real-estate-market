# This file extract and preprocess the raw data from the source dataset and write them into json files. 

import os
import json
import geopandas as gpd
from turfpy.measurement import area as area
from turfpy.measurement import centroid as centroid
from geojson import Feature, FeatureCollection, Polygon


def writeData(data, filename):
    with open('./ProcessedData/'+filename, 'w') as output:
        json.dump(data, output)
    print(f'{filename} has been written to the disk.')

def exportPropertyData(cols, new_cols):
    property_types = ['house', 'unit']
    dirs = {'house' : '../../../AURIN_data/property/house', 'unit' : '../../../AURIN_data/property/unit'}
    with open('./ProcessedData/mel_polygons.geojson', 'r') as f:
        polygons = json.load(f)
    with open('./ProcessedData/spatialData.json', 'r') as f:
        spatialInfo = json.load(f)


    coloring_stops = {
        'house' : {
            2019: {
                'for_sale_median': None,
                'sold_median': None,
                'for_sale_count': None,
                'sold_count': None,
            },
            2020: {
                'for_sale_median': None,
                'sold_median': None,
                'for_sale_count': None,
                'sold_count': None,
            },
            'allYears': {
                'for_sale_median': None,
                'sold_median': None,
                'for_sale_count': None,
                'sold_count': None,
            }
        },
        'unit' : {
            2019: {
                'for_sale_median': None,
                'sold_median': None,
                'for_sale_count': None,
                'sold_count': None,
            },
            2020: {
                'for_sale_median': None,
                'sold_median': None,
                'for_sale_count': None,
                'sold_count': None,
            },
            'allYears': {
                'for_sale_median': None,
                'sold_median': None,
                'for_sale_count': None,
                'sold_count': None,
            }
        }
    }

    for ptype in property_types:
        all_data = []

        # filter raw data
        for root, _, files in os.walk(dirs[ptype]):
            for file in files:
                if file.endswith('.json') and file.startswith('data'):
                    file_path = root + '/' + file
                    with open(file_path) as f:
                        raw_data = json.load(f)
                        all_data.append(prepare_data(raw_data, cols, new_cols)) 
        

        # initiate dictionaries
        for_sale_median_timeline = {}
        sold_median_timeline = {}
        for_sale_count_timeline = {}
        sold_count_timeline = {}
        overview = {
            2019: {
                'for_sale_median': {},
                'sold_median': {},
                'for_sale_count': {},
                'sold_count': {},
            },
            2020: {
                'for_sale_median': {},
                'sold_median': {},
                'for_sale_count': {},
                'sold_count': {},
            },
            'allYears': {
                'for_sale_median': {},
                'sold_median': {},
                'for_sale_count': {},
                'sold_count': {},
            }
        }
        for suburb in all_data[0]:
            for_sale_median_timeline[suburb['sa3code']] = [0]*24
            sold_median_timeline[suburb['sa3code']] = [0]*24
            for_sale_count_timeline[suburb['sa3code']] = [0]*24
            sold_count_timeline[suburb['sa3code']] = [0]*24


        # construct median price timeline and count timeline
        for month_data in all_data:
            for suburb_data in month_data:
                year = suburb_data['year']
                month = suburb_data['month']
                index = (year - 2019) * 12 + (month - 1)
                if suburb_data['for_sale_median_price'] == 0 or suburb_data['sold_median_price'] == 0 or suburb_data['for_sale_count'] == 0 or suburb_data['sold_count'] == 0:
                    print('bad data')
                for_sale_median_timeline[suburb_data['sa3code']][index] = suburb_data['for_sale_median_price']
                sold_median_timeline[suburb_data['sa3code']][index] = suburb_data['sold_median_price']
                for_sale_count_timeline[suburb_data['sa3code']][index] = round(suburb_data['for_sale_count'] / spatialInfo['area'][str(suburb_data['sa3code'])], 2)
                sold_count_timeline[suburb_data['sa3code']][index] = round(suburb_data['sold_count'] / spatialInfo['area'][str(suburb_data['sa3code'])], 2)


        # construct overview 
        for key in for_sale_median_timeline:
            overview['allYears']['for_sale_median'][key] = round(sum(for_sale_median_timeline[key]) / 24, 2)
            overview['allYears']['sold_median'][key] = round(sum(sold_median_timeline[key]) / 24, 2)
            overview['allYears']['for_sale_count'][key] = round(sum(for_sale_count_timeline[key]) / 24, 2)
            overview['allYears']['sold_count'][key] = round(sum(sold_count_timeline[key]) / 24, 2)
            overview[2019]['for_sale_median'][key] = round(sum(for_sale_median_timeline[key][:12]) / 12, 2)
            overview[2019]['sold_median'][key] = round(sum(sold_median_timeline[key][:12]) / 12, 2)
            overview[2019]['for_sale_count'][key] = round(sum(for_sale_count_timeline[key][:12]) / 12, 2)
            overview[2019]['sold_count'][key] = round(sum(sold_count_timeline[key][:12]) /12, 2)
            overview[2020]['for_sale_median'][key] = round(sum(for_sale_median_timeline[key][12:]) / 12, 2)
            overview[2020]['sold_median'][key] = round(sum(sold_median_timeline[key][12:]) / 12, 2)
            overview[2020]['for_sale_count'][key] = round(sum(for_sale_count_timeline[key][12:]) / 12, 2)
            overview[2020]['sold_count'][key] = round(sum(sold_count_timeline[key][12:]) /12, 2)
        writeData(for_sale_median_timeline, f'for_sale_timeline_{ptype}')
        writeData(sold_median_timeline, f'sold_timeline_{ptype}')
        writeData(for_sale_count_timeline, f'for_sale_count_timeline_{ptype}_normed')
        writeData(sold_count_timeline, f'sold_count_timeline_{ptype}_normed')
        writeData(overview, f'overview_{ptype}')


        # calculate the coloring stops value for map styling, data are divided into 5 equal frequency bins
        indexes = [7, 15, 23, 31, 39]
        years  = ['allYears', 2019, 2020]
        categories = ['for_sale_median', 'sold_median', 'for_sale_count', 'sold_count']
        for y in years:
            for c in categories:
                values = [v for v in overview[y][c].values()]
                values.sort()
                stops = [values[i] for i in indexes]
                coloring_stops[ptype][y][c] = stops
        

        #export real estate market overview info to geojson
        for feat in polygons['features']:
            suburb = feat['properties']['sa3_code16']
            feat['properties'][f'{ptype}_allyears_for_sale_median'] = overview['allYears']['for_sale_median'][int(suburb)]
            feat['properties'][f'{ptype}_allyears_sold_median'] = overview['allYears']['sold_median'][int(suburb)]
            feat['properties'][f'{ptype}_allyears_for_sale_count'] = overview['allYears']['for_sale_count'][int(suburb)]
            feat['properties'][f'{ptype}_allyears_sold_count'] = overview['allYears']['sold_count'][int(suburb)]
            feat['properties'][f'{ptype}_2019_for_sale_median'] = overview[2019]['for_sale_median'][int(suburb)]
            feat['properties'][f'{ptype}_2019_sold_median'] = overview[2019]['sold_median'][int(suburb)]
            feat['properties'][f'{ptype}_2019_for_sale_count'] = overview[2019]['for_sale_count'][int(suburb)]
            feat['properties'][f'{ptype}_2019_sold_count'] = overview[2019]['sold_count'][int(suburb)]
            feat['properties'][f'{ptype}_2020_for_sale_median'] = overview[2020]['for_sale_median'][int(suburb)]
            feat['properties'][f'{ptype}_2020_sold_median'] = overview[2020]['sold_median'][int(suburb)]
            feat['properties'][f'{ptype}_2020_for_sale_count'] = overview[2020]['for_sale_count'][int(suburb)]
            feat['properties'][f'{ptype}_2020_sold_count'] = overview[2020]['sold_count'][int(suburb)]
    
    # Write overview data to geojson files
    with open('./processedData/mel_polygons_realestate_normed.geojson', 'w') as f:
        json.dump(polygons, f)
    writeData(coloring_stops, f'coloring_stops_normed')


def prepare_data(raw_data, cols, new_cols, year=None):
    output = []
    raw_data = raw_data['features']
    for district in raw_data:
        data = {}
        if year != None:
            data['year'] = year
        for i in range(len(cols)):
            if district['properties'][cols[i]] != None:
                data[new_cols[i]] = district['properties'][cols[i]]              
            else:
                data[new_cols[i]] = 0
        output.append(data)
    return output

def main():
    col_dict = {
        'aurin-property' : ['datemonth', 
                            'dateyear', 
                            'propertycategorisation',
                            'sa32016name',
                            'sa32016code',
                            'for_sale_both_auction_private_treaty_medianprice',
                            'for_sale_both_auction_private_treaty_eventcount',
                            'sold_both_auction_private_treaty_medianprice',
                            'sold_both_auction_private_treaty_eventcount'],
    }

    new_cols = {
        'aurin-property' : ['month', 
                            'year', 
                            'type',
                            'sa3name',
                            'sa3code',
                            'for_sale_median_price',
                            'for_sale_count',
                            'sold_median_price',
                            'sold_count'],
    }

    # export property data
    exportPropertyData(col_dict['aurin-property'], new_cols['aurin-property'])     


    
if __name__ == "__main__":
    main()
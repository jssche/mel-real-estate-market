import os
import json
import geopandas as gpd


def writeData(data, filename):
    with open('./ProcessedData/'+filename, 'w') as output:
        json.dump(data, output)
    print(f'{filename} has been written to the disk.')


def exportGeoData(geofile_dir, city):
    district = gpd.read_file(geofile_dir)
    district = district.iloc[:,-3:]
    # print(district.shape)
    district = district.rename(columns={'feature_c0': 'SA3_code', 'feature_n1': 'SA3_name'})
    district = district.to_json()
    writeData(district, 'polygons')


def exportPropertyData(cols, new_cols):
    property_types = ['house', 'unit']
    dirs = {'house' : '../../../AURIN_data/property/house', 'unit' : '../../../AURIN_data/property/unit'}
    # with open('./ProcessedData/mel_polygons.geojson', 'r') as f:
    #     polygons = json.load(f)

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
        # sacount = 0
        for suburb in all_data[0]:
            # sacount += 1
            for_sale_median_timeline[suburb['sa3code']] = [0]*24
            sold_median_timeline[suburb['sa3code']] = [0]*24
            for_sale_count_timeline[suburb['sa3code']] = [0]*24
            sold_count_timeline[suburb['sa3code']] = [0]*24
        # print(sacount)
        # print(for_sale_median_timeline)

        # construct median price timeline and count timeline
        for month_data in all_data:
            for suburb_data in month_data:
                year = suburb_data['year']
                month = suburb_data['month']
                index = (year - 2019) * 12 + (month - 1)
                # if suburb_data['for_sale_median_price'] == 0 or suburb_data['sold_median_price'] == 0 or suburb_data['for_sale_count'] == 0 or suburb_data['sold_count'] == 0:
                #     print('bad data')
                for_sale_median_timeline[suburb_data['sa3code']][index] = suburb_data['for_sale_median_price']
                sold_median_timeline[suburb_data['sa3code']][index] = suburb_data['sold_median_price']
                for_sale_count_timeline[suburb_data['sa3code']][index] = suburb_data['for_sale_count']
                sold_count_timeline[suburb_data['sa3code']][index] = suburb_data['sold_count']
        # print(for_sale_count_timeline)

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
        # writeData(for_sale_median_timeline, f'for_sale_timeline_{property_type}')
        # writeData(sold_median_timeline, f'sold_timeline_{property_type}')
        # writeData(for_sale_count_timeline, f'for_sale_count_timeline_{property_type}')
        # writeData(sold_count_timeline, f'sold_count_timeline_{property_type}')
        # writeData(overview, f'overview_{property_type}')

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
        # for feat in polygons['features']:
        #     suburb = feat['properties']['sa3_code16']
        #     feat['properties'][f'{ptype}_allyears_for_sale_median'] = overview['allYears']['for_sale_median'][int(suburb)]
        #     feat['properties'][f'{ptype}_allyears_sold_median'] = overview['allYears']['sold_median'][int(suburb)]
        #     feat['properties'][f'{ptype}_allyears_for_sale_count'] = overview['allYears']['for_sale_count'][int(suburb)]
        #     feat['properties'][f'{ptype}_allyears_sold_count'] = overview['allYears']['sold_count'][int(suburb)]
        #     feat['properties'][f'{ptype}_2019_for_sale_median'] = overview[2019]['for_sale_median'][int(suburb)]
        #     feat['properties'][f'{ptype}_2019_sold_median'] = overview[2019]['sold_median'][int(suburb)]
        #     feat['properties'][f'{ptype}_2019_for_sale_count'] = overview[2019]['for_sale_count'][int(suburb)]
        #     feat['properties'][f'{ptype}_2019_sold_count'] = overview[2019]['sold_count'][int(suburb)]
        #     feat['properties'][f'{ptype}_2020_for_sale_median'] = overview[2020]['for_sale_median'][int(suburb)]
        #     feat['properties'][f'{ptype}_2020_sold_median'] = overview[2020]['sold_median'][int(suburb)]
        #     feat['properties'][f'{ptype}_2020_for_sale_count'] = overview[2020]['for_sale_count'][int(suburb)]
        #     feat['properties'][f'{ptype}_2020_sold_count'] = overview[2020]['sold_count'][int(suburb)]
    

    # print(polygons['features'][0]['properties'])
    # with open('mel_polygons_realestate.geojson', 'w') as f:
        # json.dump(polygons, f)
    writeData(coloring_stops, f'coloring_stops')



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
    dir_dict = {
        'aurin-geo': '../../../AURIN_data/Geometry/mel/ed02f7e0-8037-42e5-a3da-34f1795fd8c5.shp',
        'aurin-population': '../../../AURIN_data/population',
        'aurin-homeless': 'vAURIN_data/homeless'
    }
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

        'aurin-population': ['sa3_code_2016',
                            'sa3_name_2016',
                            'yr',
                            'estmtd_rsdnt_ppltn_smmry_sttstcs_30_jne_prsns_ttl_nm',
                            'estimated_resident_population_persons_30_june_0_4_years_num',
                            'estimated_resident_population_persons_30_june_5_9_years_num',
                            'estimated_resident_population_persons_30_june_10_14_years_num',
                            'estimated_resident_population_persons_30_june_15_19_years_num',
                            'estimated_resident_population_persons_30_june_20_24_years_num',
                            'estimated_resident_population_persons_30_june_25_29_years_num',
                            'estimated_resident_population_persons_30_june_34_years_num',
                            'estimated_resident_population_persons_30_june_35_39_years_num',
                            'estimated_resident_population_persons_30_june_40_44_years_num',
                            'estimated_resident_population_persons_30_june_45_49_years_num',
                            'estimated_resident_population_persons_30_june_50_54_years_num',
                            'estimated_resident_population_persons_30_june_55_59_years_num',
                            'estimated_resident_population_persons_30_june_60_64_years_num',
                            'estimated_resident_population_persons_30_june_65_69_years_num',
                            'estimated_resident_population_persons_30_june_70_74_years_num',
                            'estimated_resident_population_persons_30_june_75_79_years_num',
                            'estimated_resident_population_persons_30_june_80_84_years_num',
                            'estimated_resident_population_persons_30_june_persons_85_num',
                            'estmtd_rsdnt_ppltn_smmry_sttstcs_30_jne_fmls_ttl_nm',
                            'estmtd_rsdnt_ppltn_smmry_sttstcs_30_jne_mls_ttl_nm'],

        'aurin-homeless': ['fin_yr',
                            'sa3_code',
                            'client_count',
                            'sa3_name']
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

        'aurin-population' : ['sa3code',
                            'sa3name',
                            'year',
                            'total',
                            '0_4_years_num',
                            '5_9_years_num',
                            '10_14_years_num',
                            '15_19_years_num',
                            '20_24_years_num',
                            '25_29_years_num',
                            '30_34_years_num',
                            '35_39_years_num',
                            '40_44_years_num',
                            '45_49_years_num',
                            '50_54_years_num',
                            '55_59_years_num',
                            '60_64_years_num',
                            '65_69_years_num',
                            '70_74_years_num',
                            '75_79_years_num',
                            '80_84_years_num',
                            'over_85_num',
                            'female_num',
                            'male_num'],

        'aurin-homeless': ['financial_year',
                            'sa3code',
                            'client_count',
                            'sa3name']
    }

    # export Polygon geo locations
    # exportGeoData(dir_dict['aurin-geo'], 'mel')

    # export property data
    exportPropertyData(col_dict['aurin-property'], new_cols['aurin-property'])

    # # upload population data
    # uploadData(db_names[2], col_dict[db_names[2]], new_cols[db_names[2]], dir_dict[db_names[2]])

    # # upload homeless data
    # uploadData(db_names[4], col_dict[db_names[4]], new_cols[db_names[4]], dir_dict[db_names[4]])

    
if __name__ == "__main__":
    main()
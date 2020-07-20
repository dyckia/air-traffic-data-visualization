# Read CSV content to array
# For each element
#   - skip 0
#   - sort first and second code
#   - put in a hashmap and count
# Save as csv

def main(infile, outfile):
    import csv
    # read csv file and push into a dict 
    # dic = {ABC: {DEF: 2}}
    dic = {}
    with open (infile, newline='') as csvfile:
        csvreader = csv.reader(csvfile, delimiter=',')
        # row is an array ['JFK', 'DTW', '2']
        for row in csvreader:
            # convert passenger value to int
            val = int(row[2])
            # skip 0 passenger record
            if val == 0: continue
            # compare two airport codes, key1 <= key2
            key1 = row[0]
            key2 = row[1]
            if row[0] > row[1]:
                key1 = row[1]
                key2 = row[0]
            if key1 in dic:
                sub_dic = dic[key1]
                if key2 in sub_dic:
                    sub_dic[key2] += val
                else:
                    sub_dic[key2] = val
            else:
                dic[key1] = {key2: val}

    max_value = 0;
    # push dict to array
    arr = []
    for key1 in dic:
        sub_dic = dic[key1]
        for key2 in sub_dic:
            row = [key1, key2, sub_dic[key2]]
            arr.append(row)
            max_value = max(max_value, row[2])
    
    print(max_value)

    # save to csv file
    with open(outfile, 'w', newline='') as csvfile:
        csvwriter = csv.writer(csvfile, delimiter=',')
        for row in arr:
            csvwriter.writerow(row)

if __name__ == "__main__":
    import sys
    main(sys.argv[1], sys.argv[2])
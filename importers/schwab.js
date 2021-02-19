var CKI = CKI || {};
CKI.Importers = CKI.Importers || {};

CKI.Importers.schwab = {
    textToLines: function(allText) {
    	// return csv text as an array of objects
        console.log(allText);
        var allTextLines = allText.split(/\r\n|\n/);
        var headers = allTextLines[0].split(',');
        for (var j=0; j<headers.length; j++) {
        	// string quotes from string
        	var cleanData = headers[j].replace(/['"]+/g, '').trim()
            headers[j] = cleanData;
        }
        var lines = [];

        for (var i=1; i<allTextLines.length; i++) {
            // remove commas in any numbers
            var line = allTextLines[i];
            var data = line.split(',');
            if (data.length == headers.length) {

                var tobj = {};
                for (var j=0; j<headers.length; j++) {
                	// string quotes from string
                	var cleanData = data[j].replace(/['"]+/g, '')
                    tobj[headers[j]] = cleanData;
                }
                lines.push(tobj);
            }else{
                console.log("skipping row")
                console.log(line);
            }
        }
        return lines;
    },

//    Accrued market discount: "$0.00"
//    Aggregate profit or (loss) on contracts: ""
//    Bartering: ""
//    Check if basis reported to IRS: "Yes"
//    Check if loss is not allowed based on amount in 1d: ""
//    Check if noncovered security: "Covered"
//    Check if proceeds from collectibles QOF: ""
//    Cost or other basis: "271.04"
//    Date acquired: "06/07/2019"
//    Date sold or disposed: "01/02/2020"
//    Description of property (Example 100 sh. XYZ Co.): "1.00 ABIOMED INC"
//    Federal income tax withheld: "0.00"
//    Form 8949 Code: "A"
//    Proceeds: "172.00"
//    Profit or (loss) realized in 2020 on closed contracts: ""
//    Reported to IRS: Gross proceeds Net proceeds: "Gross proceeds"
//    Short-Term gain loss Long-term gain or loss Ordinary: "Short Term"
//    State Tax Withheld: ""
//    State identification no: ""
//    State name: ""
//    Unrealized profit or (loss) on open contracts-12/31/2019: ""
//    Unrealized profit or (loss) on open contracts-12/31/2020: ""
//    Wash sale loss disallowed: "$0.00"




    parseCsvRow: function(sourceObj) {
    	return {
            belongsTo: "tp",
            reportingCategory: sourceObj["Short-Term gain loss Long-term gain or loss Ordinary"] + " " +sourceObj["Check if noncovered security"],
            description: sourceObj['Description of property (Example 100 sh. XYZ Co.)'],
            dateAcquired: sourceObj["Date acquired"],
            dateSold: sourceObj["Date sold or disposed"],
            salesPrice: sourceObj["Proceeds"],
            costBasis: sourceObj["Cost or other basis"],
            adjustmentCode: sourceObj["Form 8949 Code"],
            adjustmentAmount: 0,
        }
    }
};

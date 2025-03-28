let allColleges = [];

//python -m http.server

function run() {
    for(let i = 0; i < d.length; i++){
        allColleges.push(new College(
        d[i].INSTNM,              
        d[i].ADM_RATE,            
        d[i].SAT_AVG,             
        ((d[i].ACTCM25) + (d[i].ACTCM75)) / 2, 
        d[i].TUITIONFEE_IN,       
        d[i].TUITIONFEE_OUT,      
        d[i].ZIP,                 
        d[i].UGDS
        ));

    }
}

class College {
    constructor(name, admissionRate, satAverage, actAverage, inStateTuition, outStateTuition, zipCode, undergradPopulation) {
        this.name = name;
        this.admissionRate = admissionRate;
        this.satAverage = satAverage;
        this.actAverage = actAverage;
        this.inStateTuition = inStateTuition;
        this.outStateTuition = outStateTuition;
        this.zipCode = zipCode;
        this.undergradPopulation = undergradPopulation;
    }
}

function search() {
    let searchResults = [];
    let s = document.getElementById("SATAverage").value;
    let p = document.getElementById("AdmissionRate").value;
    let r = document.getElementById("ACTAverage").value;
    let g = document.getElementById("TuitionIn").value;
    let y = document.getElementById("TuitionOut").value;
    let u = document.getElementById("UndergradPop").value;
    let q = document.getElementById("Location").value;
    
    let SATRange = getSAT(s);
    let admRange = getADM(p);
    let ACTRange = getACT(r);
    let TutinRange = getTutin(g);
    let TutoutRange = getTutout(y);
    let LocaRange = getLoca(q);
    let UndpopRange = getUndpop(u);

    for (let i = 0; i < allColleges.length; i++) {
        let college = allColleges[i]; 
        let sr = college.satAverage;
        let ar = college.admissionRate;
        let aa = college.actAverage;
        let is = college.inStateTuition;
        let os = college.outStateTuition;
        let l = Math.floor(college.zipCode/10000);
        let up = college.undergradPopulation;


        let locate;
        if (l == 0) locate = "Northeast"; 
        else if (l == 1) locate = "Northeast";
        else if (l == 2) locate = "Mid-Atlantic";
        else if (l== 3) locate = "Southeast";
        else if (l == 4) locate = "Midwest (North-Central)";
        else if (l == 5) locate = "Upper Midwest";
        else if (l == 6) locate = "Central";
        else if (l == 7) locate = "South-Central & Great Plains";
        else if (l == 8) locate = "Mountain West";
        else locate = "West Coast & Pacific";


        if (
            (s == 0 || (sr >= SATRange[0] && sr <= SATRange[1])) &&
            (p == 0 || ((ar*100) >= admRange[0] && (ar*100) <= admRange[1])) &&
            (r == 0 || (aa >= ACTRange[0] && aa <= ACTRange[1])) &&
            (g == 0 || (is >= TutinRange[0] && is <= TutinRange[1])) &&
            (y == 0 || (os >= TutoutRange[0] && os <= TutoutRange[1])) &&
            (q == 0 || (l >= LocaRange[0] && l < LocaRange[1])) &&
            (u == 0 || (up >= UndpopRange[0] && up < UndpopRange[1]))
        ) {
           
            searchResults.push(allColleges[i]);
        }   
        
    }

    let t = "<table class='w3-table-all' class='w3-spin' border='1'><tr><th>College Name</th><th>Admission Rate</th><th>SAT Average</th><th>ACT Average</th><th>In-State Tuition</th><th>Out-State Tuition</th><th>Location</th><th>Undergraduate Population</th></tr>";
    

    if (searchResults.length == 0) {
        t += "<tr><td colspan='8' style='text-align: center;'>No Colleges Found.</td></tr>";
    } else {
        for (let p = 0; p < searchResults.length; p++) {
            let b = Math.floor(searchResults[p].zipCode / 10000);
            let locate;
            if (b == 0) locate = "Northeast"; 
            else if (b == 1) locate = "Northeast";
            else if (b == 2) locate = "Mid-Atlantic";
            else if (b == 3) locate = "Southeast";
            else if (b == 4) locate = "Midwest (North-Central)";
            else if (b == 5) locate = "Upper Midwest";
            else if (b == 6) locate = "Central";
            else if (b == 7) locate = "South-Central & Great Plains";
            else if (b == 8) locate = "Mountain West";
            else locate = "West Coast & Pacific";
    
            t += "<tr>";
            t += "<td>" + (searchResults[p].name || "No data available") + "</td>";
            t += "<td>" + (searchResults[p].admissionRate ? (Math.round(searchResults[p].admissionRate * 10000) / 100) + "%" : "No data available") + "</td>";
            t += "<td>" + (searchResults[p].satAverage || "No data available") + "</td>";
            t += "<td>" + (searchResults[p].actAverage || "No data available") + "</td>";
            t += "<td>" + (searchResults[p].inStateTuition ? "$" + searchResults[p].inStateTuition : "No data available") + "</td>";
            t += "<td>" + (searchResults[p].outStateTuition ? "$" + searchResults[p].outStateTuition : "No data available") + "</td>";
            t += "<td>" + (locate || "No data available") + "</td>";
            t += "<td>" + (searchResults[p].undergradPopulation || "No data available") + "</td>";
            t += "</tr>";
        }
    }

    t += "</table>";

    

    document.getElementById("results").innerHTML = t;
    
    if (searchResults.length === 0) {
        t += "<tr>";
        t += "<td colspan='8' style='text-align: center;'>No Colleges Found.</td>";
        t += "</tr>";
    }

}

function getSAT(value) {
    if (value == 0) {
        return [0, 1600];
    }
    if (value == 1) {
        return [0, 799];
    }
    if (value == 2) {
        return [800, 899];
    }
    if (value == 3) {
        return [900, 999];
    }
    if (value == 4) {
        return [1000, 1099];
    }
    if (value == 5) {
        return [1100, 1199];
    }
    if (value == 6) {
        return [1200, 1299];
    }
    if (value == 7) {
        return [1300, 1399];
    }
    if (value == 8) {
        return [1400, 1499];
    }
    if (value == 9) {
        return [1500, 1600];
    }
}

function getADM(value) {
    if (value == 0) {
        return [0, 100];
    }
    if (value == 1) {
        return [0, 10];
    }
    if (value == 2) {
        return [10, 20];
    }
    if (value == 3) {
        return [20, 30];
    }
    if (value == 4) {
        return [30, 40];
    }
    if (value == 5) {
        return [40, 50];
    }
    if (value == 6) {
        return [50, 60];
    }
    if (value == 7) {
        return [60, 70];
    }
    if (value == 8) {
        return [70, 80];
    }
    if (value == 9) {
        return [80, 90];
    }
    if (value == 10) {
        return [90, 100];
    }
}

function getACT(value) {
    if (value == 0) {
        return [0, 36];
    }
    if (value == 1) {
        return [0, 15];
    }
    if (value == 2) {
        return [16, 18];
    }
    if (value == 3) {
        return [19, 21];
    }
    if (value == 4) {
        return [22, 24];
    }
    if (value == 5) {
        return [25, 27];
    }
    if (value == 6) {
        return [28, 30];
    }
    if (value == 7) {
        return [31, 33];
    }
    if (value == 8) {
        return [34, 36];
    }
}

function getTutin(value) {
    if (value == 0) {
        return [0, 15000];
    }
    if (value == 1) {
        return [0, 6999];
    }
    if (value == 2) {
        return [7000, 7999];
    }
    if (value == 3) {
        return [8000, 8999];
    }
    if (value == 4) {
        return [9000, 9999];
    }
    if (value == 5) {
        return [10000, 10999];
    }
    if (value == 6) {
        return [11000, 11999];
    }
    if (value == 7) {
        return [12000, 12999];
    }
    if (value == 8) {
        return [13000, 13999];
    }
    if (value == 9) {
        return [14000, 15000];
    }
}

function getTutout(value) {
    if (value == 0) {
        return [0, 15000];
    }
    if (value == 1) {
        return [0, 6999];
    }
    if (value == 2) {
        return [7000, 7999];
    }
    if (value == 3) {
        return [8000, 8999];
    }
    if (value == 4) {
        return [9000, 9999];
    }
    if (value == 5) {
        return [10000, 10999];
    }
    if (value == 6) {
        return [11000, 11999];
    }
    if (value == 7) {
        return [12000, 12999];
    }
    if (value == 8) {
        return [13000, 13999];
    }
    if (value == 9) {
        return [14000, 15000];
    }
}

function getUndpop(value) {
    if (value == 0) {
        return [0, 80000];
    }
    if (value == 1) {
        return [0, 100];
    }
    if (value == 2) {
        return [100, 1000];
    }
    if (value == 3) {
        return [1000, 5000];
    }
    if (value == 4) {
        return [5000, 10000];
    }
    if (value == 5) {
        return [10000, 20000];
    }
    if (value == 6) {
        return [20000, 40000];
    }
    if (value == 7) {
        return [40000, 60000];
    }
    if (value == 8) {
        return [60000, 100000];
    }
}

function getLoca(value) {
    if (value == 0) {
        return [0, 9]; 
    }
    if (value == 1) {
        return [0, 2];
    }
    if (value == 2) {
        return [2, 3];
    }
    if (value == 3) {
        return [3, 4];
    }
    if (value == 4) {
        return [4, 5];
    }
    if (value == 5) {
        return [5, 6];
    }
    if (value == 6) {
        return [6, 7];
    }
    if (value == 7) {
        return [7, 8];
    }
    if (value == 8) {
        return [8, 9];
    }
    if (value == 9) {
        return [9, 10];
    }
}
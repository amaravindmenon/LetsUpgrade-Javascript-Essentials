busarray = [];
sno = 0;

init();

function init() {
    if (localStorage.busrecord) {
        busarray = JSON.parse(localStorage.busrecord);
        busarray.forEach((element) => {
            sno++;
            preparetable(
                element.Sno,
                element.Name,
                element.Source,
                element.Destination,
                element.Number,
                element.Passenger
            );
        });
    }
}

adddata.addEventListener("click", function(e) {
    e.preventDefault();
    let Name = document.getElementById("Name").value;
    let Source = document.getElementById("Source").value;
    let Destination = document.getElementById("Destination").value;
    let Number = document.getElementById("Number").value;
    let Passenger = document.getElementById("Passenger").value;

    sno++;
    var busobj = {
        Sno: sno,
        Name: Name,
        Source: Source,
        Destination: Destination,
        Number: Number,
        Passenger: Passenger,
    };

    busarray.push(busobj);

    localStorage.busrecord = JSON.stringify(busarray);
    cleartextbox();
    preparetable(sno, Name, Source, Destination, Number, Passenger);
});

function preparetable(sno, name, source, destination, num, pess) {
    let table = document.getElementById("bustab");
    let row = table.insertRow();
    var cell0 = row.insertCell(0);
    var cell1 = row.insertCell(1);
    var cell2 = row.insertCell(2);
    var cell3 = row.insertCell(3);
    var cell4 = row.insertCell(4);
    var cell5 = row.insertCell(5);

    cell0.innerHTML = sno;
    cell1.innerHTML = name;
    cell2.innerHTML = source;
    cell3.innerHTML = destination;
    cell4.innerHTML = num;
    cell5.innerHTML = pess;
}

const cleartextbox = () => {
    document.getElementById("Name").value = "";
    document.getElementById("Source").value = "";
    document.getElementById("Destination").value = "";
    document.getElementById("Number").value = "";
    document.getElementById("Passenger").value = "";
};

// search.addEventListener('click',()=>{
//     ds = document.getElementById('searchSource').value.toLowerCase();
//     dd = document.getElementById('searchDestination').value.toLowerCase();
//     if(ds == "" || dd == ""){
//         alert("Please Enter Source And Destination")
//     }else{

//     }
// })

const searchbyname = () => {
    let source = document.getElementById("searchSource").value.toLowerCase();
    let destination = document
        .getElementById("searchDestination")
        .value.toLowerCase();
    let sourcetd = "";
    let destinationtd = "";
    let mytable = document.getElementById("bustab");
    let tr = mytable.getElementsByTagName("tr");

    for (let i = 1; i < tr.length; i++) {
        sourcetd = tr[i].getElementsByTagName("td")[1];
        destinationtd = tr[i].getElementsByTagName("td")[3];

        if (sourcetd || destinationtd) {
            sourceval = sourcetd.textContent || sourcetd.innerHTML;
            desval = destinationtd.textContent || destinationtd.innerHTML;
            if (
                sourceval.toLowerCase().indexOf(Source) > -1 ||
                desval.toLowerCase().indexOf(destination) > -1
            ) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
};
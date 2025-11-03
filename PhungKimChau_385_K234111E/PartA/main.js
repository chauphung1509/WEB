function showAbout(){
    document.getElementById("content").innerHTML = `
        <div class="card">
            <img src="/PhungKimChau_385_K234111E/images/chau2.png">

            <div class="info">
                <p><b>Student ID:</b> K234111385</p>
                <p><b>Student Name:</b> Phùng Kim Châu</p>
                <p><b>Class Name:</b> K234111E </p>
            </div>
        </div>
    `;
}

function showProducts(){
  const xhr = new XMLHttpRequest();
  xhr.open("GET","dataset.xml",true);
  xhr.overrideMimeType('text/xml');
  xhr.onload = function(){
    if(xhr.status !== 200 && xhr.status !== 0){ // 0 khi chạy từ file://
      document.getElementById('content').innerHTML =
        `<p style="color:#b91c1c">Không đọc được dataset.xml (status ${xhr.status})</p>`;
      return;
    }
    const xml = xhr.responseXML || new DOMParser().parseFromString(xhr.responseText,'text/xml');
    const items = [...xml.getElementsByTagName('product')];
    const rows = items.map(p=>{
      const id=p.querySelector('id')?.textContent??'';
      const name=p.querySelector('name')?.textContent??'';
      const detail=p.querySelector('detail')?.textContent??'';
      const image=p.querySelector('image')?.textContent??'';
      return `<tr>
        <td>${id}</td><td><b>${escapeHtml(name)}</b></td>
        <td>${escapeHtml(detail)}</td>
        <td><img class="productImg" src="${image}" alt="${escapeHtml(name)}"></td>
      </tr>`;
    }).join('');
    document.getElementById('content').innerHTML = `
      <h2>Product List</h2>
      <table class="productTable">
        <thead><tr><th>ID</th><th>Name</th><th>Detail</th><th>Image</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>`;
  };
  xhr.send();
}
let employees = []; // JSON list

function showEmployees(){
    document.getElementById("content").innerHTML = `
        <h2>Employees</h2>
        <div class="empForm">
            <input id="eid" placeholder="ID">
            <input id="ename" placeholder="Name">
            <input id="ephone" placeholder="Phone">
            <input id="eemail" placeholder="Email">
            <input id="eage" placeholder="Age" type="number">
            <button onclick="addEmployee()">Add</button>
        </div>
        <br>
        <table class="productTable" id="empTable">
            <tr>
                <th>ID</th><th>Name</th><th>Phone</th><th>Email</th><th>Age</th><th>Action</th>
            </tr>
        </table>
    `;

    renderEmployees();
}

function addEmployee(){
    const id = eid.value.trim();
    const name = ename.value.trim();
    const phone = ephone.value.trim();
    const email = eemail.value.trim();
    const age = parseInt(eage.value);

    if(!id || !name || !phone || !email || !age){
        alert("Please fill all fields!");
        return;
    }

    employees.push({id, name, phone, email, age});
    renderEmployees();
}

function renderEmployees(){
    const table = document.getElementById("empTable");

    let rows = "";
    employees.forEach((emp, index)=>{
        const cls = (emp.age >= 18 && emp.age <= 35) ? "yellow" : "magenta";

        rows += `
        <tr class="${cls}">
            <td>${emp.id}</td>
            <td>${emp.name}</td>
            <td>${emp.phone}</td>
            <td>${emp.email}</td>
            <td>${emp.age}</td>
            <td>
                <button class="deleteBtn" onclick="removeEmployee(${index})">
                    <img src="../images/ic_delete.png">
                </button>
            </td>
        </tr>`;
    });

    table.innerHTML = `
        <tr>
            <th>ID</th><th>Name</th><th>Phone</th><th>Email</th><th>Age</th><th>Action</th>
        </tr>
        ${rows}
    `;
}


    const cities = [
    {id:'2347719', name:'An Giang'},
    {id:'20070078', name:'Bình Dương'},
    {id:'20070086', name:'Bình Phước'},
    {id:'2347731', name:'Bình Thuận'},
    {id:'2347730', name:'Bình Định'},
    {id:'20070081', name:'Bạc Liêu'},
    {id:'20070087', name:'Bắc Giang'},
    {id:'20070084', name:'Bắc Kạn'},
    {id:'20070088', name:'Bắc Ninh'},
    {id:'2347703', name:'Bến Tre'},
    {id:'2347704', name:'Cao Bằng'},
    {id:'20070082', name:'Cà Mau'},
    {id:'2347732', name:'Cần Thơ'},
    {id:'28301718', name:'Điện Biên'},
    {id:'20070085', name:'Đà Nẵng'},
    {id:'1252375', name:'Đà Lạt'},
    {id:'2347720', name:'Đắk Lắk'},
    {id:'28301719', name:'Đắk Nông'},
    {id:'2347721', name:'Đồng Nai'},
    {id:'2347722', name:'Đồng Tháp'},
    {id:'2347733', name:'Gia Lai'},
    {id:'2347727', name:'Hà Nội'},
    {id:'2347728', name:'TP. Hồ Chí Minh'},
    {id:'2347734', name:'Hà Giang'},
    {id:'2347741', name:'Hà Nam'},
    {id:'2347736', name:'Hà Tĩnh'},
    {id:'2347737', name:'Hòa Bình'},
    {id:'20070079', name:'Hưng Yên'},
    {id:'20070080', name:'Hải Dương'},
    {id:'2347707', name:'Hải Phòng'},
    {id:'28301720', name:'Hậu Giang'},
    {id:'2347738', name:'Khánh Hòa'},
    {id:'2347723', name:'Kiên Giang'},
    {id:'20070076', name:'Kon Tum'},
    {id:'2347708', name:'Lai Châu'},
    {id:'2347710', name:'Long An'},
    {id:'2347740', name:'Lào Cai'},
    {id:'2347709', name:'Lâm Đồng'},
    {id:'2347718', name:'Lạng Sơn'},
    {id:'20070089', name:'Nam Định'},
    {id:'2347742', name:'Nghệ An'},
    {id:'2347743', name:'Ninh Bình'},
    {id:'2347744', name:'Ninh Thuận'},
    {id:'20070091', name:'Phú Thọ'},
    {id:'2347745', name:'Phú Yên'},
    {id:'2347746', name:'Quảng Bình'},
    {id:'2347711', name:'Quảng Nam'},
    {id:'20070077', name:'Quảng Ngãi'},
    {id:'2347712', name:'Quảng Ninh'},
    {id:'2347747', name:'Quảng Trị'},
    {id:'2347748', name:'Sóc Trăng'},
    {id:'2347713', name:'Sơn La'},
    {id:'2347715', name:'Thanh Hóa'},
    {id:'2347716', name:'Thái Bình'},
    {id:'20070083', name:'Thái Nguyên'},
    {id:'2347749', name:'Thừa Thiên Huế'},
    {id:'2347717', name:'Tiền Giang'},
    {id:'2347750', name:'Trà Vinh'},
    {id:'2347751', name:'Tuyên Quang'},
    {id:'2347714', name:'Tây Ninh'},
    {id:'2347752', name:'Vĩnh Long'},
    {id:'20070090', name:'Vĩnh Phúc'},
    {id:'2347729', name:'Vũng Tàu'},
    {id:'2347753', name:'Yên Bái'}
]
async function showWeather(){
    document.getElementById("content").innerHTML = `
        <div class="weather-container">
            <h1 style="text-align: center; font-weight: bold; color: #004c75; margin-bottom: 30px; font-size: 2.6em;">
                🌤️ Dự Báo Thời Tiết Việt Nam
            </h1>

            <div class="selector-section" style="text-align: center; margin-bottom: 30px;">
                <label for="citySelect" style="font-size: 1.2em; color: #004c75; margin-right: 15px; font-weight: 600;">
                    Chọn tỉnh/thành phố:
                </label>
                <select id="citySelect" style="padding: 12px 20px; font-size: 1.1em; border: 2px solid #0075ff; border-radius: 10px; background: white; color: #005699; cursor: pointer; min-width: 250px;">
                    <option value="">-- Chọn địa điểm --</option>
                </select>
            </div>

            <div id="loadingDiv" style="display:none; text-align:center; color:#0075ff; font-size:18px; padding:10px;">
                Đang tải dữ liệu ⏳
            </div>

            <div id="weatherContainer" style="display:none;">
                <div class="current-weather" style="background: linear-gradient(135deg, #0072ff 0%, #00c6ff 100%); color: white; padding: 40px; border-radius: 18px; text-align: center; margin-bottom: 30px; box-shadow: 0 10px 35px rgba(0, 0, 0, .25);">
                    <h2 id="cityName" style="margin-bottom: 10px;"></h2>
                    <div style="font-size: 4.2em; font-weight: bold; margin: 18px 0;" id="currentTemp"></div>
                    <img id="currentIcon" src="" style="width: 110px; margin-bottom: 12px; filter: drop-shadow(0 5px 8px rgba(0,0,0,.2));">
                    <div id="currentDesc" style="font-size:20px;"></div>

                    <div class="current-details" style="display: flex; justify-content: center; gap: 25px; flex-wrap: wrap; margin-top: 15px;">
                        <div style="background: rgba(255,255,255,0.25); padding: 15px 25px; border-radius: 10px;">
                            <strong>💧 Độ ẩm:</strong> <span id="humidity"></span>
                        </div>
                        <div style="background: rgba(255,255,255,0.25); padding: 15px 25px; border-radius: 10px;">
                            <strong>💨 Gió:</strong> <span id="windSpeed"></span>
                        </div>
                        <div style="background: rgba(255,255,255,0.25); padding: 15px 25px; border-radius: 10px;">
                            <strong>🌡️ Cảm giác:</strong> <span id="feelsLike"></span>
                        </div>
                        <div style="background: rgba(255,255,255,0.25); padding: 15px 25px; border-radius: 10px;">
                            <strong>👁️ Tầm nhìn:</strong> <span id="visibility"></span>
                        </div>
                    </div>
                </div>

                <div class="hourly-forecast">
                    <h3 style="text-align: center; margin: 15px 0 20px; color: #004c75; font-size: 1.8em; font-weight: bold;">
                        Dự báo theo giờ
                    </h3>
                    <div id="hourlyGrid" class="hourly-grid"></div>
                </div>
            </div>
        </div>
    `;

    // Populate select options
    const citySelect = document.getElementById('citySelect');
    cities.forEach(c => {
        citySelect.innerHTML += `<option value="${c.id}">${c.name}</option>`;
    });

    // Add event listener
    citySelect.addEventListener('change', () => {
        loadWeatherData(citySelect.value, citySelect.options[citySelect.selectedIndex].text);
    });

    // Load default city
    citySelect.value = cities[0].id;
    loadWeatherData(cities[0].id, cities[0].name);
}

async function loadWeatherData(id, name) {
    document.getElementById('loadingDiv').style.display = "block";
    document.getElementById('weatherContainer').style.display = "none";

    try {
        const apiUrl = `https://utils3.cnnd.vn/ajax/weatherinfo/${id}.htm`;
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(apiUrl)}`;
        
        const res = await fetch(proxyUrl);
        const data = await res.json();
        const info = JSON.parse(data.contents).Data.data.datainfo;

        // Gán dữ liệu vào UI
        document.getElementById('cityName').textContent = name;
        document.getElementById('currentTemp').textContent = info.temperature + "°C";
        document.getElementById('currentDesc').textContent = info.status;
        document.getElementById('currentIcon').src = info.shadow_icon;
        
        // Gán thông tin chi tiết
        document.getElementById('humidity').textContent = info.humidity;
        document.getElementById('windSpeed').textContent = info.wind.index + " " + info.wind.unit;
        document.getElementById('feelsLike').textContent = info.feels_like + "°C";
        document.getElementById('visibility').textContent = info.visibility.index + " " + info.visibility.unit;

        // Gán dữ liệu dự báo theo giờ
        const grid = document.getElementById('hourlyGrid');
        grid.innerHTML = "";
        
        info.hourly_temperature.forEach(item => {
            grid.innerHTML += `
                <div class="hour-card" style="background: linear-gradient(140deg, #f0f9ff 0%, #cfe7ff 100%); padding: 18px; border-radius: 12px; text-align: center; transition: .3s; box-shadow: 0 5px 15px rgba(0,0,0,0.08);">
                    <div style="font-weight: bold; color: #0075ff; font-size: 1.1em;">${item.time}:00</div>
                    <img src="${item.shadow_icon}" style="width: 50px; margin: 8px 0;">
                    <div style="font-weight: bold; font-size: 1.2em;">${item.temperature}°C</div>
                    <div style="font-size: 0.9em; color: #555;">${item.status}</div>
                </div>
            `;
        });

        // Hiển thị UI
        document.getElementById('loadingDiv').style.display = "none";
        document.getElementById('weatherContainer').style.display = "block";

    } catch (e) {
        console.error(`Error fetching ${name}:`, e);
        document.getElementById('loadingDiv').style.display = "none";
        document.getElementById('content').innerHTML = `
            <p style="color:red; text-align:center; font-size:18px;">
                ❌ Không thể tải dữ liệu thời tiết. Vui lòng thử lại!
            </p>
        `;
    }
}



async function showRSS(){
    document.getElementById("content").innerHTML = "<h3>⏳ Loading RSS Sport...</h3>";

    const RSS_URL =
        "https://api.allorigins.win/get?url=" +
        encodeURIComponent("https://vnexpress.net/rss/the-thao.rss");

    try {
        const res = await fetch(RSS_URL);
        const data = await res.json();
        const xmlText = data.contents;

        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlText, "application/xml");

        const items = xml.querySelectorAll("item");

        let html = `<h2>VnExpress – 🏆 RSS Sport</h2><div class="rssContainer">`;

        items.forEach(item=>{
            const title = item.querySelector("title")?.textContent || "";
            const link = item.querySelector("link")?.textContent || "#";
            const desc = item.querySelector("description")?.textContent || "";
            const img = item.querySelector("enclosure")?.getAttribute("url") || "";

            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = desc;
            const shortDesc = tempDiv.textContent.trim().replace(/\s+/g, " ");

            html += `
                <div class="rssItem">
                    ${img ? `<img src="${img}">` : ""}
                    <div class="rssContent">
                        <h3>${title}</h3>
                        <p>${shortDesc.slice(0, 150)}...</p>
                        <a href="${link}" target="_blank">Đọc bài →</a>
                    </div>
                </div>
            `;
        });

        html += `</div>`;
        document.getElementById("content").innerHTML = html;

    } catch (err){
        document.getElementById("content").innerHTML = "<p style='color:red'>Lỗi tải RSS!</p>";
        console.log(err);
    }
}

function loginLogout(){
    if(localStorage.getItem("loggedUser")){
        if(confirm("Bạn có chắc chắn muốn logout?")){
            localStorage.removeItem("loggedUser");
            updateLoginMenu();
            showAbout();
        }
    } else {
        showLoginForm();
    }
}
function showLoginForm(){
    document.getElementById("content").innerHTML = `
        <div class="loginForm">
            <h3>Login System</h3>
            <input id="user" placeholder="Username">
            <input id="pass" type="password" placeholder="Password">
            <button onclick="processLogin()">Login</button>
        </div>
    `;
}
async function processLogin(){
    let u = document.getElementById("user").value.trim();
    let p = document.getElementById("pass").value.trim();

    if(u === "" || p === ""){
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    try {
        let res = await fetch("accounts.xml");
        let text = await res.text();
        let xml = new DOMParser().parseFromString(text, "text/xml");

        let accs = xml.getElementsByTagName("account");
        let found = false;

        for (let i = 0; i < accs.length; i++){
            let username = accs[i].getElementsByTagName("username")[0].textContent;
            let password = accs[i].getElementsByTagName("password")[0].textContent;

            if(u === username && p === password){
                found = true;
                break;
            }
        }

        if(found){
            localStorage.setItem("loggedUser", u);
            alert("Login thành công!");
            updateLoginMenu();
            showAbout();
        } else {
            alert("Sai username hoặc password!");
        }

    } catch (err) {
        alert("Không thể đọc accounts.xml");
        console.log(err);
    }
}

function updateLoginMenu(){
    let menu = document.getElementById("loginMenu");
    if(localStorage.getItem("loggedUser")){
        menu.textContent = "Logout";
    } else {
        menu.textContent = "Login";
    }
}

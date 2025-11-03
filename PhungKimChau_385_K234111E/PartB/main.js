async function showLottery(){
    document.getElementById("content").innerHTML = `
        <div class="lottery-container">
            <h1 style="text-align: center; font-weight: bold; color: #d32f2f; margin-bottom: 30px; font-size: 2.5em;">
                🎰 Thông Tin Xổ Số Vietlott
            </h1>

            <div class="radio-section" style="text-align: center; margin-bottom: 30px;">
                <label style="margin-right: 30px; font-size: 1.2em; cursor: pointer;">
                    <input type="radio" name="lotteryType" value="mega645" checked style="margin-right: 8px; cursor: pointer; transform: scale(1.3);">
                    <span style="font-weight: 600; color: #1976d2;">Mega 6/45</span>
                </label>
                <label style="font-size: 1.2em; cursor: pointer;">
                    <input type="radio" name="lotteryType" value="power655" style="margin-right: 8px; cursor: pointer; transform: scale(1.3);">
                    <span style="font-weight: 600; color: #d32f2f;">Power 6/55</span>
                </label>
            </div>

            <div id="lotteryLoading" style="display:block; text-align:center; color:#1976d2; font-size:18px; padding:20px;">
                Đang tải dữ liệu ⏳
            </div>

            <div id="lotteryData" style="display:none;"></div>
        </div>
    `;

    // Load dữ liệu từ API
    await loadLotteryData();

    // Add event listeners cho radio buttons
    const radios = document.querySelectorAll('input[name="lotteryType"]');
    radios.forEach(radio => {
        radio.addEventListener('change', displaySelectedLottery);
    });

    // Hiển thị Mega 6/45 mặc định
    displaySelectedLottery();
}

let lotteryAPIData = null;

async function loadLotteryData(){
    try {
        const res = await fetch("https://webapi.dantri.com.vn/lottery/get-vietlott-jack");
        const data = await res.json();
        
        if(data.status && data.data){
            lotteryAPIData = data.data;
            document.getElementById('lotteryLoading').style.display = "none";
            document.getElementById('lotteryData').style.display = "block";
        } else {
            throw new Error("Không có dữ liệu");
        }
    } catch(e){
        console.error("Error loading lottery:", e);
        document.getElementById('lotteryLoading').innerHTML = `
            <p style="color:red; font-size:18px;">❌ Không thể tải dữ liệu xổ số. Vui lòng thử lại!</p>
        `;
    }
}

function displaySelectedLottery(){
    const selected = document.querySelector('input[name="lotteryType"]:checked').value;
    const lotteryDiv = document.getElementById('lotteryData');

    if(!lotteryAPIData) return;

    let html = '';

    if(selected === 'mega645'){
        const mega = lotteryAPIData.mega645[0];
        html = `
            <div class="lottery-card" style="background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%); color: white; padding: 40px; border-radius: 20px; box-shadow: 0 10px 40px rgba(0,0,0,0.2);">
                <h2 style="text-align: center; font-size: 2.2em; margin-bottom: 20px;">🎲 MEGA 6/45</h2>
                
                <div style="text-align: center; margin: 20px 0;">
                    <p style="font-size: 1.3em; margin: 10px 0;">Kỳ quay: <strong>${mega.DrawId}</strong></p>
                    <p style="font-size: 1.3em; margin: 10px 0;">Ngày: <strong>${mega.DrawDate}</strong></p>
                </div>

                <div class="lottery-numbers" style="display: flex; justify-content: center; gap: 12px; margin: 30px 0; flex-wrap: wrap;">
                    ${mega.ListNumber.split('-').map(num => `
                        <div class="lottery-ball" style="width: 60px; height: 60px; background: white; color: #1976d2; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.8em; font-weight: bold; box-shadow: 0 5px 15px rgba(0,0,0,0.3);">
                            ${num}
                        </div>
                    `).join('')}
                </div>

                <table class="lottery-table" style="width: 100%; margin-top: 30px; background: rgba(255,255,255,0.15); border-radius: 10px; overflow: hidden;">
                    <tr style="background: rgba(0,0,0,0.2);">
                        <th style="padding: 15px; text-align: left; font-size: 1.1em;">Thông tin</th>
                        <th style="padding: 15px; text-align: right; font-size: 1.1em;">Giá trị</th>
                    </tr>
                    <tr>
                        <td style="padding: 12px; border-top: 1px solid rgba(255,255,255,0.2);">💰 Jackpot hiện tại</td>
                        <td style="padding: 12px; text-align: right; font-weight: bold; font-size: 1.2em; border-top: 1px solid rgba(255,255,255,0.2);">
                            ${formatMoney(mega.Jackpot)} VNĐ
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 12px; border-top: 1px solid rgba(255,255,255,0.2);">🎉 Số người trúng Jackpot</td>
                        <td style="padding: 12px; text-align: right; font-weight: bold; font-size: 1.2em; border-top: 1px solid rgba(255,255,255,0.2);">
                            ${mega.JackportWinner} người
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 12px; border-top: 1px solid rgba(255,255,255,0.2);">📊 Jackpot kỳ tiếp theo (dự kiến)</td>
                        <td style="padding: 12px; text-align: right; font-weight: bold; font-size: 1.2em; border-top: 1px solid rgba(255,255,255,0.2);">
                            ${formatMoney(mega.EstJackpot)} VNĐ
                        </td>
                    </tr>
                </table>
            </div>
        `;
    } else {
        const power = lotteryAPIData.power655[0];
        html = `
            <div class="lottery-card" style="background: linear-gradient(135deg, #d32f2f 0%, #f44336 100%); color: white; padding: 40px; border-radius: 20px; box-shadow: 0 10px 40px rgba(0,0,0,0.2);">
                <h2 style="text-align: center; font-size: 2.2em; margin-bottom: 20px;">⚡ POWER 6/55</h2>
                
                <div style="text-align: center; margin: 20px 0;">
                    <p style="font-size: 1.3em; margin: 10px 0;">Kỳ quay: <strong>${power.DrawId}</strong></p>
                    <p style="font-size: 1.3em; margin: 10px 0;">Ngày: <strong>${power.DrawDate}</strong></p>
                </div>

                <div class="lottery-numbers" style="display: flex; justify-content: center; gap: 12px; margin: 30px 0; flex-wrap: wrap;">
                    ${power.ListNumber.split('|')[0].split('-').map(num => `
                        <div class="lottery-ball" style="width: 60px; height: 60px; background: white; color: #d32f2f; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.8em; font-weight: bold; box-shadow: 0 5px 15px rgba(0,0,0,0.3);">
                            ${num}
                        </div>
                    `).join('')}
                    <div style="font-size: 2em; font-weight: bold; display: flex; align-items: center; margin: 0 10px;">|</div>
                    <div class="lottery-ball" style="width: 60px; height: 60px; background: gold; color: #d32f2f; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.8em; font-weight: bold; box-shadow: 0 5px 15px rgba(255,215,0,0.5);">
                        ${power.ListNumber.split('|')[1]}
                    </div>
                </div>

                <table class="lottery-table" style="width: 100%; margin-top: 30px; background: rgba(255,255,255,0.15); border-radius: 10px; overflow: hidden;">
                    <tr style="background: rgba(0,0,0,0.2);">
                        <th style="padding: 15px; text-align: left; font-size: 1.1em;">Thông tin</th>
                        <th style="padding: 15px; text-align: right; font-size: 1.1em;">Giá trị</th>
                    </tr>
                    <tr>
                        <td style="padding: 12px; border-top: 1px solid rgba(255,255,255,0.2);">💰 Jackpot 1 hiện tại</td>
                        <td style="padding: 12px; text-align: right; font-weight: bold; font-size: 1.2em; border-top: 1px solid rgba(255,255,255,0.2);">
                            ${formatMoney(power.Jackpot)} VNĐ
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 12px; border-top: 1px solid rgba(255,255,255,0.2);">🎉 Số người trúng Jackpot 1</td>
                        <td style="padding: 12px; text-align: right; font-weight: bold; font-size: 1.2em; border-top: 1px solid rgba(255,255,255,0.2);">
                            ${power.JackportWinner} người
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 12px; border-top: 1px solid rgba(255,255,255,0.2);">💎 Jackpot 2 hiện tại</td>
                        <td style="padding: 12px; text-align: right; font-weight: bold; font-size: 1.2em; border-top: 1px solid rgba(255,255,255,0.2);">
                            ${formatMoney(power.Jackpot2)} VNĐ
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 12px; border-top: 1px solid rgba(255,255,255,0.2);">🎊 Số người trúng Jackpot 2</td>
                        <td style="padding: 12px; text-align: right; font-weight: bold; font-size: 1.2em; border-top: 1px solid rgba(255,255,255,0.2);">
                            ${power.JackportWinner2} người
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 12px; border-top: 1px solid rgba(255,255,255,0.2);">📊 Jackpot 1 kỳ tiếp (dự kiến)</td>
                        <td style="padding: 12px; text-align: right; font-weight: bold; font-size: 1.2em; border-top: 1px solid rgba(255,255,255,0.2);">
                            ${formatMoney(power.EstJackpot)} VNĐ
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 12px; border-top: 1px solid rgba(255,255,255,0.2);">📈 Jackpot 2 kỳ tiếp (dự kiến)</td>
                        <td style="padding: 12px; text-align: right; font-weight: bold; font-size: 1.2em; border-top: 1px solid rgba(255,255,255,0.2);">
                            ${formatMoney(power.EstJackpot2)} VNĐ
                        </td>
                    </tr>
                </table>
            </div>
        `;
    }

    lotteryDiv.innerHTML = html;
}

function formatMoney(amount){
    return parseInt(amount).toLocaleString('vi-VN');
}
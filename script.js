////////////////////////////////////////////////////////////////////////////////////////////////
//Funções para manipular a tela
const generateAllRightsText = () => {
    const allRightsField = document.getElementById("all-rights-text");
    const currentYear = () => {
        return new Date().getFullYear();
    };
    allRightsField.textContent = `© ${currentYear()} Pedro Azevedo. All rights reserved.`;
};

const generateAMobileComponent = (obj) => {
    const mobileTable = document.getElementById("mobiles");
    mobileTable.innerHTML += `
        <tr id="mobile-id-${obj.id}">
            <td>${obj.manufacturer}</td>
            <td>${obj.model}</td>
            <td>${obj.price_final}</td>
            <td><button class="button-table" onclick="showMobile('${obj.model}')">Visualizar</button></td>
        </tr>
    `;    
};

const openMobile = (obj) => {
    openModal("mobile-modal");
    const modal = document.getElementById("mobile-modal");
    modal.innerHTML = `
        <div class="modal-container">
            <div id="iconExitContainer">
                <a id="iconExit" href='javascript:closeModal("mobile-modal")'>X</a>
            </div>            
            <div class="container">
                <p>Potência da Bateria (mAh): ${obj.battery_power}</p>
                <p>Bluetooth: ${obj.blue ? 'Sim' : 'Não'}</p>
                <p>Velocidade do processador (GHz): ${obj.clock_speed}</p>
                <p>Dois chips: ${obj.dual_sim ? 'Sim' : 'Não'}</p>
                <p>Câmera Frontal (Mp): ${obj.fc}</p>
                <p>Possui 4G: ${obj.four_g ? 'Sim' : 'Não'}</p>
                <p>Memória Interna (GB): ${obj.int_memory}</p>
                <p>Profundidade (cm): ${obj.m_dep}</p>
                <p>Fabricante: ${obj.manufacturer}</p>
                <p>Peso (g): ${obj.mobile_wt}</p>
                <p>Modelo: ${obj.model}</p>
                <p>Número de núcleos do processador: ${obj.n_cores}</p>
                <p>Câmera Principal: ${obj.pc}</p>
                <p>Preço: ${obj.price_final}</p>
                <p>Altura da Resolução (px): ${obj.px_height}</p>
                <p>Largura da Resolução (px): ${obj.px_width}</p>
                <p>Memória RAM (Gb): ${obj.ram}</p>
                <p>Altura da tela (cm): ${obj.sc_h}</p>
                <p>Largura da tela (cm): ${obj.sc_w}</p>
                <p>Tempo de chamada (h): ${obj.talk_time}</p>
                <p>Possui 3G: ${obj.three_g ? 'Sim' : 'Não'}</p>
                <p>Tela sensível ao toque: ${obj.touch_screen ? 'Sim' : 'Não'}</p>
                <p>Possui Wifi: ${obj.wifi ? 'Sim' : 'Não'}</p>
                <button onclick="deleteMobile('${obj.model}')">Deletar</button>
            </div>
        <div>
    `;
}

const openModal = (id) => {
    const modal = document.getElementById(id);
    modal.style.opacity = 1;
    modal.style.zIndex = 3;
}

const closeModal = (id) => {
    if (id == "movie-modal"){
        readMode();
    }
    const modal = document.getElementById(id);
    modal.style.opacity = 0;
    modal.style.zIndex = -3;
}

////////////////////////////////////////////////////////////////////////////////////////////////
//Funções de API
const createNewMobile = async () => {
    const price_range_predicted = document.querySelector("#mobile-price-range-predicted").value;

    if(price_range_predicted.trim() != ""){
        const battery_power = document.querySelector("#mobile-battery-power").value
        const blue = document.querySelector(".mobile-blue:checked").value == 'S' ? true : false
        const clock_speed = document.querySelector("#mobile-clock-speed").value
        const dual_sim = document.querySelector(".mobile-dual-sim:checked").value == 'S' ? true : false
        const fc = document.querySelector("#mobile-fc").value
        const four_g = document.querySelector(".mobile-four-g:checked").value == 'S' ? true : false
        const int_memory = document.querySelector("#mobile-int-memory").value
        const m_dep = document.querySelector("#mobile-m-dep").value
        const manufacturer = document.querySelector("#mobile-manufacturer").value
        const mobile_wt = document.querySelector("#mobile-mobile-wt").value
        const model = document.querySelector("#mobile-model").value
        const n_cores = document.querySelector("#mobile-n-cores").value
        const pc = document.querySelector("#mobile-pc").value
        const price_final = document.querySelector("#mobile-price-final").value
        const px_height = document.querySelector("#mobile-px-height").value
        const px_width = document.querySelector("#mobile-px-width").value
        const ram = document.querySelector("#mobile-ram").value
        const sc_h = document.querySelector("#mobile-sc-h").value
        const sc_w = document.querySelector("#mobile-sc-w").value
        const talk_time = document.querySelector("#mobile-talk-time").value
        const three_g = document.querySelector(".mobile-three-g:checked").value == 'S' ? true : false
        const touch_screen = document.querySelector(".mobile-touch-screen:checked").value == 'S' ? true : false
        const wifi = document.querySelector(".mobile-wifi:checked").value == 'S' ? true : false
        const formData = new FormData();
    
        formData.append('battery_power', battery_power);
        formData.append('blue', blue);
        formData.append('clock_speed', clock_speed);
        formData.append('dual_sim', dual_sim);
        formData.append('fc', fc);
        formData.append('four_g', four_g);
        formData.append('int_memory', int_memory);
        formData.append('m_dep', m_dep);
        formData.append('manufacturer', manufacturer);
        formData.append('mobile_wt', mobile_wt);
        formData.append('model', model);
        formData.append('n_cores', n_cores);
        formData.append('pc', pc);
        formData.append('price_final', price_final);
        formData.append('price_range_predicted', price_range_predicted);
        formData.append('px_height', px_height);
        formData.append('px_width', px_width);
        formData.append('ram', (parseInt(ram) * 1024));
        formData.append('sc_h', sc_h);
        formData.append('sc_w', sc_w);
        formData.append('talk_time', talk_time);
        formData.append('three_g', three_g);
        formData.append('touch_screen', touch_screen);
        formData.append('wifi', wifi);
    
        if(allFieldsFilled(formData)){
            let url = 'http://127.0.0.1:5000/mobile';
            await fetch(url, {
                method: 'post',
                body: formData
            })
                .then(async (response) => {
                    if (!response.ok) {
                        const error = await response.json();
                        throw new Error(error.message);
                    }
                    alert("Celular adicionado");
                    getList();                    
                    closeModal("create-mobile");
                    document.querySelector("#mobile-battery-power").value = '';
                    document.querySelectorAll('.mobile-blue').forEach(radio => {
                        if (radio.value == '') {
                            radio.checked = true;
                        }
                    });
                    document.querySelector("#mobile-clock-speed").value = '';
                    document.querySelectorAll('.mobile-dual-sim').forEach(radio => {
                        if (radio.value == '') {
                            radio.checked = true;
                        }
                    });
                    document.querySelector("#mobile-fc").value = '';
                    document.querySelectorAll('.mobile-four-g').forEach(radio => {
                        if (radio.value == '') {
                            radio.checked = true;
                        }
                    });
                    document.querySelector("#mobile-int-memory").value = '';
                    document.querySelector("#mobile-m-dep").value = '';
                    document.querySelector("#mobile-manufacturer").value = '';
                    document.querySelector("#mobile-mobile-wt").value = '';
                    document.querySelector("#mobile-model").value = '';
                    document.querySelector("#mobile-n-cores").value = '';
                    document.querySelector("#mobile-pc").value = '';
                    document.querySelector("#mobile-price-final").value = '';
                    document.querySelector("#mobile-price-range-description").innerHTML = 'Nível do celular: Não foi predito';
                    document.querySelector("#mobile-price-range-predicted").value = '';
                    document.querySelector("#mobile-px-height").value = '';
                    document.querySelector("#mobile-px-width").value = '';
                    document.querySelector("#mobile-ram").value = ''; 
                    document.querySelector("#mobile-sc-h").value = '';
                    document.querySelector("#mobile-sc-w").value = '';
                    document.querySelector("#mobile-talk-time").value = '';
                    document.querySelectorAll('.mobile-three-g').forEach(radio => {
                        if (radio.value == '') {
                            radio.checked = true;
                        }
                    });
                    document.querySelectorAll('.mobile-touch-screen').forEach(radio => {
                        if (radio.value == '') {
                            radio.checked = true;
                        }
                    });
                    document.querySelectorAll('.mobile-wifi').forEach(radio => {
                        if (radio.value == '') {
                            radio.checked = true;
                        }
                    });
                    return response.json();
                })
                .catch((error) => {
                    showError(error);
                });
        }
    } else {
        alert("Favor colocar para prever antes de adicionar.")
    }
};

const predictPriceRange = async () => {
    
    const battery_power = document.querySelector("#mobile-battery-power").value
    const blue = document.querySelector(".mobile-blue:checked").value == 'S' ? true : false
    const clock_speed = document.querySelector("#mobile-clock-speed").value
    const dual_sim = document.querySelector(".mobile-dual-sim:checked").value == 'S' ? true : false
    const fc = document.querySelector("#mobile-fc").value
    const four_g = document.querySelector(".mobile-four-g:checked").value == 'S' ? true : false
    const int_memory = document.querySelector("#mobile-int-memory").value
    const m_dep = document.querySelector("#mobile-m-dep").value
    const mobile_wt = document.querySelector("#mobile-mobile-wt").value
    const model = document.querySelector("#mobile-model").value
    const n_cores = document.querySelector("#mobile-n-cores").value
    const pc = document.querySelector("#mobile-pc").value
    const px_height = document.querySelector("#mobile-px-height").value
    const px_width = document.querySelector("#mobile-px-width").value
    const ram = document.querySelector("#mobile-ram").value
    const sc_h = document.querySelector("#mobile-sc-h").value
    const sc_w = document.querySelector("#mobile-sc-w").value
    const talk_time = document.querySelector("#mobile-talk-time").value
    const three_g = document.querySelector(".mobile-three-g:checked").value == 'S' ? true : false
    const touch_screen = document.querySelector(".mobile-touch-screen:checked").value == 'S' ? true : false
    const wifi = document.querySelector(".mobile-wifi:checked").value == 'S' ? true : false

    const formData = new FormData();

    formData.append('battery_power', battery_power);
    formData.append('blue', blue);
    formData.append('clock_speed', clock_speed);
    formData.append('dual_sim', dual_sim);
    formData.append('fc', fc);
    formData.append('four_g', four_g);
    formData.append('int_memory', int_memory);
    formData.append('m_dep', m_dep);    
    formData.append('mobile_wt', mobile_wt);
    formData.append('n_cores', n_cores);    
    formData.append('pc', pc);    
    formData.append('px_height', px_height);
    formData.append('px_width', px_width);
    formData.append('ram', (parseInt(ram) * 1024));
    formData.append('sc_h', sc_h);
    formData.append('sc_w', sc_w);
    formData.append('talk_time', talk_time);
    formData.append('three_g', three_g);
    formData.append('touch_screen', touch_screen);
    formData.append('wifi', wifi);

    if(allFieldsFilled(formData)){
        let url = 'http://127.0.0.1:5000/mobilePredict';
        await fetch(url, {
            method: 'post',
            body: formData
        })
            .then(async (response) => {
                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.message);
                }
                const res = await response.json();
                alert("Custo do " + model + ": " + res.price_range_description);
                document.querySelector("#mobile-price-range-predicted").value = res.price_range_predicted;
                document.querySelector("#mobile-price-range-description").innerHTML = "Nível do celular: " + res.price_range_description;
                return res;
            })
            .catch((error) => {
                showError(error);
            });
    }
};

const deleteMobile = async (model) => {
    if (confirm("Deseja mesmo deletar?")) {
        let url = 'http://127.0.0.1:5000/mobile?model=' + model;
        await fetch(url, {
            method: 'DELETE'
        })
            .then(async (response) => {
                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.message);
                }
                alert("Celular deletado");
                closeModal("mobile-modal");
                getList();
            })
            .catch((error) => {
                showError(error);
            });
    }
}

const getList = async () => {
    let url = 'http://127.0.0.1:5000/mobiles';
    await fetch(url, {
        method: 'get',
    })
        .then((response) => response.json())
        .then((data) => {
            document.getElementById("mobiles").innerHTML = ""; //Para limpar o que tiver
            if (data.mobiles.length > 0){
                data.mobiles.forEach(mobile => {
                    generateAMobileComponent(mobile);
                });
            } else {
                document.getElementById("mobiles").innerHTML = "<div id='no-data'><p>Não tem nenhum celular cadastrado!</p></div>";
            }
        })
        .catch((error) => {
            showError(error);
        });
};

const showMobile = async (model) => {
    let url = 'http://127.0.0.1:5000/mobile?model=' + model;
    debugger;
    await fetch(url, {
        method: 'get',
    })
        .then((response) => response.json())
        .then((data) => {
            openMobile(data);
        })
        .catch((error) => {
            showError(error);
        });
}

////////////////////////////////////////////////////////////////////////////////////////////////
//Funções génericas
const showError = (error) => {
    alert("Não foi possível pois ocorreu o seguinte erro: " + error.message);
    console.error(error);
};

// Função para verificar se todos os valores no FormData possuem valor
function allFieldsFilled(formData) {
    for (let [key, value] of formData.entries()) {
        if (!value || value === '') {
            alert(`${key} está vazio.`);
            return false;
        }
    }
    return true;
}

////////////////////////////////////////////////////////////////////////////////////////////////
//Funções para rodar após carregar a árvore DOM
document.addEventListener('DOMContentLoaded', function () {
    generateAllRightsText();
    getList();    
});
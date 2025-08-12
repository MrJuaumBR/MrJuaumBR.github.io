/*
UPDATE: 15/04/24
Show Bar adicionada;
Texto de dica alterado;
otimização geral.
::::: Atualmente: FUNCIONANDO. :::::

COMO INSTALAR O CHEAT?
1- Abra o site;
2- Abra o curso;
3- Cole este código(Dentro da 2ªAba do consoloe ex: top -> 40000);
4- Pressione enter do Numpad;
5- Bom uso.

Controles:
Numpad Minus -> Esconder/mostrar GUI;
Numpad Enter -> Skip Frames;

AVISOS:
o máximo de frames que pode-se pular por clique é 40;
A Tecla "Menos" do numpad é usada para esconder/mostar o GUI;
Não Abuse deste script;
As vezes pode bugar, então quando acontecer pode ser necessário recarregar a página.

DICA:
ao pular uma vez, para diminuir as chances de ser necessário um carregamento(a tela de carregando) espere 1 frame...

COMO USAR A SCRIPT DE VIDEO:
1- Abra o video e pause;
2- Selecione a seta do Insepcionar e clique no player;
3- Abra no console;
4- Cole o script;
5- Veja o vídeo indo a 10x;
*/


var contadorBug = 0;
var cheatActive = false;
var cheatOppen = false;
var showBarOn = true;

function nextMoment2(event) {
    if ($(".present .fragment.current-fragment").next(".fragment").length == 0 && $("section.present").next("section").length == 0) {

        let ultimoIndex = parseInt($($(".slides section").get().reverse()).first().attr("data-index-momento")) + 1 || 0;

        if (Reveal.isLastSlide() && ultimoIndex >= totalMomentos) {

            HoldOn.open({
                theme: "custom",
                content: `<div class="conteudo-loader">
                            <div class="lds-dual-ring"></div>
                             <div class="texto-loader pulsate final"><br/>${iframeAva ? parent.window.GetResourceString("EncerrandoPlayerAutoria") : GetResourceString("EncerrandoPlayerAutoria")}</div>
                            <div>`,
                backgroundColor: "#fff",
                textColor: "#1e273b",
                localLoader: 'body',
            });

            setTimeout(function () {
                if (window.ReactNativeWebView) {
                    let Final = {
                        tipo: 'finaliza',
                    };
                    window.ReactNativeWebView.postMessage(JSON.stringify(Final));
                } else {
                    removeCheckPoint();
                    let isAval = totalMomentAvals > 0;
                    let nota = isAval ? (totalMomentAvalCorrect / totalMomentAvals) * 100 : "";

                    RegistrarFinal({ isAval: isAval, nota: nota });
                }
            }, 1000)
        }

        return false;
    } else {

        verifyCacheFutureMoments();

        if (window.ReactNativeWebView) {
            //Desativa Swipe React Native e Mostra animação swipe.
            let ControleReact = {
                tipo: "controleSwipe",
                enabled: false,
            };

            window.ReactNativeWebView.postMessage(JSON.stringify(ControleReact));
        }

        verificaProximoAudioMomento(); //irá verificar se existe algum audio em andamento e irá pausá-lo
        verificaProximoVideoMomento(); //irá verificar se existe algum video em andamento e irá pausá-lo

        if ($(".present .fragment.current-fragment").next(".fragment").length == 0) {
            sectionAtual++;
        }

        nextDuplicado = true;
        Reveal.next();

        removeMomentPast();
        atualizaNumeroMomento();
        alteraMomento();
        carregaSeta();

        if ($("[id*='AtividadeConstrutor']").length != 0) {
            var objeto = $("[id*='AtividadeConstrutor']");
            $('.final').remove();
            if (contadorBug <= 0) {
                inicializarAtividade(objeto, atividade);
            }
            contadorBug++;
        }

        loadingFutureMoments();
    }
}
function checkCheat(){
    console.log("Checando.");
    if (window.location.hostname =="app.easyupeducacao.com.br"){
        if (document.getElementById("cheat_Background")){
            document.getElementById("cheat_Background").remove();
            if (document.getElementById("c-showbar")){
                document.getElementById("c-showbar").remove();
            }
            alert("Cheat já estava ativo, deletado e reativando.");
            console.log("Deletado.");
            return true;
        }
        else{
            console.log("Tudo Ok.");
            return true;
        }
    }
    else{
        alert("Este script foi desenvolvido para outro site.");
        console.log("Site incorreto.");
        return false;
    };
}

/* Video Script */
const VideoScript ="document.getElementsByTagName('video')[0].playbackRate = 10;";

function setupCheat(){
    if (checkCheat()){
        /* Build GUI */
        const divFor = document.createElement("div");

        /* GUI Back Style */
        divFor.style.position = "fixed";
        divFor.style.left = "0%";
        divFor.style.top = "0%";
        divFor.style.zIndex = "999999";
        divFor.style.backgroundColor = "#282837";
        divFor.style.visibility = "visible";
        divFor.setAttribute('id','cheat_Background');
        /* Show frames */
        const showFrm = document.createElement("span");
        showFrm.textContent = "5/40";
        showFrm.style.color = "white";

        /* Input for frames */
        const inp = document.createElement("input");
        inp.style.display = "inline-block";
        inp.setAttribute("type","number")
        inp.setAttribute('id','quantity_frame');
		    inp.style.zIndex = "9999";
        inp.style.color = "black";
        inp.setAttribute('placeholder','1,5,10,15,25');
        inp.type = "number";
        inp.value = 5;
        inp.style.width = "40%";
        inp.addEventListener('change',function(){
            if (inp.value > 41){
                inp.value = 40;
            }
            else{
                if (inp.value < 1){
                    inp.value =1;
                };
            };
            showFrm.textContent = inp.value + "/40";

        });

        /* Trigger button */
        const btn = document.createElement('button');
        btn.style.display = "inline-block";
        btn.textContent = "Skip";
        /* Text */
        const text = document.createElement("span");
        text.style.display = "inline-block";
        text.textContent = "Cheat ON, ";    
        text.style.color = "white";
        text.style.fontSize = "10px";

        /* Warn in text */
        const text2 = document.createElement("span");
        text2.style.color = "red";
        text2.textContent = "Recomendação: use no maximo 10 frames.";
        text2.style.fontSize = "10px";
        text.appendChild(text2);
        
        /* text */
        const text3 = document.createElement("span");
        text3.style.color = "white";
        text3.textContent = "Para saber como usar, acesse o github do script."
        text3.style.fontSize = "10px";
        text3.style.display = "inline-block";        
        
        /* Showbar Check box */
        const chkbox = document.createElement("input");
        chkbox.style.display = "inline-block";
        chkbox.type = "checkbox";
        chkbox.id = "showBarOn";
        chkbox.value = `${showBarOn}`;
        chkbox.addEventListener('change',function(){
            if (this.checked){
                showBarOn = true;
                showbar.style.visibility = "visible";
            }
            else{
                showBarOn = false;
                showbar.style.visibility = "hidden";
            }
        });

        /* Copy Video Script */
        const video_copy = document.createElement("button");
        video_copy.style.display = "inline-block";
        video_copy.textContent = "Copy Video Script";
        video_copy.style.fontSize = "10px";

        /* Pastebin input */
        const inp2 = document.createElement('input');
        inp2.style.display= "inline-block";
        inp2.value = "pastebin.com/raw/zGULXWer";
        inp2.style.color = "black";
        inp2.style.width = "100%";
        inp2.style.zIndex = "9999";
        inp2.style.fontSize = "10px";
        inp2.disabled = true;
        inp2.type = "url";

        /* ShowBar */
        const showbar = document.createElement('div');
        showbar.style.width = "10em";
        showbar.style.height = "3em";
        showbar.style.zIndex = "99999";
        showbar.style.position = "fixed";
        showbar.style.display = "inline";
        showbar.style.top = "0";
        showbar.style.left = "0";
        showbar.style.margin = "5px";
        showbar.style.backgroundColor = "#007bff";
        showbar.style.padding = "5px";
        showbar.setAttribute('id',"c-showbar");

        const showBtn = document.createElement('button');
        showBtn.style.display = 'inline-block';
        showBtn.textContent = "Show";
        showBtn.style.fontSize = "10px";
        showBtn.style.position = "relative";

        const activeBtn = document.createElement('button');
        activeBtn.style.display = 'inline-block';
        activeBtn.textContent = "Skip";
        activeBtn.style.fontSize = "10px";
        activeBtn.style.position = "relative";
        btn.setAttribute('id',"cheat_btn2");


        showbar.appendChild(showBtn);
        showbar.appendChild(activeBtn);
            
        /* Hide Button */
        const hdBtn = document.createElement('button');
        hdBtn.style.display = "inline-block";
        hdBtn.textContent = "Hide";
        hdBtn.style.fontSize = "10px";
        
        /* Append Input and button to back */
        divFor.appendChild(showFrm);
        divFor.appendChild(inp);
        divFor.appendChild(btn);
        divFor.appendChild(document.createElement('br'));
        divFor.appendChild(text);
        divFor.appendChild(document.createElement('br'));
        divFor.appendChild(text3);
        divFor.appendChild(document.createElement('br'));
        divFor.appendChild(video_copy);
        divFor.appendChild(document.createElement('br'));
        divFor.appendChild(inp2);
        divFor.appendChild(document.createElement('br'));
        divFor.appendChild(hdBtn);
        divFor.appendChild(document.createElement('br'));
        divFor.appendChild(chkbox);
        divFor.append('Show Bar?');


        /* Append Back to Body */
        document.body.appendChild(divFor);
        document.body.append(showbar);

        /* Warn end of gui build*/
        console.log("Gui Build");

        btn.setAttribute('id','cheat_btn');
        btn.setAttribute('onclick',"clickcheat_btn()");
        activeBtn.setAttribute('onclick',"clickcheat_btn()");
        video_copy.setAttribute('onclick',"copyToClipboard()");
        hdBtn.setAttribute('onclick',"hideMenu()");
        showBtn.setAttribute('onclick',"showMenu()");
        
        cheatActive = true;
        cheatOppen = true;
        alert("Para esconder/mostrar o menu, aperte a tecla Menos do Numpad.");
        console.log("All Setupped");
    };
}

function hideMenu(){
    const bg = document.getElementById("cheat_Background");
    const showbar = document.getElementById("c-showbar");
    cheatOppen = false;
    bg.style.visibility= "hidden";
    console.clear();
    console.log("Hide");
    if (showBarOn){
	showbar.style.visibility = "visible";
    };	
}

function showMenu(){
    const bg = document.getElementById("cheat_Background");
    const showbar = document.getElementById("c-showbar");
    cheatOppen = false;
    bg.style.visibility= "visible";
    console.clear();
    console.log("Show");
    if (showBarOn){
	showbar.style.visibility = "hidden";
    };	
}

function copyToClipboard(){
    navigator.clipboard.writeText(VideoScript);
    alert("Texto copiado!");
}

function clickcheat_btn(){
        const inp = document.getElementById("quantity_frame");
        nextTime = nextMoment2;
        if (inp.value > 41){
            inp.value = 40;
        };
        for (i = 0; i < inp.value; i++){
            nextTime();
            console.log(i + "...");
        };
        console.log("Ended");
}

document.onkeypress = function (e) {
    e = e || window.event;
    const bg = document.getElementById("cheat_Background");
    const showbar = document.getElementById("c-showbar");
    if (cheatActive && e.code == "NumpadSubtract"){
        if (cheatOppen){
            bg.style.visibility = "hidden";
            cheatOppen = false;
            console.clear();
            console.log('Hide');
	    if (showBarOn){
		showbar.style.visibility = "visible";
	    };
        }
        else{
            bg.style.visibility = "visible";
            cheatOppen = true;
            console.clear();
            console.log("Show");
	    if (showBarOn){
		showbar.style.visibility = "visible";
	    };
        };
    }
    else{
        if (cheatActive && e.code == "NumpadEnter"){
            clickcheat_btn();
        };
    };
};
setupCheat();

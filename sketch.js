let t = [];
let cantidad = 16;
let nombre;


let estado = "grosor"; //grosor, ubicacion, paleta, color
let transicionColor = false;
let monitorear = false;

let cuantosCirculos = 23;

let ubicaciones = [];
let xyi = [];
let cambiarUbicaciones = 0;

let unGrosor = 0;
let gros = 7; //Rango entre 7 y 20
let grosores = [];
let guardarGrosores = [];

let pta = "unColor"; //unColor, monoCromo o variada
let cuantosColores;

let col;
let sat;
let bri;
let setColores = [];
let setTonos = [];
let setBrillos = [];
let setSaturaciones = [];
let colores = [];
let randomColores = [];
let cambiarColores = 0;
let cambiarPaleta = 0;

let marcaEnElTiempo;
let tiempoLimiteGrosor = 8000;
let tiempoLimiteUbicacion = 8000;
let tiempoLimitePaleta = 8000;
let tiempoLimiteColor = 15000;
let ahora;

let tiempoRestante = tiempoLimiteGrosor; // El tiempo inicial es el límite para el estado de "grosor"
let tiempoInicio; // Almacena el tiempo en milisegundos cuando se inicia cada estado

let tiempoTranscurrido;
let segundosRestantes;
let bandera1, bandera2, bandera3, bandera4;


//let tiempoReinicio = 3000;

/*------------------------------ SONIDO -----------------------------*/

let audioContext;

//----CONFIGURACION-----
let AMP_MIN = 0.015; // umbral mínimo de sonido qiu supera al ruido de fondo
let AMP_MAX = 0.25; // amplitud máxima del sonido
let PIT_MIN = 50;
let PIT_MAX = 80;

let AMORTIGUACION = 0.8; // factor de amortiguación de la señal

//----MICROFONO----
let mic;

//-----AMPLITUD-----
let amp; // variable para cargar la amplitud (volumen) de la señal de entrada del mic
let ampMapeada;

//-----PITCH-----
let pitch;
let pit;
let pitMapeada;

//----GESTOR----
let gestorAmp;
let gestorPitch;

let haySonido;
let antesHabiaSonido; // memoria del estado de "haySonido" un fotograma atrás
let inicioElSonido;
let finDelSonido;

const model_url = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';

function setup() {
  createCanvas(1400, 600, WEBGL);
  background(220);

  /*------------------------------ SONIDO -------------------------*/
 
  //----MICROFONO-----
  audioContext = getAudioContext();
	mic = new p5.AudioIn();
  mic.start( startPitch );

  //----GESTOR----
  gestorAmp = new GestorSenial(AMP_MIN, AMP_MAX); // inicilizo en gestor con los umbrales mínimo y máximo de la señal
  gestorPitch = new GestorSenial( PIT_MIN , PIT_MAX );

  gestorAmp.f = AMORTIGUACION;
  gestorPitch.f = AMORTIGUACION;

  //------MOTOR DE AUDIO-----
  userStartAudio(); // esto lo utilizo porque en algunos navigadores se cuelga el audio. Esto hace un reset del motor de audio (audio context)

  /*-------------------------------- FIN SONIDO --------------------*/

  
  /*------------------------ PRIMER SETEO DE VARIABLES ------------------------ */

  //GROSOR
  for(i=0;i<cuantosCirculos;i++){
    guardarGrosores[i] = random(7,20);
  } 

  //UBICACION
  for(i=0;i<(cantidad*cuantosCirculos);i++){
      ubicaciones[i] = random(70,100);
      xyi[i] = random(10,100);
    }

  //COLOR
  colorMode(HSB,255,255,255);
  cuantosColores = int(random(3,5));


  for(i=0;i<cuantosColores;i++){
    setTonos[i] = int(random(255));
    setBrillos[i] = int(random(30,220));
    setSaturaciones[i] = int(random(150,220));
  }
  setColores[0] = color(0, 200, 220);

  for(i=0;i<cuantosCirculos;i++){
    colores[i] = random(setColores);
  }

  for(i=0;i<(cantidad*cuantosCirculos);i++){
    randomColores[i] = random(colores);   
  }
 
  //Construimos los triangulos
  for(i=0;i<cantidad;i++){
    nombre = "img"+i;
    t.push (new Triangulo(nombre));    
  } 

  tiempoInicio = millis();
  bandera1=true;
  bandera2=true;
  bandera3=true;
  bandera4=true;
}


function draw() {      

  /*-------------------------- SONIDO --------------------------*/
  gestorAmp.actualizar(mic.getLevel());  

  amp = gestorAmp.filtrada; 
  //console.log(amp);

  gestorPitch.actualizar(mic.getLevel());  

  pit = gestorPitch.filtrada;
  //console.log("pit " + pit); 

 //mido por el umbral si hay o no sonido
 haySonido = gestorAmp.filtrada>0.15;
 //comparando el pasado con el presente
 //decido que el sonido inició ahora
 inicioElSonido = haySonido && !antesHabiaSonido;
 //comparando el pasado con el presente
 //decido que el sonido finalizó ahora
 let finDelSonido = !haySonido && antesHabiaSonido;

 //console.log("segundosRestantes " + segundosRestantes);
 //console.log("tiempoTranscurrido " + tiempoTranscurrido);
 console.log("tiempoInicio " + tiempoInicio);


 /*------------------------------ ESTADOS ---------------------------- */
  
  if(estado == "grosor"){
    document.getElementById('estado').textContent = estado;
    //document.getElementById('paleta').textContent = pta;
    document.getElementById('descripcion').textContent = "Modulá la amplitud de tu voz para generar distintos grosores";
    document.getElementById('tiempo').textContent = tiempoRestante;
    
    
    if(haySonido){
      if(amp >= 0.15){
        unGrosor = 0;
      } else {
        unGrosor = 1;
      }       
    }          
    
      tiempoTranscurrido = millis() - tiempoInicio;
      tiempoRestante = tiempoLimiteGrosor - tiempoTranscurrido;

      // Mostrar tiempo restante en la pantalla
      segundosRestantes = Math.ceil(tiempoRestante / 1000); // Redondear hacia arriba los segundos restantes
      document.getElementById('tiempo').textContent = segundosRestantes;

      setTimeout(function() {
        estado = "ubicacion";       
        tiempoRestante = tiempoLimiteUbicacion;        
        inicioElSonido = false;
      }, tiempoLimiteGrosor);       


  } else if (estado == "ubicacion"){ 

    if(bandera1){
      tiempoInicio = millis();
      bandera1 = false;
    }

    document.getElementById('estado').textContent = estado;
    //document.getElementById('paleta').textContent = pta;
    document.getElementById('descripcion').textContent = "Mientras hagas algún sonido, las ubicaciones van a cambiar";
    document.getElementById('tiempo').textContent = tiempoRestante;


    if(haySonido){
        cambiarUbicaciones = 1;
      } else {
        cambiarUbicaciones = 0;
      }

      tiempoTranscurrido = millis() - tiempoInicio;
      tiempoRestante = tiempoLimiteUbicacion - tiempoTranscurrido;

      // Mostrar tiempo restante en la pantalla
      segundosRestantes = Math.ceil(tiempoRestante / 1000); // Redondear hacia arriba los segundos restantes
      document.getElementById('tiempo').textContent = segundosRestantes;
    
      //if(inicioElSonido){
        setTimeout(function() {
          estado = "paleta";
          inicioElSonido = false;
        }, tiempoLimiteUbicacion);
     // }   
    

      
  } else if (estado == "paleta"){

    if(bandera2){
      tiempoInicio = millis();
      bandera2 = false;
    }

    document.getElementById('estado').textContent = estado;
    document.getElementById('descripcion').textContent = "Modulá la altura de tu voz para cambiar de paleta";
    //document.getElementById('paleta').textContent = pta;
   
    if(pit >= 0 && pit < 0.1){
      pta = "unColor";
    } else if (pit >= 0.1 && pit < 0.2){
      pta = "monoCromo";
    } else if (pit >= 0.2){
      pta = "variada";
    }

    tiempoTranscurrido = millis() - tiempoInicio;
    tiempoRestante = tiempoLimitePaleta - tiempoTranscurrido;

    // Mostrar tiempo restante en la pantalla
    segundosRestantes = Math.ceil(tiempoRestante / 1000); // Redondear hacia arriba los segundos restantes
    document.getElementById('tiempo').textContent = segundosRestantes;

    //if(inicioElSonido){
      setTimeout(function() {
        estado = "colores";
        inicioElSonido = false;
      }, tiempoLimitePaleta);
    //} 
       
   
  } else if (estado == "colores"){

    if(bandera3){
      tiempoInicio = millis();
      bandera3 = false;
    }

    document.getElementById('estado').textContent = estado;
    //document.getElementById('paleta').textContent = pta;
    document.getElementById('descripcion').textContent = "Modulá la altura de tu voz para variar la/s tonalidad/es de tu paleta";

    tiempoTranscurrido = millis() - tiempoInicio;
    tiempoRestante = tiempoLimiteColor - tiempoTranscurrido;

    // Mostrar tiempo restante en la pantalla
    segundosRestantes = Math.ceil(tiempoRestante / 1000); // Redondear hacia arriba los segundos restantes
    document.getElementById('tiempo').textContent = segundosRestantes;

    //if(inicioElSonido){
      setTimeout(function() {
        estado = "fin";
      }, tiempoLimiteColor);
   // } 

    
  }  else if (estado == "fin"){
    document.getElementById('estado').textContent = estado;
    document.getElementById('descripcion').textContent = "El resultado se guardará en descargas. Recargá la página para reiniciar";

    if(bandera4){
      save("resultado"+frameCount+".jpg");
      bandera4 = false;
    }
    

  }
  
  //console.log(estado);
   /*------------------- ACTUALIZAR VARIABLES ------------------*/
   setearGrosores();   
   setearUbicaciones(); 
   setearPaleta();  
   setearColores(); 
  
  /*----------------- DIBUJO -------------------*/
    
      for(i=0;i<cantidad;i++){     
          
        t[i].actualizar(cantidad,cuantosCirculos,grosores,ubicaciones,xyi,randomColores); 
        t[i].dibujar();       
      }    

      if( monitorear ){
        push();
        colorMode(RGB);
        gestorAmp.dibujar( 325 , -100 );
        gestorPitch.dibujar( 320 , 100 );
        pop(); 
      }

    antesHabiaSonido = haySonido; // guardo el estado del fotograma anteior    
}

function setearPaleta(){

  if(estado == "paleta"){   

    if(pta == "unColor"){
        setColores[0] = color(255, 200, 220); 

        for(i=0;i<cuantosCirculos;i++){
          colores[i] = setColores[0];
        }
    } else if (pta == "monoCromo"){
        for(i=0;i<cuantosColores;i++){
          setColores[i] = color(255,setSaturaciones[i],setBrillos[i]);
        }
      
        for(i=0;i<cuantosCirculos;i++){
          colores[i] = random(setColores);
        }
    } else if (pta == "variada"){
        for(i=0;i<cuantosColores;i++){
          setColores[i] = color(setTonos[i],180,200);
        }

        for(i=0;i<cuantosCirculos;i++){
          colores[i] = random(setColores);
        }
    }
    for(i=0;i<(cantidad*cuantosCirculos);i++){
      randomColores[i] = random(colores);   
    }
  } 
}

function setearColores(){

  if(estado == "colores"){
    if(pta == "unColor"){   
        pitMapeada = map(pit,0,1,0,500);     
        setColores[0] = color(pitMapeada, 200, 220); 
            
  
      for(i=0;i<cuantosCirculos;i++){
        colores[i] = setColores[0];
      }
  
    } else if (pta == "monoCromo") {

      pitMapeada = map(pit,0,1,0,500);
        for(i=0;i<cuantosColores;i++){
          setColores[i] = color(pitMapeada,setSaturaciones[i],setBrillos[i]);
        }
        
          for(i=0;i<cuantosCirculos;i++){
            colores[i] = random(setColores);
          }
               
  
      } else if (pta == "variada"){

        pitMapeada = map(pit,0,1,0,500);
          for(i=0;i<cuantosColores;i++){
            setColores[i] = color(setTonos[i]+(pitMapeada/2),180,200);
          }
  
          for(i=0;i<cuantosCirculos;i++){
            colores[i] = random(setColores);
          }
        }         
  
          for(i=0;i<(cantidad*cuantosCirculos);i++){
            randomColores[i] = random(colores);   
          }
         
  } 

}    

function setearGrosores(){
  
  if(estado == "grosor") {
    if(unGrosor == 1){
          gros = map(amp,0,1,7,15);
          for(i=0;i<cuantosCirculos;i++){
            grosores[i] = gros;      
          }
      
        } else if(unGrosor == 0){
          for(i=0;i<cuantosCirculos;i++){
            grosores[i] = guardarGrosores[i];
          }    
          for(i=0;i<cuantosCirculos;i++){
            gros = map(amp,0,1,1,3);
            grosores[i] = (grosores[i]*amp*(gros/2)+2);
          }     
      }
  }     
}

function setearUbicaciones(){
  
  if (estado == "ubicacion"){
    if(cambiarUbicaciones == 1){
          for(i=0;i<(cantidad*cuantosCirculos);i++){
            ubicaciones[i] = random(70,100);
            xyi[i] = random(10,100);
          }
        }  
  }     
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
//--------------------------------------------------------------------
function startPitch() {
  pitch = ml5.pitchDetection(model_url, audioContext , mic.stream, modelLoaded);
}
//--------------------------------------------------------------------
function modelLoaded() {
//select('#status').html('Model Loaded');
getPitch();
//console.log( "entro aca !" );

}
//--------------------------------------------------------------------
function getPitch() {
  pitch.getPitch(function(err, frequency) {
  if (frequency) {    	
    let midiNum = freqToMidi(frequency);
    //console.log( midiNum );

    gestorPitch.actualizar( midiNum );

  }
  getPitch();
})
}
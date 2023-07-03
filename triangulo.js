let j = 0;

class Triangulo{

    constructor(nombre){
        
        this.nombreTextura = nombre;

        this.pgraphics = createGraphics(600, 600);   
    }

    actualizar(cantidad,cuantosCirculos,grosores,ubicaciones,xyi,randomColores){
        this.pgraphics.background(220);
      
        for(let i = 0 ; i<cuantosCirculos ; i++){
                        
           
            this.pgraphics.stroke(randomColores[j]);            
                                       
            this.pgraphics.strokeWeight(grosores[i]);
            this.pgraphics.noFill();
            this.pgraphics.ellipse(300, 300, xyi[j]+1*i*ubicaciones[j], xyi[j]+1*i*ubicaciones[j]);

            j++;

            if(j == cuantosCirculos*cantidad){
                j = 0;
            }
        }
    }

    dibujar(){          

        texture(this.pgraphics);
        this.texturizar(this.nombreTextura);

    }

        
        texturizar(){

        this.corrX=300;
        this.corrY=300;
        

        textureMode(NORMAL);
    

        if(this.nombreTextura === "img1"){
           
            beginShape();
            vertex(-this.corrX, 300-this.corrY, 0, 0.5);
            vertex(150-this.corrX, 150-this.corrY, 0.25, 0.25); 
            vertex(300-this.corrX, 300-this.corrY, 0.5, 0.5);             
            endShape();

           
        } else if(this.nombreTextura === "img2"){
            
            beginShape();
            vertex(150-this.corrX, 150-this.corrY, 0.25, 0.25); 
            vertex(300-this.corrX, -this.corrY, 0.5, 0);
            vertex(300-this.corrX, 300-this.corrY, 0.5, 0.5);            
            endShape();           

        } else if(this.nombreTextura === "img3"){
             
            beginShape();
            vertex(-this.corrX, -this.corrY, 0, 0);
            vertex(300-this.corrX, -this.corrY, 0.5, 0);
            vertex(150-this.corrX, 150-this.corrY, 0.25, 0.25);           
            endShape();

        } else if(this.nombreTextura === "img4"){
             
            beginShape();
            vertex(-this.corrX, -this.corrY, 0, 0);
            vertex(150-this.corrX, 150-this.corrY, 0.25, 0.25);
            vertex(-this.corrX, 300-this.corrY, 0, 0.5);             
            endShape();
          

        } else if(this.nombreTextura === "img5") {
              
            beginShape();
            vertex(150-this.corrX, 450-this.corrY, 0.25, 0.75);
            vertex(300-this.corrX, 300-this.corrY, 0.5, 0.5); 
            vertex(300-this.corrX, 600-this.corrY, 0.5, 1);  
            endShape();

        } else if(this.nombreTextura === "img6") {

            beginShape();
            vertex(-this.corrX, 600-this.corrY, 0, 1);
            vertex(150-this.corrX, 450-this.corrY, 0.25, 0.75); 
            vertex(300-this.corrX, 600-this.corrY, 0.5, 1); 
            endShape();

        } else if(this.nombreTextura === "img7") {

            beginShape();
            vertex(-this.corrX, 300-this.corrY, 0, 0.5);
            vertex(150-this.corrX, 450-this.corrY, 0.25, 0.75);   
            vertex(-this.corrX, 600-this.corrY, 0, 1);
            endShape();

        } else if(this.nombreTextura === "img8") {

            beginShape();
            vertex(-this.corrX, 300-this.corrY, 0, 0.5);
            vertex(150-this.corrX, 450-this.corrY, 0.25, 0.75);   
            vertex(300-this.corrX, 300-this.corrY, 0.5, 0.5);
            endShape();

        } else if(this.nombreTextura === "img9") {

            beginShape();
            vertex(300-this.corrX, 0-this.corrY, 0.5, 0);
            vertex(450-this.corrX, 150-this.corrY, 0.75, 0.25);  
            vertex(300-this.corrX, 300-this.corrY, 0.5, 0.5);
            endShape();

        } else if(this.nombreTextura === "img10") {

            beginShape();
            vertex(300-this.corrX, 300-this.corrY, 0.5, 0.5);
            vertex(450-this.corrX, 150-this.corrY, 0.75, 0.25); 
            vertex(600-this.corrX, 300-this.corrY, 1, 0.5);
            endShape(); 

        } else if(this.nombreTextura === "img11") {

            beginShape();
            vertex(600-this.corrX, 300-this.corrY, 1, 0.5);
            vertex(600-this.corrX, -this.corrY, 1, 0);
            vertex(450-this.corrX, 150-this.corrY, 0.75, 0.25);
            endShape();

        } else if(this.nombreTextura === "img12") {

            beginShape();
            vertex(600-this.corrX, -this.corrY, 1, 0);
            vertex(300-this.corrX, -this.corrY, 0.5, 0);
            vertex(450-this.corrX, 150-this.corrY, 0.75, 0.25);
            endShape();

        } else if(this.nombreTextura === "img13") {

            beginShape();
            vertex(300-this.corrX, 300-this.corrY, 0.5, 0.5);
            vertex(600-this.corrX, 300-this.corrY, 1, 0.5);  
            vertex(450-this.corrX, 450-this.corrY, 0.75, 0.75);
            endShape();

        } else if(this.nombreTextura === "img14") {

            beginShape();
            vertex(450-this.corrX, 450-this.corrY, 0.75, 0.75);
            vertex(600-this.corrX, 300-this.corrY, 1, 0.5);  
            vertex(600-this.corrX, 600-this.corrY, 1, 1);
            endShape();
            
        } else if(this.nombreTextura === "img15") {

            beginShape();
            vertex(450-this.corrX, 450-this.corrY, 0.75, 0.75);
            vertex(600-this.corrX, 600-this.corrY, 1, 1);
            vertex(300-this.corrX, 600-this.corrY, 0.5, 1);  
            endShape();

        } else if(this.nombreTextura === "img0") {
            beginShape();
            vertex(300-this.corrX, 300-this.corrY, 0.5, 0.5);
            vertex(450-this.corrX, 450-this.corrY, 0.75, 0.75);
            vertex(300-this.corrX, 600-this.corrY, 0.5, 1); 
            endShape();

        }        
        
    }    

}

   

 

    

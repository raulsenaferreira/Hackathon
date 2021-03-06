$(function(){
    var map;
    var poligono;
    var coordenadas = "";
    var vetorCoordenadas;
    var heatmap;
    var geocoder;
    var controls;
    var mapLayers;
    var KMLlayers;
    var idebBrasil;
    var idhmArray;
    var escolas;
    var enem;
    
});

// Carrega o 1º mapa
function init() {
    criaMapa();
}


// botão de nova busca
function novaBusca(){
    $('#map').html("");
    criaMapa();
}
   
//inserindo pontos no mapa
function drawMapaEscolas() {
var poi = new OpenLayers.Layer.Markers( "Markers" ),
        size = new OpenLayers.Size(15,15),
        offset = new OpenLayers.Pixel(-(size.w/2), -size.h),
        icon = new OpenLayers.Icon('scripts/img/marker.png',size, offset);
	escolas = getEscolas();
criaMapa();
   
        $.each(escolas , function(i){
            //atributos JSON
            latitude = escolas[i].ID_LATITUDE;
            longitude = escolas[i].ID_LONGITUDE;
            var urlGoogle = "https://maps.google.com.br/maps?q="+latitude+","+longitude;
            var nome = escolas[i].Nome;
            var localizacao = escolas[i].Localizacao;
            var rede = escolas[i].Rede;
            var municipio = escolas[i].Municipio;
            
            //marcador (pontos)
            poi.addMarker(new OpenLayers.Marker(new OpenLayers.LonLat(longitude, latitude).transform('EPSG:4326', 'EPSG:3857'),icon.clone()));
            console.log("ok!!");
            poi.events.register(
                'mousemove', 
                poi, 
                function(evt) {
                
                    link = '<a href="'+urlGoogle+'" target="_blank"></a>';
                    idElemento = this.markers[i].icon.imageDiv.attributes[0].nodeValue;
                    elemento = $("#"+idElemento+" img");
                    
                    if ($("#"+idElemento+" a").length){
                        //console.log("já tem link");
                    }
                    else{
                        $(elemento).wrap(link);
                        $(elemento).addClass("imagem");
                        $(elemento).attr('data-title', nome);
                        $(elemento).attr('data-html',true);
                        $(elemento).attr('data-trigger',"hover");
                        $(elemento).attr('data-delay',"{show: 500, hide: 100}"); 
                        $(elemento).attr('data-placement',"left");
                        $(elemento).attr('data-content',municipio+'<br>'+rede+'<br>'+localizacao);
                        $(elemento).css("height","15px");
                        $(elemento).css("width","15px");
                        $(".imagem").popover();
                        OpenLayers.Event.stop(evt); 
                    }
                }
            );            
        });
        
    

    mapLayers[mapLayers.length] = poi;
    map.addLayers(mapLayers);
}

// envia polígono desenhado por AJAX para a classe de consulta ao BD.
function enviaDados() {
    $('#map').html('');
    preencheCamposCoordenadas();
    var dados = 'poligono='+$('#poligono').val()+'&submitted='+$('#submitted').val(); 

    $.ajax({                 
        type: 'POST',                 
        //dataType: 'json',                 
        url: 'consultaPoligono.php',                 
        async: true,                 
        data: dados,                 
        success: function(response) {
            $("#pontos").attr('value',response);
            carregaPontosMapa();                 
        }             
    });       
}

// Carrega os pontos retornados do banco no 2º mapa
function carregaPontosMapa() {

    var multuPolygonGeometry,
        multiPolygonFeature,
        isPolygon,
        ultimoPoligono,
        coordenadasDesenhadas,
        tCoordenadas,
        patternPolygon = /POLYGON(?=.)/, 
        polygonList = [],
        pointList = [],
        multipolygon = [],
        poligonoPostGis = $('#poligono').val(),
        source = new Array(), 
        arrayDeCoord = new Array(), 
        vector = new OpenLayers.Layer.Vector('multiPolygon'),
        poi = new OpenLayers.Layer.Markers( "Markers" ),
        size = new OpenLayers.Size(15,15),
        offset = new OpenLayers.Pixel(-(size.w/2), -size.h),
        icon = new OpenLayers.Icon('scripts/img/marker.png',size, offset);

    criaMapa();

    tCoordenadas = $("#pontos").val();
    
    //separação em 2 arrays, um pros pontos outro pros pdf's
    var arrayPontoPDF = tCoordenadas.split("&&&");

    if(tCoordenadas != undefined && tCoordenadas != ""){
        coordenadas = JSON.parse(arrayPontoPDF[0]);
    }

    //inicio redesenho do polígono no 2º mapa
    if(poligonoPostGis!=null && poligonoPostGis!=""){
        try{
            isPolygon = patternPolygon.test(poligonoPostGis);

            if(isPolygon == true){
                //polígono
                poligonoPostGis = poligonoPostGis.replace("POLYGON((","");
                poligonoPostGis = poligonoPostGis.replace(/\)\)/gi,"");
                coordenadasDesenhadas = poligonoPostGis.split(",");

                $.each(coordenadasDesenhadas, function(i){
                    var coord = coordenadasDesenhadas[i].split(" ");
                    source[i] = {x: Number(coord[0]), y: Number(coord[1])};
                });

                arrayDeCoord[0] = source;

                for (var i = arrayDeCoord.length; i--;) {
           
                    for (var j=0; j<arrayDeCoord[i].length; j+=1) {
                        var point = new OpenLayers.Geometry.Point(arrayDeCoord[i][j].x, arrayDeCoord[i][j].y);
                        pointList.push(point);
                    }

                    var linearRing = new OpenLayers.Geometry.LinearRing(pointList);
                    var polygon = new OpenLayers.Geometry.Polygon([linearRing]);

                    polygonList.push(polygon);
                }

                multuPolygonGeometry = new OpenLayers.Geometry.MultiPolygon(polygonList);
                multiPolygonFeature = new OpenLayers.Feature.Vector(multuPolygonGeometry);

                vector.addFeatures(multiPolygonFeature);
            }
            else{
                //multipolígono
                poligonoPostGis = poligonoPostGis.replace(/\(\(/gi,"");
                multipolygon = poligonoPostGis.split(")),");
                ultimoPoligono = multipolygon.length - 1;
                multipolygon[ultimoPoligono] = multipolygon[ultimoPoligono].replace(/\)\)/gi,"");

                $.each(multipolygon, function(k){
                    coordenadasDesenhadas = multipolygon[k].split(",");

                    $.each(coordenadasDesenhadas, function(i){
                        var coord = coordenadasDesenhadas[i].split(" ");
                        source[i] = {x: Number(coord[0]), y: Number(coord[1])};
                    });

                    arrayDeCoord[k] = source;

                    for (var i = arrayDeCoord.length; i--;) {
           
                        for (var j=0; j<arrayDeCoord[i].length; j+=1) {
                            var point = new OpenLayers.Geometry.Point(arrayDeCoord[i][j].x, arrayDeCoord[i][j].y);
                            pointList.push(point);
                        }

                        var linearRing = new OpenLayers.Geometry.LinearRing(pointList);
                        var polygon = new OpenLayers.Geometry.Polygon([linearRing]);

                        polygonList.push(polygon);
                    }

                    multuPolygonGeometry = new OpenLayers.Geometry.MultiPolygon(polygonList);
                    multiPolygonFeature = new OpenLayers.Feature.Vector(multuPolygonGeometry);

                    vector.addFeatures(multiPolygonFeature);
                });
            }
        }catch(e){
            console.log(e);
        } 
    }
    else{
        vector = new OpenLayers.Layer.Vector('multiPolygon');
    }
    //fim redesenho do polígono no mapa
    //inserindo pontos no mapa
    if(coordenadas[0]){
        $.each(coordenadas , function(i){
            //atributos JSON
            latitude = coordenadas[i].st_y;
            longitude = coordenadas[i].st_x;
            var urlGoogle = "https://maps.google.com.br/maps?q="+latitude+","+longitude;
            var nome = coordenadas[i].name;
            var descricao = coordenadas[i].description;
            //marcador (pontos)
            poi.addMarker(new OpenLayers.Marker(new OpenLayers.LonLat(longitude, latitude).transform('EPSG:4326', 'EPSG:3857'),icon.clone()));
            poi.events.register(
                'mousemove', 
                poi, 
                function(evt) {
                    link = '<a href="'+urlGoogle+'" target="_blank"></a>';
                    idElemento = this.markers[i].icon.imageDiv.attributes[0].nodeValue;
                    elemento = $("#"+idElemento+" img");
                    
                    if ($("#"+idElemento+" a").length){
                        //console.log("já tem link");
                    }
                    else{
                        $(elemento).wrap(link);
                        $(elemento).addClass("imagem");
                        $(elemento).attr('data-title', nome);
                        $(elemento).attr('data-html',true);
                        $(elemento).attr('data-trigger',"hover");
                        $(elemento).attr('data-delay',"{show: 500, hide: 100}"); 
                        $(elemento).attr('data-placement',"left");
                        $(elemento).attr('data-content',descricao);
                        $(elemento).css("height","15px");
                        $(elemento).css("width","15px");
                        $(".imagem").popover();
                        OpenLayers.Event.stop(evt); 
                    }
                }
            );            
        });
        heatMap(coordenadas, arrayPontoPDF[1]);
    }

    mapLayers[mapLayers.length] = vector;
    mapLayers[mapLayers.length] = poi;
    map.addLayers(mapLayers);
}


// Funcao para ativar e desativar o poligono.
function activePolygonDraw(active) {
    if(active == 0){
        poligono.deactivate();
    }else{
        poligono.activate();
    }
} 

function criaMapa(){
    geocoder = new google.maps.Geocoder();
   
    //Requisitando ao openlayer para criar um mapa.
    map = new OpenLayers.Map('map');
   
   	KMLlayers= [
        
        new OpenLayers.Layer.Vector("KML", {
            strategies: [new OpenLayers.Strategy.Fixed()],
            protocol: new OpenLayers.Protocol.HTTP({
                url: "scripts/municipios_norte.kml",
                format: new OpenLayers.Format.KML({
                    extractStyles: true, 
                    extractAttributes: true,
                    maxDepth: 2	
                })
            })
        })
    ];
    
    
    //Definindo os mapas que seram exibidos.
    polygonLayer = new OpenLayers.Layer.Vector("Mostrar Poligono");

    mapLayers=[
        new OpenLayers.Layer.Google(
            "Google Hybrid",
            {type: google.maps.MapTypeId.HYBRID, numZoomLevels: 20}
        ),
        new OpenLayers.Layer.Google(
            "Google Physical",
            {type: google.maps.MapTypeId.TERRAIN}
        ),
        new OpenLayers.Layer.Google(
            "Google Streets", // the default
            {numZoomLevels: 20}
        ), 
        new OpenLayers.Layer.Google(
            "Google Satellite",
            {type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 22}
        ),
        polygonLayer
    ];

    map.addLayers(mapLayers);
	map.addLayers(KMLlayers);
    //Adicionando os controles, vai permitir desenhar o poligono.
    poligono = new OpenLayers.Control.DrawFeature(polygonLayer, OpenLayers.Handler.Polygon); 
    map.addControl(new OpenLayers.Control.LayerSwitcher());
    map.addControl(new OpenLayers.Control.MousePosition()); 
    map.addControl(poligono);


    //Fazendo o mapa iniciar no Brasil
    var lonlat = new OpenLayers.LonLat(-58.6324594,-15.7956343).transform('EPSG:4326', 'EPSG:3857');
    map.setCenter(lonlat, 4); 
}

//pinta KML
function drawMapaEnem() {
	enem = getEnem();

	var cores = jsgradient.generateGradient('#AAAAFF', '#000050', 398, 500);

	//COLOCAR INCLUDE DOS DADOS DO ENEM (enem.js)

	for (var i=0; i< KMLlayers[0].features.length; i++){
		var feature = KMLlayers[0].features[i];
		var nomeCidade = feature.attributes.NOME_MUNIC.value;
		
		var dadosEnem = enem[removeDiacritics(nomeCidade.toUpperCase())];
		
		if (dadosEnem === undefined) {
			notaMediaEnem = 0;
		} else {
			notaMediaEnem = dadosEnem;
		}
		
		var indexColor = Math.round(notaMediaEnem);
		
		var cor = cores[indexColor];
		//console.log(nomeCidade+" : "+indexColor+" --> "+cor);
        KMLlayers[0].features[i].style.fillColor = cor;
		
		
		
		
	/*
		feature.style.fillColor = cores[indexColor];

		feature.popup = new OpenLayers.Popup.FramedCloud("chicken",feature.geometry.getBounds().getCenterLonLat(),
		null,nomeCidade,null,true,null);

		map.addPopup(feature.popup);*/
	}
	
	KMLlayers[0].redraw();
}

function drawMapaIdeb() {
	idebBrasil = getIdebBrasil();

	var colores = jsgradient.generateGradient('#005000', '#55FF55', 0, 100);

   for (var i=0; i< KMLlayers[0].features.length; i++){
        var nomeCidade = KMLlayers[0].features[i].attributes.NOME_MUNIC.value;
		var indexColor = Math.round(idebBrasil[removeDiacritics(nomeCidade.toUpperCase())]*10);
		var cor = colores[indexColor];
		//console.log(nomeCidade+" : "+indexColor+" --> "+cor);
        KMLlayers[0].features[i].style.fillColor = cor;       
   }
   
   KMLlayers[0].redraw();
}



function drawMapaIdh() {
	var cores = jsgradient.generateGradient('#500000', '#FFFF00', 0, 100);
	idhmArray = getIdhmBrasil();
	
    for (var i=0; i< KMLlayers[0].features.length; i++){
        var nomeCidade = KMLlayers[0].features[i].attributes.NOME_MUNIC.value;
        
        var indexColor = Math.round(idhmArray[nomeCidade].idhm * 100);
		
       	var color = cores[indexColor];
        
        //console.log(indexColor+" --> "+color);
        KMLlayers[0].features[i].style.fillColor =  color;        
    }
    
    KMLlayers[0].redraw();
}

function drawMapaTurma() {
	turmaArray = getTurma();

	var cores = jsgradient.generateGradient('#500000', '#FFAAAA', 5, 55);

	for (var i=0; i< KMLlayers[0].features.length; i++){
		var feature = KMLlayers[0].features[i];
		var nomeCidade = feature.attributes.NOME_MUNIC.value;
		
		var dadosTurma = turmaArray[removeDiacritics(nomeCidade.toUpperCase())];
		if (dadosTurma === undefined){
		    var tamanhoMedioTurma = 5;
		} else {
			var tamanhoMedioTurma = dadosTurma.Medio;
		}
		
		var indexColor = Math.round(tamanhoMedioTurma);

		feature.style.fillColor = cores[indexColor];
	}
	
	KMLlayers[0].redraw();
}

// captura região desenhada e converte em Polygon ou Multipolygon
function preencheCamposCoordenadas(){
    try{
        var coordenadaPoligono = "",
            tamPolygon         = polygonLayer.features.length;

        if(tamPolygon > 1){
            var multipolygon = "";

            for(var i = 0; i < tamPolygon; i++){
                coordenadaPoligono = polygonLayer.features[i].geometry + "";
                multipolygon += coordenadaPoligono;
            }

            multipolygon = multipolygon.replace(/polygon/gi, ",");
            multipolygon = multipolygon.replace(",","");
            multipolygon = "MULTIPOLYGON("+multipolygon+")";
            multipolygon.split("{",1);
            $('#poligono').val(multipolygon);
        }
        else{
            coordenadaPoligono = polygonLayer.features[0].geometry + "";
            coordenadaPoligono.split("{",1);
            $('#poligono').val(coordenadaPoligono);
        }
    } catch(e){
        console.log(e);
    }   
}

function heatMap(coordenadas, arrayPDF){ 
    var arrayData = [];

    $.each(coordenadas , function(i){
        arrayData[i] = {count: arrayPDF[i], lat: coordenadas[i].st_y,  lng: coordenadas[i].st_x, count: arrayPDF[i]};
    });    
    
    //map3 = new google.maps.Map(document.getElementById("heatmapArea"), myOptions);
    //heatmap = new HeatmapOverlay(map3, {"radius":40, "visible":true, "opacity":95});
    
    testData={
        max: 60,
        data: arrayData
    };

    var transformedTestData = { max: testData.max , data: [] },
        data = testData.data,
        datalen = data.length,
        nudata = [];
 
    // in order to use the OpenLayers Heatmap Layer we have to transform our data into 
    // { max: , data: [{lonlat: , count: },...]}
    while(datalen--){
        nudata.push({
            lonlat: new OpenLayers.LonLat(data[datalen].lng, data[datalen].lat),
            count: data[datalen].count
        });
    }
    transformedTestData.data = nudata;

    var layer = new OpenLayers.Layer.OSM();
    var heatmap = new OpenLayers.Layer.Heatmap( "Heatmap Layer", map, layer, {visible: true, radius:40}, {isBaseLayer: false, opacity: 0.95, projection: new OpenLayers.Projection("EPSG:4326")});
    
    mapLayers[mapLayers.length] = layer;
    mapLayers[mapLayers.length] = heatmap;

    heatmap.setDataSet(transformedTestData);
}

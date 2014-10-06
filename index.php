<!DOCTYPE html>
<html dir="ltr" lang="pt-BR">
	<head>
		<title>W-SAGE (Web tool for Spatial Analysis of GEodata)</title>

		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
	    <meta name="apple-mobile-web-app-capable" content="yes">
	     
		<link href="css/default.css" rel="stylesheet" type="text/css" />
		<link href="css/style.css" rel="stylesheet" type="text/css" />
		<link href="css/bootstrap.min.css" rel="stylesheet" type="text/css" />
		
		
		<script type="text/javascript" src="scripts/jquery-2.0.3.js"></script>
	    <script src="http://maps.google.com/maps/api/js?v=3&amp;sensor=false" style=""></script>
		<script type="text/javascript" src="scripts/OpenLayers.js"></script>
		
		<script type="text/javascript" src="scripts/bootstrap.min.js"></script>
		<script type="text/javascript" src="scripts/remove-diacritics.js"></script>
		<script type="text/javascript" src="scripts/heatmap.js"></script>
		<script type="text/javascript" src="scripts/jsgradient.js?"></script>
		<script type="text/javascript" src="scripts/heatmap-gmaps.js"></script>
		<script type="text/javascript" src="scripts/heatmap-openlayers.js"></script>
		<script type="text/javascript" src="scripts/ideb.js"></script>
		<script type="text/javascript" src="scripts/idhm.js"></script>
		<script type="text/javascript" src="scripts/escola.js"></script>
		<script type="text/javascript" src="scripts/enem.js"></script>
		<script type="text/javascript" src="scripts/media_alunos_turma_municipios_simples_AC_AM_RO.js"></script>

		<link href="css/wsage.css" rel="stylesheet" type="text/css" />

		<script type="text/javascript" src="scripts/d3.min.js"></script>
		<script type="text/javascript" src="scripts/wsage.js"></script>
		<script type="text/javascript" src="scripts/smoothScroll.js"></script>
		<script type="text/javascript" src="scripts/wsage_chart.js"></script>
		<script type="text/javascript" src="scripts/wsage_chart2.js"></script>
	</head>

	<body onload="init()" role="document">
		<div  id="top" class="navbar navbar-default navbar-fixed-top" role="navigation">
			<div class="container">
				<div class="navbar-header">
					<img src="imagens/wsage_logo.jpg" alt="Wsage-Logo" id="wsageLogo"> 
				</div>
				<div id="nav">
				     <ul class="nav navbar-nav">
				         <li class="navBarLiClass"><a class="navBarLinkClass" 
				         	 href="#visualization" style="border-left: 1px solid #EEEEEE;">Mapa</a></li>
				         <li class="navBarLiClass"><a class="navBarLinkClass" href="#grafh">Gráfico</a></li>
				         <li class="navBarLiClass"><a class="navBarLinkClass" href="#contact">Contato</a></li>
				     </ul>
				</div>
			</div>			
		</div>
		<div>
		<div id="content" class="bs-docs-header" role="main">
			<div class="container">
				<div id="visualization">
					<a id="visualization"></a>
					<div class="page-header" style="padding-top: 60px;">
						<h1> Plataforma de visualização geográfica de dados </h1>
						<h3> Escolha a partir das opções abaixo os dados que deseja visualizar sobre o mapa do Brasil.</h3>
					</div>
					
					<div id="map"></div>
					<!-- botões de busca -->
					<ul id="mapMenu" class="listaSemMarcador">
						<li class="liButtonMap"> 
							<input type="button" class="btn btn-primary mapMenuButton" value="Tam. Turma" 
							       id="enviar" onclick="drawMapaTurma();"><!--drawMapaEscolas();drawMapaTurma();drawMapaIdh();drawMapaIdeb();drawMapaEnem();--> 
						</li>
						<li class="liButtonMap"> 
							<input type="button" class="btn btn-primary mapMenuButton" value="Nota ENEM" 
							       id="enviar" onclick="drawMapaEnem();"><!--drawMapaEscolas();drawMapaTurma();drawMapaIdh();drawMapaIdeb();drawMapaEnem();--> 
						</li>
						<li class="liButtonMap"> 
							<input type="button" class="btn btn-primary mapMenuButton" value="IDEB" 
							       id="enviar" onclick="drawMapaIdeb();"><!--drawMapaEscolas();drawMapaTurma();drawMapaIdh();drawMapaIdeb();drawMapaEnem();--> 
						</li>
						<li class="liButtonMap"> 
							<input type="button" class="btn btn-primary mapMenuButton" value="IDHM" 
							       id="enviar" onclick="drawMapaIdh();"><!--drawMapaEscolas();drawMapaTurma();drawMapaIdh();drawMapaIdeb();drawMapaEnem();--> 
						</li>
						<!--
						<li class="liButtonMap" >
							<input type="button" class="btn btn-primary mapMenuButton" value="Nova Busca" 
								   id="reset" onclick="novaBusca();">
						</li>
						<li class="liButtonMap" onclick="activePolygonDraw(0);">
							<div class="btn btn-primary mapMenuButton">
								<input type="image" class="btn btn-primary imageButton" 
								   src="imagens/hand.png" alt="Hand"/>
							</div>
						</li>
						<li class="liButtonMap" onclick="activePolygonDraw(1);">
							<div class="btn btn-primary  mapMenuButton">
								<input type="image" class="imageButton" 
								   src="imagens/polygon.png" alt="Polygon"/>
							</div>
						</li>
						-->
					</ul>

					<!-- Gambiarra para fazer o aviso descer -->
					<div style="clear:both"></div>
					<!-- Gambiarra para fazer o aviso descer -->

					<div class="well aviosMap">
				    	<ul class="listaSemMarcador">
				    	<li> **Cores mais escuras correspondem a grandezas maiores enquanto as mais claras correspondem as menores. </li>
				    	<li> IDEB: O Índice de Desenvolvimento da Educação Básica é um indicador educacional composto calculado e mantido pelo INEP. Os dados apresentados aqui são de 2011, obtidos a partir do site http://ideb.inep.gov.br/resultado/home.seam </li>
				    		<li> IDEB: O Índice de Desenvolvimento da Educação Básica é um indicador educacional composto calculado e mantido pelo INEP. Os dados apresentados aqui são de 2011, obtidos a partir do site http://ideb.inep.gov.br/resultado/home.seam </li>
				    		
<li> ENEM: O Exame Nacional de Ensino Médio é uma prova padrão opcional para alunos que estão terminando o ensino médio. Também é usado no processo seletivo integrado das universidades federais. Os dados apresentados aqui são de XXXXX, obtidos do site </li>

<li>
Tamanho da Turma: O tamanho médio da turma por município e por escola faz parte dos indicadores educacionais fornecidos pelo INEP. Os dados apresentados aqui são de 2012, obtidos do site http://portal.inep.gov.br/indicadores-educacionais</li>

<li>
IDHM: O Índice de Desenvolvimento Humano dos Municípios é calculado pelo IBGE nos censos que realiza. Contém sub-indicadores de educação, renda e longevidade. Os dados apresentados aqui são de 2010, obtidos do site http://www.atlasbrasil.org.br/2013/ranking </li>
				    		<!--
				    		<li> Use o botão com o <img src="imagens/polygon.png" style="width:15px;height:15px;"> para conseguir desenhar um polígono no mapa.</li>
				    		
				    		<li> Use o <i> shift</i> ou um duplo clique do mouse, para poder fechar o polígono.</li>
				    	</ul>
				    	-->
					</div>
					

					<!-- guarda informaçoes dos pontos -->
					<input id="pontos">
					<!-- envio de dados para o banco -->
					<!--
					<form id="consultarPoligono" method="post" name="consultarPoligono"  action="">
						<input id="poligono" type="hidden" name="poligono">
						<input type="hidden" name="submitted" id="submitted" value="true" />
					</form>
					-->						
				</div>

				<!--

				<div id="grafh">
				  <a id="portfolio"></a>
					<div class="page-header">
						<h1> Gráficos </h1>
					</div>

					<div id="chart1" >

					</div>
					<div id="chart2" >

					</div>
				</div>

				<div id="page3">
				  <a id="contact"></a>
				  <div class="page-header">
					<h1> Contato </h1>
				  </div>
				    
				</div>
				--->
			</div>	
		</div>
	</body>
</html>





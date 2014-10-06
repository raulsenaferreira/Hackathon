<?php
	include 'conexao.php';
	$sep = "&&&";
	// envio dos dados
	if(isset($_POST['submitted'])) {

		$poligono = trim($_POST['poligono']);

		// envia restrição do polígono caso este tenha sido desenhado no mapa
		if(empty($poligono)) {
			$query = 'SELECT name, ST_X(wkb_geometry), ST_Y(wkb_geometry) FROM agencias';//description
		} 
		else {
			$query = "SELECT DISTINCT name, ST_X(wkb_geometry), ST_Y(wkb_geometry) FROM agencias WHERE ST_Intersects(wkb_geometry,ST_Transform(ST_GeomFromText('".$poligono."',3857),4326))";//description
		}

		$result = pg_query($query);
		$JSON = json_encode(pg_fetch_all($result));
		
		pg_free_result($result);
		// seta variável de envio como TRUE
		$sent = true;
		/*
			retorno do AJAX 
			-- posição 0 contém os dados do banco e a posição 1 contém os pdf's calculados para cada ponto (array)
		*/
		exec('python cgi-bin/teste2.py ' . json_encode($JSON), $dataFromPython);
		if(empty($dataFromPython)){
			print_r($JSON . $sep);
		}
		else{
			print_r($JSON . $sep . $dataFromPython[0]);
		}
	}
?>

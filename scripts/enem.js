function getEnem(){
var enem = {
	"RIO BRANCO" : 466.90,
	"SENA MADUREIRA" : 450.03,
	"TARAUACA" : 453.29,
	"PORTO ACRE" : 439.70,
	"SANTA ROSA DO PURUS" : 438.61,
	"SENADOR GUIOMARD" : 457.57,
	"ASSIS BRASIL" : 452.22,
	"PLACIDO DE CASTRO" : 449.63,
	"MANCIO LIMA" : 437.93,
	"FEIJO" : 457.13,
	"CAPIXABA" : 444.61,
	"BRASILEIA" : 457.41,
	"MANOEL URBANO" : 453.56,
	"XAPURI" : 440.94,
	"JORDAO" : 436.76,
	"CRUZEIRO DO SUL" : 446.02,
	"EPITACIOLANDIA" : 464.42,
	"RODRIGUES ALVES" : 431.71,
	"BUJARI" : 450.02,
	"MARECHAL THAUMATURGO" : 419.37,
	"PORTO WALTER" : 424.41,
	"ACRELANDIA" : 457.93,
	"ITACOATIARA" : 440.08,
	"CODAJAS" : 433.75,
	"TEFE" : 448.36,
	"ALVARAES" : 440.10,
	"NOVO ARIPUANA" : 425.03,
	"BOCA DO ACRE" : 441.22,
	"BENJAMIN CONSTANT" : 414.68,
	"HUMAITA" : 448.29,
	"CARAUARI" : 444.72,
	"MANAUS" : 473.96,
	"AUTAZES" : 429.26,
	"TONANTINS" : 420.50,
	"CANUTAMA" : 413.92,
	"NOVA OLINDA DO NORTE" : 424.71,
	"CAREIRO" : 432.80,
	"MARAA" : 418.68,
	"UARINI" : 406.67,
	"MANACAPURU" : 441.99,
	"MAUES" : 453.38,
	"BOA VISTA DO RAMOS" : 420.58,
	"IPIXUNA" : 418.33,
	"MANICORE" : 435.67,
	"SAO SEBASTIAO DO UATUMA" : 414.40,
	"LABREA" : 439.04,
	"PAUINI" : 408.00,
	"ATALAIA DO NORTE" : 433.78,
	"BARCELOS" : 439.06,
	"JURUA" : 419.77,
	"JUTAI" : 426.25,
	"NHAMUNDA" : 423.62,
	"SAO PAULO DE OLIVENCA" : 421.69,
	"NOVO AIRAO" : 447.22,
	"JAPURA" : 415.67,
	"ANORI" : 442.27,
	"ANAMA" : 438.19,
	"SANTO ANTONIO DO ICA" : 414.94,
	"TABATINGA" : 448.08,
	"EIRUNEPE" : 431.13,
	"CAAPIRANGA" : 429.73,
	"APUI" : 460.78,
	"BERURI" : 422.23,
	"AMATURA" : 406.50,
	"GUAJARA" : 436.21,
	"PRESIDENTE FIGUEIREDO" : 451.56,
	"SANTA ISABEL DO RIO NEGRO" : 417.20,
	"CAREIRO DA VARZEA" : 442.98,
	"MANAQUIRI" : 423.80,
	"PARINTINS" : 445.02,
	"ITAMARATI" : 398.30,
	"URUCARA" : 420.01,
	"URUCURITUBA" : 422.51,
	"SAO GABRIEL DA CACHOEIRA" : 451.11,
	"TAPAUA" : 432.23,
	"FONTE BOA" : 422.50,
	"COARI" : 432.73,
	"RIO PRETO DA EVA" : 442.18,
	"IRANDUBA" : 443.41,
	"ENVIRA" : 424.40,
	"SILVES" : 419.54,
	"ITAPIRANGA" : 420.04,
	"BARREIRINHA" : 425.46,
	"BORBA" : 430.60,
	"SERINGUEIRAS" : 449.97,
	"NOVA UNIAO" : 459.86,
	"ESPIGAO D'OESTE" : 482.16,
	"BURITIS" : 468.33,
	"SAO FRANCISCO DO GUAPORE" : 465.25,
	"MIRANTE DA SERRA" : 469.80,
	"PRESIDENTE MEDICI" : 469.67,
	"ALTO PARAISO" : 454.38,
	"CANDEIAS DO JAMARI" : 464.11,
	"ROLIM DE MOURA" : 474.14,
	"COLORADO DO OESTE" : 497.78,
	"RIO CRESPO" : 460.32,
	"NOVA BRASILANDIA D'OESTE" : 466.80,
	"ITAPUA DO OESTE" : 465.36,
	"ALVORADA D'OESTE" : 463.26,
	"COSTA MARQUES" : 453.65,
	"PIMENTA BUENO" : 475.61,
	"CAMPO NOVO DE RONDONIA" : 452.35,
	"CEREJEIRAS" : 477.86,
	"CACAULANDIA" : 451.45,
	"ARIQUEMES" : 476.89,
	"URUPA" : 457.28,
	"PARECIS" : 450.07,
	"CUJUBIM" : 445.58,
	"CORUMBIARA" : 457.48,
	"VILHENA" : 486.01,
	"SAO FELIPE D'OESTE" : 462.95,
	"MINISTRO ANDREAZZA" : 460.53,
	"OURO PRETO DO OESTE" : 481.95,
	"VALE DO ANARI" : 450.03,
	"PIMENTEIRAS DO OESTE" : 451.31,
	"GUAJARA-MIRIM" : 451.01,
	"TEIXEIROPOLIS" : 457.24,
	"NOVO HORIZONTE DO OESTE" : 461.00,
	"CACOAL" : 481.90,
	"CHUPINGUAIA" : 457.94,
	"THEOBROMA" : 456.05,
	"PRIMAVERA DE RONDONIA" : 459.88,
	"VALE DO PARAISO" : 455.89,
	"ALTA FLORESTA D'OESTE" : 475.89,
	"MACHADINHO D'OESTE" : 467.48,
	"CASTANHEIRAS" : 447.93,
	"JI-PARANA" : 482.18,
	"SANTA LUZIA D'OESTE" : 471.12,
	"GOVERNADOR JORGE TEIXEIRA" : 463.05,
	"ALTO ALEGRE DOS PARECIS" : 471.99,
	"MONTE NEGRO" : 467.30,
	"SAO MIGUEL DO GUAPORE" : 465.34,
	"NOVA MAMORE" : 449.22,
	"CABIXI" : 454.32,
	"PORTO VELHO" : 485.68,
	"JARU" : 472.92,
}

return enem;
}

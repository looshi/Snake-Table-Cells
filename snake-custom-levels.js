

var CUSTOM_LEVELS = new Array();


var level_fibonacci = 
"060A11A0129A11A0129A11A0129A11A0129A11A0129A11A0129A11A0129A11A0129A11A0129A11A0129A11A0129A11A0129A11A0129A11A0129A11A0129A11A0129A11A0129A11A0129A11A0129A11A0129A11A0129A11A0129A11A0129A11A0129A11A0129A11A0129A11A0129A11A0129A11A0129A11A0129A11A0129A11A0129A170A060A11A017A11A08A11A07A11A094A11A017A11A08A11A07A11A094A11A017A11A08A11A07A11A094A11A017A11A08A11A07A11A094A11A017A110A07A11A094A11A017A11A21A11A01A11A04A11A07A11A094A11A017A11A21A13A04A11A07A11A094A11A017A11A23A11A04A11A07A11A094A11A017A118A094A11A017A11A016A11A094A11A017A11A016A11A094A11A017A11A016A11A094A11A017A11A016A11A094A11A017A11A016A11A094A11A017A11A016A11A094A11A017A11A016A11A094A11A017A11A016A11A094A136A094A11A034A11A094A11A034A11A094A11A034A11A094A11A034A11A094A11A034A11A094A11A034A11A094A11A034A11A094A11A034A11A094A11A034A11A094A11A034A11A094A11A034A11A094A11A034A11A094A11A034A11A094A11A034A11A094A11A034A11A094A11A034A11A094A11A034A11A094A11A034A11A034A";

var level_lightPosts = 
"03132A13A0127A11A21A11A0127A13A0128A11A0129A11A0129A11A0129A11A0129A11A0116A123A21A1106A01482A13A0127A11A21A11A0127A13A0128A11A0129A11A0129A11A076A160A21A169A0619A13A0127A11A21A11A0127A13A0128A11A029A1106A21A123A01170A";


var level_interstate = 
"0131A126A01A132A01A168A02A11A024A11A01A11A030A11A01A11A066A11A02A11A024A11A01A11A030A11A01A11A066A11A02A11A024A11A01A11A030A11A01A11A066A11A02A11A024A11A01A11A030A11A01A11A066A11A02A11A024A11A01A11A030A11A01A11A066A11A02A11A024A11A01A11A030A11A01A11A066A11A02A11A024A11A01A11A030A11A01A11A066A11A02A11A024A11A01A11A030A11A01A11A066A11A02A11A024A11A01A11A030A11A01A11A066A11A02A11A024A11A01A11A030A11A01A11A066A11A02A11A024A11A01A11A030A11A01A11A066A11A02A11A024A11A01A11A030A11A01A11A066A11A02A11A024A11A01A11A030A11A01A11A066A11A02A11A024A11A01A11A030A11A01A11A066A11A02A11A024A11A01A11A030A11A01A11A066A11A02A11A024A11A01A11A030A11A01A11A066A11A02A11A024A11A01A11A030A11A01A11A066A11A02A11A024A11A01A11A030A11A01A11A066A11A02A11A024A11A01A11A030A11A01A11A066A11A02A11A024A11A01A11A030A11A01A11A066A11A02A11A024A11A01A11A030A11A01A11A066A11A02A11A024A11A01A11A030A11A01A11A066A11A02A11A024A11A01A11A030A11A01A11A066A11A02A11A024A11A01A11A030A11A01A11A066A11A02A11A024A11A01A11A030A11A01A11A066A11A02A126A01A132A01A168A028A21A032A21A070A126A01A132A01A168A02A11A024A11A01A11A030A11A01A11A066A11A02A11A024A11A01A11A030A11A01A11A066A11A02A11A024A11A01A11A030A11A01A11A066A11A02A11A024A11A01A11A030A11A01A11A066A11A02A11A024A11A01A11A030A11A01A11A066A11A02A11A024A11A01A11A030A11A01A11A066A11A02A11A024A11A01A11A030A11A01A11A066A11A02A11A024A11A01A11A030A11A01A11A066A11A02A11A024A11A01A11A030A11A01A11A066A11A02A11A024A11A01A11A030A11A01A11A066A11A02A11A024A11A01A11A030A11A01A11A066A11A02A11A024A11A01A11A030A11A01A11A066A11A02A11A024A11A01A11A030A11A01A11A066A11A02A11A024A11A01A11A030A11A01A11A066A11A02A11A024A11A01A11A030A11A01A11A066A11A02A11A024A11A01A11A030A11A01A11A066A11A02A11A024A11A01A11A030A11A01A11A066A11A02A11A024A11A01A11A030A11A01A11A066A11A02A11A024A11A01A11A030A11A01A11A066A11A02A11A024A11A01A11A030A11A01A11A066A11A02A11A024A11A01A11A030A11A01A11A066A11A02A11A024A11A01A11A030A11A01A11A066A11A02A126A01A132A01A168A028A21A032A21A070A126A01A132A01A168A02A11A024A11A01A11A030A11A01A11A066A11A02A11A024A11A01A11A030A11A01A11A066A11A02A11A024A11A01A11A030A11A01A11A066A11A02A11A024A11A01A11A030A11A01A11A066A11A02A11A024A11A01A11A030A11A01A11A066A11A02A11A024A11A01A11A030A11A01A11A066A11A02A11A024A11A01A11A030A11A01A11A066A11A02A11A024A11A01A11A030A11A01A11A066A11A02A11A024A11A01A11A030A11A01A11A066A11A02A11A024A11A01A11A030A11A01A11A066A11A02A11A024A11A01A11A030A11A01A11A066A11A02A11A024A11A01A11A030A11A01A11A066A11A02A126A01A132A01A168A0131A" ;


var level_susie =
"02147A21A0126A21A0257A21A0126A21A0388A21A0117A15A07A16A0112A11A011A21A04A11A0112A11A016A11A0112A11A010A22A04A11A0112A11A07A25A04A11A0112A11A06A27A03A11A0112A11A04A29A03A11A0112A11A03A25A01A25A02A11A0112A11A03A211A02A11A0112A11A03A211A02A11A0112A11A016A11A0112A11A016A11A0112A118A04226A";


var level_1 = "03844A11A08A116A0105A12A08A115A057A115A033A13A08A114A057A114A08A11A025A14A08A113A057A113A08A12A025A15A08A112A057A112A08A13A025A16A08A111A057A111A08A14A025A17A08A110A057A110A08A15A025A18A04A21A03A19A057A19A08A16A025A19A08A18A057A18A04A21A03A17A025A110A08A17A057A17A08A18A025A111A08A16A057A16A08A19A025A112A08A15A057A15A08A110A025A113A08A14A057A14A08A111A025A114A08A13A057A13A08A112A025A115A08A12A057A12A08A113A025A116A08A11A057A11A08A114A03071A";

var level_2 =
"01150A19A0121A11A07A11A0121A11A07A11A0121A11A07A11A0121A11A03A21A03A11A0121A11A07A11A0121A11A07A11A0121A11A07A11A0121A19A0251A19A0121A11A07A11A0121A11A07A11A0121A11A07A11A0121A11A03A21A03A11A0121A11A07A11A0121A11A07A11A0121A11A07A11A0121A19A020A147A083A11A045A11A054A19A020A11A045A11A054A11A07A11A020A11A045A11A054A11A07A11A020A11A045A11A054A11A07A11A020A11A045A11A054A11A03A21A03A11A020A11A06A133A06A11A054A11A07A11A020A11A06A11A031A11A06A11A054A11A07A11A020A11A06A11A031A11A06A11A054A11A07A11A020A11A06A11A031A11A06A11A054A19A020A11A06A11A031A11A06A11A083A11A06A11A05A122A04A11A06A11A083A11A06A11A05A11A020A11A04A11A06A11A083A11A06A11A05A11A020A11A04A11A06A11A083A11A06A11A05A11A020A11A04A11A06A11A083A11A06A11A05A11A020A11A04A11A06A11A083A11A06A11A05A11A010A21A09A11A04A11A06A11A083A11A06A11A05A11A020A11A04A11A06A11A083A11A06A11A05A11A020A11A04A11A06A11A083A11A06A11A05A11A025A11A06A11A083A11A06A11A05A11A025A11A06A11A083A11A06A11A05A11A025A11A06A11A083A11A06A11A05A127A06A11A083A11A06A11A038A11A083A11A06A11A038A11A083A11A06A11A038A11A083A11A06A11A038A11A083A11A06A11A038A11A083A11A06A140A083A11A0129A11A0129A11A0129A11A0129A11A0129A147A0984A";


var level_3 = 
"151A 079A 151A 079A151A081A12A036A111A079A14A036A111A036A135A08A14A06A21A029A111A036A11A033A11A08A14A036A111A036A11A033A11A08A14A036A111A036A11A033A11A011A11A036A111A036A11A04A124A05A11A011A135A02A111A036A11A04A11A022A11A05A11A010A11A01A134A02A111A036A11A04A11A022A11A05A11A010A136A02A111A036A11A04A11A022A11A05A11A011A135A07A16A036A11A04A11A022A11A05A11A010A136A03A21A03A16A036A11A04A11A022A11A05A11A010A136A07A16A036A11A04A11A022A11A05A11A08A138A07A16A036A11A04A11A022A11A05A11A08A151A036A11A04A11A022A11A05A11A08A151A036A11A04A11A022A11A05A11A08A151A036A11A04A11A022A11A05A11A08A151A036A11A04A11A022A11A05A11A08A151A036A11A04A11A07A116A05A11A08A151A036A11A04A11A07A11A020A11A08A151A036A11A04A11A07A11A020A11A08A151A036A11A04A11A07A11A020A11A08A151A036A11A04A11A07A11A07A21A012A11A08A151A036A11A04A11A07A11A020A11A08A151A036A11A04A11A07A11A020A11A08A151A036A11A04A11A07A11A020A11A08A12A045A14A036A11A04A11A07A122A08A12A21A044A14A036A11A04A11A037A12A045A14A036A11A04A11A037A144A03A14A036A11A04A11A037A144A03A14A036A11A04A11A037A144A03A14A036A11A04A115A023A144A03A14A036A11A018A11A023A144A03A14A036A11A018A11A023A144A03A14A036A11A018A11A023A144A03A14A036A11A018A11A023A144A03A14A036A11A018A11A023A144A03A14A036A11A018A11A023A144A03A14A036A11A018A11A023A144A03A14A036A11A09A21A08A11A023A144A03A14A036A11A018A11A023A144A03A14A036A11A018A11A023A144A03A14A036A11A018A11A023A144A03A14A036A11A018A11A023A144A03A14A036A11A018A11A023A144A03A120A020A11A018A11A023A144A03A120A020A120A023A144A03A120A063A144A03A14A013A13A063A144A03A14A013A13A063A144A03A14A013A13A063A144A03A14A013A13A063A144A03A14A013A13A063A144A03A14A06A21A06A13A063A144A03A14A013A13A063A144A03A14A013A13A063A144A03A14A013A13A063A144A03A14A013A13A063A144A03A14A013A13A063A144A03A14A013A13A063A144A020A13A063A144A020A13A063A144A020A13A063A167A063A167A063A167A063A167A063A";

var CUSTOM_LEVELS = [level_fibonacci,level_lightPosts,level_interstate,level_susie,level_1,level_2,level_3];


																																																																																																																																	
																																																																																																																																	
																																																																																																																																	
																																																																																																																																	
																																																																																																																																	
																																																																																																																																	
																																																																																																																																	
																																																																																																																																	
																																																																																																																																	
																																																																																																																																	
																																																																																																																																	
																																																																																																																																	
																																																																																																																																	
																																																																																																																																	
																																																																																																																																	
																																																																																																																																	
																																																																																																																																	
																																																																																																																																	
																																																																																																																																	
																																																																																																																																	
																																																																																																																																	
																																																																																																																																	
																																																																																																																																	
																																																																																																																																	
																																																																																																																																	
																																																																																																																																	
																																																																																																																																	
																																																																																																																																	
																																																																																																																																	
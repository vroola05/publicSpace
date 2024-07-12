\connect publicspace

-- select t.buurtnaam, t.STRAATNAAM, t.HUISNUMMER, t.HUISLETTER, t.TOEVOEGING, t.POSTCODE, t.WOONPLAATS, t.geometrie.Get_WKT() from GEOVIEWER.BAG_T_P_VERBLIJFSOBJECT t 
-- OFFSET 30000 ROWS FETCH NEXT 10000 ROWS ONLY; 

-- (point\()([0-9.]+)( )
-- point($2, 

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Halfweg', 'Burg van Bruggenstraat', 6, null, null, '1165NT', 'Halfweg', 28992, 'POINT (112041.0 489002.0)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Halfweg', 'Beatrixstraat', 8, null, null, '1165GK', 'Halfweg', 28992, 'POINT (111869.0 488297.0)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Halfweg', 'Burg van Bruggenstraat', 7, null, null, '1165NS', 'Halfweg', 28992, 'POINT (112007.0 489051.0)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Halfweg', 'Burgemeester van Hövell tot Westerflierpad', 18, null, null, '1165NR', 'Halfweg', 28992, 'POINT (112068.0 488923.0)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Halfweg', 'Burgemeester van Hövell tot Westerflierpad', 19, null, null, '1165NR', 'Halfweg', 28992, 'POINT (112070.0 488926.0)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Halfweg', 'Burgemeester van Hövell tot Westerflierpad', 20, null, null, '1165NR', 'Halfweg', 28992, 'POINT (112075.0 488929.0)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Halfweg', 'Burgemeester van Hövell tot Westerflierpad', 21, null, null, '1165NR', 'Halfweg', 28992, 'POINT (112062.0 488941.0)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Halfweg', 'Burgemeester van Hövell tot Westerflierpad', 22, null, null, '1165NR', 'Halfweg', 28992, 'POINT (112058.0 488944.0)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Halfweg', 'Burgemeester van Hövell tot Westerflierpad', 23, null, null, '1165NR', 'Halfweg', 28992, 'POINT (112055.0 488948.0)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Halfweg', 'Burgemeester van Hövell tot Westerflierpad', 24, null, null, '1165NR', 'Halfweg', 28992, 'POINT (112053.0 488952.0)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Halfweg', 'Burgemeester van Hövell tot Westerflierpad', 25, null, null, '1165NR', 'Halfweg', 28992, 'POINT (112065.0 488957.0)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Halfweg', 'Burgemeester van Hövell tot Westerflierpad', 26, null, null, '1165NR', 'Halfweg', 28992, 'POINT (112070.0 488961.0)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Halfweg', 'Beatrixstraat', 4, 'A', null, null, 'Halfweg', 28992, 'POINT (111873.0 488299.0)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Halfweg', 'Burgemeester van Hövell tot Westerflierpad', 27, null, null, '1165NR', 'Halfweg', 28992, 'POINT (112073.0 488964.0)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Halfweg', 'Beatrixstraat', 4, 'B', null, null, 'Halfweg', 28992, 'POINT (111869.0 488297.0)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Halfweg', 'Burgemeester van Hövell tot Westerflierpad', 28, null, null, '1165NR', 'Halfweg', 28992, 'POINT (112078.0 488967.0)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Halfweg', 'Beatrixstraat', 4, 'C', null, null, 'Halfweg', 28992, 'POINT (111866.0 488293.0)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Halfweg', 'Burgemeester van Hövell tot Westerflierpad', 29, null, null, '1165NR', 'Halfweg', 28992, 'POINT (112081.0 488970.0)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Halfweg', 'Beatrixstraat', 4, 'D', null, null, 'Halfweg', 28992, 'POINT (111863.0 488289.0)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Halfweg', 'Burgemeester van Hövell tot Westerflierpad', 30, null, null, '1165NR', 'Halfweg', 28992, 'POINT (112086.0 488973.0)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Halfweg', 'Beatrixstraat', 4, 'E', null, null, 'Halfweg', 28992, 'POINT (111860.0 488286.0)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Halfweg', 'Burg van Bruggenstraat', 1, null, null, '1165NS', 'Halfweg', 28992, 'POINT (111970.0 489062.0)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Halfweg', 'Beatrixstraat', 4, 'F', null, null, 'Halfweg', 28992, 'POINT (111857.0 488282.0)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Halfweg', 'Burg van Bruggenstraat', 2, null, null, '1165NT', 'Halfweg', 28992, 'POINT (112033.0 488997.0)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Halfweg', 'Beatrixstraat', 5, null, null, '1165GJ', 'Halfweg', 28992, 'POINT (111913.0 488318.0)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Halfweg', 'Burg van Bruggenstraat', 3, null, null, '1165NS', 'Halfweg', 28992, 'POINT (111986.0 489058.0)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Halfweg', 'Beatrixstraat', 6, null, null, '1165GK', 'Halfweg', 28992, 'POINT (111872.0 488300.0)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Halfweg', 'Burg van Bruggenstraat', 4, null, null, '1165NT', 'Halfweg', 28992, 'POINT (112036.0 488998.0)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Halfweg', 'Burg van Bruggenstraat', 5, null, null, '1165NS', 'Halfweg', 28992, 'POINT (111996.0 489055.0)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Halfweg', 'Beatrixstraat', 7, null, null, '1165GJ', 'Halfweg', 28992, 'POINT (111911.0 488305.0)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Halfweg', 'Dr Schaepmanstraat', 12, null, null, '1165GP', 'Halfweg', 28992, 'POINT (111955.0 488375.0)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Halfweg', 'Julianastraat', 2, 'A', null, '1165GV', 'Halfweg', 28992, 'POINT (111790.0 488433.0)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Halfweg Omgeving', 'Haarlemmerstraatweg', 71, null, null, '1165MK', 'Halfweg', 28992, 'POINT (110070.0 488916.0)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Halfweg', 'Kanaalweg', 17, null, null, '1165LV', 'Halfweg', 28992, 'POINT (111849.0 488950.0)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Halfweg', 'Oranje Nassaustraat', 11, null, null, '1165GL', 'Halfweg', 28992, 'POINT (111940.0 488545.0)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Halfweg', 'Mientekade', 15, null, null, '1165LM', 'Halfweg', 28992, 'POINT (112079.0 488342.0)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Halfweg', 'Mientekade', 69, null, null, '1165LK', 'Halfweg', 28992, 'POINT (112008.0 488260.0)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Halfweg', 'Teding van Berkhoutweg', 26, null, null, '1165LZ', 'Halfweg', 28992, 'POINT (112093.0 488869.0)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Spaarndam', 'B van Beaumontstraat', 8, null, null, '2064XM', 'Spaarndam', 28992, 'POINT (107482.0 491971.0)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Spaarndam', 'Biesheuvelplein', 6, null, null, '2064WL', 'Spaarndam', 28992, 'POINT (107856.0 492008.0)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Spaarndam', 'Clara van Spaarnwoudestraat', 55, null, null, '2064WS', 'Spaarndam', 28992, 'POINT (107645.0 491841.0)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Spaarndam', 'de Leeuwstraat', 16, null, null, '2064WH', 'Spaarndam', 28992, 'POINT (107724.0 491912.0)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Zwaanshoek Omgeving', 'Spieringweg', 865, null, null, '2136LJ', 'Zwaanshoek', 28992, 'POINT (104392.01 482474.151)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Zwaanshoek Omgeving', 'Spieringweg', 867, null, null, '2136LJ', 'Zwaanshoek', 28992, 'POINT (104360.55 482445.161)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Vijfhuizen', 'd''Yserinckweg', 5, 'A', null, '2141AA', 'Vijfhuizen', 28992, 'POINT (106681.206 484936.404)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Vijfhuizen', 'Kromme Spieringweg', 489, 'A', null, '2141AJ', 'Vijfhuizen', 28992, 'POINT (106709.436 485219.989)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep West', 'Hoofdweg', 1181, null, null, '2151MG', 'Nieuw-Vennep', 28992, 'POINT (103533.278 475431.822)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Hoofddorp Zuid', 'Planetenweg', 80, 'P', null, '2132HP', 'Hoofddorp', 28992, 'POINT (108271.161 478918.557)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Hoofddorp De Hoek', 'Kruisweg', 771, null, null, '2132NG', 'Hoofddorp', 28992, 'POINT (108886.624 479058.272)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Hoofddorp De Hoek', 'Kruisweg', 773, null, null, '2132NG', 'Hoofddorp', 28992, 'POINT (108873.884 479069.582)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Hoofddorp Graan voor Visch', 'Graan voor Visch', 14002, 'A', null, '2132VW', 'Hoofddorp', 28992, 'POINT (107440.805 478963.24)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Hoofddorp Bornholm West', 'Sparresholm', 21, null, null, '2133BH', 'Hoofddorp', 28992, 'POINT (105852.677 480396.207)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Hoofddorp Floriande West', 'Westhove', 102, null, null, '2134VP', 'Hoofddorp', 28992, 'POINT (103095.371 480177.286)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Vijfhuizen Nieuwebrug', 'Vijfhuizerdijk', 206, 'A', '140', '2141BK', 'Vijfhuizen', 28992, 'POINT (107083.562 487335.427)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Dopheidestraat', 3, null, null, '2165VM', 'Lisserbroek', 28992, 'POINT (99498.84 474560.732)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Langerak', 22, null, null, '2157PG', 'Abbenes', 28992, 'POINT (100687.44 472381.407)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Langerak', 24, null, null, '2157PG', 'Abbenes', 28992, 'POINT (100682.909 472385.482)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Buitenkaag', 'Huigsloterdijk', 355, null, null, '2158LR', 'Buitenkaag', 28992, 'POINT (99174.26 470316.184)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Maria Margaretalaan', 53, null, null, '2157NM', 'Abbenes', 28992, 'POINT (100718.378 471862.964)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Maria Margaretalaan', 55, null, null, '2157NM', 'Abbenes', 28992, 'POINT (100712.888 471870.951)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Weteringbrug', 'Huigsloterdijk', 108, null, null, '2156LG', 'Weteringbrug', 28992, 'POINT (103378.1 470212.33)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Weteringbrug', 'Huigsloterdijk', 109, null, null, '2156LG', 'Weteringbrug', 28992, 'POINT (103378.765 470169.767)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Weteringbrug', 'Huigsloterdijk', 110, null, null, '2156LG', 'Weteringbrug', 28992, 'POINT (103343.787 470157.153)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Weteringbrug', 'Vuurbaak', 23, null, null, '2156LJ', 'Weteringbrug', 28992, 'POINT (104244.449 470734.245)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Weteringbrug', 'Vuurbaak', 25, null, null, '2156LJ', 'Weteringbrug', 28992, 'POINT (104240.876 470730.21)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Weteringbrug', 'Vuurbaak', 27, null, null, '2156LJ', 'Weteringbrug', 28992, 'POINT (104237.302 470726.175)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Weteringbrug', 'Vuurbaak', 29, null, null, '2156LJ', 'Weteringbrug', 28992, 'POINT (104233.728 470722.139)');


insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Burgerveen', 'Leimuiderdijk', 259, null, null, '2154MP', 'Burgerveen', 28992, 'POINT (106848.012 472670.925)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Burgerveen', 'Leimuiderdijk', 263, null, null, '2154MP', 'Burgerveen', 28992, 'POINT (106830.004 472674.294)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Burgerveen', 'Leimuiderdijk', 266, null, null, '2154MP', 'Burgerveen', 28992, 'POINT (106821.839 472657.337)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Burgerveen', 'Leimuiderdijk', 267, null, null, '2154MP', 'Burgerveen', 28992, 'POINT (106818.815 472656.243)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Burgerveen', 'Leimuiderdijk', 268, null, null, '2154MP', 'Burgerveen', 28992, 'POINT (106815.792 472655.148)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Burgerveen', 'De Ruigehoek', 45, null, null, '2154MJ', 'Burgerveen', 28992, 'POINT (106928.853 472787.967)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes Dijk', 'Huigsloterdijk', 327, null, null, '2157LP', 'Abbenes', 28992, 'POINT (100042.71 470473.672)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes Dijk', 'Huigsloterdijk', 328, null, null, '2157LP', 'Abbenes', 28992, 'POINT (100015.193 470473.744)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes Omgeving', 'Hoofdweg', 1695, null, null, '2157MA', 'Abbenes', 28992, 'POINT (100049.785 471826.252)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes Omgeving', 'Hoofdweg', 1735, null, null, '2157MA', 'Abbenes', 28992, 'POINT (99683.876 471560.217)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes Omgeving', 'Hoofdweg', 1737, null, null, '2157MA', 'Abbenes', 28992, 'POINT (99679.163 471558.576)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes Omgeving', 'Hoofdweg', 1747, null, null, '2157MA', 'Abbenes', 28992, 'POINT (99588.397 471499.362)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes Omgeving', 'Hoofdweg', 1797, null, null, '2157MA', 'Abbenes', 28992, 'POINT (99105.5 471191.384)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Lisserdijk', 340, null, null, '2165AC', 'Lisserbroek', 28992, 'POINT (98997.905 473334.031)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Forsythiastraat', 64, null, null, '2165CH', 'Lisserbroek', 28992, 'POINT (99560.304 474335.132)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Forsythiastraat', 66, null, null, '2165CH', 'Lisserbroek', 28992, 'POINT (99548.409 474347.388)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Forsythiastraat', 68, null, null, '2165CH', 'Lisserbroek', 28992, 'POINT (99531.619 474345.935)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Forsythiastraat', 70, null, null, '2165CH', 'Lisserbroek', 28992, 'POINT (99514.188 474344.474)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Forsythiastraat', 72, null, null, '2165CH', 'Lisserbroek', 28992, 'POINT (99503.823 474352.672)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Lisdoddestraat', 1, null, null, '2165VA', 'Lisserbroek', 28992, 'POINT (99304.22 474579.898)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Lisdoddestraat', 3, null, null, '2165VA', 'Lisserbroek', 28992, 'POINT (99300.309 474575.704)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Lisdoddestraat', 5, null, null, '2165VA', 'Lisserbroek', 28992, 'POINT (99296.399 474571.51)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Dr. Heijelaan', 9, null, null, '2157NH', 'Abbenes', 28992, 'POINT (100588.091 471985.64)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Dr. Heijelaan', 11, null, null, '2157NH', 'Abbenes', 28992, 'POINT (100582.216 471962.493)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Dr. Heijelaan', 15, null, null, '2157NH', 'Abbenes', 28992, 'POINT (100586.962 471943.006)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Dr. Heijelaan', 17, null, null, '2157NH', 'Abbenes', 28992, 'POINT (100591.194 471917.273)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Omgeving', 'Rijnlanderweg', 1414, null, null, '2153KG', 'Nieuw-Vennep', 28992, 'POINT (104291.037 473116.091)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Dr. Heijelaan', 19, null, null, '2157NH', 'Abbenes', 28992, 'POINT (100584.113 471916.625)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Omgeving', 'Rijnlanderweg', 1430, null, null, '2153KG', 'Nieuw-Vennep', 28992, 'POINT (104117.674 472933.931)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Dr. Heijelaan', 21, null, null, '2157NH', 'Abbenes', 28992, 'POINT (100577.493 471916.174)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Lisdoddestraat', 7, null, null, '2165VA', 'Lisserbroek', 28992, 'POINT (99292.487 474567.317)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Dr. Heijelaan', 23, null, null, '2157NH', 'Abbenes', 28992, 'POINT (100570.702 471901.128)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Weteringbrug', 'Vuurbaak', 13, null, null, '2156LJ', 'Weteringbrug', 28992, 'POINT (104270.594 470722.538)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Venneperweg', 301, null, null, '2153MA', 'Nieuw-Vennep', 28992, 'POINT (104337.447 474807.115)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep ''t Kabel', '''t Kabel', 4, null, null, '2153MB', 'Nieuw-Vennep', 28992, 'POINT (105068.966 474101.749)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep ''t Kabel', '''t Kabel', 5, null, null, '2153MB', 'Nieuw-Vennep', 28992, 'POINT (105064.433 474105.732)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep ''t Kabel', '''t Kabel', 6, null, null, '2153MB', 'Nieuw-Vennep', 28992, 'POINT (105057.548 474111.897)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Hoofdweg', 1651, null, null, '2157PC', 'Abbenes', 28992, 'POINT (100466.931 472092.559)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Hoofdweg', 1653, null, null, '2157PC', 'Abbenes', 28992, 'POINT (100456.251 472085.171)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Hoofdweg', 1655, null, null, '2157PC', 'Abbenes', 28992, 'POINT (100451.874 472082.145)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Hoofdweg', 1657, null, null, '2157PC', 'Abbenes', 28992, 'POINT (100440.917 472074.181)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Lisserdijk', 449, null, null, '2165AG', 'Lisserbroek', 28992, 'POINT (99129.579 473981.906)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep ''t Kabel', '''t Kabel', 20, null, null, '2153MB', 'Nieuw-Vennep', 28992, 'POINT (104980.484 474178.285)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep ''t Kabel', '''t Kabel', 22, null, null, '2153MB', 'Nieuw-Vennep', 28992, 'POINT (104970.365 474189.346)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep ''t Kabel', '''t Kabel', 23, null, null, '2153MB', 'Nieuw-Vennep', 28992, 'POINT (104962.469 474192.052)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep ''t Kabel', '''t Kabel', 27, null, null, '2153MC', 'Nieuw-Vennep', 28992, 'POINT (104940.246 474223.596)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Hoofdweg', 1298, null, null, '2153LS', 'Nieuw-Vennep', 28992, 'POINT (103728.972 475554.293)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Hoofdweg', 1300, null, null, '2153LS', 'Nieuw-Vennep', 28992, 'POINT (103725.256 475549.993)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Langerak', 51, null, null, '2157PE', 'Abbenes', 28992, 'POINT (100347.625 472543.802)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Langerak', 53, null, null, '2157PE', 'Abbenes', 28992, 'POINT (100341.375 472544.141)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Langerak', 55, null, null, '2157PE', 'Abbenes', 28992, 'POINT (100335.313 472544.471)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Langerak', 57, null, null, '2157PE', 'Abbenes', 28992, 'POINT (100316.368 472544.696)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Langerak', 59, null, null, '2157PE', 'Abbenes', 28992, 'POINT (100316.714 472550.773)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Langerak', 61, null, null, '2157PE', 'Abbenes', 28992, 'POINT (100317.05 472556.663)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Langerak', 63, null, null, '2157PE', 'Abbenes', 28992, 'POINT (100317.41 472562.929)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Langerak', 65, null, null, '2157PE', 'Abbenes', 28992, 'POINT (100317.757 472569.007)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Langerak', 67, null, null, '2157PE', 'Abbenes', 28992, 'POINT (100318.103 472575.084)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Langerak', 2, null, null, '2157PG', 'Abbenes', 28992, 'POINT (100743.738 472334.658)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes Dijk', 'Huigsloterdijk', 162, null, null, '2157LM', 'Abbenes', 28992, 'POINT (102578.661 469958.308)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes Dijk', 'Huigsloterdijk', 163, null, null, '2157LM', 'Abbenes', 28992, 'POINT (102550.325 469950.851)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes Dijk', 'Huigsloterdijk', 164, null, null, '2157LM', 'Abbenes', 28992, 'POINT (102425.756 470084.097)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Omgeving', 'Rijnlanderweg', 1567, null, null, '2153KH', 'Nieuw-Vennep', 28992, 'POINT (103881.717 472740.164)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Lisdoddestraat', 24, null, null, '2165VB', 'Lisserbroek', 28992, 'POINT (99299.276 474532.546)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Omgeving', 'Rijnlanderweg', 1587, null, null, '2153KH', 'Nieuw-Vennep', 28992, 'POINT (103724.047 472585.848)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Lisdoddestraat', 26, null, null, '2165VB', 'Lisserbroek', 28992, 'POINT (99295.499 474528.077)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Omgeving', 'Rijnlanderweg', 1637, null, null, '2153KH', 'Nieuw-Vennep', 28992, 'POINT (103258.874 472065.711)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Omgeving', 'Rijnlanderweg', 1639, null, null, '2153KH', 'Nieuw-Vennep', 28992, 'POINT (103248.662 472053.763)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Lisdoddestraat', 28, null, null, '2165VB', 'Lisserbroek', 28992, 'POINT (99291.722 474523.608)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Omgeving', 'Rijnlanderweg', 1663, null, null, '2153KH', 'Nieuw-Vennep', 28992, 'POINT (103022.59 471814.447)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Lisdoddestraat', 30, null, null, '2165VB', 'Lisserbroek', 28992, 'POINT (99274.327 474514.11)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Noorderdreef', 50, null, null, '2153LL', 'Nieuw-Vennep', 28992, 'POINT (104192.669 475518.565)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Lisdoddestraat', 32, null, null, '2165VB', 'Lisserbroek', 28992, 'POINT (99270.241 474517.725)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Noorderdreef', 56, null, null, '2153LL', 'Nieuw-Vennep', 28992, 'POINT (104131.477 475574.677)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Lisdoddestraat', 34, null, null, '2165VB', 'Lisserbroek', 28992, 'POINT (99266.202 474521.3)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Noorderdreef', 58, null, null, '2153LL', 'Nieuw-Vennep', 28992, 'POINT (104117.03 475587.425)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Lisdoddestraat', 36, null, null, '2165VB', 'Lisserbroek', 28992, 'POINT (99262.189 474524.851)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Noorderdreef', 60, null, null, '2153LL', 'Nieuw-Vennep', 28992, 'POINT (104098.971 475603.359)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Lisdoddestraat', 38, null, null, '2165VB', 'Lisserbroek', 28992, 'POINT (99258.121 474528.451)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Noorderdreef', 62, null, null, '2153LL', 'Nieuw-Vennep', 28992, 'POINT (104086.648 475613.982)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Noorderdreef', 64, null, null, '2153LL', 'Nieuw-Vennep', 28992, 'POINT (104071.564 475627.367)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Dr. Heijelaan', 48, null, null, '2157NK', 'Abbenes', 28992, 'POINT (100620.266 471816.303)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Omgeving', 'Hoofdweg', 1128, null, null, '2153LN', 'Nieuw-Vennep', 28992, 'POINT (104649.695 476573.921)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Buitenkaag', 'Zweilandstraat', 33, null, null, '2158MD', 'Buitenkaag', 28992, 'POINT (98509.965 470453.613)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Burgerveen', 'De Ruigehoek', 51, null, null, '2154MJ', 'Burgerveen', 28992, 'POINT (106939.407 472778.616)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Burgerveen', 'De Ruigehoek', 53, null, null, '2154MJ', 'Burgerveen', 28992, 'POINT (106943.112 472775.333)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Burgerveen', 'De Ruigehoek', 55, null, null, '2154MJ', 'Burgerveen', 28992, 'POINT (106946.676 472772.174)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Burgerveen', 'De Ruigehoek', 57, null, null, '2154MJ', 'Burgerveen', 28992, 'POINT (106950.241 472769.016)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Cruquius Omgeving', 'Spieringweg', 636, null, null, '2142ED', 'Cruquius', 28992, 'POINT (105261.852 483363.441)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Cruquius Omgeving', 'Spieringweg', 640, null, null, '2142ED', 'Cruquius', 28992, 'POINT (105239.875 483329.928)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Omgeving', 'IJweg', 1730, null, null, '2151MP', 'Nieuw-Vennep', 28992, 'POINT (101245.122 475824.967)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Zeggegrasstraat', 7, null, null, '2165XE', 'Lisserbroek', 28992, 'POINT (99345.336 474957.446)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Lisdoddestraat', 40, null, null, '2165VB', 'Lisserbroek', 28992, 'POINT (99254.126 474531.986)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Lisdoddestraat', 42, null, null, '2165VB', 'Lisserbroek', 28992, 'POINT (99250.04 474535.602)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Lisdoddestraat', 44, null, null, '2165VB', 'Lisserbroek', 28992, 'POINT (99247.727 474541.128)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Lisdoddestraat', 46, null, null, '2165VB', 'Lisserbroek', 28992, 'POINT (99243.714 474544.68)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Forsythiastraat', 48, null, null, '2165CH', 'Lisserbroek', 28992, 'POINT (99662.258 474295.004)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Forsythiastraat', 50, null, null, '2165CH', 'Lisserbroek', 28992, 'POINT (99649.536 474290.683)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Forsythiastraat', 52, null, null, '2165CH', 'Lisserbroek', 28992, 'POINT (99636.813 474286.363)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Forsythiastraat', 54, null, null, '2165CH', 'Lisserbroek', 28992, 'POINT (99618.637 474284.315)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Forsythiastraat', 56, null, null, '2165CH', 'Lisserbroek', 28992, 'POINT (99603.946 474295.008)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Forsythiastraat', 58, null, null, '2165CH', 'Lisserbroek', 28992, 'POINT (99594.66 474306.475)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Hoofdweg', 1659, null, null, '2157PC', 'Abbenes', 28992, 'POINT (100435.265 472070.305)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Wilhelminahoeve', 'Lireweg', 31, null, null, '2153PH', 'Nieuw-Vennep', 28992, 'POINT (103705.115 474391.281)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Leimuiderbrug', 'Leimuiderdijk', 372, null, null, '2155MT', 'Leimuiderbrug', 28992, 'POINT (106035.363 471738.944)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Wilhelminahoeve', 'Lireweg', 32, null, null, '2153PH', 'Nieuw-Vennep', 28992, 'POINT (103378.442 474412.482)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes Dijk', 'Huigsloterdijk', 173, null, null, '2157LM', 'Abbenes', 28992, 'POINT (102463.598 469932.883)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Rietstraat', 16, null, null, '2165XW', 'Lisserbroek', 28992, 'POINT (99437.483 474663.707)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes Dijk', 'Huigsloterdijk', 174, null, null, '2157LM', 'Abbenes', 28992, 'POINT (102443.372 469931.517)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Rietstraat', 18, null, null, '2165XW', 'Lisserbroek', 28992, 'POINT (99433.287 474659.367)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Rietstraat', 20, null, null, '2165XW', 'Lisserbroek', 28992, 'POINT (99429.41 474654.832)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes Dijk', 'Huigsloterdijk', 175, null, null, '2157LM', 'Abbenes', 28992, 'POINT (102424.236 469933.447)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Rietstraat', 22, null, null, '2165XW', 'Lisserbroek', 28992, 'POINT (99425.394 474649.79)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes Dijk', 'Huigsloterdijk', 176, null, null, '2157LM', 'Abbenes', 28992, 'POINT (102412.007 469932.639)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Rietstraat', 24, null, null, '2165XW', 'Lisserbroek', 28992, 'POINT (99430.99 474644.842)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes Dijk', 'Huigsloterdijk', 177, null, null, '2157LM', 'Abbenes', 28992, 'POINT (102389.055 469930.687)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Rietstraat', 26, null, null, '2165XW', 'Lisserbroek', 28992, 'POINT (99436.585 474639.893)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes Dijk', 'Huigsloterdijk', 178, null, null, '2157LM', 'Abbenes', 28992, 'POINT (102383.448 469930.776)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Rietstraat', 28, null, null, '2165XW', 'Lisserbroek', 28992, 'POINT (99441.942 474635.173)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes Dijk', 'Huigsloterdijk', 218, null, null, '2157LM', 'Abbenes', 28992, 'POINT (101488.875 469956.251)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Rietstraat', 30, null, null, '2165XW', 'Lisserbroek', 28992, 'POINT (99447.787 474629.989)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes Dijk', 'Huigsloterdijk', 238, null, null, '2157LN', 'Abbenes', 28992, 'POINT (101095.456 470061.353)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Weteringbrug', 'Vuurbaak', 19, null, null, '2156LJ', 'Weteringbrug', 28992, 'POINT (104251.597 470742.316)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Omgeving', 'Rijnlanderweg', 1453, null, null, '2153KE', 'Nieuw-Vennep', 28992, 'POINT (104764.284 473745.175)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Langerak', 30, null, null, '2157PG', 'Abbenes', 28992, 'POINT (100664.978 472401.56)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Omgeving', 'Rijnlanderweg', 1350, null, null, '2153KG', 'Nieuw-Vennep', 28992, 'POINT (104783.123 473654.155)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Langerak', 32, null, null, '2157PG', 'Abbenes', 28992, 'POINT (100660.414 472405.674)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Omgeving', 'Rijnlanderweg', 1360, null, null, '2153KG', 'Nieuw-Vennep', 28992, 'POINT (104706.557 473558.983)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Langerak', 34, null, null, '2157PG', 'Abbenes', 28992, 'POINT (100653.169 472416.276)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Langerak', 36, null, null, '2157PG', 'Abbenes', 28992, 'POINT (100648.66 472420.318)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Omgeving', 'Rijnlanderweg', 1364, null, null, '2153KG', 'Nieuw-Vennep', 28992, 'POINT (104653.236 473520.591)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Langerak', 38, null, null, '2157PG', 'Abbenes', 28992, 'POINT (100644.095 472424.409)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Omgeving', 'Rijnlanderweg', 1374, null, null, '2153KG', 'Nieuw-Vennep', 28992, 'POINT (104583.437 473466.547)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Langerak', 40, null, null, '2157PG', 'Abbenes', 28992, 'POINT (100639.601 472428.436)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Omgeving', 'Rijnlanderweg', 1376, null, null, '2153KG', 'Nieuw-Vennep', 28992, 'POINT (104577.088 473459.491)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Omgeving', 'Rijnlanderweg', 1396, null, null, '2153KG', 'Nieuw-Vennep', 28992, 'POINT (104434.926 473291.217)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Langerak', 42, null, null, '2157PG', 'Abbenes', 28992, 'POINT (100595.122 472451.838)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Omgeving', 'Rijnlanderweg', 1434, null, null, '2153KG', 'Nieuw-Vennep', 28992, 'POINT (104075.843 472890.597)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Omgeving', 'Rijnlanderweg', 1474, null, null, '2153KG', 'Nieuw-Vennep', 28992, 'POINT (103742.832 472509.883)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Omgeving', 'Rijnlanderweg', 1479, null, null, '2153KG', 'Nieuw-Vennep', 28992, 'POINT (104582.015 473516.345)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Omgeving', 'Rijnlanderweg', 1481, null, null, '2153KG', 'Nieuw-Vennep', 28992, 'POINT (104578.688 473512.131)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Omgeving', 'Rijnlanderweg', 1483, null, null, '2153KG', 'Nieuw-Vennep', 28992, 'POINT (104575.075 473507.87)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Wilhelminahoeve', 'Lireweg', 68, null, null, '2153PH', 'Nieuw-Vennep', 28992, 'POINT (103422.435 474433.338)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Wilhelminahoeve', 'Lireweg', 70, null, null, '2153PH', 'Nieuw-Vennep', 28992, 'POINT (103430.581 474426.983)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Wilhelminahoeve', 'Lireweg', 72, null, null, '2153PH', 'Nieuw-Vennep', 28992, 'POINT (103434.655 474418.999)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Wilhelminahoeve', 'Lireweg', 74, null, null, '2153PH', 'Nieuw-Vennep', 28992, 'POINT (103438.565 474409.875)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Wilhelminahoeve', 'Hoofdweg', 1432, null, null, '2153NA', 'Nieuw-Vennep', 28992, 'POINT (103017.427 474743.004)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Wilhelminahoeve', 'Hoofdweg', 1450, null, null, '2153NA', 'Nieuw-Vennep', 28992, 'POINT (102822.954 474530.312)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Wilhelminahoeve', 'Hoofdweg', 1482, null, null, '2153NA', 'Nieuw-Vennep', 28992, 'POINT (102634.157 474251.649)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Omgeving', 'Hoofdweg', 1536, null, null, '2153NA', 'Nieuw-Vennep', 28992, 'POINT (102129.539 473765.005)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Omgeving', 'Hoofdweg', 1538, null, null, '2153NA', 'Nieuw-Vennep', 28992, 'POINT (102126.1 473760.713)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Langerak', 44, null, null, '2157PH', 'Abbenes', 28992, 'POINT (100489.881 472501.351)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Langerak', 46, null, null, '2157PH', 'Abbenes', 28992, 'POINT (100484.03 472501.626)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Langerak', 48, null, null, '2157PH', 'Abbenes', 28992, 'POINT (100471.729 472502.14)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Langerak', 50, null, null, '2157PH', 'Abbenes', 28992, 'POINT (100465.959 472502.481)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Langerak', 52, null, null, '2157PH', 'Abbenes', 28992, 'POINT (100411.88 472505.362)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Langerak', 54, null, null, '2157PH', 'Abbenes', 28992, 'POINT (100405.988 472505.671)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Langerak', 56, null, null, '2157PH', 'Abbenes', 28992, 'POINT (100393.762 472506.334)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes Dijk', 'Huigsloterdijk', 295, null, null, '2157LP', 'Abbenes', 28992, 'POINT (100389.962 470339.207)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes Dijk', 'Huigsloterdijk', 320, null, null, '2157LP', 'Abbenes', 28992, 'POINT (100104.528 470441.014)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes Dijk', 'Huigsloterdijk', 325, null, null, '2157LP', 'Abbenes', 28992, 'POINT (100053.088 470473.47)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes Dijk', 'Huigsloterdijk', 326, null, null, '2157LP', 'Abbenes', 28992, 'POINT (100047.863 470473.573)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Forsythiastraat', 60, null, null, '2165CH', 'Lisserbroek', 28992, 'POINT (99582.922 474316.515)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Forsythiastraat', 62, null, null, '2165CH', 'Lisserbroek', 28992, 'POINT (99573.369 474324.575)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Hillegommerdijk', 23, null, null, '2165AM', 'Lisserbroek', 28992, 'POINT (99216.184 475100.118)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Hillegommerdijk', 24, null, null, '2165AM', 'Lisserbroek', 28992, 'POINT (99215.638 475104.534)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Hillegommerdijk', 25, null, null, '2165AM', 'Lisserbroek', 28992, 'POINT (99219.396 475112.399)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Boekweitstraat', 142, null, null, '2153GL', 'Nieuw-Vennep', 28992, 'POINT (104847.482 475625.372)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Boekweitstraat', 144, null, null, '2153GL', 'Nieuw-Vennep', 28992, 'POINT (104841.121 475600.268)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Boekweitstraat', 146, null, null, '2153GL', 'Nieuw-Vennep', 28992, 'POINT (104844.455 475603.994)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Boekweitstraat', 148, null, null, '2153GL', 'Nieuw-Vennep', 28992, 'POINT (104847.789 475607.72)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Boekweitstraat', 150, null, null, '2153GL', 'Nieuw-Vennep', 28992, 'POINT (104867.969 475619.543)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Luzernestraat', 5, null, null, '2153GM', 'Nieuw-Vennep', 28992, 'POINT (104495.417 475279.097)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Lisserweg', 603, null, null, '2165AS', 'Lisserbroek', 28992, 'POINT (99380.444 475109.0)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Lisserweg', 605, null, null, '2165AS', 'Lisserbroek', 28992, 'POINT (99373.999 475102.092)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Lisserweg', 607, null, null, '2165AS', 'Lisserbroek', 28992, 'POINT (99367.556 475095.182)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Lisserweg', 609, null, null, '2165AS', 'Lisserbroek', 28992, 'POINT (99361.112 475088.273)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Lisserweg', 615, null, null, '2165AS', 'Lisserbroek', 28992, 'POINT (99286.611 475007.189)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Lisserweg', 617, null, null, '2165AS', 'Lisserbroek', 28992, 'POINT (99282.516 475002.754)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Lisserweg', 619, null, null, '2165AS', 'Lisserbroek', 28992, 'POINT (99278.593 474998.196)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Lisserweg', 621, null, null, '2165AS', 'Lisserbroek', 28992, 'POINT (99274.436 474994.036)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Lisserweg', 623, null, null, '2165AS', 'Lisserbroek', 28992, 'POINT (99270.193 474989.479)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Rietstraat', 32, null, null, '2165XW', 'Lisserbroek', 28992, 'POINT (99456.077 474637.228)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Hoofdweg', 1356, null, null, '2153LT', 'Nieuw-Vennep', 28992, 'POINT (103475.313 475260.025)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Hoofdweg', 1358, null, null, '2153LT', 'Nieuw-Vennep', 28992, 'POINT (103467.105 475257.744)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Hoofdweg', 1362, null, null, '2153LT', 'Nieuw-Vennep', 28992, 'POINT (103449.983 475245.321)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Hoofdweg', 1364, null, null, '2153LT', 'Nieuw-Vennep', 28992, 'POINT (103443.734 475231.249)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Hoofdweg', 1366, null, null, '2153LT', 'Nieuw-Vennep', 28992, 'POINT (103434.196 475224.666)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Hoofdweg', 1368, null, null, '2153LT', 'Nieuw-Vennep', 28992, 'POINT (103427.453 475216.272)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Hoofdweg', 1370, null, null, '2153LV', 'Nieuw-Vennep', 28992, 'POINT (103417.175 475203.023)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Hoofdweg', 1372, null, null, '2153LV', 'Nieuw-Vennep', 28992, 'POINT (103405.249 475186.488)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Hoofdweg', 1374, null, null, '2153LV', 'Nieuw-Vennep', 28992, 'POINT (103390.887 475172.377)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Hoofdweg', 1376, 'A', null, '2153LV', 'Nieuw-Vennep', 28992, 'POINT (103393.189 475156.072)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Hoofdweg', 1376, null, null, '2153LV', 'Nieuw-Vennep', 28992, 'POINT (103382.923 475162.054)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Omgeving', 'Hoofdweg', 1148, null, null, '2153LN', 'Nieuw-Vennep', 28992, 'POINT (104500.749 476411.742)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Omgeving', 'Hoofdweg', 1152, null, null, '2153LP', 'Nieuw-Vennep', 28992, 'POINT (104452.274 476337.914)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes Omgeving', 'Kaagweg', 19, null, null, '2157LH', 'Abbenes', 28992, 'POINT (102708.595 471447.589)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes Omgeving', 'Kaagweg', 20, null, null, '2157LH', 'Abbenes', 28992, 'POINT (102872.286 471550.212)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes Omgeving', 'Kaagweg', 21, null, null, '2157LH', 'Abbenes', 28992, 'POINT (102690.661 471413.952)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes Omgeving', 'Kaagweg', 29, null, null, '2157LH', 'Abbenes', 28992, 'POINT (102658.913 471384.53)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes Omgeving', 'Kaagweg', 31, null, null, '2157LH', 'Abbenes', 28992, 'POINT (102589.153 471355.629)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes Omgeving', 'Kaagweg', 33, null, null, '2157LH', 'Abbenes', 28992, 'POINT (102592.638 471337.66)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Omgeving', 'Rijnlanderweg', 1489, null, null, '2153KG', 'Nieuw-Vennep', 28992, 'POINT (104500.217 473439.042)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Hillegommerdijk', 48, null, null, '2165AN', 'Lisserbroek', 28992, 'POINT (99316.201 475266.205)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek Omgeving', 'Hillegommerdijk', 49, null, null, '2165AN', 'Lisserbroek', 28992, 'POINT (99313.345 475349.359)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Hillegommerdijk', 50, null, null, '2165AN', 'Lisserbroek', 28992, 'POINT (99193.867 475262.699)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Hillegommerdijk', 51, null, null, '2165AN', 'Lisserbroek', 28992, 'POINT (99192.976 475268.298)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Buitenkaag', 'Hoofdweg', 2030, null, null, '2158MC', 'Buitenkaag', 28992, 'POINT (98480.28 470637.436)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Buitenkaag', 'Hoofdweg', 2030, 'A', null, '2158MC', 'Buitenkaag', 28992, 'POINT (98458.88 470596.905)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Buitenkaag', 'Hoofdweg', 2032, null, null, '2158MC', 'Buitenkaag', 28992, 'POINT (98453.839 470573.603)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Omgeving', 'Rijnlanderweg', 1261, null, null, '2153KC', 'Nieuw-Vennep', 28992, 'POINT (106122.874 475406.754)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Omgeving', 'Rijnlanderweg', 1265, null, null, '2153KC', 'Nieuw-Vennep', 28992, 'POINT (106118.348 475287.59)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Buitenkaag', 'Hoofdweg', 2034, null, null, '2158MC', 'Buitenkaag', 28992, 'POINT (98422.406 470558.783)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Buitenkaag', 'Hoofdweg', 2036, null, null, '2158MC', 'Buitenkaag', 28992, 'POINT (98415.115 470594.996)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Omgeving', 'Rijnlanderweg', 1321, null, null, '2153KC', 'Nieuw-Vennep', 28992, 'POINT (105647.787 474723.307)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Buitenkaag', 'Hoofdweg', 2038, null, null, '2158MC', 'Buitenkaag', 28992, 'POINT (98380.455 470563.324)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Omgeving', 'Rijnlanderweg', 1252, null, null, '2153KD', 'Nieuw-Vennep', 28992, 'POINT (105565.024 474543.115)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Omgeving', 'Rijnlanderweg', 1254, null, null, '2153KD', 'Nieuw-Vennep', 28992, 'POINT (105533.64 474524.461)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Buitenkaag', 'Zweilandstraat', 1, null, null, '2158MD', 'Buitenkaag', 28992, 'POINT (98550.25 470646.238)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Buitenkaag', 'Zweilandstraat', 3, null, null, '2158MD', 'Buitenkaag', 28992, 'POINT (98552.903 470640.558)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Buitenkaag', 'Lisserdijk', 18, null, null, '2158LT', 'Buitenkaag', 28992, 'POINT (98183.568 470681.206)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Buitenkaag', 'Lisserdijk', 19, null, null, '2158LT', 'Buitenkaag', 28992, 'POINT (98181.211 470685.353)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Buitenkaag', 'Lisserdijk', 32, null, null, '2158LV', 'Buitenkaag', 28992, 'POINT (98138.81 470771.936)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Buitenkaag', 'Lisserdijk', 33, null, null, '2158LV', 'Buitenkaag', 28992, 'POINT (98135.943 470777.164)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Lisserdijk', 518, null, null, '2165AJ', 'Lisserbroek', 28992, 'POINT (99161.844 474391.083)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Buitenkaag', 'Lisserdijk', 34, null, null, '2158LV', 'Buitenkaag', 28992, 'POINT (98126.122 470786.716)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Lisserdijk', 521, null, null, '2165AJ', 'Lisserbroek', 28992, 'POINT (99163.765 474415.903)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Buitenkaag', 'Lisserdijk', 7, null, null, '2158LT', 'Buitenkaag', 28992, 'POINT (98269.326 470631.681)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Buitenkaag', 'Lisserdijk', 34, 'A', null, '2158LV', 'Buitenkaag', 28992, 'POINT (98124.191 470793.203)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Buitenkaag', 'Lisserdijk', 35, null, null, '2158LV', 'Buitenkaag', 28992, 'POINT (98122.334 470796.886)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Buitenkaag', 'Lisserdijk', 8, null, null, '2158LT', 'Buitenkaag', 28992, 'POINT (98263.262 470628.391)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Buitenkaag', 'Lisserdijk', 9, null, null, '2158LT', 'Buitenkaag', 28992, 'POINT (98257.198 470625.101)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Buitenkaag', 'Lisserdijk', 36, null, null, '2158LV', 'Buitenkaag', 28992, 'POINT (98113.378 470804.718)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Buitenkaag', 'Lisserdijk', 12, null, null, '2158LT', 'Buitenkaag', 28992, 'POINT (98239.005 470615.23)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Hoofdweg', 1613, null, null, '2157PB', 'Abbenes', 28992, 'POINT (100611.751 472192.586)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Buitenkaag', 'Lisserdijk', 15, null, null, '2158LT', 'Buitenkaag', 28992, 'POINT (98195.614 470659.566)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Hoofdweg', 1615, null, null, '2157PB', 'Abbenes', 28992, 'POINT (100603.628 472185.611)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Buitenkaag', 'Lisserdijk', 15, 'A', null, '2158LT', 'Buitenkaag', 28992, 'POINT (98208.648 470670.891)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Hoofdweg', 1619, null, null, '2157PB', 'Abbenes', 28992, 'POINT (100590.313 472178.217)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Buitenkaag', 'Huigsloterdijk', 359, null, null, '2158LR', 'Buitenkaag', 28992, 'POINT (98964.112 470315.823)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Hoofdweg', 1623, null, null, '2157PB', 'Abbenes', 28992, 'POINT (100573.776 472169.434)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Buitenkaag', 'Huigsloterdijk', 360, null, null, '2158LR', 'Buitenkaag', 28992, 'POINT (98941.698 470322.383)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Velperpoort', 20, null, null, '2152RT', 'Nieuw-Vennep', 28992, 'POINT (102591.638 477028.483)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Bosstraat', 75, null, null, '2153AL', 'Nieuw-Vennep', 28992, 'POINT (103969.423 475205.075)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Velperpoort', 22, null, null, '2152RT', 'Nieuw-Vennep', 28992, 'POINT (102595.501 477032.796)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Haverstraat', 14, 'A', null, '2153SB', 'Nieuw-Vennep', 28992, 'POINT (104089.827 475831.597)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Velperpoort', 24, null, null, '2152RT', 'Nieuw-Vennep', 28992, 'POINT (102599.364 477037.109)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Burgerveen', 'Venneperweg', 30, null, null, '2154ME', 'Burgerveen', 28992, 'POINT (106483.246 472819.775)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Velperpoort', 26, null, null, '2152RT', 'Nieuw-Vennep', 28992, 'POINT (102603.226 477041.422)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Burgerveen', 'Venneperweg', 65, null, null, '2154ME', 'Burgerveen', 28992, 'POINT (106287.27 473084.959)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Velperpoort', 28, null, null, '2152RT', 'Nieuw-Vennep', 28992, 'POINT (102607.089 477045.735)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Burgerveen', 'Venneperweg', 67, null, null, '2154ME', 'Burgerveen', 28992, 'POINT (106251.804 473116.858)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Velperpoort', 30, null, null, '2152RT', 'Nieuw-Vennep', 28992, 'POINT (102611.449 477048.647)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Velperpoort', 32, null, null, '2152RT', 'Nieuw-Vennep', 28992, 'POINT (102615.169 477052.803)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Burgerveen', 'Aalsmeerderweg', 938, null, null, '2154ME', 'Burgerveen', 28992, 'POINT (106727.221 472818.086)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Papaverstraat', 63, null, null, '2153BB', 'Nieuw-Vennep', 28992, 'POINT (103840.587 475097.796)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Wikkestraat', 71, null, null, '2153CE', 'Nieuw-Vennep', 28992, 'POINT (103769.897 474812.714)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Wikkestraat', 25, null, null, '2153CD', 'Nieuw-Vennep', 28992, 'POINT (103819.77 474938.041)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Wikkestraat', 73, null, null, '2153CE', 'Nieuw-Vennep', 28992, 'POINT (103774.694 474808.446)');


insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Boekweitstraat', 15, null, null, '2153GK', 'Nieuw-Vennep', 28992, 'POINT (104619.797 475372.868)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Bosstraat', 138, null, null, '2153AR', 'Nieuw-Vennep', 28992, 'POINT (104031.822 475192.352)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Luzernestraat', 4, null, null, '2153GN', 'Nieuw-Vennep', 28992, 'POINT (104565.667 475298.987)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Luzernestraat', 6, null, null, '2153GN', 'Nieuw-Vennep', 28992, 'POINT (104601.848 475327.352)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Luzernestraat', 8, null, null, '2153GN', 'Nieuw-Vennep', 28992, 'POINT (104615.362 475341.032)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Luzernestraat', 10, null, null, '2153GN', 'Nieuw-Vennep', 28992, 'POINT (104633.066 475361.261)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Luzernestraat', 12, null, null, '2153GN', 'Nieuw-Vennep', 28992, 'POINT (104646.458 475375.939)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Luzernestraat', 14, null, null, '2153GN', 'Nieuw-Vennep', 28992, 'POINT (104641.75 475421.572)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Luzernestraat', 16, null, null, '2153GN', 'Nieuw-Vennep', 28992, 'POINT (104656.456 475397.441)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Buitenkaag', 'Lisserdijk', 26, null, null, '2158LT', 'Buitenkaag', 28992, 'POINT (98163.923 470726.167)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Lisserdijk', 563, null, null, '2165AL', 'Lisserbroek', 28992, 'POINT (99223.828 474723.223)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Dopheidestraat', 122, null, null, '2165VT', 'Lisserbroek', 28992, 'POINT (99354.785 474470.532)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Lisserdijk', 567, null, null, '2165AL', 'Lisserbroek', 28992, 'POINT (99200.751 474741.562)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Dopheidestraat', 124, null, null, '2165VT', 'Lisserbroek', 28992, 'POINT (99333.066 474489.205)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Kerkstraat', 56, null, null, '2153BK', 'Nieuw-Vennep', 28992, 'POINT (103729.075 475124.811)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Kerkstraat', 58, null, null, '2153BK', 'Nieuw-Vennep', 28992, 'POINT (103735.174 475119.394)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Kerkstraat', 60, null, null, '2153BK', 'Nieuw-Vennep', 28992, 'POINT (103746.676 475109.213)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Kerkstraat', 62, null, null, '2153BK', 'Nieuw-Vennep', 28992, 'POINT (103752.724 475103.84)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Kerkstraat', 64, null, null, '2153BK', 'Nieuw-Vennep', 28992, 'POINT (103764.15 475093.688)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Kerkstraat', 66, null, null, '2153BK', 'Nieuw-Vennep', 28992, 'POINT (103770.159 475088.352)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Kerkstraat', 68, null, null, '2153BK', 'Nieuw-Vennep', 28992, 'POINT (103781.706 475078.013)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Bosstraat', 140, null, null, '2153AS', 'Nieuw-Vennep', 28992, 'POINT (104042.332 475206.123)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Stadhouderspoort', 53, null, null, '2152RV', 'Nieuw-Vennep', 28992, 'POINT (102632.903 477123.296)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Papaverstraat', 7, null, null, '2153BB', 'Nieuw-Vennep', 28992, 'POINT (103681.707 475237.909)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Stadhouderspoort', 55, null, null, '2152RV', 'Nieuw-Vennep', 28992, 'POINT (102636.695 477127.081)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Papaverstraat', 9, null, null, '2153BB', 'Nieuw-Vennep', 28992, 'POINT (103686.384 475233.792)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Stadhouderspoort', 57, null, null, '2152RV', 'Nieuw-Vennep', 28992, 'POINT (102640.487 477130.865)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Bosstraat', 83, null, null, '2153AL', 'Nieuw-Vennep', 28992, 'POINT (103987.228 475189.257)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Cruquius', 'Cruquiuszoom', 37, null, null, '2142EW', 'Cruquius', 28992, 'POINT (103133.226 482965.893)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Rustoordstraat', 18, null, null, '2153AG', 'Nieuw-Vennep', 28992, 'POINT (103754.7 475415.304)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen', 'Broekemastraat', 19, null, null, '2152XB', 'Nieuw-Vennep', 28992, 'POINT (103466.966 475822.493)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Tarantella', 1, null, null, '2152SG', 'Nieuw-Vennep', 28992, 'POINT (103207.604 477150.108)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Eilandstraat', 12, null, null, '2153AH', 'Nieuw-Vennep', 28992, 'POINT (103793.441 475517.686)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen', 'Broekemastraat', 21, null, null, '2152XB', 'Nieuw-Vennep', 28992, 'POINT (103462.719 475826.257)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Tarantella', 2, null, null, '2152SG', 'Nieuw-Vennep', 28992, 'POINT (103241.202 477115.852)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen', 'Broekemastraat', 23, null, null, '2152XB', 'Nieuw-Vennep', 28992, 'POINT (103458.191 475830.269)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Cruquius', 'Cruquiuszoom', 13, null, null, '2142EW', 'Cruquius', 28992, 'POINT (103279.421 482829.138)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen', 'Broekemastraat', 25, null, null, '2152XB', 'Nieuw-Vennep', 28992, 'POINT (103453.804 475834.157)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Boekweitstraat', 52, null, null, '2153GL', 'Nieuw-Vennep', 28992, 'POINT (104604.148 475645.717)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Eilandstraat', 14, null, null, '2153AH', 'Nieuw-Vennep', 28992, 'POINT (103799.931 475527.475)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen', 'Broekemastraat', 27, null, null, '2152XC', 'Nieuw-Vennep', 28992, 'POINT (103446.349 475834.583)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Boekweitstraat', 54, null, null, '2153GL', 'Nieuw-Vennep', 28992, 'POINT (104623.582 475666.339)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Wilhelminahoeve', 'Pondweg', 2, null, null, '2153PK', 'Nieuw-Vennep', 28992, 'POINT (103567.63 474196.449)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Hoefbladstraat', 24, 'A', null, '2153EX', 'Nieuw-Vennep', 28992, 'POINT (103292.687 474975.526)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Weegbreestraat', 40, null, null, '2153ED', 'Nieuw-Vennep', 28992, 'POINT (103620.857 474685.258)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Wilhelminahoeve', 'Pondweg', 4, null, null, '2153PK', 'Nieuw-Vennep', 28992, 'POINT (103544.087 474197.196)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Weegbreestraat', 42, null, null, '2153ED', 'Nieuw-Vennep', 28992, 'POINT (103606.157 474694.415)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Hoefbladstraat', 25, null, null, '2153EX', 'Nieuw-Vennep', 28992, 'POINT (103351.922 474975.475)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Wilhelminahoeve', 'Pondweg', 6, null, null, '2153PK', 'Nieuw-Vennep', 28992, 'POINT (103573.983 474211.77)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Kerkstraat', 107, null, null, '2153BG', 'Nieuw-Vennep', 28992, 'POINT (103869.339 474957.666)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Velperpoort', 57, null, null, '2152RS', 'Nieuw-Vennep', 28992, 'POINT (102698.334 477093.498)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Kerkstraat', 109, null, null, '2153BG', 'Nieuw-Vennep', 28992, 'POINT (103873.066 474954.345)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Velperpoort', 2, null, null, '2152RT', 'Nieuw-Vennep', 28992, 'POINT (102558.828 476993.641)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Hondsdrafstraat', 24, null, null, '2153CK', 'Nieuw-Vennep', 28992, 'POINT (103830.049 474796.618)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Venneperweg', 463, null, null, '2153AD', 'Nieuw-Vennep', 28992, 'POINT (103743.298 475344.273)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Klaverveld', 11, null, null, '2153EG', 'Nieuw-Vennep', 28992, 'POINT (103661.201 474723.39)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Venneperweg', 467, null, null, '2153AD', 'Nieuw-Vennep', 28992, 'POINT (103714.016 475374.864)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Hondsdrafstraat', 26, null, null, '2153CK', 'Nieuw-Vennep', 28992, 'POINT (103826.026 474792.076)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Klaverveld', 12, null, null, '2153EG', 'Nieuw-Vennep', 28992, 'POINT (103687.984 474706.464)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Venneperweg', 469, null, null, '2153AD', 'Nieuw-Vennep', 28992, 'POINT (103703.346 475384.606)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Klaverveld', 13, null, null, '2153EG', 'Nieuw-Vennep', 28992, 'POINT (103656.898 474718.565)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Weegbreestraat', 124, null, null, '2153EE', 'Nieuw-Vennep', 28992, 'POINT (103533.839 474763.291)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Kerkstraat', 46, null, null, '2153BK', 'Nieuw-Vennep', 28992, 'POINT (103682.536 475166.182)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Weegbreestraat', 126, null, null, '2153EE', 'Nieuw-Vennep', 28992, 'POINT (103517.558 474772.114)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Van Tolstraat', 18, null, null, '2157PJ', 'Abbenes', 28992, 'POINT (100513.369 472489.233)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Kerkstraat', 48, null, null, '2153BK', 'Nieuw-Vennep', 28992, 'POINT (103694.046 475155.888)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Weegbreestraat', 3, null, null, '2153EA', 'Nieuw-Vennep', 28992, 'POINT (103733.166 474673.113)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Kerkstraat', 50, null, null, '2153BK', 'Nieuw-Vennep', 28992, 'POINT (103700.06 475150.583)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Van Tolstraat', 20, null, null, '2157PJ', 'Abbenes', 28992, 'POINT (100513.729 472495.23)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Korenaarstraat', 10, 'A', null, '2153BM', 'Nieuw-Vennep', 28992, 'POINT (103694.367 475300.083)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Bosstraat', 226, null, null, '2153AV', 'Nieuw-Vennep', 28992, 'POINT (104133.092 475181.363)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Bosstraat', 228, null, null, '2153AV', 'Nieuw-Vennep', 28992, 'POINT (104137.078 475185.86)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Korenaarstraat', 10, 'B', null, '2153BM', 'Nieuw-Vennep', 28992, 'POINT (103699.981 475294.218)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Bosstraat', 230, null, null, '2153AV', 'Nieuw-Vennep', 28992, 'POINT (104141.002 475190.287)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Korenaarstraat', 10, 'C', null, '2153BM', 'Nieuw-Vennep', 28992, 'POINT (103705.203 475288.733)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Bosstraat', 232, null, null, '2153AV', 'Nieuw-Vennep', 28992, 'POINT (104157.696 475197.625)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Korenaarstraat', 42, null, null, '2153BL', 'Nieuw-Vennep', 28992, 'POINT (103615.269 475189.679)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Bosstraat', 234, null, null, '2153AV', 'Nieuw-Vennep', 28992, 'POINT (104162.18 475193.65)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Bosstraat', 236, null, null, '2153AV', 'Nieuw-Vennep', 28992, 'POINT (104166.636 475189.697)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Maria Margaretalaan', 24, null, null, '2157NN', 'Abbenes', 28992, 'POINT (100675.639 471798.915)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Hoefbladstraat', 12, null, null, '2153EX', 'Nieuw-Vennep', 28992, 'POINT (103314.022 474952.377)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Maria Margaretalaan', 26, null, null, '2157NN', 'Abbenes', 28992, 'POINT (100678.279 471808.709)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Burgerveen', 'Oude Venneperweg', 8, null, null, '2154MG', 'Burgerveen', 28992, 'POINT (106697.224 472658.791)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Maria Margaretalaan', 28, null, null, '2157NN', 'Abbenes', 28992, 'POINT (100677.855 471814.823)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Hoefbladstraat', 13, null, null, '2153EX', 'Nieuw-Vennep', 28992, 'POINT (103320.176 474999.032)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Bosstraat', 142, null, null, '2153AS', 'Nieuw-Vennep', 28992, 'POINT (104046.326 475210.665)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Bosstraat', 144, null, null, '2153AS', 'Nieuw-Vennep', 28992, 'POINT (104050.283 475215.162)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Bosstraat', 146, null, null, '2153AS', 'Nieuw-Vennep', 28992, 'POINT (104054.216 475219.634)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Bosstraat', 148, null, null, '2153AS', 'Nieuw-Vennep', 28992, 'POINT (104058.194 475224.159)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Bosstraat', 150, null, null, '2153AS', 'Nieuw-Vennep', 28992, 'POINT (104062.111 475228.612)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Bosstraat', 152, null, null, '2153AS', 'Nieuw-Vennep', 28992, 'POINT (104066.107 475233.155)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Bosstraat', 154, null, null, '2153AS', 'Nieuw-Vennep', 28992, 'POINT (104070.063 475237.653)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Muntstraat', 174, null, null, '2165VW', 'Lisserbroek', 28992, 'POINT (99273.317 474723.018)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Burgerveen', 'Oude Venneperweg', 19, null, null, '2154MG', 'Burgerveen', 28992, 'POINT (106677.057 472739.192)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Venneperweg', 256, null, null, '2153AE', 'Nieuw-Vennep', 28992, 'POINT (104052.895 475012.658)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Weegbreestraat', 72, null, null, '2153ED', 'Nieuw-Vennep', 28992, 'POINT (103581.59 474722.642)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Venneperweg', 258, null, null, '2153AE', 'Nieuw-Vennep', 28992, 'POINT (104048.119 475018.642)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Weegbreestraat', 74, null, null, '2153ED', 'Nieuw-Vennep', 28992, 'POINT (103588.632 474716.635)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'De Regtstraat', 3, null, null, '2157PK', 'Abbenes', 28992, 'POINT (100463.299 472425.855)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Calypso', 2, null, null, '2152TA', 'Nieuw-Vennep', 28992, 'POINT (102838.897 477474.682)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Weegbreestraat', 15, null, null, '2153EA', 'Nieuw-Vennep', 28992, 'POINT (103698.269 474663.857)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'De Regtstraat', 4, null, null, '2157PK', 'Abbenes', 28992, 'POINT (100428.515 472426.34)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Weegbreestraat', 17, null, null, '2153EA', 'Nieuw-Vennep', 28992, 'POINT (103693.602 474668.028)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Calypso', 4, null, null, '2152TA', 'Nieuw-Vennep', 28992, 'POINT (102824.211 477459.996)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Weegbreestraat', 19, null, null, '2153EA', 'Nieuw-Vennep', 28992, 'POINT (103688.937 474672.199)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'De Regtstraat', 5, null, null, '2157PK', 'Abbenes', 28992, 'POINT (100463.878 472436.514)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Bosstraat', 118, null, null, '2153AR', 'Nieuw-Vennep', 28992, 'POINT (104033.693 475245.736)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Bosstraat', 120, null, null, '2153AR', 'Nieuw-Vennep', 28992, 'POINT (104030.462 475240.78)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Bosstraat', 122, null, null, '2153AR', 'Nieuw-Vennep', 28992, 'POINT (104027.166 475235.725)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Bosstraat', 124, null, null, '2153AR', 'Nieuw-Vennep', 28992, 'POINT (104023.902 475230.721)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Bosstraat', 126, null, null, '2153AR', 'Nieuw-Vennep', 28992, 'POINT (104020.655 475225.745)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Bosstraat', 128, null, null, '2153AR', 'Nieuw-Vennep', 28992, 'POINT (104009.454 475212.299)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Boekweitstraat', 64, null, null, '2153GL', 'Nieuw-Vennep', 28992, 'POINT (104657.256 475636.157)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Boekweitstraat', 66, null, null, '2153GL', 'Nieuw-Vennep', 28992, 'POINT (104661.803 475641.238)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Nachtschadestraat', 46, null, null, '2153EM', 'Nieuw-Vennep', 28992, 'POINT (103617.245 474813.654)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Nachtschadestraat', 48, null, null, '2153EM', 'Nieuw-Vennep', 28992, 'POINT (103622.393 474819.399)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Nachtschadestraat', 50, null, null, '2153EM', 'Nieuw-Vennep', 28992, 'POINT (103627.455 474825.094)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Nachtschadestraat', 52, null, null, '2153EM', 'Nieuw-Vennep', 28992, 'POINT (103608.309 474842.677)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Nachtschadestraat', 54, null, null, '2153EM', 'Nieuw-Vennep', 28992, 'POINT (103593.737 474820.112)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Nachtschadestraat', 56, null, null, '2153EM', 'Nieuw-Vennep', 28992, 'POINT (103588.038 474825.187)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Buitenkaag', 'Huigsloterdijk', 374, 'A', null, '2158LR', 'Buitenkaag', 28992, 'POINT (98707.125 470374.133)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Stadhouderspoort', 46, null, null, '2152RW', 'Nieuw-Vennep', 28992, 'POINT (102579.733 477112.633)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Kerkstraat', 121, null, null, '2153BH', 'Nieuw-Vennep', 28992, 'POINT (103895.281 474934.55)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Kerkstraat', 123, null, null, '2153BH', 'Nieuw-Vennep', 28992, 'POINT (103899.149 474931.105)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Stadhouderspoort', 48, null, null, '2152RW', 'Nieuw-Vennep', 28992, 'POINT (102583.774 477117.146)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Kerkstraat', 125, null, null, '2153BH', 'Nieuw-Vennep', 28992, 'POINT (103902.875 474927.785)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Wikkestraat', 53, null, null, '2153CD', 'Nieuw-Vennep', 28992, 'POINT (103747.466 474834.332)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Hoofdweg', 1812, null, null, '2157ND', 'Abbenes', 28992, 'POINT (100345.386 471903.388)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Korenaarstraat', 34, null, null, '2153BL', 'Nieuw-Vennep', 28992, 'POINT (103590.301 475192.375)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Sophialaan', 17, null, null, '2157NE', 'Abbenes', 28992, 'POINT (100524.786 471983.671)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Korenaarstraat', 36, null, null, '2153BL', 'Nieuw-Vennep', 28992, 'POINT (103603.564 475199.626)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Korenaarstraat', 38, null, null, '2153BL', 'Nieuw-Vennep', 28992, 'POINT (103607.466 475196.311)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes Omgeving', 'Hoofdweg', 1880, null, null, '2157ND', 'Abbenes', 28992, 'POINT (99769.082 471499.323)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Korenaarstraat', 40, null, null, '2153BL', 'Nieuw-Vennep', 28992, 'POINT (103611.368 475192.995)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Ridderspoorstraat', 19, null, null, '2153BT', 'Nieuw-Vennep', 28992, 'POINT (103788.25 475001.413)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Sophialaan', 63, null, null, '2157NE', 'Abbenes', 28992, 'POINT (100570.833 471840.044)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Kerkstraat', 131, null, null, '2153BH', 'Nieuw-Vennep', 28992, 'POINT (103917.227 474917.877)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Ridderspoorstraat', 21, null, null, '2153BT', 'Nieuw-Vennep', 28992, 'POINT (103784.001 474996.654)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Sophialaan', 65, null, null, '2157NE', 'Abbenes', 28992, 'POINT (100576.914 471840.442)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen', 'Broekemastraat', 39, null, null, '2152XC', 'Nieuw-Vennep', 28992, 'POINT (103420.024 475857.912)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Rustoordstraat', 1, null, null, '2153AG', 'Nieuw-Vennep', 28992, 'POINT (103733.335 475349.992)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen', 'Broekemastraat', 41, null, null, '2152XC', 'Nieuw-Vennep', 28992, 'POINT (103418.774 475865.06)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Lisserdijk', 321, null, null, '2165AB', 'Lisserbroek', 28992, 'POINT (98957.096 473181.349)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Rustoordstraat', 3, 'D', null, '2153AG', 'Nieuw-Vennep', 28992, 'POINT (103746.4 475364.573)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen', 'Broekemastraat', 43, null, null, '2152XC', 'Nieuw-Vennep', 28992, 'POINT (103414.247 475869.071)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Lisserdijk', 322, null, null, '2165AB', 'Lisserbroek', 28992, 'POINT (98967.495 473188.77)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Ridderspoorstraat', 3, null, null, '2153BT', 'Nieuw-Vennep', 28992, 'POINT (103855.748 475076.497)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Klaproosstraat', 93, null, null, '2153CP', 'Nieuw-Vennep', 28992, 'POINT (103903.323 474988.411)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Wikkestraat', 52, null, null, '2153CH', 'Nieuw-Vennep', 28992, 'POINT (103839.245 474848.708)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Wikkestraat', 16, null, null, '2153CG', 'Nieuw-Vennep', 28992, 'POINT (103856.003 474875.15)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Ridderspoorstraat', 5, null, null, '2153BT', 'Nieuw-Vennep', 28992, 'POINT (103851.714 475071.958)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Hondsdrafstraat', 25, null, null, '2153CJ', 'Nieuw-Vennep', 28992, 'POINT (103774.517 474781.886)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Wikkestraat', 18, null, null, '2153CG', 'Nieuw-Vennep', 28992, 'POINT (103852.283 474878.458)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Hondsdrafstraat', 27, null, null, '2153CJ', 'Nieuw-Vennep', 28992, 'POINT (103770.385 474777.188)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Ridderspoorstraat', 7, null, null, '2153BT', 'Nieuw-Vennep', 28992, 'POINT (103844.11 475063.278)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Wikkestraat', 20, null, null, '2153CG', 'Nieuw-Vennep', 28992, 'POINT (103848.492 474881.829)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Hondsdrafstraat', 29, null, null, '2153CJ', 'Nieuw-Vennep', 28992, 'POINT (103766.254 474772.49)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Ridderspoorstraat', 9, null, null, '2153BT', 'Nieuw-Vennep', 28992, 'POINT (103840.22 475058.833)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Korenaarstraat', 26, null, null, '2153BM', 'Nieuw-Vennep', 28992, 'POINT (103630.761 475227.944)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Langerak', 31, null, null, '2157PD', 'Abbenes', 28992, 'POINT (100430.795 472539.727)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Distelstraat', 13, null, null, '2153CB', 'Nieuw-Vennep', 28992, 'POINT (103925.881 474864.88)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Korenaarstraat', 28, null, null, '2153BM', 'Nieuw-Vennep', 28992, 'POINT (103621.807 475221.879)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Distelstraat', 15, null, null, '2153CB', 'Nieuw-Vennep', 28992, 'POINT (103896.773 474832.235)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes Omgeving', 'Hoofdweg', 1545, null, null, '2157PA', 'Abbenes', 28992, 'POINT (100871.195 472483.488)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Korenaarstraat', 30, null, null, '2153BM', 'Nieuw-Vennep', 28992, 'POINT (103627.237 475216.932)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Distelstraat', 17, null, null, '2153CB', 'Nieuw-Vennep', 28992, 'POINT (103890.667 474825.344)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Carmenlaan', 26, null, null, '2152JN', 'Nieuw-Vennep', 28992, 'POINT (102943.861 476779.117)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Zwanenburg Noordoost', 'Kerkhoflaan', 36, null, null, '1161JD', 'Zwanenburg', 28992, 'POINT (111596.776 488190.39)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Zwanenburg Oost', 'IJweg', 142, null, null, '1161GD', 'Zwanenburg', 28992, 'POINT (111577.576 487395.567)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Carmenlaan', 28, null, null, '2152JN', 'Nieuw-Vennep', 28992, 'POINT (102938.957 476781.403)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Zwanenburg Noordoost', 'Kerkhoflaan', 38, null, null, '1161JD', 'Zwanenburg', 28992, 'POINT (111591.986 488185.044)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Rigolettosingel', 50, null, null, '2152PR', 'Nieuw-Vennep', 28992, 'POINT (103086.5 476934.488)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Zwanenburg Oost', 'IJweg', 144, null, null, '1161GD', 'Zwanenburg', 28992, 'POINT (111573.921 487391.46)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Zwanenburg Noordoost', 'Kerkhoflaan', 40, null, null, '1161JD', 'Zwanenburg', 28992, 'POINT (111583.154 488178.281)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Rigolettosingel', 52, null, null, '2152PR', 'Nieuw-Vennep', 28992, 'POINT (103079.593 476938.618)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Zwanenburg Zuidoost', 'Dennenlaan', 164, null, null, '1161CV', 'Zwanenburg', 28992, 'POINT (111389.779 487569.163)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Zwanenburg Noordoost', 'Kerkhoflaan', 42, null, null, '1161JD', 'Zwanenburg', 28992, 'POINT (111577.139 488170.564)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Zwanenburg West', 'Kinheim', 156, null, null, '1161DE', 'Zwanenburg', 28992, 'POINT (110393.05 488420.346)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Zwanenburg Zuidoost', 'Essenlaan', 50, null, null, '1161EG', 'Zwanenburg', 28992, 'POINT (111616.748 487640.391)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Zwanenburg Zuidoost', 'Esdoornlaan', 22, null, null, '1161JJ', 'Zwanenburg', 28992, 'POINT (111422.085 487860.014)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Zwanenburg West', 'Kinheim', 158, null, null, '1161DE', 'Zwanenburg', 28992, 'POINT (110397.26 488425.218)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Zwanenburg Zuidoost', 'Essenlaan', 52, null, null, '1161EG', 'Zwanenburg', 28992, 'POINT (111621.523 487636.19)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Zwanenburg Zuidoost', 'Esdoornlaan', 24, null, null, '1161JJ', 'Zwanenburg', 28992, 'POINT (111416.517 487853.993)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Zwanenburg West', 'Kinheim', 160, null, null, '1161DE', 'Zwanenburg', 28992, 'POINT (110401.47 488430.091)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Zwanenburg Zuidoost', 'Essenlaan', 54, null, null, '1161EG', 'Zwanenburg', 28992, 'POINT (111626.251 487632.027)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Zwanenburg West', 'Kinheim', 162, null, null, '1161DE', 'Zwanenburg', 28992, 'POINT (110405.682 488434.965)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Stadhouderspoort', 50, null, null, '2152RW', 'Nieuw-Vennep', 28992, 'POINT (102587.816 477121.66)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Buitenkaag', 'Huigsloterdijk', 374, 'B', null, '2158LR', 'Buitenkaag', 28992, 'POINT (98687.917 470380.918)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Kerkstraat', 127, null, null, '2153BH', 'Nieuw-Vennep', 28992, 'POINT (103906.601 474924.465)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Nachtschadestraat', 35, null, null, '2153EJ', 'Nieuw-Vennep', 28992, 'POINT (103541.254 474838.816)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Maria Margaretalaan', 12, null, null, '2157NN', 'Abbenes', 28992, 'POINT (100671.246 471754.175)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Nachtschadestraat', 37, null, null, '2153EJ', 'Nieuw-Vennep', 28992, 'POINT (103537.069 474834.148)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Kerkstraat', 129, null, null, '2153BH', 'Nieuw-Vennep', 28992, 'POINT (103910.328 474921.145)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Kerkstraat', 63, null, null, '2153BE', 'Nieuw-Vennep', 28992, 'POINT (103725.63 475090.372)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Nachtschadestraat', 39, null, null, '2153EJ', 'Nieuw-Vennep', 28992, 'POINT (103532.883 474829.479)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Maria Margaretalaan', 14, null, null, '2157NN', 'Abbenes', 28992, 'POINT (100677.048 471754.57)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Kerkstraat', 65, null, null, '2153BE', 'Nieuw-Vennep', 28992, 'POINT (103730.21 475086.301)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Nachtschadestraat', 41, null, null, '2153EJ', 'Nieuw-Vennep', 28992, 'POINT (103528.823 474824.951)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Maria Margaretalaan', 16, null, null, '2157NN', 'Abbenes', 28992, 'POINT (100677.415 471774.409)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Maria Margaretalaan', 18, null, null, '2157NN', 'Abbenes', 28992, 'POINT (100676.971 471780.536)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Kerkstraat', 133, null, null, '2153BH', 'Nieuw-Vennep', 28992, 'POINT (103921.085 474914.45)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Ridderspoorstraat', 23, null, null, '2153BT', 'Nieuw-Vennep', 28992, 'POINT (103779.501 474991.615)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Sophialaan', 67, null, null, '2157NE', 'Abbenes', 28992, 'POINT (100582.994 471840.84)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Ridderspoorstraat', 25, null, null, '2153BT', 'Nieuw-Vennep', 28992, 'POINT (103771.457 474986.037)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes Dijk', 'Huigsloterdijk', 254, null, null, '2157LN', 'Abbenes', 28992, 'POINT (100966.28 470112.131)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Kerkstraat', 135, null, null, '2153BH', 'Nieuw-Vennep', 28992, 'POINT (103924.8 474911.15)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Rustoordstraat', 3, 'A', null, '2153AG', 'Nieuw-Vennep', 28992, 'POINT (103739.246 475356.197)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen', 'Broekemastraat', 45, null, null, '2152XC', 'Nieuw-Vennep', 28992, 'POINT (103409.86 475872.959)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Van Voorstlaan', 7, null, null, '2157PM', 'Abbenes', 28992, 'POINT (100307.961 472444.661)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Boekweitstraat', 46, null, null, '2153GL', 'Nieuw-Vennep', 28992, 'POINT (104621.318 475630.452)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Korenaarstraat', 10, 'F', null, '2153BM', 'Nieuw-Vennep', 28992, 'POINT (103718.39 475275.224)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes Dijk', 'Huigsloterdijk', 255, null, null, '2157LN', 'Abbenes', 28992, 'POINT (100960.161 470114.268)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Kerkstraat', 137, null, null, '2153BH', 'Nieuw-Vennep', 28992, 'POINT (103928.516 474907.849)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Korenaarstraat', 10, 'G', null, '2153BM', 'Nieuw-Vennep', 28992, 'POINT (103723.48 475269.601)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes Dijk', 'Huigsloterdijk', 257, null, null, '2157LN', 'Abbenes', 28992, 'POINT (100955.822 470133.105)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Korenaarstraat', 11, null, null, '2153BM', 'Nieuw-Vennep', 28992, 'POINT (103639.624 475284.272)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes Dijk', 'Huigsloterdijk', 259, null, null, '2157LN', 'Abbenes', 28992, 'POINT (100932.716 470125.004)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Kerkstraat', 139, null, null, '2153BH', 'Nieuw-Vennep', 28992, 'POINT (103932.231 474904.549)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Korenaarstraat', 12, null, null, '2153BM', 'Nieuw-Vennep', 28992, 'POINT (103659.896 475264.244)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes Dijk', 'Huigsloterdijk', 260, null, null, '2157LN', 'Abbenes', 28992, 'POINT (100927.741 470130.329)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Stadhouderspoort', 56, null, null, '2152RW', 'Nieuw-Vennep', 28992, 'POINT (102600.309 477133.887)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Korenaarstraat', 13, null, null, '2153BM', 'Nieuw-Vennep', 28992, 'POINT (103630.29 475273.713)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes Dijk', 'Huigsloterdijk', 261, null, null, '2157LN', 'Abbenes', 28992, 'POINT (100920.783 470137.805)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Stadhouderspoort', 58, null, null, '2152RW', 'Nieuw-Vennep', 28992, 'POINT (102603.903 477137.9)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Weegbreestraat', 6, null, null, '2153EC', 'Nieuw-Vennep', 28992, 'POINT (103772.936 474649.136)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Hoefbladstraat', 53, null, null, '2153EX', 'Nieuw-Vennep', 28992, 'POINT (103347.719 474989.616)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Weegbreestraat', 8, null, null, '2153EC', 'Nieuw-Vennep', 28992, 'POINT (103765.548 474640.822)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Hoefbladstraat', 55, null, null, '2153EX', 'Nieuw-Vennep', 28992, 'POINT (103342.297 474994.599)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Weegbreestraat', 10, null, null, '2153EC', 'Nieuw-Vennep', 28992, 'POINT (103757.947 474632.377)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Hoefbladstraat', 57, null, null, '2153EX', 'Nieuw-Vennep', 28992, 'POINT (103337.754 474999.95)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes Omgeving', 'Kaagweg', 35, null, null, '2157LH', 'Abbenes', 28992, 'POINT (102587.983 471310.464)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Hoefbladstraat', 16, null, null, '2153EX', 'Nieuw-Vennep', 28992, 'POINT (103304.909 474960.548)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Burgerveen', 'Oude Venneperweg', 12, null, null, '2154MG', 'Burgerveen', 28992, 'POINT (106688.451 472666.459)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Hoefbladstraat', 21, null, null, '2153EX', 'Nieuw-Vennep', 28992, 'POINT (103299.654 475018.191)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Hoefbladstraat', 17, null, null, '2153EX', 'Nieuw-Vennep', 28992, 'POINT (103309.472 475008.52)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Burgerveen', 'Oude Venneperweg', 13, null, null, '2154MG', 'Burgerveen', 28992, 'POINT (106702.068 472716.55)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Hoefbladstraat', 22, null, null, '2153EX', 'Nieuw-Vennep', 28992, 'POINT (103300.405 474974.464)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Hoefbladstraat', 18, null, null, '2153EX', 'Nieuw-Vennep', 28992, 'POINT (103309.975 474965.864)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Wilhelminahoeve', 'Pesetaweg', 41, null, null, '2153PJ', 'Nieuw-Vennep', 28992, 'POINT (103132.94 474108.576)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Hoefbladstraat', 19, null, null, '2153EX', 'Nieuw-Vennep', 28992, 'POINT (103304.783 475013.356)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Hoefbladstraat', 23, null, null, '2153EX', 'Nieuw-Vennep', 28992, 'POINT (103357.391 474971.006)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Wilhelminahoeve', 'Pondweg', 1, null, null, '2153PK', 'Nieuw-Vennep', 28992, 'POINT (103613.542 474110.501)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Hoefbladstraat', 20, null, null, '2153EX', 'Nieuw-Vennep', 28992, 'POINT (103295.748 474968.769)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Buitenkaag', 'Hoofdweg', 1974, null, null, '2158MC', 'Buitenkaag', 28992, 'POINT (98645.021 470739.304)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Bosstraat', 170, null, null, '2153AS', 'Nieuw-Vennep', 28992, 'POINT (104116.447 475233.552)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Buitenkaag', 'Hoofdweg', 1976, null, null, '2158MC', 'Buitenkaag', 28992, 'POINT (98630.992 470701.619)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Bosstraat', 174, null, null, '2153AT', 'Nieuw-Vennep', 28992, 'POINT (104137.704 475215.824)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Buitenkaag', 'Hoofdweg', 2020, null, null, '2158MC', 'Buitenkaag', 28992, 'POINT (98528.351 470668.096)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Bosstraat', 180, null, null, '2153AT', 'Nieuw-Vennep', 28992, 'POINT (104112.825 475214.636)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Bosstraat', 182, null, null, '2153AT', 'Nieuw-Vennep', 28992, 'POINT (104109.54 475209.555)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Omgeving', 'Rijnlanderweg', 1202, 'A', null, '2153KC', 'Nieuw-Vennep', 28992, 'POINT (106062.246 475041.8515)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Viersepoort', 40, null, null, '2152RR', 'Nieuw-Vennep', 28992, 'POINT (102715.354 477060.106)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Omgeving', 'Rijnlanderweg', 1232, null, null, '2153KC', 'Nieuw-Vennep', 28992, 'POINT (105845.861 474781.03)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Viersepoort', 42, null, null, '2152RR', 'Nieuw-Vennep', 28992, 'POINT (102718.801 477063.853)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Omgeving', 'Rijnlanderweg', 1234, null, null, '2153KC', 'Nieuw-Vennep', 28992, 'POINT (105770.837 474789.877)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Viersepoort', 44, null, null, '2152RR', 'Nieuw-Vennep', 28992, 'POINT (102722.451 477067.82)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Omgeving', 'Rijnlanderweg', 1240, null, null, '2153KC', 'Nieuw-Vennep', 28992, 'POINT (105694.668 474698.219)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Velperpoort', 1, null, null, '2152RS', 'Nieuw-Vennep', 28992, 'POINT (102586.194 476981.443)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Cruquius', 'Cruquiuszoom', 53, null, null, '2142EW', 'Cruquius', 28992, 'POINT (103222.48 483056.037)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Papaverstraat', 48, null, null, '2153BC', 'Nieuw-Vennep', 28992, 'POINT (103877.757 475102.574)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Papaverstraat', 50, null, null, '2153BC', 'Nieuw-Vennep', 28992, 'POINT (103882.352 475098.433)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Papaverstraat', 52, null, null, '2153BC', 'Nieuw-Vennep', 28992, 'POINT (103847.621 475133.805)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Veldbloemstraat', 16, null, null, '2153BZ', 'Nieuw-Vennep', 28992, 'POINT (103511.536 475102.599)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Stadhouderspoort', 11, null, null, '2152RV', 'Nieuw-Vennep', 28992, 'POINT (102545.841 477036.643)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Klaproosstraat', 42, null, null, '2153CS', 'Nieuw-Vennep', 28992, 'POINT (103981.509 475019.695)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Veldbloemstraat', 18, null, null, '2153BZ', 'Nieuw-Vennep', 28992, 'POINT (103504.316 475107.813)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Stadhouderspoort', 13, null, null, '2152RV', 'Nieuw-Vennep', 28992, 'POINT (102549.776 477040.666)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Veldbloemstraat', 22, null, null, '2153BZ', 'Nieuw-Vennep', 28992, 'POINT (103450.062 475103.77)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Stadhouderspoort', 15, null, null, '2152RV', 'Nieuw-Vennep', 28992, 'POINT (102553.71 477044.689)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Klaproosstraat', 44, null, null, '2153CS', 'Nieuw-Vennep', 28992, 'POINT (103977.915 475015.663)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Weegbreestraat', 21, null, null, '2153EA', 'Nieuw-Vennep', 28992, 'POINT (103684.41 474676.246)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Calypso', 14, null, null, '2152TA', 'Nieuw-Vennep', 28992, 'POINT (102807.515 477438.536)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'De Regtstraat', 6, null, null, '2157PK', 'Abbenes', 28992, 'POINT (100428.719 472438.612)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Weegbreestraat', 23, null, null, '2153EA', 'Nieuw-Vennep', 28992, 'POINT (103679.604 474680.542)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Linquenda', 'Kalslagerring', 15, null, null, '2151TA', 'Nieuw-Vennep', 28992, 'POINT (102667.032 475126.997)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'De Regtstraat', 7, null, null, '2157PK', 'Abbenes', 28992, 'POINT (100464.206 472442.455)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Weegbreestraat', 25, null, null, '2153EA', 'Nieuw-Vennep', 28992, 'POINT (103674.938 474684.714)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'De Regtstraat', 8, null, null, '2157PK', 'Abbenes', 28992, 'POINT (100429.029 472444.517)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Weegbreestraat', 27, null, null, '2153EA', 'Nieuw-Vennep', 28992, 'POINT (103670.272 474688.885)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'De Regtstraat', 9, null, null, '2157PK', 'Abbenes', 28992, 'POINT (100464.827 472454.673)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Calypso', 16, null, null, '2152TA', 'Nieuw-Vennep', 28992, 'POINT (102794.157 477422.788)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Klaproosstraat', 48, null, null, '2153CS', 'Nieuw-Vennep', 28992, 'POINT (103970.725 475007.598)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Veldbloemstraat', 73, null, null, '2153BZ', 'Nieuw-Vennep', 28992, 'POINT (103455.671 475162.665)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Wikkestraat', 22, null, null, '2153CG', 'Nieuw-Vennep', 28992, 'POINT (103852.808 474894.74)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Hondsdrafstraat', 31, null, null, '2153CJ', 'Nieuw-Vennep', 28992, 'POINT (103762.245 474767.932)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Ridderspoorstraat', 11, null, null, '2153BT', 'Nieuw-Vennep', 28992, 'POINT (103832.733 475050.402)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Hondsdrafstraat', 33, null, null, '2153CJ', 'Nieuw-Vennep', 28992, 'POINT (103757.99 474763.093)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Wikkestraat', 24, null, null, '2153CG', 'Nieuw-Vennep', 28992, 'POINT (103849.091 474898.068)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Ridderspoorstraat', 13, null, null, '2153BT', 'Nieuw-Vennep', 28992, 'POINT (103828.608 475045.734)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Korenaarstraat', 2, 'C', null, '2153BM', 'Nieuw-Vennep', 28992, 'POINT (103700.577 475283.901)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Korenaarstraat', 25, null, null, '2153BN', 'Nieuw-Vennep', 28992, 'POINT (103611.86 475252.595)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Akeleistraat', 13, null, null, '2153BP', 'Nieuw-Vennep', 28992, 'POINT (103617.634 475113.618)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'De Regtstraat', 13, null, null, '2157PK', 'Abbenes', 28992, 'POINT (100465.684 472472.985)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Akeleistraat', 14, null, null, '2153BP', 'Nieuw-Vennep', 28992, 'POINT (103639.536 475095.212)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen', 'Van Bemmelenstraat', 2, null, null, '2152XA', 'Nieuw-Vennep', 28992, 'POINT (103476.322 475774.09)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'De Regtstraat', 14, null, null, '2157PK', 'Abbenes', 28992, 'POINT (100430.747 472474.664)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Akeleistraat', 14, 'A', null, '2153BP', 'Nieuw-Vennep', 28992, 'POINT (103636.456 475092.451)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Hoofdweg', 1772, null, null, '2157NC', 'Abbenes', 28992, 'POINT (100536.809 472047.855)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Akeleistraat', 15, null, null, '2153BP', 'Nieuw-Vennep', 28992, 'POINT (103613.756 475112.764)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen', 'Van Bemmelenstraat', 4, null, null, '2152XA', 'Nieuw-Vennep', 28992, 'POINT (103472.437 475769.721)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Hoofdweg', 1776, null, null, '2157ND', 'Abbenes', 28992, 'POINT (100529.634009075 472041.466643136)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Akeleistraat', 16, null, null, '2153BP', 'Nieuw-Vennep', 28992, 'POINT (103633.226 475086.559)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Hoofdweg', 1778, null, null, '2157ND', 'Abbenes', 28992, 'POINT (100522.366 472035.077)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen', 'Van Bemmelenstraat', 6, null, null, '2152XA', 'Nieuw-Vennep', 28992, 'POINT (103468.527 475765.325)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Akeleistraat', 17, null, null, '2153BP', 'Nieuw-Vennep', 28992, 'POINT (103609.382 475107.873)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Madeliefstraat', 10, null, null, '2153EV', 'Nieuw-Vennep', 28992, 'POINT (103370.999 475053.182)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Wilhelminahoeve', 'Schillingweg', 81, null, null, '2153PL', 'Nieuw-Vennep', 28992, 'POINT (103396.423 474521.641)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Veldbloemstraat', 41, null, null, '2153BX', 'Nieuw-Vennep', 28992, 'POINT (103621.959 475045.514)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Akeleistraat', 4, null, null, '2153BP', 'Nieuw-Vennep', 28992, 'POINT (103659.576 475115.619)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Veldbloemstraat', 43, null, null, '2153BX', 'Nieuw-Vennep', 28992, 'POINT (103617.238 475049.724)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Wilhelminahoeve', 'Schillingweg', 83, null, null, '2153PL', 'Nieuw-Vennep', 28992, 'POINT (103388.435 474533.075)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Nachtschadestraat', 21, null, null, '2153EH', 'Nieuw-Vennep', 28992, 'POINT (103727.213 474775.513)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Nachtschadestraat', 23, null, null, '2153EH', 'Nieuw-Vennep', 28992, 'POINT (103722.386 474779.797)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Nachtschadestraat', 25, null, null, '2153EH', 'Nieuw-Vennep', 28992, 'POINT (103717.698 474783.956)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Nachtschadestraat', 27, null, null, '2153EH', 'Nieuw-Vennep', 28992, 'POINT (103713.011 474788.115)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Nachtschadestraat', 29, null, null, '2153EH', 'Nieuw-Vennep', 28992, 'POINT (103708.325 474792.274)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Nachtschadestraat', 31, null, null, '2153EJ', 'Nieuw-Vennep', 28992, 'POINT (103549.751 474848.292)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Nachtschadestraat', 33, null, null, '2153EJ', 'Nieuw-Vennep', 28992, 'POINT (103545.439 474843.483)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Weegbreestraat', 18, null, null, '2153EC', 'Nieuw-Vennep', 28992, 'POINT (103715.006 474608.507)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Weegbreestraat', 20, null, null, '2153EC', 'Nieuw-Vennep', 28992, 'POINT (103706.574 474615.984)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Weegbreestraat', 22, null, null, '2153EC', 'Nieuw-Vennep', 28992, 'POINT (103698.278 474623.434)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Weegbreestraat', 24, null, null, '2153EC', 'Nieuw-Vennep', 28992, 'POINT (103689.891 474630.87)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Weegbreestraat', 26, null, null, '2153EC', 'Nieuw-Vennep', 28992, 'POINT (103681.445 474638.295)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Weegbreestraat', 28, null, null, '2153EC', 'Nieuw-Vennep', 28992, 'POINT (103673.085 474645.707)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Weegbreestraat', 30, null, null, '2153EC', 'Nieuw-Vennep', 28992, 'POINT (103664.671 474653.205)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Nachtschadestraat', 43, null, null, '2153EJ', 'Nieuw-Vennep', 28992, 'POINT (103524.512 474820.143)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Kerkstraat', 67, null, null, '2153BE', 'Nieuw-Vennep', 28992, 'POINT (103734.79 475082.23)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Maria Margaretalaan', 20, null, null, '2157NN', 'Abbenes', 28992, 'POINT (100676.527 471786.662)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Bosstraat', 77, null, null, '2153AL', 'Nieuw-Vennep', 28992, 'POINT (103973.875 475201.12)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Kerkstraat', 69, null, null, '2153BE', 'Nieuw-Vennep', 28992, 'POINT (103739.37 475078.159)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Maria Margaretalaan', 22, null, null, '2157NN', 'Abbenes', 28992, 'POINT (100676.083 471792.789)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Wikkestraat', 29, null, null, '2153CD', 'Nieuw-Vennep', 28992, 'POINT (103811.672 474928.969)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Papaverstraat', 40, null, null, '2153BC', 'Nieuw-Vennep', 28992, 'POINT (103845.594 475131.555)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Kerkstraat', 72, null, null, '2153BK', 'Nieuw-Vennep', 28992, 'POINT (103799.264 475062.574)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Wikkestraat', 31, null, null, '2153CD', 'Nieuw-Vennep', 28992, 'POINT (103806.49 474919.836)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Kerkstraat', 74, null, null, '2153BK', 'Nieuw-Vennep', 28992, 'POINT (103805.348 475057.169)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek Omgeving', 'Lisserdijk', 262, null, null, '2165AA', 'Lisserbroek', 28992, 'POINT (98844.316 472648.824)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Wikkestraat', 33, null, null, '2153CD', 'Nieuw-Vennep', 28992, 'POINT (103802.318 474915.1)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Kerkstraat', 92, null, null, '2153BK', 'Nieuw-Vennep', 28992, 'POINT (103941.229 474945.259)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Hoofdweg', 1802, null, null, '2157ND', 'Abbenes', 28992, 'POINT (100463.494 471987.796)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Wikkestraat', 35, null, null, '2153CD', 'Nieuw-Vennep', 28992, 'POINT (103798.27 474910.506)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Kerkstraat', 94, null, null, '2153BK', 'Nieuw-Vennep', 28992, 'POINT (103945.259 474941.676)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Wikkestraat', 37, null, null, '2153CD', 'Nieuw-Vennep', 28992, 'POINT (103794.222 474905.911)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Hoofdweg', 1804, null, null, '2157ND', 'Abbenes', 28992, 'POINT (100432.995 471967.884)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Roggestraat', 24, null, null, '2153GC', 'Nieuw-Vennep', 28992, 'POINT (104359.124 475836.291)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Roggestraat', 25, null, null, '2153GC', 'Nieuw-Vennep', 28992, 'POINT (104252.867 475847.16)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Roggestraat', 29, null, null, '2153GC', 'Nieuw-Vennep', 28992, 'POINT (104233.537 475750.357)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Weegbreestraat', 54, null, null, '2153ED', 'Nieuw-Vennep', 28992, 'POINT (103602.404 474690.518)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Weegbreestraat', 56, null, null, '2153ED', 'Nieuw-Vennep', 28992, 'POINT (103606.998 474686.564)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Hondsdrafstraat', 34, null, null, '2153CK', 'Nieuw-Vennep', 28992, 'POINT (103804.383 474771.394)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Weegbreestraat', 58, null, null, '2153ED', 'Nieuw-Vennep', 28992, 'POINT (103611.078 474682.921)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Wikkestraat', 26, null, null, '2153CG', 'Nieuw-Vennep', 28992, 'POINT (103845.401 474901.372)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Pinksterbloemstraat', 26, null, null, '2153BN', 'Nieuw-Vennep', 28992, 'POINT (103571.555 475115.899)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Korenaarstraat', 2, 'D', null, '2153BM', 'Nieuw-Vennep', 28992, 'POINT (103704.974 475279.315)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Wikkestraat', 28, null, null, '2153CG', 'Nieuw-Vennep', 28992, 'POINT (103841.656 474904.725)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Korenaarstraat', 2, 'E', null, '2153BM', 'Nieuw-Vennep', 28992, 'POINT (103709.37 475274.728)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Korenaarstraat', 27, null, null, '2153BN', 'Nieuw-Vennep', 28992, 'POINT (103600.187 475239.024)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Wikkestraat', 30, null, null, '2153CG', 'Nieuw-Vennep', 28992, 'POINT (103837.984 474908.013)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Korenaarstraat', 2, 'F', null, '2153BM', 'Nieuw-Vennep', 28992, 'POINT (103713.767 475270.142)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Wikkestraat', 32, null, null, '2153CG', 'Nieuw-Vennep', 28992, 'POINT (103834.221 474911.382)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Korenaarstraat', 31, null, null, '2153BN', 'Nieuw-Vennep', 28992, 'POINT (103565.561 475208.095)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Korenaarstraat', 2, 'G', null, '2153BM', 'Nieuw-Vennep', 28992, 'POINT (103719.043 475264.639)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Wikkestraat', 34, null, null, '2153CG', 'Nieuw-Vennep', 28992, 'POINT (103816.178 474890.986)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Bosstraat', 54, null, null, '2153AN', 'Nieuw-Vennep', 28992, 'POINT (103935.463 475284.263)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Hoofdweg', 1561, null, null, '2157PB', 'Abbenes', 28992, 'POINT (100725.074 472308.445)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Bosstraat', 105, null, null, '2153AM', 'Nieuw-Vennep', 28992, 'POINT (104047.745 475135.158)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Veldbloemstraat', 17, null, null, '2153BW', 'Nieuw-Vennep', 28992, 'POINT (103705.274 474971.532)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Bosstraat', 56, null, null, '2153AN', 'Nieuw-Vennep', 28992, 'POINT (103931.511 475279.837)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Bosstraat', 107, null, null, '2153AM', 'Nieuw-Vennep', 28992, 'POINT (104052.234 475131.187)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Hoofdweg', 1563, null, null, '2157PB', 'Abbenes', 28992, 'POINT (100705.348 472292.311)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Veldbloemstraat', 19, null, null, '2153BW', 'Nieuw-Vennep', 28992, 'POINT (103686.428 474988.196)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Akeleistraat', 5, null, null, '2153BP', 'Nieuw-Vennep', 28992, 'POINT (103635.815 475137.247)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Madeliefstraat', 12, 'A', null, '2153EV', 'Nieuw-Vennep', 28992, 'POINT (103386.154 475042.863)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Veldbloemstraat', 45, null, null, '2153BX', 'Nieuw-Vennep', 28992, 'POINT (103612.656 475053.81)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Wilhelminahoeve', 'Schillingweg', 85, null, null, '2153PL', 'Nieuw-Vennep', 28992, 'POINT (103405.665 474545.293)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Akeleistraat', 6, null, null, '2153BP', 'Nieuw-Vennep', 28992, 'POINT (103655.178 475110.788)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Madeliefstraat', 12, 'B', null, '2153EV', 'Nieuw-Vennep', 28992, 'POINT (103370.018 475025.349)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Veldbloemstraat', 47, null, null, '2153BX', 'Nieuw-Vennep', 28992, 'POINT (103608.074 475057.895)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Wilhelminahoeve', 'Lireweg', 76, null, null, '2153PH', 'Nieuw-Vennep', 28992, 'POINT (103442.638 474401.239)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Madeliefstraat', 14, null, null, '2153EV', 'Nieuw-Vennep', 28992, 'POINT (103402.498 475027.904)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Akeleistraat', 7, null, null, '2153BP', 'Nieuw-Vennep', 28992, 'POINT (103631.441 475132.356)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Veldbloemstraat', 49, null, null, '2153BX', 'Nieuw-Vennep', 28992, 'POINT (103603.492 475061.981)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Wilhelminahoeve', 'Lireweg', 78, null, null, '2153PH', 'Nieuw-Vennep', 28992, 'POINT (103445.408 474394.396)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Madeliefstraat', 16, null, null, '2153EV', 'Nieuw-Vennep', 28992, 'POINT (103416.267 475014.719)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Akeleistraat', 8, null, null, '2153BP', 'Nieuw-Vennep', 28992, 'POINT (103650.733 475105.906)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Boekweitstraat', 75, null, null, '2153GK', 'Nieuw-Vennep', 28992, 'POINT (104751.528 475600.476)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Boekweitstraat', 77, null, null, '2153GK', 'Nieuw-Vennep', 28992, 'POINT (104755.771 475605.242)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Boekweitstraat', 79, null, null, '2153GK', 'Nieuw-Vennep', 28992, 'POINT (104760.015 475610.009)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Boekweitstraat', 81, null, null, '2153GK', 'Nieuw-Vennep', 28992, 'POINT (104765.023 475605.546)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Boekweitstraat', 83, null, null, '2153GK', 'Nieuw-Vennep', 28992, 'POINT (104760.779 475600.78)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Boekweitstraat', 85, null, null, '2153GK', 'Nieuw-Vennep', 28992, 'POINT (104756.536 475596.014)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Bosstraat', 79, null, null, '2153AL', 'Nieuw-Vennep', 28992, 'POINT (103978.326 475197.166)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Kerkstraat', 71, null, null, '2153BE', 'Nieuw-Vennep', 28992, 'POINT (103743.81 475074.214)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Kerkstraat', 73, null, null, '2153BE', 'Nieuw-Vennep', 28992, 'POINT (103748.53 475070.018)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Bosstraat', 81, null, null, '2153AL', 'Nieuw-Vennep', 28992, 'POINT (103982.636 475193.336)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Kerkstraat', 75, null, null, '2153BE', 'Nieuw-Vennep', 28992, 'POINT (103753.11 475065.947)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Velperpoort', 6, null, null, '2152RT', 'Nieuw-Vennep', 28992, 'POINT (102565.865 477001.499)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Kerkstraat', 77, null, null, '2153BE', 'Nieuw-Vennep', 28992, 'POINT (103757.69 475061.876)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Velperpoort', 8, null, null, '2152RT', 'Nieuw-Vennep', 28992, 'POINT (102570.6 477004.993)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Kamperfoeliestraat', 1, null, null, '2153BG', 'Nieuw-Vennep', 28992, 'POINT (103742.096 475051.79)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Velperpoort', 10, null, null, '2152RT', 'Nieuw-Vennep', 28992, 'POINT (102574.053 477008.849)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Kamperfoeliestraat', 2, null, null, '2153BG', 'Nieuw-Vennep', 28992, 'POINT (103765.492 475030.215)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Kamperfoeliestraat', 3, null, null, '2153BG', 'Nieuw-Vennep', 28992, 'POINT (103737.587 475046.728)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Velperpoort', 12, null, null, '2152RT', 'Nieuw-Vennep', 28992, 'POINT (102577.506 477012.704)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Kamperfoeliestraat', 4, null, null, '2153BG', 'Nieuw-Vennep', 28992, 'POINT (103761.097 475025.306)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Spaanse Ruiterpad', 12, null, null, '2153ER', 'Nieuw-Vennep', 28992, 'POINT (103511.11 474880.256)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Korenaarstraat', 19, null, null, '2153BM', 'Nieuw-Vennep', 28992, 'POINT (103616.939 475268.052)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Bolero', 5, null, null, '2152SB', 'Nieuw-Vennep', 28992, 'POINT (103377.233 476954.352)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Spaanse Ruiterpad', 14, null, null, '2153ER', 'Nieuw-Vennep', 28992, 'POINT (103506.436 474884.382)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Rumba', 1, null, null, '2152SC', 'Nieuw-Vennep', 28992, 'POINT (103328.982 477034.723)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Spaanse Ruiterpad', 16, null, null, '2153ER', 'Nieuw-Vennep', 28992, 'POINT (103485.673 474905.448)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Hondsdrafstraat', 36, null, null, '2153CK', 'Nieuw-Vennep', 28992, 'POINT (103800.379 474766.898)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Weegbreestraat', 60, null, null, '2153ED', 'Nieuw-Vennep', 28992, 'POINT (103615.404 474679.337)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Hondsdrafstraat', 38, null, null, '2153CK', 'Nieuw-Vennep', 28992, 'POINT (103796.327 474762.347)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Weegbreestraat', 62, null, null, '2153ED', 'Nieuw-Vennep', 28992, 'POINT (103592.78 474719.451)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Klaproosstraat', 62, null, null, '2153CS', 'Nieuw-Vennep', 28992, 'POINT (103939.782 474977.196)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Hondsdrafstraat', 40, null, null, '2153CK', 'Nieuw-Vennep', 28992, 'POINT (103792.34 474757.87)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Klaproosstraat', 64, null, null, '2153CS', 'Nieuw-Vennep', 28992, 'POINT (103938.297 474971.253)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Zuiderdreef', 2, null, null, '2153CL', 'Nieuw-Vennep', 28992, 'POINT (103326.324 474803.519)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Klaproosstraat', 66, null, null, '2153CS', 'Nieuw-Vennep', 28992, 'POINT (103933.146 474968.975)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Klaproosstraat', 68, null, null, '2153CS', 'Nieuw-Vennep', 28992, 'POINT (103932.755 474964.954)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep West', 'Zuiderdreef', 3, null, null, '2153CL', 'Nieuw-Vennep', 28992, 'POINT (103121.03 475105.535)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Klaproosstraat', 70, null, null, '2153CS', 'Nieuw-Vennep', 28992, 'POINT (103928.611 474960.301)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Klaproosstraat', 71, null, null, '2153CP', 'Nieuw-Vennep', 28992, 'POINT (103924.92 475063.833)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Nachtschadestraat', 61, null, null, '2153EK', 'Nieuw-Vennep', 28992, 'POINT (103473.434 474845.266)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Nachtschadestraat', 63, null, null, '2153EK', 'Nieuw-Vennep', 28992, 'POINT (103477.717 474850.083)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Nachtschadestraat', 65, null, null, '2153EK', 'Nieuw-Vennep', 28992, 'POINT (103481.874 474854.758)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Nachtschadestraat', 67, null, null, '2153EK', 'Nieuw-Vennep', 28992, 'POINT (103486.033 474859.434)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Weegbreestraat', 112, null, null, '2153EE', 'Nieuw-Vennep', 28992, 'POINT (103536.511 474767.209)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Weegbreestraat', 114, null, null, '2153EE', 'Nieuw-Vennep', 28992, 'POINT (103520.165 474776.272)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Weegbreestraat', 116, null, null, '2153EE', 'Nieuw-Vennep', 28992, 'POINT (103527.368 474770.908)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Bosstraat', 60, null, null, '2153AP', 'Nieuw-Vennep', 28992, 'POINT (103946.474 475268.131)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Maria Margaretalaan', 34, null, null, '2157NN', 'Abbenes', 28992, 'POINT (100676.584 471833.166)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Bosstraat', 4, null, null, '2153AJ', 'Nieuw-Vennep', 28992, 'POINT (103720.757 475511.181)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Korenaarstraat', 33, null, null, '2153BN', 'Nieuw-Vennep', 28992, 'POINT (103560.762 475203.14)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Bosstraat', 62, null, null, '2153AP', 'Nieuw-Vennep', 28992, 'POINT (103950.963 475264.084)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Dr. Heijelaan', 50, null, null, '2157NK', 'Abbenes', 28992, 'POINT (100621.032 471805.223)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Bosstraat', 8, null, null, '2153AJ', 'Nieuw-Vennep', 28992, 'POINT (103731.981 475499.476)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Korenaarstraat', 33, 'A', null, '2153BN', 'Nieuw-Vennep', 28992, 'POINT (103558.783 475199.255)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Bosstraat', 64, null, null, '2153AP', 'Nieuw-Vennep', 28992, 'POINT (103955.406 475260.077)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Bosstraat', 10, null, null, '2153AJ', 'Nieuw-Vennep', 28992, 'POINT (103738.319 475490.893)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Dr. Heijelaan', 52, null, null, '2157NK', 'Abbenes', 28992, 'POINT (100625.84 471796.823)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Bosstraat', 66, null, null, '2153AP', 'Nieuw-Vennep', 28992, 'POINT (103959.824 475256.095)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Papaverstraat', 54, null, null, '2153BC', 'Nieuw-Vennep', 28992, 'POINT (103852.215 475129.665)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Papaverstraat', 56, null, null, '2153BC', 'Nieuw-Vennep', 28992, 'POINT (103856.81 475125.524)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Papaverstraat', 58, null, null, '2153BC', 'Nieuw-Vennep', 28992, 'POINT (103861.405 475121.384)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Papaverstraat', 60, null, null, '2153BC', 'Nieuw-Vennep', 28992, 'POINT (103866.0 475117.244)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Papaverstraat', 62, null, null, '2153BC', 'Nieuw-Vennep', 28992, 'POINT (103870.594 475113.103)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Papaverstraat', 64, null, null, '2153BC', 'Nieuw-Vennep', 28992, 'POINT (103875.189 475108.963)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Papaverstraat', 66, null, null, '2153BC', 'Nieuw-Vennep', 28992, 'POINT (103879.784 475104.823)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Papaverstraat', 68, null, null, '2153BC', 'Nieuw-Vennep', 28992, 'POINT (103884.379 475100.682)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Boekweitstraat', 87, null, null, '2153GK', 'Nieuw-Vennep', 28992, 'POINT (104752.292 475591.247)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Gersteweg', 41, null, null, '2153GH', 'Nieuw-Vennep', 28992, 'POINT (104580.881 475684.913)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Gersteweg', 43, null, null, '2153GH', 'Nieuw-Vennep', 28992, 'POINT (104598.671 475735.638)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Gersteweg', 51, null, null, '2153GH', 'Nieuw-Vennep', 28992, 'POINT (104640.999 475796.043)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Gersteweg', 53, null, null, '2153GH', 'Nieuw-Vennep', 28992, 'POINT (104631.549 475805.834)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Gersteweg', 4, null, null, '2153GJ', 'Nieuw-Vennep', 28992, 'POINT (104403.791 475647.842)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Gersteweg', 6, null, null, '2153GJ', 'Nieuw-Vennep', 28992, 'POINT (104414.028 475638.65)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Gersteweg', 14, null, null, '2153GJ', 'Nieuw-Vennep', 28992, 'POINT (104438.954 475653.812)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Gersteweg', 16, null, null, '2153GJ', 'Nieuw-Vennep', 28992, 'POINT (104479.525 475735.898)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Gersteweg', 18, null, null, '2153GJ', 'Nieuw-Vennep', 28992, 'POINT (104487.065 475752.308)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Gersteweg', 20, null, null, '2153GJ', 'Nieuw-Vennep', 28992, 'POINT (104491.756 475747.978)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Haverstraat', 24, 'B', null, '2153GB', 'Nieuw-Vennep', 28992, 'POINT (104174.544 475950.682)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Haverstraat', 24, 'C', null, '2153GB', 'Nieuw-Vennep', 28992, 'POINT (104168.25 475956.126)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Haverstraat', 24, 'D', null, '2153GB', 'Nieuw-Vennep', 28992, 'POINT (104161.955 475961.571)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Klaproosstraat', 22, null, null, '2153CR', 'Nieuw-Vennep', 28992, 'POINT (104000.177 474965.154)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Klaproosstraat', 24, null, null, '2153CR', 'Nieuw-Vennep', 28992, 'POINT (104008.508 474966.906)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Viersepoort', 7, null, null, '2152RP', 'Nieuw-Vennep', 28992, 'POINT (102658.728 476958.136)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Klaproosstraat', 26, null, null, '2153CR', 'Nieuw-Vennep', 28992, 'POINT (104012.072 474970.91)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Viersepoort', 9, null, null, '2152RP', 'Nieuw-Vennep', 28992, 'POINT (102662.595 476961.998)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Bosstraat', 214, null, null, '2153AV', 'Nieuw-Vennep', 28992, 'POINT (104109.336 475154.562)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Korenaarstraat', 8, 'D', null, '2153BM', 'Nieuw-Vennep', 28992, 'POINT (103697.045 475264.812)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Bosstraat', 216, null, null, '2153AV', 'Nieuw-Vennep', 28992, 'POINT (104113.276 475159.007)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Korenaarstraat', 8, 'E', null, '2153BM', 'Nieuw-Vennep', 28992, 'POINT (103703.065 475260.022)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Bosstraat', 218, null, null, '2153AV', 'Nieuw-Vennep', 28992, 'POINT (104117.263 475163.504)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Hoofdweg', 1780, null, null, '2157ND', 'Abbenes', 28992, 'POINT (100516.006 472029.482)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Akeleistraat', 18, null, null, '2153BP', 'Nieuw-Vennep', 28992, 'POINT (103628.779 475081.676)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen', 'Van Bemmelenstraat', 8, null, null, '2152XA', 'Nieuw-Vennep', 28992, 'POINT (103464.666 475760.983)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Hoofdweg', 1782, null, null, '2157ND', 'Abbenes', 28992, 'POINT (100511.633 472026.447)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Akeleistraat', 19, null, null, '2153BP', 'Nieuw-Vennep', 28992, 'POINT (103605.007 475102.982)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen', 'Van Bemmelenstraat', 10, null, null, '2152XA', 'Nieuw-Vennep', 28992, 'POINT (103460.645 475756.461)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek Omgeving', 'Lisserdijk', 275, null, null, '2165AA', 'Lisserbroek', 28992, 'POINT (98969.7559224767 472751.685)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Roggestraat', 5, null, null, '2153GC', 'Nieuw-Vennep', 28992, 'POINT (104285.725 475954.671)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Roggestraat', 7, null, null, '2153GC', 'Nieuw-Vennep', 28992, 'POINT (104308.774 475931.8)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Roggestraat', 8, null, null, '2153GC', 'Nieuw-Vennep', 28992, 'POINT (104347.824 475985.883)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Roggestraat', 9, null, null, '2153GC', 'Nieuw-Vennep', 28992, 'POINT (104336.411 475927.025)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Roggestraat', 11, null, null, '2153GC', 'Nieuw-Vennep', 28992, 'POINT (104323.885 475913.541)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Roggestraat', 13, null, null, '2153GC', 'Nieuw-Vennep', 28992, 'POINT (104305.706 475905.769)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Roggestraat', 14, null, null, '2153GC', 'Nieuw-Vennep', 28992, 'POINT (104380.692 475956.61)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Roggestraat', 15, null, null, '2153GC', 'Nieuw-Vennep', 28992, 'POINT (104292.788 475893.343)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Roggestraat', 17, null, null, '2153GC', 'Nieuw-Vennep', 28992, 'POINT (104284.804 475884.106)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Roggestraat', 19, null, null, '2153GC', 'Nieuw-Vennep', 28992, 'POINT (104276.82 475874.87)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Roggestraat', 20, null, null, '2153GC', 'Nieuw-Vennep', 28992, 'POINT (104470.828 475914.202)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Roggestraat', 21, null, null, '2153GC', 'Nieuw-Vennep', 28992, 'POINT (104268.835 475865.633)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Roggestraat', 23, null, null, '2153GC', 'Nieuw-Vennep', 28992, 'POINT (104260.851 475856.397)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Weegbreestraat', 32, null, null, '2153EC', 'Nieuw-Vennep', 28992, 'POINT (103656.349 474660.624)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Weegbreestraat', 34, null, null, '2153EC', 'Nieuw-Vennep', 28992, 'POINT (103647.931 474668.026)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Weegbreestraat', 36, null, null, '2153EC', 'Nieuw-Vennep', 28992, 'POINT (103639.537 474675.509)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Weegbreestraat', 38, null, null, '2153ED', 'Nieuw-Vennep', 28992, 'POINT (103617.034 474688.893)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Velperpoort', 4, null, null, '2152RT', 'Nieuw-Vennep', 28992, 'POINT (102562.347 476997.57)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Cruquius', 'Cruquiuszoom', 43, null, null, '2142EW', 'Cruquius', 28992, 'POINT (103170.132 482993.358)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Velperpoort', 42, null, null, '2152RT', 'Nieuw-Vennep', 28992, 'POINT (102660.618 477101.246)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Velperpoort', 44, null, null, '2152RT', 'Nieuw-Vennep', 28992, 'POINT (102665.194 477104.587)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Velperpoort', 46, null, null, '2152RT', 'Nieuw-Vennep', 28992, 'POINT (102668.733 477108.539)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Omgeving', 'Rijnlanderweg', 1180, null, null, '2153KC', 'Nieuw-Vennep', 28992, 'POINT (106180.338 475180.648)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Omgeving', 'Rijnlanderweg', 1182, null, null, '2153KC', 'Nieuw-Vennep', 28992, 'POINT (106137.334 475179.766)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Luzernestraat', 43, null, null, '2153GM', 'Nieuw-Vennep', 28992, 'POINT (104731.404 475386.872)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Luzernestraat', 45, null, null, '2153GM', 'Nieuw-Vennep', 28992, 'POINT (104764.019 475414.302)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Luzernestraat', 47, null, null, '2153GM', 'Nieuw-Vennep', 28992, 'POINT (104770.695 475408.403)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Luzernestraat', 51, null, null, '2153GM', 'Nieuw-Vennep', 28992, 'POINT (104786.442 475394.436)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Luzernestraat', 53, null, null, '2153GM', 'Nieuw-Vennep', 28992, 'POINT (104782.679 475428.806)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Luzernestraat', 55, null, null, '2153GM', 'Nieuw-Vennep', 28992, 'POINT (104821.204 475473.793)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Luzernestraat', 69, null, null, '2153GM', 'Nieuw-Vennep', 28992, 'POINT (104877.184 475552.763)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Luzernestraat', 2, null, null, '2153GN', 'Nieuw-Vennep', 28992, 'POINT (104538.862 475333.08)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Korenaarstraat', 13, 'A', null, '2153BM', 'Nieuw-Vennep', 28992, 'POINT (103626.79 475269.863)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Stadhouderspoort', 60, null, null, '2152RW', 'Nieuw-Vennep', 28992, 'POINT (102607.496 477141.913)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes Dijk', 'Huigsloterdijk', 263, null, null, '2157LN', 'Abbenes', 28992, 'POINT (100906.302 470141.801)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Korenaarstraat', 15, null, null, '2153BM', 'Nieuw-Vennep', 28992, 'POINT (103627.135 475276.27)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Stadhouderspoort', 62, null, null, '2152RW', 'Nieuw-Vennep', 28992, 'POINT (102611.09 477145.926)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes Dijk', 'Huigsloterdijk', 265, null, null, '2157LN', 'Abbenes', 28992, 'POINT (100891.102 470140.386)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Korenaarstraat', 15, 'A', null, '2153BM', 'Nieuw-Vennep', 28992, 'POINT (103623.874 475272.546)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Stadhouderspoort', 33, null, null, '2152RV', 'Nieuw-Vennep', 28992, 'POINT (102588.57 477080.121)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Veldbloemstraat', 81, null, null, '2153BZ', 'Nieuw-Vennep', 28992, 'POINT (103423.468 475126.172)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Klaproosstraat', 54, null, null, '2153CS', 'Nieuw-Vennep', 28992, 'POINT (103963.438 474991.876)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Stadhouderspoort', 35, null, null, '2152RV', 'Nieuw-Vennep', 28992, 'POINT (102592.22 477083.852)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Veldbloemstraat', 83, null, null, '2153BZ', 'Nieuw-Vennep', 28992, 'POINT (103415.241 475116.902)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Klaproosstraat', 56, null, null, '2153CS', 'Nieuw-Vennep', 28992, 'POINT (103959.295 474986.11)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Stadhouderspoort', 37, null, null, '2152RV', 'Nieuw-Vennep', 28992, 'POINT (102609.096 477083.608)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Oosterdreef', 20, null, null, '2153CA', 'Nieuw-Vennep', 28992, 'POINT (104116.885 474906.546)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Stadhouderspoort', 39, null, null, '2152RV', 'Nieuw-Vennep', 28992, 'POINT (102618.764 477074.947)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Klaproosstraat', 58, null, null, '2153CS', 'Nieuw-Vennep', 28992, 'POINT (103953.055 474984.426)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Stadhouderspoort', 41, null, null, '2152RV', 'Nieuw-Vennep', 28992, 'POINT (102628.063 477066.619)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Klaproosstraat', 60, null, null, '2153CS', 'Nieuw-Vennep', 28992, 'POINT (103945.527 474979.474)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Korenaarstraat', 3, null, null, '2153BM', 'Nieuw-Vennep', 28992, 'POINT (103655.157 475304.793)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Tonnekamp', 2, null, null, '2157PN', 'Abbenes', 28992, 'POINT (100464.361 472383.462)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Wikkestraat', 36, null, null, '2153CH', 'Nieuw-Vennep', 28992, 'POINT (103819.865 474887.686)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Korenaarstraat', 4, null, null, '2153BM', 'Nieuw-Vennep', 28992, 'POINT (103677.851 475284.568)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Wikkestraat', 38, null, null, '2153CH', 'Nieuw-Vennep', 28992, 'POINT (103823.605 474884.338)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Tonnekamp', 3, null, null, '2157PN', 'Abbenes', 28992, 'POINT (100446.769 472391.81)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Korenaarstraat', 4, 'A', null, '2153BM', 'Nieuw-Vennep', 28992, 'POINT (103683.098 475280.42)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Wikkestraat', 40, null, null, '2153CH', 'Nieuw-Vennep', 28992, 'POINT (103827.274 474881.054)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Akeleistraat', 20, null, null, '2153BP', 'Nieuw-Vennep', 28992, 'POINT (103624.398 475076.864)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Hoofdweg', 1784, null, null, '2157ND', 'Abbenes', 28992, 'POINT (100502.953 472023.198)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Akeleistraat', 21, null, null, '2153BP', 'Nieuw-Vennep', 28992, 'POINT (103600.757 475098.231)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Hoofdweg', 1786, null, null, '2157ND', 'Abbenes', 28992, 'POINT (100497.601 472019.532)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen', 'Van Bemmelenstraat', 11, null, null, '2152XA', 'Nieuw-Vennep', 28992, 'POINT (103466.433 475695.135)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Buitenkaag', 'Huigsloterdijk', 364, null, null, '2158LR', 'Buitenkaag', 28992, 'POINT (98894.234 470331.485)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Hoofdweg', 1788, null, null, '2157ND', 'Abbenes', 28992, 'POINT (100491.592 472013.382)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen', 'Van Bemmelenstraat', 12, null, null, '2152XA', 'Nieuw-Vennep', 28992, 'POINT (103456.799 475752.136)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Tarantella', 3, null, null, '2152SG', 'Nieuw-Vennep', 28992, 'POINT (103191.248 477142.277)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Buitenkaag', 'Huigsloterdijk', 366, null, null, '2158LR', 'Buitenkaag', 28992, 'POINT (98852.707 470342.469)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen', 'Van Bemmelenstraat', 13, null, null, '2152XA', 'Nieuw-Vennep', 28992, 'POINT (103462.451 475690.703)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Tarantella', 4, null, null, '2152SG', 'Nieuw-Vennep', 28992, 'POINT (103224.55 477110.965)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Buitenkaag', 'Huigsloterdijk', 367, null, null, '2158LR', 'Buitenkaag', 28992, 'POINT (98835.458 470345.842)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen', 'Van Bemmelenstraat', 14, null, null, '2152XA', 'Nieuw-Vennep', 28992, 'POINT (103452.913 475747.767)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Veldbloemstraat', 51, null, null, '2153BX', 'Nieuw-Vennep', 28992, 'POINT (103584.799 475078.502)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Wilhelminahoeve', 'Lireweg', 80, null, null, '2153PH', 'Nieuw-Vennep', 28992, 'POINT (103448.504 474388.693)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Akeleistraat', 9, null, null, '2153BP', 'Nieuw-Vennep', 28992, 'POINT (103627.066 475127.465)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Hondsdrafstraat', 35, null, null, '2153CJ', 'Nieuw-Vennep', 28992, 'POINT (103753.858 474758.394)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Veldbloemstraat', 53, null, null, '2153BX', 'Nieuw-Vennep', 28992, 'POINT (103580.092 475082.694)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Wilhelminahoeve', 'Lireweg', 82, null, null, '2153PH', 'Nieuw-Vennep', 28992, 'POINT (103454.37 474448.654)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Boekweitstraat', 89, null, null, '2153GK', 'Nieuw-Vennep', 28992, 'POINT (104748.049 475586.481)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Boekweitstraat', 93, null, null, '2153GK', 'Nieuw-Vennep', 28992, 'POINT (104768.896 475567.923)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Boekweitstraat', 95, null, null, '2153GK', 'Nieuw-Vennep', 28992, 'POINT (104784.671 475594.741)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Boekweitstraat', 97, null, null, '2153GK', 'Nieuw-Vennep', 28992, 'POINT (104791.683 475587.905)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Boekweitstraat', 99, null, null, '2153GK', 'Nieuw-Vennep', 28992, 'POINT (104809.989 475571.183)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Boekweitstraat', 6, null, null, '2153GL', 'Nieuw-Vennep', 28992, 'POINT (104510.527 475484.127)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Boekweitstraat', 10, null, null, '2153GL', 'Nieuw-Vennep', 28992, 'POINT (104539.668 475513.19)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Boekweitstraat', 16, null, null, '2153GL', 'Nieuw-Vennep', 28992, 'POINT (104556.277 475540.784)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Boekweitstraat', 20, null, null, '2153GL', 'Nieuw-Vennep', 28992, 'POINT (104548.514 475589.993)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Boekweitstraat', 20, 'A', null, '2153GL', 'Nieuw-Vennep', 28992, 'POINT (104566.84 475590.525)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Boekweitstraat', 22, null, null, '2153GL', 'Nieuw-Vennep', 28992, 'POINT (104579.445 475584.326)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Nachtschadestraat', 55, null, null, '2153EJ', 'Nieuw-Vennep', 28992, 'POINT (103488.964 474825.097)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Nachtschadestraat', 57, null, null, '2153EJ', 'Nieuw-Vennep', 28992, 'POINT (103484.32 474829.242)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Nachtschadestraat', 59, null, null, '2153EK', 'Nieuw-Vennep', 28992, 'POINT (103469.4 474840.732)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Velperpoort', 14, null, null, '2152RT', 'Nieuw-Vennep', 28992, 'POINT (102580.959 477016.56)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Kamperfoeliestraat', 5, null, null, '2153BG', 'Nieuw-Vennep', 28992, 'POINT (103733.203 475041.805)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Velperpoort', 16, null, null, '2152RT', 'Nieuw-Vennep', 28992, 'POINT (102584.412 477020.415)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Kamperfoeliestraat', 6, null, null, '2153BG', 'Nieuw-Vennep', 28992, 'POINT (103756.725 475020.423)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Velperpoort', 18, null, null, '2152RT', 'Nieuw-Vennep', 28992, 'POINT (102587.865 477024.271)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Bosstraat', 73, null, null, '2153AL', 'Nieuw-Vennep', 28992, 'POINT (103964.972 475209.029)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Stadhouderspoort', 64, null, null, '2152RW', 'Nieuw-Vennep', 28992, 'POINT (102614.683 477149.939)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes Dijk', 'Huigsloterdijk', 266, null, null, '2157LN', 'Abbenes', 28992, 'POINT (100885.073 470142.706)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Korenaarstraat', 16, null, null, '2153BM', 'Nieuw-Vennep', 28992, 'POINT (103653.65 475257.512)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes Omgeving', 'Dr. Heijelaan', 125, null, null, '2157LP', 'Abbenes', 28992, 'POINT (100402.015 470564.771)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Stadhouderspoort', 66, null, null, '2152RW', 'Nieuw-Vennep', 28992, 'POINT (102618.277 477153.952)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Korenaarstraat', 17, null, null, '2153BM', 'Nieuw-Vennep', 28992, 'POINT (103623.699 475280.059)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes Dijk', 'Huigsloterdijk', 291, null, null, '2157LP', 'Abbenes', 28992, 'POINT (100443.346 470323.726)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Stadhouderspoort', 68, null, null, '2152RW', 'Nieuw-Vennep', 28992, 'POINT (102621.87 477157.965)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Korenaarstraat', 17, 'A', null, '2153BM', 'Nieuw-Vennep', 28992, 'POINT (103619.922 475276.283)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Bolero', 1, null, null, '2152SB', 'Nieuw-Vennep', 28992, 'POINT (103396.474 476976.657)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Spaanse Ruiterpad', 10, null, null, '2153ER', 'Nieuw-Vennep', 28992, 'POINT (103515.827 474876.091)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Korenaarstraat', 18, null, null, '2153BM', 'Nieuw-Vennep', 28992, 'POINT (103647.691 475253.614)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Bolero', 3, null, null, '2152SB', 'Nieuw-Vennep', 28992, 'POINT (103380.174 476972.123)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Klaproosstraat', 72, null, null, '2153CS', 'Nieuw-Vennep', 28992, 'POINT (103924.387 474955.56)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Haverstraat', 54, null, null, '2153GB', 'Nieuw-Vennep', 28992, 'POINT (104253.119 476023.924)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Klaproosstraat', 73, null, null, '2153CP', 'Nieuw-Vennep', 28992, 'POINT (103931.909 475057.622)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Weegbreestraat', 35, null, null, '2153EB', 'Nieuw-Vennep', 28992, 'POINT (103628.76 474745.238)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Lisserdijk', 290, null, null, '2165AA', 'Lisserbroek', 28992, 'POINT (98923.144 472928.699)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Korenaarstraat', 44, null, null, '2153BL', 'Nieuw-Vennep', 28992, 'POINT (103619.171 475186.364)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Weegbreestraat', 37, null, null, '2153EB', 'Nieuw-Vennep', 28992, 'POINT (103624.094 474749.415)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Korenaarstraat', 4, 'B', null, '2153BM', 'Nieuw-Vennep', 28992, 'POINT (103688.426 475275.784)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Tonnekamp', 4, null, null, '2157PN', 'Abbenes', 28992, 'POINT (100435.932 472385.213)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Wikkestraat', 42, null, null, '2153CH', 'Nieuw-Vennep', 28992, 'POINT (103820.628 474865.242)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Tonnekamp', 5, null, null, '2157PN', 'Abbenes', 28992, 'POINT (100426.508 472393.224)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Korenaarstraat', 4, 'C', null, '2153BM', 'Nieuw-Vennep', 28992, 'POINT (103693.79 475271.117)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Wikkestraat', 44, null, null, '2153CH', 'Nieuw-Vennep', 28992, 'POINT (103824.351 474861.935)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Tonnekamp', 6, null, null, '2157PN', 'Abbenes', 28992, 'POINT (100415.199 472386.156)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Kerkstraat', 40, null, null, '2153BK', 'Nieuw-Vennep', 28992, 'POINT (103664.987 475180.731)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Wikkestraat', 46, null, null, '2153CH', 'Nieuw-Vennep', 28992, 'POINT (103828.101 474858.605)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Van Tolstraat', 14, null, null, '2157PJ', 'Abbenes', 28992, 'POINT (100508.702 472470.674)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Kerkstraat', 44, null, null, '2153BK', 'Nieuw-Vennep', 28992, 'POINT (103676.489 475171.543)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Van Tolstraat', 16, null, null, '2157PJ', 'Abbenes', 28992, 'POINT (100509.037 472476.54)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Bosstraat', 11, null, null, '2153AJ', 'Nieuw-Vennep', 28992, 'POINT (103721.29 475473.745)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Dr. Heijelaan', 56, null, null, '2157NK', 'Abbenes', 28992, 'POINT (100628.432 471778.16)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Hoefbladstraat', 27, null, null, '2153EX', 'Nieuw-Vennep', 28992, 'POINT (103346.67 474979.768)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Bosstraat', 12, null, null, '2153AJ', 'Nieuw-Vennep', 28992, 'POINT (103747.048 475483.707)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Dr. Heijelaan', 58, null, null, '2157NK', 'Abbenes', 28992, 'POINT (100628.937 471772.943)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Korenaarstraat', 35, null, null, '2153BN', 'Nieuw-Vennep', 28992, 'POINT (103548.397 475186.054)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Hoefbladstraat', 29, null, null, '2153EX', 'Nieuw-Vennep', 28992, 'POINT (103343.762 474985.367)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Bosstraat', 13, null, null, '2153AJ', 'Nieuw-Vennep', 28992, 'POINT (103731.163 475464.932)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Nachtschadestraat', 8, null, null, '2153EL', 'Nieuw-Vennep', 28992, 'POINT (103742.19 474699.7)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Stadhouderspoort', 16, null, null, '2152RW', 'Nieuw-Vennep', 28992, 'POINT (102521.722 477050.989)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Papaverstraat', 15, null, null, '2153BB', 'Nieuw-Vennep', 28992, 'POINT (103699.099 475225.489)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Nachtschadestraat', 10, null, null, '2153EL', 'Nieuw-Vennep', 28992, 'POINT (103737.377 474704.026)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Stadhouderspoort', 18, null, null, '2152RW', 'Nieuw-Vennep', 28992, 'POINT (102525.39 477055.084)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Papaverstraat', 19, null, null, '2153BB', 'Nieuw-Vennep', 28992, 'POINT (103704.533 475210.988)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Nachtschadestraat', 12, null, null, '2153EL', 'Nieuw-Vennep', 28992, 'POINT (103732.76 474708.175)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Stadhouderspoort', 20, null, null, '2152RW', 'Nieuw-Vennep', 28992, 'POINT (102529.057 477059.179)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Papaverstraat', 21, null, null, '2153BB', 'Nieuw-Vennep', 28992, 'POINT (103709.571 475206.491)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Stadhouderspoort', 22, null, null, '2152RW', 'Nieuw-Vennep', 28992, 'POINT (102532.725 477063.274)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Papaverstraat', 23, null, null, '2153BB', 'Nieuw-Vennep', 28992, 'POINT (103714.609 475201.995)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Nachtschadestraat', 14, null, null, '2153EL', 'Nieuw-Vennep', 28992, 'POINT (103728.098 474712.364)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Bosstraat', 256, null, null, '2153AW', 'Nieuw-Vennep', 28992, 'POINT (104162.985 475138.523)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Stadhouderspoort', 24, null, null, '2152RW', 'Nieuw-Vennep', 28992, 'POINT (102536.392 477067.369)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Nachtschadestraat', 16, null, null, '2153EL', 'Nieuw-Vennep', 28992, 'POINT (103723.41 474716.577)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Figarolaan', 70, null, null, '2152JD', 'Nieuw-Vennep', 28992, 'POINT (102921.886 476718.871)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Koolhovenlaan', 132, null, null, '1119NH', 'Schiphol-Rijk', 28992, 'POINT (112055.333 476903.653)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Dotterbloemstraat', 31, null, null, '2153ES', 'Nieuw-Vennep', 28992, 'POINT (103418.333 474968.288)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Figarolaan', 72, null, null, '2152JD', 'Nieuw-Vennep', 28992, 'POINT (102916.687 476721.304)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Carmenlaan', 17, null, null, '2152JM', 'Nieuw-Vennep', 28992, 'POINT (102983.607 476800.944)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Haverstraat', 19, null, null, '2153GB', 'Nieuw-Vennep', 28992, 'POINT (104189.542 475831.75)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Weteringbrug', 'Leimuiderdijk', 498, null, null, '2156MZ', 'Weteringbrug', 28992, 'POINT (104481.446 470709.001)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Hoofdweg', 1585, null, null, '2157PB', 'Abbenes', 28992, 'POINT (100643.683 472221.572)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Kamperfoeliestraat', 7, null, null, '2153BG', 'Nieuw-Vennep', 28992, 'POINT (103728.819 475036.883)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Haverstraat', 24, 'A', null, '2153GB', 'Nieuw-Vennep', 28992, 'POINT (104165.704 475961.689)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Weteringbrug', 'Leimuiderdijk', 499, null, null, '2156MZ', 'Weteringbrug', 28992, 'POINT (104474.096 470703.336)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'Hoofdweg', 1587, null, null, '2157PB', 'Abbenes', 28992, 'POINT (100633.153 472214.298)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Kamperfoeliestraat', 8, null, null, '2153BG', 'Nieuw-Vennep', 28992, 'POINT (103753.862 475017.168)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Bosstraat', 27, null, null, '2153AK', 'Nieuw-Vennep', 28992, 'POINT (103830.692 475369.238)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen', 'Von Liebigstraat', 19, null, null, '2152XE', 'Nieuw-Vennep', 28992, 'POINT (103417.638 475755.38)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Weteringbrug', 'Leimuiderdijk', 485, 'A', null, '2156MZ', 'Weteringbrug', 28992, 'POINT (104593.152 470782.178)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Bosstraat', 29, null, null, '2153AK', 'Nieuw-Vennep', 28992, 'POINT (103835.275 475365.102)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Kamperfoeliestraat', 9, null, null, '2153BG', 'Nieuw-Vennep', 28992, 'POINT (103725.021 475031.438)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen', 'Von Liebigstraat', 20, null, null, '2152XE', 'Nieuw-Vennep', 28992, 'POINT (103392.734 475777.481)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Bosstraat', 31, null, null, '2153AK', 'Nieuw-Vennep', 28992, 'POINT (103844.45 475357.23)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Zuiderpoort', 8, null, null, '2152RG', 'Nieuw-Vennep', 28992, 'POINT (102632.573 477207.179)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Regulierspoort', 24, null, null, '2152RC', 'Nieuw-Vennep', 28992, 'POINT (102469.025 477006.887)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Griseldalaan', 104, null, null, '2152JB', 'Nieuw-Vennep', 28992, 'POINT (103289.336 476798.683)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Zuiderpoort', 10, null, null, '2152RG', 'Nieuw-Vennep', 28992, 'POINT (102636.779 477203.411)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Rodelindalaan', 62, null, null, '2152PL', 'Nieuw-Vennep', 28992, 'POINT (103058.491 476868.14)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen', 'Broekemastraat', 51, null, null, '2152XC', 'Nieuw-Vennep', 28992, 'POINT (103393.752 475881.02)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Kerkstraat', 1, 'E', null, '2153BD', 'Nieuw-Vennep', 28992, 'POINT (103510.578 475272.677)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Bosstraat', 131, null, null, '2153AM', 'Nieuw-Vennep', 28992, 'POINT (104121.815 475069.419)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen', 'Van Barenstraat', 4, null, null, '2152XD', 'Nieuw-Vennep', 28992, 'POINT (103375.677 475855.209)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen', 'Broekemastraat', 53, null, null, '2152XC', 'Nieuw-Vennep', 28992, 'POINT (103389.225 475885.032)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Kerkstraat', 3, null, null, '2153BD', 'Nieuw-Vennep', 28992, 'POINT (103523.323 475272.979)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Madeliefstraat', 1, null, null, '2153EW', 'Nieuw-Vennep', 28992, 'POINT (103387.071847584 475105.755)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen', 'Broekemastraat', 55, null, null, '2152XC', 'Nieuw-Vennep', 28992, 'POINT (103384.838 475888.92)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Papaverstraat', 42, null, null, '2153BC', 'Nieuw-Vennep', 28992, 'POINT (103850.187 475127.416)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Madeliefstraat', 7, null, null, '2153EW', 'Nieuw-Vennep', 28992, 'POINT (103436.776 475080.988)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen', 'Van Barenstraat', 6, null, null, '2152XD', 'Nieuw-Vennep', 28992, 'POINT (103371.771 475850.816)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Leimuiderbrug', 'Weteringweg', 57, null, null, '2155MV', 'Leimuiderbrug', 28992, 'POINT (105824.816 471650.181)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Velperpoort', 47, null, null, '2152RS', 'Nieuw-Vennep', 28992, 'POINT (102678.766 477075.08)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Waterpoort', 21, null, null, '2152RM', 'Nieuw-Vennep', 28992, 'POINT (102744.18 476951.164)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Velperpoort', 49, null, null, '2152RS', 'Nieuw-Vennep', 28992, 'POINT (102682.607 477078.915)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Leimuiderbrug', 'Weteringweg', 59, null, null, '2155MV', 'Leimuiderbrug', 28992, 'POINT (105799.757 471618.637)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Tupolevlaan', 83, null, null, '1119PA', 'Schiphol-Rijk', 28992, 'POINT (111722.488 476986.478)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Rijnpoort', 15, null, null, '2152RD', 'Nieuw-Vennep', 28992, 'POINT (102473.579 477012.231)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Faustlaan', 85, null, null, '2152PG', 'Nieuw-Vennep', 28992, 'POINT (103044.581 476844.414)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Oosterdreef', 73, null, null, '2153AX', 'Nieuw-Vennep', 28992, 'POINT (104023.893 474925.589)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen', 'Von Liebigstraat', 4, null, null, '2152XE', 'Nieuw-Vennep', 28992, 'POINT (103423.915 475812.559)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen', 'Van Barenstraat', 10, null, null, '2152XD', 'Nieuw-Vennep', 28992, 'POINT (103363.896 475841.962)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Oosterdreef', 75, null, null, '2153AX', 'Nieuw-Vennep', 28992, 'POINT (104018.95 474920.061)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen', 'Von Liebigstraat', 5, null, null, '2152XE', 'Nieuw-Vennep', 28992, 'POINT (103444.776 475785.883)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Oosterdreef', 77, null, null, '2153AX', 'Nieuw-Vennep', 28992, 'POINT (104014.007 474914.533)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen', 'Van Bemmelenstraat', 16, null, null, '2152XA', 'Nieuw-Vennep', 28992, 'POINT (103449.004 475743.371)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen', 'Van Barenstraat', 11, null, null, '2152XD', 'Nieuw-Vennep', 28992, 'POINT (103384.484 475815.669)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen', 'Van Bemmelenstraat', 18, null, null, '2152XA', 'Nieuw-Vennep', 28992, 'POINT (103445.142 475739.029)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Oosterdreef', 79, null, null, '2153AX', 'Nieuw-Vennep', 28992, 'POINT (104009.063 474909.005)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen', 'Van Barenstraat', 12, null, null, '2152XD', 'Nieuw-Vennep', 28992, 'POINT (103360.055 475837.642)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen', 'Van Bemmelenstraat', 20, null, null, '2152XA', 'Nieuw-Vennep', 28992, 'POINT (103441.217 475734.616)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Oosterdreef', 81, null, null, '2153AX', 'Nieuw-Vennep', 28992, 'POINT (104004.12 474903.477)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen', 'Van Barenstraat', 13, null, null, '2152XD', 'Nieuw-Vennep', 28992, 'POINT (103380.725 475811.454)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Oosterdreef', 83, null, null, '2153AX', 'Nieuw-Vennep', 28992, 'POINT (103999.177 474897.949)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Boeingavenue', 2, null, null, '1119PB', 'Schiphol-Rijk', 28992, 'POINT (111490.198 476940.233)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen Noord', 'Marketentster', 23, null, null, '2152LW', 'Nieuw-Vennep', 28992, 'POINT (103817.397 476322.346)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Regulierspoort', 50, null, null, '2152RB', 'Nieuw-Vennep', 28992, 'POINT (102587.963 476943.806)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Boeingavenue', 8, null, null, '1119PB', 'Schiphol-Rijk', 28992, 'POINT (111574.385 476958.547)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Regulierspoort', 52, null, null, '2152RB', 'Nieuw-Vennep', 28992, 'POINT (102591.361 476941.1)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Dotterbloemstraat', 33, null, null, '2153ES', 'Nieuw-Vennep', 28992, 'POINT (103411.737 474961.691)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Carmenlaan', 19, null, null, '2152JM', 'Nieuw-Vennep', 28992, 'POINT (102978.298 476803.472)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Dotterbloemstraat', 35, null, null, '2153ES', 'Nieuw-Vennep', 28992, 'POINT (103402.667 474955.26)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Figarolaan', 74, null, null, '2152JD', 'Nieuw-Vennep', 28992, 'POINT (102911.489 476723.738)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Carmenlaan', 21, null, null, '2152JM', 'Nieuw-Vennep', 28992, 'POINT (102972.988 476806.001)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Dotterbloemstraat', 37, null, null, '2153ES', 'Nieuw-Vennep', 28992, 'POINT (103397.377 474946.962)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Figarolaan', 1, null, null, '2152JE', 'Nieuw-Vennep', 28992, 'POINT (103126.199 476632.826)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Carmenlaan', 23, null, null, '2152JM', 'Nieuw-Vennep', 28992, 'POINT (102967.679 476808.529)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Nachtschadestraat', 62, null, null, '2153EM', 'Nieuw-Vennep', 28992, 'POINT (103567.461 474815.329)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Figarolaan', 3, null, null, '2152JE', 'Nieuw-Vennep', 28992, 'POINT (103121.639 476636.316)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Carmenlaan', 25, null, null, '2152JM', 'Nieuw-Vennep', 28992, 'POINT (102962.37 476811.057)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Nachtschadestraat', 64, null, null, '2153EM', 'Nieuw-Vennep', 28992, 'POINT (103562.349 474809.599)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Figarolaan', 5, null, null, '2152JE', 'Nieuw-Vennep', 28992, 'POINT (103117.078 476639.805)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Nachtschadestraat', 66, null, null, '2153EM', 'Nieuw-Vennep', 28992, 'POINT (103557.261 474803.896)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Carmenlaan', 27, null, null, '2152JM', 'Nieuw-Vennep', 28992, 'POINT (102957.06 476813.585)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen Noord', 'Beurtschipper', 63, null, null, '2152LV', 'Nieuw-Vennep', 28992, 'POINT (103961.083 476079.568)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen Noord', 'Zadelmaker', 22, null, null, '2152LS', 'Nieuw-Vennep', 28992, 'POINT (103868.005 476008.813)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen Noord', 'Turfsteker', 42, null, null, '2152LZ', 'Nieuw-Vennep', 28992, 'POINT (103858.393 476228.633)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Venneperweg', 280, null, null, '2153AE', 'Nieuw-Vennep', 28992, 'POINT (103986.016 475073.273)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen Noord', 'Beurtschipper', 65, null, null, '2152LV', 'Nieuw-Vennep', 28992, 'POINT (103964.7 476083.596)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Regulierspoort', 26, null, null, '2152RC', 'Nieuw-Vennep', 28992, 'POINT (102473.653 477004.206)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Griseldalaan', 106, null, null, '2152JB', 'Nieuw-Vennep', 28992, 'POINT (103292.875 476803.378)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Zuiderpoort', 12, null, null, '2152RG', 'Nieuw-Vennep', 28992, 'POINT (102644.035 477196.909)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Rodelindalaan', 64, null, null, '2152PL', 'Nieuw-Vennep', 28992, 'POINT (103053.292 476870.961)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Rijnpoort', 1, null, null, '2152RD', 'Nieuw-Vennep', 28992, 'POINT (102441.851 477030.563)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Figarolaan', 2, null, null, '2152JC', 'Nieuw-Vennep', 28992, 'POINT (103102.624 476605.384)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Rodelindalaan', 66, null, null, '2152PL', 'Nieuw-Vennep', 28992, 'POINT (103048.093 476873.781)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Zuiderpoort', 14, null, null, '2152RG', 'Nieuw-Vennep', 28992, 'POINT (102648.663 477192.764)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Rijnpoort', 3, null, null, '2152RD', 'Nieuw-Vennep', 28992, 'POINT (102446.383 477027.944)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Rodelindalaan', 68, null, null, '2152PL', 'Nieuw-Vennep', 28992, 'POINT (103042.894 476876.602)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Figarolaan', 4, null, null, '2152JC', 'Nieuw-Vennep', 28992, 'POINT (103097.929 476608.899)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Faustlaan', 22, null, null, '2152PH', 'Nieuw-Vennep', 28992, 'POINT (103136.21 476742.058)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Rijnpoort', 5, null, null, '2152RD', 'Nieuw-Vennep', 28992, 'POINT (102450.916 477025.326)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Rodelindalaan', 70, null, null, '2152PL', 'Nieuw-Vennep', 28992, 'POINT (103037.143 476881.469)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Zuiderpoort', 23, null, null, '2152RJ', 'Nieuw-Vennep', 28992, 'POINT (102772.577 477041.923)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Wikkestraat', 77, null, null, '2153CE', 'Nieuw-Vennep', 28992, 'POINT (103784.008 474800.16)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Boeingavenue', 259, null, null, '1119PD', 'Schiphol-Rijk', 28992, 'POINT (111486.395 476580.424)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Zuiderpoort', 25, null, null, '2152RJ', 'Nieuw-Vennep', 28992, 'POINT (102782.085 477033.406)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Boeingavenue', 271, null, null, '1119PD', 'Schiphol-Rijk', 28992, 'POINT (111566.421 476519.609)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Tupolevlaan', 85, null, null, '1119PA', 'Schiphol-Rijk', 28992, 'POINT (111703.839 476961.331)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Rijnpoort', 17, null, null, '2152RD', 'Nieuw-Vennep', 28992, 'POINT (102478.112 477009.612)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Cessnalaan', 71, null, null, '1119NM', 'Schiphol-Rijk', 28992, 'POINT (112666.212 477291.942)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Faustlaan', 87, null, null, '2152PG', 'Nieuw-Vennep', 28992, 'POINT (103039.521 476847.18)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Tupolevlaan', 87, null, null, '1119PA', 'Schiphol-Rijk', 28992, 'POINT (111724.465 476985.207)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Rijnpoort', 19, null, null, '2152RD', 'Nieuw-Vennep', 28992, 'POINT (102481.233 477019.441)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Tupolevlaan', 42, null, null, '1119NZ', 'Schiphol-Rijk', 28992, 'POINT (111986.837 477267.487)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Faustlaan', 89, null, null, '2152PG', 'Nieuw-Vennep', 28992, 'POINT (103034.46 476849.945)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Tupolevlaan', 89, null, null, '1119PA', 'Schiphol-Rijk', 28992, 'POINT (111705.958 476959.777)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Zijlpoort', 8, null, null, '2152RA', 'Nieuw-Vennep', 28992, 'POINT (102848.262 476917.106)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Tupolevlaan', 91, null, null, '1119PA', 'Schiphol-Rijk', 28992, 'POINT (111725.878 476983.37)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Boeingavenue', 31, null, null, '1119PE', 'Schiphol-Rijk', 28992, 'POINT (111331.665 476820.787)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Tupolevlaan', 44, null, null, '1119NZ', 'Schiphol-Rijk', 28992, 'POINT (111956.584 477292.194)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Tupolevlaan', 93, null, null, '1119PA', 'Schiphol-Rijk', 28992, 'POINT (111707.512 476957.657)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Boeingavenue', 50, null, null, '1119PE', 'Schiphol-Rijk', 28992, 'POINT (111643.18 476916.488)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Tupolevlaan', 95, null, null, '1119PA', 'Schiphol-Rijk', 28992, 'POINT (111727.856 476981.534)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Nabuccosingel', 137, null, null, '2152PA', 'Nieuw-Vennep', 28992, 'POINT (102903.662 476802.683)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Nabuccosingel', 139, null, null, '2152PA', 'Nieuw-Vennep', 28992, 'POINT (102905.984 476808.608)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Nabuccosingel', 141, null, null, '2152PA', 'Nieuw-Vennep', 28992, 'POINT (102910.789 476822.38)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Boeingavenue', 1, null, null, '1119PC', 'Schiphol-Rijk', 28992, 'POINT (111407.102 476804.64)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Koolhovenlaan', 136, null, null, '1119NH', 'Schiphol-Rijk', 28992, 'POINT (112070.512 476888.741)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Cruquius', 'Cruquiuszoom', 23, null, null, '2142EW', 'Cruquius', 28992, 'POINT (103229.068 482875.772)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Boeingavenue', 3, null, null, '1119PC', 'Schiphol-Rijk', 28992, 'POINT (111393.036 476830.502)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Koolhovenlaan', 140, null, null, '1119NH', 'Schiphol-Rijk', 28992, 'POINT (112096.342 476867.704)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Regulierspoort', 54, null, null, '2152RB', 'Nieuw-Vennep', 28992, 'POINT (102602.708 476935.935)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Boeingavenue', 5, null, null, '1119PC', 'Schiphol-Rijk', 28992, 'POINT (111409.597 476802.598)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Nabuccosingel', 157, null, null, '2152PA', 'Nieuw-Vennep', 28992, 'POINT (102933.529 476869.782)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Cessnalaan', 1, null, null, '1119NJ', 'Schiphol-Rijk', 28992, 'POINT (112946.982 477528.856)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Boeingavenue', 7, null, null, '1119PC', 'Schiphol-Rijk', 28992, 'POINT (111394.397 476832.204)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Nabuccosingel', 159, null, null, '2152PB', 'Nieuw-Vennep', 28992, 'POINT (102938.333 476883.234)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Cessnalaan', 3, null, null, '1119NJ', 'Schiphol-Rijk', 28992, 'POINT (112943.314 477525.336)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Boeingavenue', 247, null, null, '1119PD', 'Schiphol-Rijk', 28992, 'POINT (111527.442 476632.011)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Nabuccosingel', 161, null, null, '2152PB', 'Nieuw-Vennep', 28992, 'POINT (102941.322 476888.785)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Figarolaan', 48, null, null, '2152JD', 'Nieuw-Vennep', 28992, 'POINT (102980.62 476688.342)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Rodelindalaan', 16, null, null, '2152PK', 'Nieuw-Vennep', 28992, 'POINT (103192.317 476780.862)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Cessnalaan', 45, null, null, '1119NK', 'Schiphol-Rijk', 28992, 'POINT (112826.768 477448.859)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Griseldalaan', 52, null, null, '2152JB', 'Nieuw-Vennep', 28992, 'POINT (103179.167 476662.017)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Rodelindalaan', 18, null, null, '2152PK', 'Nieuw-Vennep', 28992, 'POINT (103187.623 476784.377)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen Noord', 'Zadelmaker', 24, null, null, '2152LS', 'Nieuw-Vennep', 28992, 'POINT (103880.1 475994.67)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen Noord', 'Turfsteker', 44, null, null, '2152LZ', 'Nieuw-Vennep', 28992, 'POINT (103853.104 476224.332)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Venneperweg', 282, null, null, '2153AE', 'Nieuw-Vennep', 28992, 'POINT (103980.697 475078.121)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Rodelindalaan', 17, null, null, '2152PM', 'Nieuw-Vennep', 28992, 'POINT (103193.934 476820.412)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Venneperweg', 284, null, null, '2153AE', 'Nieuw-Vennep', 28992, 'POINT (103975.378 475082.968)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen Noord', 'Zadelmaker', 26, null, null, '2152LS', 'Nieuw-Vennep', 28992, 'POINT (103884.126 475991.076)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen Noord', 'Baker', 23, null, null, '2152LB', 'Nieuw-Vennep', 28992, 'POINT (103770.835 476348.103)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Rodelindalaan', 19, null, null, '2152PM', 'Nieuw-Vennep', 28992, 'POINT (103188.127 476824.615)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Venneperweg', 405, null, null, '2153AB', 'Nieuw-Vennep', 28992, 'POINT (103942.181 475169.165)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen Noord', 'Zadelmaker', 28, null, null, '2152LS', 'Nieuw-Vennep', 28992, 'POINT (103888.205 475987.435)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen Noord', 'Baker', 25, null, null, '2152LB', 'Nieuw-Vennep', 28992, 'POINT (103771.098 476342.729)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Venneperweg', 407, null, null, '2153AB', 'Nieuw-Vennep', 28992, 'POINT (103934.546 475175.279)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Rodelindalaan', 21, null, null, '2152PM', 'Nieuw-Vennep', 28992, 'POINT (103182.319 476828.818)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen Noord', 'Zadelmaker', 61, null, null, '2152LN', 'Nieuw-Vennep', 28992, 'POINT (103898.278 475953.438)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Viersepoort', 4, null, null, '2152RR', 'Nieuw-Vennep', 28992, 'POINT (102622.33 476962.754)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Viersepoort', 6, null, null, '2152RR', 'Nieuw-Vennep', 28992, 'POINT (102626.081 476966.831)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Viersepoort', 8, null, null, '2152RR', 'Nieuw-Vennep', 28992, 'POINT (102629.73 476970.798)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Viersepoort', 10, null, null, '2152RR', 'Nieuw-Vennep', 28992, 'POINT (102632.611 476973.929)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Viersepoort', 12, null, null, '2152RR', 'Nieuw-Vennep', 28992, 'POINT (102636.017 476977.63)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Kerkstraat', 9, 'A', null, '2153BD', 'Nieuw-Vennep', 28992, 'POINT (103526.305 475243.854)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Kerkstraat', 11, null, null, '2153BD', 'Nieuw-Vennep', 28992, 'POINT (103546.258 475252.742)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Kerkstraat', 15, null, null, '2153BD', 'Nieuw-Vennep', 28992, 'POINT (103556.775 475241.809)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Kerkstraat', 17, null, null, '2153BD', 'Nieuw-Vennep', 28992, 'POINT (103562.492 475236.701)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Kerkstraat', 19, null, null, '2153BD', 'Nieuw-Vennep', 28992, 'POINT (103569.843 475229.753)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Kerkstraat', 33, null, null, '2153BD', 'Nieuw-Vennep', 28992, 'POINT (103607.736 475187.739)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Kerkstraat', 35, null, null, '2153BD', 'Nieuw-Vennep', 28992, 'POINT (103611.333 475184.942)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Boekweitstraat', 27, null, null, '2153GK', 'Nieuw-Vennep', 28992, 'POINT (104589.812 475497.069)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Boekweitstraat', 29, null, null, '2153GK', 'Nieuw-Vennep', 28992, 'POINT (104594.958 475492.417)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Boekweitstraat', 31, null, null, '2153GK', 'Nieuw-Vennep', 28992, 'POINT (104607.111 475515.339)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Boekweitstraat', 33, null, null, '2153GK', 'Nieuw-Vennep', 28992, 'POINT (104611.318 475511.483)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Boekweitstraat', 45, null, null, '2153GK', 'Nieuw-Vennep', 28992, 'POINT (104679.519 475562.599)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Boekweitstraat', 71, null, null, '2153GK', 'Nieuw-Vennep', 28992, 'POINT (104743.041 475590.943)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Boekweitstraat', 73, null, null, '2153GK', 'Nieuw-Vennep', 28992, 'POINT (104747.284 475595.709)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Velperpoort', 3, null, null, '2152RS', 'Nieuw-Vennep', 28992, 'POINT (102590.189 476985.432)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Velperpoort', 5, null, null, '2152RS', 'Nieuw-Vennep', 28992, 'POINT (102594.184 476989.42)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Weegbreestraat', 76, null, null, '2153ED', 'Nieuw-Vennep', 28992, 'POINT (103595.854 474710.62)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Waterpoort', 40, null, null, '2152RN', 'Nieuw-Vennep', 28992, 'POINT (102753.933 477003.201)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Klaproosstraat', 6, null, null, '2153CR', 'Nieuw-Vennep', 28992, 'POINT (103974.18 474928.377)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Waterpoort', 42, null, null, '2152RN', 'Nieuw-Vennep', 28992, 'POINT (102757.673 477007.304)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Figarolaan', 8, null, null, '2152JC', 'Nieuw-Vennep', 28992, 'POINT (103088.54 476615.929)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Tupolevlaan', 37, null, null, '1119NW', 'Schiphol-Rijk', 28992, 'POINT (111674.997 477070.352)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Faustlaan', 33, null, null, '2152PD', 'Nieuw-Vennep', 28992, 'POINT (103133.989 476788.072)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Faustlaan', 28, null, null, '2152PH', 'Nieuw-Vennep', 28992, 'POINT (103122.077 476751.909)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Figarolaan', 10, null, null, '2152JC', 'Nieuw-Vennep', 28992, 'POINT (103083.845 476619.444)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Tupolevlaan', 39, null, null, '1119NW', 'Schiphol-Rijk', 28992, 'POINT (111656.632 477087.375)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Faustlaan', 35, null, null, '2152PD', 'Nieuw-Vennep', 28992, 'POINT (103129.587 476791.114)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Faustlaan', 30, null, null, '2152PH', 'Nieuw-Vennep', 28992, 'POINT (103117.367 476755.193)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Figarolaan', 12, null, null, '2152JC', 'Nieuw-Vennep', 28992, 'POINT (103079.15 476622.959)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Tupolevlaan', 41, null, null, '1119NW', 'Schiphol-Rijk', 28992, 'POINT (111630.52 477047.483)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Cruquius', 'Cruquiuszoom', 19, null, null, '2142EW', 'Cruquius', 28992, 'POINT (103240.512 482852.312)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Faustlaan', 32, null, null, '2152PH', 'Nieuw-Vennep', 28992, 'POINT (103112.656 476758.477)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Figarolaan', 14, null, null, '2152JC', 'Nieuw-Vennep', 28992, 'POINT (103074.455 476626.474)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Tupolevlaan', 43, null, null, '1119NW', 'Schiphol-Rijk', 28992, 'POINT (111603.44 477016.742)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Nachtschadestraat', 107, null, null, '2153EN', 'Nieuw-Vennep', 28992, 'POINT (103434.21 474864.564)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Nachtschadestraat', 109, null, null, '2153EN', 'Nieuw-Vennep', 28992, 'POINT (103438.199 474861.181)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Wikkestraat', 10, null, null, '2153CG', 'Nieuw-Vennep', 28992, 'POINT (103895.81 474858.418)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Spaanse Ruiterpad', 2, null, null, '2153ER', 'Nieuw-Vennep', 28992, 'POINT (103534.365 474859.725)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Spaanse Ruiterpad', 4, null, null, '2153ER', 'Nieuw-Vennep', 28992, 'POINT (103529.692 474863.85)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Faustlaan', 57, null, null, '2152PE', 'Nieuw-Vennep', 28992, 'POINT (103082.796 476820.445)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Tupolevlaan', 99, null, null, '1119PA', 'Schiphol-Rijk', 28992, 'POINT (111729.392 476979.62)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Zuiderpoort', 54, null, null, '2152RH', 'Nieuw-Vennep', 28992, 'POINT (102781.311 477075.061)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Faustlaan', 59, null, null, '2152PE', 'Nieuw-Vennep', 28992, 'POINT (103110.008 476806.091)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Zuiderpoort', 56, null, null, '2152RH', 'Nieuw-Vennep', 28992, 'POINT (102785.728 477071.104)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Tupolevlaan', 101, null, null, '1119PA', 'Schiphol-Rijk', 28992, 'POINT (111807.858 477084.347)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Faustlaan', 61, null, null, '2152PE', 'Nieuw-Vennep', 28992, 'POINT (103100.195 476812.652)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Zuiderpoort', 58, null, null, '2152RH', 'Nieuw-Vennep', 28992, 'POINT (102790.354 477066.958)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Tupolevlaan', 103, null, null, '1119PA', 'Schiphol-Rijk', 28992, 'POINT (111783.003 477110.878)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Zuiderpoort', 60, null, null, '2152RH', 'Nieuw-Vennep', 28992, 'POINT (102794.665 477063.096)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Faustlaan', 63, null, null, '2152PE', 'Nieuw-Vennep', 28992, 'POINT (103093.746 476816.28)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Tupolevlaan', 105, null, null, '1119PA', 'Schiphol-Rijk', 28992, 'POINT (111812.885 477147.183)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Zuiderpoort', 62, null, null, '2152RH', 'Nieuw-Vennep', 28992, 'POINT (102798.767 477059.42)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Faustlaan', 65, null, null, '2152PE', 'Nieuw-Vennep', 28992, 'POINT (103088.708 476819.505)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Tupolevlaan', 107, null, null, '1119PA', 'Schiphol-Rijk', 28992, 'POINT (111849.469 477185.723)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Nabuccosingel', 171, null, null, '2152PB', 'Nieuw-Vennep', 28992, 'POINT (102956.269 476916.543)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Nabuccosingel', 173, null, null, '2152PB', 'Nieuw-Vennep', 28992, 'POINT (102959.258 476922.095)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Nabuccosingel', 175, null, null, '2152PB', 'Nieuw-Vennep', 28992, 'POINT (102962.247 476927.646)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Nabuccosingel', 177, null, null, '2152PB', 'Nieuw-Vennep', 28992, 'POINT (102965.236 476933.198)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Viersepoort', 14, null, null, '2152RR', 'Nieuw-Vennep', 28992, 'POINT (102665.241 477006.299)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Viersepoort', 16, null, null, '2152RR', 'Nieuw-Vennep', 28992, 'POINT (102669.094 477010.487)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Viersepoort', 18, null, null, '2152RR', 'Nieuw-Vennep', 28992, 'POINT (102672.947 477014.676)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Viersepoort', 20, null, null, '2152RR', 'Nieuw-Vennep', 28992, 'POINT (102676.8 477018.864)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Viersepoort', 22, null, null, '2152RR', 'Nieuw-Vennep', 28992, 'POINT (102680.653 477023.052)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Viersepoort', 24, null, null, '2152RR', 'Nieuw-Vennep', 28992, 'POINT (102683.199 477028.033)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Viersepoort', 26, null, null, '2152RR', 'Nieuw-Vennep', 28992, 'POINT (102686.85 477032.0)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Viersepoort', 28, null, null, '2152RR', 'Nieuw-Vennep', 28992, 'POINT (102690.5 477035.967)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Viersepoort', 30, null, null, '2152RR', 'Nieuw-Vennep', 28992, 'POINT (102695.785 477038.836)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Zuiderpoort', 31, null, null, '2152RJ', 'Nieuw-Vennep', 28992, 'POINT (102832.513 476988.231)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Warwijcksepoort', 1, null, null, '2152RK', 'Nieuw-Vennep', 28992, 'POINT (102773.539 476887.852)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Warwijcksepoort', 3, null, null, '2152RK', 'Nieuw-Vennep', 28992, 'POINT (102782.422 476896.726)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Zuiderpoort', 26, null, null, '2152RG', 'Nieuw-Vennep', 28992, 'POINT (102690.252 477156.451)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Griseldalaan', 64, null, null, '2152JB', 'Nieuw-Vennep', 28992, 'POINT (103200.902 476688.232)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Griseldalaan', 66, null, null, '2152JB', 'Nieuw-Vennep', 28992, 'POINT (103204.525 476692.601)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Faustlaan', 109, null, null, '2152PG', 'Nieuw-Vennep', 28992, 'POINT (102980.829 476875.914)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Pinksterbloemstraat', 6, null, null, '2153BN', 'Nieuw-Vennep', 28992, 'POINT (103609.296 475176.53)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Pinksterbloemstraat', 8, null, null, '2153BN', 'Nieuw-Vennep', 28992, 'POINT (103615.924 475171.506)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Griseldalaan', 68, null, null, '2152JB', 'Nieuw-Vennep', 28992, 'POINT (103208.147 476696.97)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Nachtschadestraat', 20, null, null, '2153EL', 'Nieuw-Vennep', 28992, 'POINT (103690.746 474764.03)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Stadhouderspoort', 32, null, null, '2152RW', 'Nieuw-Vennep', 28992, 'POINT (102553.138 477084.378)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Stadhouderspoort', 34, null, null, '2152RW', 'Nieuw-Vennep', 28992, 'POINT (102556.76 477088.422)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Nachtschadestraat', 22, null, null, '2153EL', 'Nieuw-Vennep', 28992, 'POINT (103686.332 474768.726)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Stadhouderspoort', 36, null, null, '2152RW', 'Nieuw-Vennep', 28992, 'POINT (102560.382 477092.466)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Nachtschadestraat', 24, null, null, '2153EL', 'Nieuw-Vennep', 28992, 'POINT (103681.361 474772.389)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Stadhouderspoort', 1, null, null, '2152RV', 'Nieuw-Vennep', 28992, 'POINT (102526.168 477016.528)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Stadhouderspoort', 3, null, null, '2152RV', 'Nieuw-Vennep', 28992, 'POINT (102530.103 477020.551)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Nachtschadestraat', 26, null, null, '2153EL', 'Nieuw-Vennep', 28992, 'POINT (103676.718 474776.526)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Stadhouderspoort', 5, null, null, '2152RV', 'Nieuw-Vennep', 28992, 'POINT (102534.037 477024.574)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Stadhouderspoort', 7, null, null, '2152RV', 'Nieuw-Vennep', 28992, 'POINT (102537.972 477028.597)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Nachtschadestraat', 28, null, null, '2153EL', 'Nieuw-Vennep', 28992, 'POINT (103672.021 474780.71)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Venneperweg', 304, null, null, '2153AE', 'Nieuw-Vennep', 28992, 'POINT (103881.928 475137.478)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Nachtschadestraat', 30, null, null, '2153EL', 'Nieuw-Vennep', 28992, 'POINT (103667.395 474784.832)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Figarolaan', 7, null, null, '2152JE', 'Nieuw-Vennep', 28992, 'POINT (103112.518 476643.295)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Figarolaan', 9, null, null, '2152JE', 'Nieuw-Vennep', 28992, 'POINT (103107.958 476646.785)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Nachtschadestraat', 68, null, null, '2153EM', 'Nieuw-Vennep', 28992, 'POINT (103552.124 474798.14)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Carmenlaan', 29, null, null, '2152JM', 'Nieuw-Vennep', 28992, 'POINT (102951.751 476816.114)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Figarolaan', 11, null, null, '2152JE', 'Nieuw-Vennep', 28992, 'POINT (103103.397 476650.274)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Nachtschadestraat', 70, null, null, '2153EM', 'Nieuw-Vennep', 28992, 'POINT (103547.052 474792.454)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Wikkestraat', 12, null, null, '2153CG', 'Nieuw-Vennep', 28992, 'POINT (103892.054 474861.796)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Spaanse Ruiterpad', 6, null, null, '2153ER', 'Nieuw-Vennep', 28992, 'POINT (103525.047 474867.951)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Wikkestraat', 12, 'A', null, '2153CG', 'Nieuw-Vennep', 28992, 'POINT (103890.029 474867.014)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Spaanse Ruiterpad', 8, null, null, '2153ER', 'Nieuw-Vennep', 28992, 'POINT (103520.346 474872.101)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Wikkestraat', 14, null, null, '2153CG', 'Nieuw-Vennep', 28992, 'POINT (103859.776 474871.795)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Rodelindalaan', 15, null, null, '2152PM', 'Nieuw-Vennep', 28992, 'POINT (103199.741 476816.209)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Distelstraat', 19, null, null, '2153CB', 'Nieuw-Vennep', 28992, 'POINT (103884.502 474818.506)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'De Regtstraat', 11, null, null, '2157PK', 'Abbenes', 28992, 'POINT (100465.134 472460.561)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Weegbreestraat', 33, null, null, '2153EB', 'Nieuw-Vennep', 28992, 'POINT (103633.427 474741.061)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Abbenes', 'De Regtstraat', 12, null, null, '2157PK', 'Abbenes', 28992, 'POINT (100430.069 472462.489)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen', 'Ritzema Bosstraat', 12, null, null, '2152XG', 'Nieuw-Vennep', 28992, 'POINT (103422.629 475717.765)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Kamperfoeliestraat', 16, null, null, '2153BG', 'Nieuw-Vennep', 28992, 'POINT (103734.835 474995.994)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Bosstraat', 47, null, null, '2153AK', 'Nieuw-Vennep', 28992, 'POINT (103892.108 475308.591)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen', 'Ritzema Bosstraat', 14, null, null, '2152XG', 'Nieuw-Vennep', 28992, 'POINT (103418.097 475721.792)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Weteringbrug', 'Leimuiderdijk', 496, null, null, '2156MZ', 'Weteringbrug', 28992, 'POINT (104507.159 470723.942)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Bosstraat', 51, null, null, '2153AL', 'Nieuw-Vennep', 28992, 'POINT (103910.913 475257.1)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Kamperfoeliestraat', 17, null, null, '2153BG', 'Nieuw-Vennep', 28992, 'POINT (103706.761 475012.198)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Bosstraat', 113, null, null, '2153AM', 'Nieuw-Vennep', 28992, 'POINT (104077.112 475108.998)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen', 'Ritzema Bosstraat', 16, null, null, '2152XG', 'Nieuw-Vennep', 28992, 'POINT (103409.531 475729.256)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Venneperweg', 286, null, null, '2153AE', 'Nieuw-Vennep', 28992, 'POINT (103970.058 475087.816)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Kamperfoeliestraat', 18, null, null, '2153BG', 'Nieuw-Vennep', 28992, 'POINT (103730.416 474991.058)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Bosstraat', 115, null, null, '2153AM', 'Nieuw-Vennep', 28992, 'POINT (104081.59 475105.03)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen', 'Ritzema Bosstraat', 18, null, null, '2152XG', 'Nieuw-Vennep', 28992, 'POINT (103404.99 475733.3)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Venneperweg', 288, null, null, '2153AE', 'Nieuw-Vennep', 28992, 'POINT (103964.739 475092.663)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Kamperfoeliestraat', 19, null, null, '2153BG', 'Nieuw-Vennep', 28992, 'POINT (103702.377 475007.275)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen Noord', 'Beurtschipper', 154, null, null, '2152LG', 'Nieuw-Vennep', 28992, 'POINT (103626.611 476392.231)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Faustlaan', 34, null, null, '2152PH', 'Nieuw-Vennep', 28992, 'POINT (103099.748 476772.628)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Figarolaan', 16, null, null, '2152JC', 'Nieuw-Vennep', 28992, 'POINT (103069.761 476629.989)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen Noord', 'Beurtschipper', 156, null, null, '2152LG', 'Nieuw-Vennep', 28992, 'POINT (103623.064 476388.229)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Tupolevlaan', 45, null, null, '1119NW', 'Schiphol-Rijk', 28992, 'POINT (111626.889 477043.294)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Ridderspoorstraat', 33, null, null, '2153BT', 'Nieuw-Vennep', 28992, 'POINT (103757.627 474967.124)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Waterpoort', 35, null, null, '2152RM', 'Nieuw-Vennep', 28992, 'POINT (102772.266 476979.207)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Burgerveen', 'Leimuiderdijk', 281, null, null, '2154MR', 'Burgerveen', 28992, 'POINT (106690.205 472561.714)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Leimuiderbrug', 'Leimuiderdijk', 396, null, null, '2155MT', 'Leimuiderbrug', 28992, 'POINT (105910.749 471626.307)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Ridderspoorstraat', 35, null, null, '2153BT', 'Nieuw-Vennep', 28992, 'POINT (103753.253 474962.225)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Warwijcksepoort', 5, null, null, '2152RK', 'Nieuw-Vennep', 28992, 'POINT (102787.277 476901.574)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Lisserdijk', 381, null, null, '2165AD', 'Lisserbroek', 28992, 'POINT (99062.325 473665.567)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Leimuiderbrug', 'Leimuiderdijk', 400, null, null, '2155MT', 'Leimuiderbrug', 28992, 'POINT (105861.902 471585.988)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Warwijcksepoort', 7, null, null, '2152RK', 'Nieuw-Vennep', 28992, 'POINT (102795.702 476909.989)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Leimuiderbrug', 'Weteringweg', 1, null, null, '2155MV', 'Leimuiderbrug', 28992, 'POINT (106367.479 472140.889)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Warwijcksepoort', 9, null, null, '2152RK', 'Nieuw-Vennep', 28992, 'POINT (102800.74 476915.021)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Lisserdijk', 388, null, null, '2165AD', 'Lisserbroek', 28992, 'POINT (99172.014 473471.954)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Leimuiderbrug', 'Weteringweg', 3, null, null, '2155MV', 'Leimuiderbrug', 28992, 'POINT (106330.903 472086.132)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Warwijcksepoort', 11, null, null, '2152RK', 'Nieuw-Vennep', 28992, 'POINT (102809.532 476923.803)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Lisserbroek', 'Lisserdijk', 390, null, null, '2165AD', 'Lisserbroek', 28992, 'POINT (99196.432 473496.824)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Faustlaan', 67, null, null, '2152PE', 'Nieuw-Vennep', 28992, 'POINT (103083.871 476821.99)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Zijlpoort', 10, null, null, '2152RA', 'Nieuw-Vennep', 28992, 'POINT (102858.489 476931.311)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Rijnpoort', 91, null, null, '2152RE', 'Nieuw-Vennep', 28992, 'POINT (102573.725 477174.304)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Faustlaan', 69, null, null, '2152PE', 'Nieuw-Vennep', 28992, 'POINT (103101.002 476813.727)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Haverstraat', 64, null, null, '2153GB', 'Nieuw-Vennep', 28992, 'POINT (104283.541 476052.902)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Nachtschadestraat', 73, null, null, '2153EK', 'Nieuw-Vennep', 28992, 'POINT (103474.055 474890.638)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Warwijcksepoort', 20, null, null, '2152RL', 'Nieuw-Vennep', 28992, 'POINT (102771.247 476927.969)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Haverstraat', 66, null, null, '2153GB', 'Nieuw-Vennep', 28992, 'POINT (104299.436 476057.159)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Warwijcksepoort', 22, null, null, '2152RL', 'Nieuw-Vennep', 28992, 'POINT (102775.029 476932.193)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Nachtschadestraat', 75, null, null, '2153EK', 'Nieuw-Vennep', 28992, 'POINT (103469.388 474894.788)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Haverstraat', 70, null, null, '2153GB', 'Nieuw-Vennep', 28992, 'POINT (104310.288 476096.479)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Boekweitstraat', 24, 'A', null, '2153GL', 'Nieuw-Vennep', 28992, 'POINT (104586.945 475591.542)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Boekweitstraat', 24, null, null, '2153GL', 'Nieuw-Vennep', 28992, 'POINT (104602.081 475580.239)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Haverstraat', 72, null, null, '2153GB', 'Nieuw-Vennep', 28992, 'POINT (104297.007 476102.246)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Nachtschadestraat', 77, null, null, '2153EK', 'Nieuw-Vennep', 28992, 'POINT (103464.72 474898.939)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Boekweitstraat', 26, null, null, '2153GL', 'Nieuw-Vennep', 28992, 'POINT (104578.886 475604.122)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Haverstraat', 74, null, null, '2153GB', 'Nieuw-Vennep', 28992, 'POINT (104304.584 476111.324)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Haverstraat', 76, null, null, '2153GB', 'Nieuw-Vennep', 28992, 'POINT (104312.16 476120.402)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Zuiderpoort', 28, null, null, '2152RG', 'Nieuw-Vennep', 28992, 'POINT (102694.563 477152.588)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Zuiderpoort', 30, null, null, '2152RG', 'Nieuw-Vennep', 28992, 'POINT (102698.98 477148.631)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Zuiderpoort', 32, null, null, '2152RG', 'Nieuw-Vennep', 28992, 'POINT (102705.97 477139.716)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Zuiderpoort', 34, null, null, '2152RG', 'Nieuw-Vennep', 28992, 'POINT (102710.596 477135.57)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Zuiderpoort', 36, null, null, '2152RG', 'Nieuw-Vennep', 28992, 'POINT (102726.65 477123.653)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Zuiderpoort', 38, null, null, '2152RG', 'Nieuw-Vennep', 28992, 'POINT (102730.96 477119.792)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Carmenlaan', 31, null, null, '2152JM', 'Nieuw-Vennep', 28992, 'POINT (102946.442 476818.642)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Figarolaan', 13, null, null, '2152JE', 'Nieuw-Vennep', 28992, 'POINT (103098.837 476653.764)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Nachtschadestraat', 87, null, null, '2153EN', 'Nieuw-Vennep', 28992, 'POINT (103438.217 474871.032)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Carmenlaan', 2, null, null, '2152JN', 'Nieuw-Vennep', 28992, 'POINT (103005.287 476748.072)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Boeingavenue', 225, null, null, '1119PD', 'Schiphol-Rijk', 28992, 'POINT (111575.325 476687.348)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Nachtschadestraat', 89, null, null, '2153EN', 'Nieuw-Vennep', 28992, 'POINT (103443.14 474866.581)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Carmenlaan', 4, null, null, '2152JN', 'Nieuw-Vennep', 28992, 'POINT (103000.104 476750.664)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Boeingavenue', 227, null, null, '1119PD', 'Schiphol-Rijk', 28992, 'POINT (111589.398 476671.541)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Nachtschadestraat', 91, null, null, '2153EN', 'Nieuw-Vennep', 28992, 'POINT (103428.682 474875.912)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Tupolevlaan', 63, null, null, '1119NW', 'Schiphol-Rijk', 28992, 'POINT (111601.616 477023.001)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Nachtschadestraat', 93, null, null, '2153EN', 'Nieuw-Vennep', 28992, 'POINT (103435.065 474870.284)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Carmenlaan', 8, null, null, '2152JN', 'Nieuw-Vennep', 28992, 'POINT (102989.738 476755.847)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Tupolevlaan', 2, null, null, '1119NX', 'Schiphol-Rijk', 28992, 'POINT (111739.763 477141.284)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Venneperweg', 409, null, null, '2153AB', 'Nieuw-Vennep', 28992, 'POINT (103921.725 475185.599)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Rodelindalaan', 23, null, null, '2152PM', 'Nieuw-Vennep', 28992, 'POINT (103176.512 476833.021)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Oost', 'Venneperweg', 411, null, null, '2153AB', 'Nieuw-Vennep', 28992, 'POINT (103917.241 475189.648)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen Noord', 'Zadelmaker', 63, null, null, '2152LN', 'Nieuw-Vennep', 28992, 'POINT (103903.891 475953.772)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen Noord', 'Baker', 29, null, null, '2152LB', 'Nieuw-Vennep', 28992, 'POINT (103771.628 476331.981)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Rodelindalaan', 25, null, null, '2152PM', 'Nieuw-Vennep', 28992, 'POINT (103166.779 476840.985)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Faustlaan', 36, null, null, '2152PH', 'Nieuw-Vennep', 28992, 'POINT (103096.983 476774.398)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Figarolaan', 18, null, null, '2152JC', 'Nieuw-Vennep', 28992, 'POINT (103065.066 476633.504)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen Noord', 'Beurtschipper', 158, null, null, '2152LG', 'Nieuw-Vennep', 28992, 'POINT (103619.469 476384.174)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Faustlaan', 38, null, null, '2152PH', 'Nieuw-Vennep', 28992, 'POINT (103094.218 476776.167)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Tupolevlaan', 47, null, null, '1119NW', 'Schiphol-Rijk', 28992, 'POINT (111601.306 477018.685)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Figarolaan', 20, null, null, '2152JC', 'Nieuw-Vennep', 28992, 'POINT (103060.371 476637.019)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Carmenlaan', 7, null, null, '2152JM', 'Nieuw-Vennep', 28992, 'POINT (103010.691 476785.301)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Faustlaan', 40, null, null, '2152PJ', 'Nieuw-Vennep', 28992, 'POINT (103064.353 476796.962)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Figarolaan', 22, null, null, '2152JC', 'Nieuw-Vennep', 28992, 'POINT (103053.734 476641.664)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Tupolevlaan', 49, null, null, '1119NW', 'Schiphol-Rijk', 28992, 'POINT (111623.402 477038.7)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Carmenlaan', 9, null, null, '2152JM', 'Nieuw-Vennep', 28992, 'POINT (103005.634 476788.05)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Faustlaan', 42, null, null, '2152PJ', 'Nieuw-Vennep', 28992, 'POINT (103060.371 476798.953)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Figarolaan', 24, null, null, '2152JC', 'Nieuw-Vennep', 28992, 'POINT (103048.84 476644.789)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Tupolevlaan', 51, null, null, '1119NW', 'Schiphol-Rijk', 28992, 'POINT (111599.172 477020.628)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Distelstraat', 31, null, null, '2153CB', 'Nieuw-Vennep', 28992, 'POINT (103846.652 474775.902)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Distelstraat', 33, null, null, '2153CB', 'Nieuw-Vennep', 28992, 'POINT (103840.41 474768.897)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Distelstraat', 35, null, null, '2153CB', 'Nieuw-Vennep', 28992, 'POINT (103833.018 474760.447)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Distelstraat', 37, null, null, '2153CB', 'Nieuw-Vennep', 28992, 'POINT (103826.913 474753.577)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Distelstraat', 39, null, null, '2153CB', 'Nieuw-Vennep', 28992, 'POINT (103820.825 474746.692)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Rijnpoort', 93, null, null, '2152RE', 'Nieuw-Vennep', 28992, 'POINT (102576.491 477179.275)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Zijlpoort', 12, null, null, '2152RA', 'Nieuw-Vennep', 28992, 'POINT (102872.277 476946.27)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Faustlaan', 71, null, null, '2152PE', 'Nieuw-Vennep', 28992, 'POINT (103094.956 476817.825)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Rijnpoort', 95, null, null, '2152RE', 'Nieuw-Vennep', 28992, 'POINT (102580.332 477183.563)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Regulierspoort', 28, null, null, '2152RB', 'Nieuw-Vennep', 28992, 'POINT (102499.191 476996.013)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Faustlaan', 73, null, null, '2152PE', 'Nieuw-Vennep', 28992, 'POINT (103090.455 476819.975)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Rijnpoort', 97, null, null, '2152RE', 'Nieuw-Vennep', 28992, 'POINT (102584.104 477187.772)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Regulierspoort', 30, null, null, '2152RB', 'Nieuw-Vennep', 28992, 'POINT (102508.457 476991.43)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Faustlaan', 75, null, null, '2152PG', 'Nieuw-Vennep', 28992, 'POINT (103069.883 476830.588)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Rijnpoort', 99, null, null, '2152RE', 'Nieuw-Vennep', 28992, 'POINT (102587.876 477191.983)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Regulierspoort', 32, null, null, '2152RB', 'Nieuw-Vennep', 28992, 'POINT (102514.036 476987.644)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Faustlaan', 77, null, null, '2152PG', 'Nieuw-Vennep', 28992, 'POINT (103060.116 476831.232)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Zuiderpoort', 2, null, null, '2152RG', 'Nieuw-Vennep', 28992, 'POINT (102611.857 477225.74)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Regulierspoort', 34, null, null, '2152RB', 'Nieuw-Vennep', 28992, 'POINT (102523.103 476983.061)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen Noord', 'Marketentster', 16, null, null, '2152LW', 'Nieuw-Vennep', 28992, 'POINT (103880.712 476267.091)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen Noord', 'Zadelmaker', 151, null, null, '2152LR', 'Nieuw-Vennep', 28992, 'POINT (103980.296 476055.202)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Rodelindalaan', 22, null, null, '2152PK', 'Nieuw-Vennep', 28992, 'POINT (103175.628 476792.98)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Rodelindalaan', 24, null, null, '2152PK', 'Nieuw-Vennep', 28992, 'POINT (103170.733 476796.243)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Rodelindalaan', 26, null, null, '2152PK', 'Nieuw-Vennep', 28992, 'POINT (103165.838 476799.506)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Zuiderpoort', 40, null, null, '2152RG', 'Nieuw-Vennep', 28992, 'POINT (102735.588 477115.646)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Zuiderpoort', 42, null, null, '2152RG', 'Nieuw-Vennep', 28992, 'POINT (102739.793 477111.876)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Zuiderpoort', 44, null, null, '2152RG', 'Nieuw-Vennep', 28992, 'POINT (102744.316 477107.826)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Zuiderpoort', 46, null, null, '2152RG', 'Nieuw-Vennep', 28992, 'POINT (102748.732 477103.869)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Zuiderpoort', 48, null, null, '2152RG', 'Nieuw-Vennep', 28992, 'POINT (102756.108 477095.174)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Zuiderpoort', 50, null, null, '2152RG', 'Nieuw-Vennep', 28992, 'POINT (102760.419 477091.311)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Omgeving', 'IJweg', 1476, null, null, '2152NB', 'Nieuw-Vennep', 28992, 'POINT (103020.119 477831.534)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Rijnpoort', 69, null, null, '2152RE', 'Nieuw-Vennep', 28992, 'POINT (102529.365 477124.934)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Rijnpoort', 71, null, null, '2152RE', 'Nieuw-Vennep', 28992, 'POINT (102532.346 477129.993)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Regulierspoort', 70, null, null, '2152RB', 'Nieuw-Vennep', 28992, 'POINT (102680.122 476892.902)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Regulierspoort', 72, null, null, '2152RB', 'Nieuw-Vennep', 28992, 'POINT (102683.714 476889.609)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Douglassingel', 47, null, null, '1119MD', 'Schiphol-Rijk', 28992, 'POINT (112570.05 477391.478)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Regulierspoort', 74, null, null, '2152RB', 'Nieuw-Vennep', 28992, 'POINT (102694.967 476882.931)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Pinksterbloemstraat', 18, null, null, '2153BN', 'Nieuw-Vennep', 28992, 'POINT (103587.815 475137.463)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Faustlaan', 29, null, null, '2152PD', 'Nieuw-Vennep', 28992, 'POINT (103142.794 476781.987)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Faustlaan', 45, null, null, '2152PE', 'Nieuw-Vennep', 28992, 'POINT (103086.961 476816.078)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Pinksterbloemstraat', 20, null, null, '2153BN', 'Nieuw-Vennep', 28992, 'POINT (103583.774 475132.117)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen Noord', 'Beurtschipper', 45, null, null, '2152LT', 'Nieuw-Vennep', 28992, 'POINT (103909.334 476038.394)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Rijnpoort', 11, null, null, '2152RD', 'Nieuw-Vennep', 28992, 'POINT (102464.514 477017.469)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Boeingavenue', 65, null, null, '1119PE', 'Schiphol-Rijk', 28992, 'POINT (111322.328 476753.322)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Faustlaan', 81, null, null, '2152PG', 'Nieuw-Vennep', 28992, 'POINT (103054.702 476838.884)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Tupolevlaan', 59, null, null, '1119NW', 'Schiphol-Rijk', 28992, 'POINT (111603.296 477021.306)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Rijnpoort', 13, null, null, '2152RD', 'Nieuw-Vennep', 28992, 'POINT (102469.047 477014.85)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Boeingavenue', 66, null, null, '1119PE', 'Schiphol-Rijk', 28992, 'POINT (111636.471 476908.581)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Faustlaan', 83, null, null, '2152PG', 'Nieuw-Vennep', 28992, 'POINT (103049.642 476841.649)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Tupolevlaan', 61, null, null, '1119NW', 'Schiphol-Rijk', 28992, 'POINT (111611.529 477025.979)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Faustlaan', 62, null, null, '2152PJ', 'Nieuw-Vennep', 28992, 'POINT (102995.774 476827.491)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Faustlaan', 95, null, null, '2152PG', 'Nieuw-Vennep', 28992, 'POINT (103015.586 476858.708)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Faustlaan', 97, null, null, '2152PG', 'Nieuw-Vennep', 28992, 'POINT (103010.621 476861.166)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Faustlaan', 99, null, null, '2152PG', 'Nieuw-Vennep', 28992, 'POINT (103005.655 476863.624)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Faustlaan', 101, null, null, '2152PG', 'Nieuw-Vennep', 28992, 'POINT (103000.69 476866.082)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Regulierspoort', 38, null, null, '2152RB', 'Nieuw-Vennep', 28992, 'POINT (102536.952 476974.692)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Figarolaan', 28, null, null, '2152JC', 'Nieuw-Vennep', 28992, 'POINT (103039.051 476651.039)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen Noord', 'Marketentster', 19, null, null, '2152LW', 'Nieuw-Vennep', 28992, 'POINT (103836.948 476317.169)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Regulierspoort', 40, null, null, '2152RB', 'Nieuw-Vennep', 28992, 'POINT (102541.435 476971.205)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Figarolaan', 30, null, null, '2152JC', 'Nieuw-Vennep', 28992, 'POINT (103034.156 476654.163)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen Noord', 'Marketentster', 20, null, null, '2152LW', 'Nieuw-Vennep', 28992, 'POINT (103831.813 476254.866)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Regulierspoort', 42, null, null, '2152RB', 'Nieuw-Vennep', 28992, 'POINT (102560.365 476960.943)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Figarolaan', 32, null, null, '2152JC', 'Nieuw-Vennep', 28992, 'POINT (103029.262 476657.288)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen Noord', 'Marketentster', 21, null, null, '2152LW', 'Nieuw-Vennep', 28992, 'POINT (103823.321 476322.668)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Regulierspoort', 44, null, null, '2152RB', 'Nieuw-Vennep', 28992, 'POINT (102563.696 476957.562)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Regulierspoort', 46, null, null, '2152RB', 'Nieuw-Vennep', 28992, 'POINT (102574.214 476952.574)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Tupolevlaan', 109, null, null, '1119PA', 'Schiphol-Rijk', 28992, 'POINT (111874.604 477173.714)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen Noord', 'Marketentster', 22, null, null, '2152LW', 'Nieuw-Vennep', 28992, 'POINT (103827.928 476258.385)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Regulierspoort', 48, null, null, '2152RB', 'Nieuw-Vennep', 28992, 'POINT (102578.199 476948.588)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Rodelindalaan', 4, null, null, '2152PK', 'Nieuw-Vennep', 28992, 'POINT (103220.486 476759.772)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Wikkestraat', 5, null, null, '2153CD', 'Nieuw-Vennep', 28992, 'POINT (103890.737 474900.079)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Rodelindalaan', 6, null, null, '2152PK', 'Nieuw-Vennep', 28992, 'POINT (103215.792 476763.287)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Figarolaan', 34, null, null, '2152JC', 'Nieuw-Vennep', 28992, 'POINT (103024.367 476660.413)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Rodelindalaan', 8, null, null, '2152PK', 'Nieuw-Vennep', 28992, 'POINT (103211.097 476766.802)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Figarolaan', 58, null, null, '2152JD', 'Nieuw-Vennep', 28992, 'POINT (102953.078 476704.27)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Douglassingel', 55, null, null, '1119MD', 'Schiphol-Rijk', 28992, 'POINT (112599.325 477363.989)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Figarolaan', 60, null, null, '2152JD', 'Nieuw-Vennep', 28992, 'POINT (102947.88 476706.704)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Douglassingel', 57, null, null, '1119MD', 'Schiphol-Rijk', 28992, 'POINT (112607.434 477356.429)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Figarolaan', 62, null, null, '2152JD', 'Nieuw-Vennep', 28992, 'POINT (102942.681 476709.137)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Douglassingel', 59, null, null, '1119MD', 'Schiphol-Rijk', 28992, 'POINT (112615.269 477349.282)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Figarolaan', 64, null, null, '2152JD', 'Nieuw-Vennep', 28992, 'POINT (102937.482 476711.571)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Douglassingel', 61, null, null, '1119MD', 'Schiphol-Rijk', 28992, 'POINT (112622.965 477342.135)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Figarolaan', 66, null, null, '2152JD', 'Nieuw-Vennep', 28992, 'POINT (102932.283 476714.004)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Douglassingel', 63, null, null, '1119MD', 'Schiphol-Rijk', 28992, 'POINT (112630.662 477334.713)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Faustlaan', 91, null, null, '2152PG', 'Nieuw-Vennep', 28992, 'POINT (103029.4 476852.71)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Figarolaan', 68, null, null, '2152JD', 'Nieuw-Vennep', 28992, 'POINT (102927.085 476716.437)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Douglassingel', 65, null, null, '1119MD', 'Schiphol-Rijk', 28992, 'POINT (112638.222 477327.979)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Faustlaan', 93, null, null, '2152PG', 'Nieuw-Vennep', 28992, 'POINT (103020.551 476856.25)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen Noord', 'Zadelmaker', 12, null, null, '2152LS', 'Nieuw-Vennep', 28992, 'POINT (103842.91 476036.823)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen Noord', 'Beurtschipper', 53, null, null, '2152LV', 'Nieuw-Vennep', 28992, 'POINT (103942.999 476059.423)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Zuid', 'Venneperweg', 270, null, null, '2153AE', 'Nieuw-Vennep', 28992, 'POINT (104013.922 475047.792)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen Noord', 'Turfsteker', 32, null, null, '2152LZ', 'Nieuw-Vennep', 28992, 'POINT (103851.856 476228.816)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen Noord', 'Beurtschipper', 55, null, null, '2152LV', 'Nieuw-Vennep', 28992, 'POINT (103946.617 476063.453)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Boeingavenue', 249, 'A', null, '1119PD', 'Schiphol-Rijk', 28992, 'POINT (111552.503 476649.829)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Nabuccosingel', 167, null, null, '2152PB', 'Nieuw-Vennep', 28992, 'POINT (102950.29 476905.44)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Cessnalaan', 9, null, null, '1119NJ', 'Schiphol-Rijk', 28992, 'POINT (112935.372 477547.883)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Boeingavenue', 251, 'A', null, '1119PD', 'Schiphol-Rijk', 28992, 'POINT (111540.845 476658.404)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Nabuccosingel', 169, null, null, '2152PB', 'Nieuw-Vennep', 28992, 'POINT (102953.279 476910.991)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Cessnalaan', 11, null, null, '1119NJ', 'Schiphol-Rijk', 28992, 'POINT (112928.886 477554.428)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen Noord', 'Marketentster', 25, null, null, '2152LW', 'Nieuw-Vennep', 28992, 'POINT (103811.661 476322.036)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Boeingavenue', 251, null, null, '1119PD', 'Schiphol-Rijk', 28992, 'POINT (111546.674 476654.116)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Cessnalaan', 13, null, null, '1119NJ', 'Schiphol-Rijk', 28992, 'POINT (112921.996 477560.547)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Boeingavenue', 255, null, null, '1119PD', 'Schiphol-Rijk', 28992, 'POINT (111471.73 476599.592)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen Noord', 'Marketentster', 26, null, null, '2152LW', 'Nieuw-Vennep', 28992, 'POINT (103820.014 476265.42)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Zuiderpoort', 21, null, null, '2152RJ', 'Nieuw-Vennep', 28992, 'POINT (102763.485 477050.069)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Boeingavenue', 257, null, null, '1119PD', 'Schiphol-Rijk', 28992, 'POINT (111466.584 476593.932)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen Noord', 'Marketentster', 27, null, null, '2152LW', 'Nieuw-Vennep', 28992, 'POINT (103805.924 476321.725)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen Noord', 'Baker', 51, null, null, '2152LB', 'Nieuw-Vennep', 28992, 'POINT (103743.695 476276.331)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Griseldalaan', 78, null, null, '2152JB', 'Nieuw-Vennep', 28992, 'POINT (103235.247 476730.485)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Waterpoort', 37, null, null, '2152RM', 'Nieuw-Vennep', 28992, 'POINT (102776.278 476983.213)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen Noord', 'Baker', 53, null, null, '2152LB', 'Nieuw-Vennep', 28992, 'POINT (103739.973 476272.18)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Griseldalaan', 80, null, null, '2152JB', 'Nieuw-Vennep', 28992, 'POINT (103238.814 476734.937)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Faustlaan', 103, null, null, '2152PG', 'Nieuw-Vennep', 28992, 'POINT (102995.725 476868.54)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Faustlaan', 7, null, null, '2152PD', 'Nieuw-Vennep', 28992, 'POINT (103194.285 476745.299)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Faustlaan', 9, null, null, '2152PD', 'Nieuw-Vennep', 28992, 'POINT (103189.988 476748.569)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Faustlaan', 11, null, null, '2152PD', 'Nieuw-Vennep', 28992, 'POINT (103185.691 476751.839)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Faustlaan', 13, null, null, '2152PD', 'Nieuw-Vennep', 28992, 'POINT (103181.394 476755.109)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Faustlaan', 15, null, null, '2152PD', 'Nieuw-Vennep', 28992, 'POINT (103177.097 476758.378)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Faustlaan', 17, null, null, '2152PD', 'Nieuw-Vennep', 28992, 'POINT (103172.8 476761.648)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Faustlaan', 19, null, null, '2152PD', 'Nieuw-Vennep', 28992, 'POINT (103168.504 476764.918)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Faustlaan', 21, null, null, '2152PD', 'Nieuw-Vennep', 28992, 'POINT (103160.402 476769.818)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Faustlaan', 23, null, null, '2152PD', 'Nieuw-Vennep', 28992, 'POINT (103156.0 476772.86)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Faustlaan', 49, null, null, '2152PE', 'Nieuw-Vennep', 28992, 'POINT (103108.929 476804.457)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Faustlaan', 51, null, null, '2152PE', 'Nieuw-Vennep', 28992, 'POINT (103098.919 476811.174)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Faustlaan', 53, null, null, '2152PE', 'Nieuw-Vennep', 28992, 'POINT (103093.209 476814.466)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Nabuccosingel', 133, null, null, '2152PA', 'Nieuw-Vennep', 28992, 'POINT (102899.018 476790.832)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Getsewoud Noord', 'Fideliolaan', 8, null, null, '2152PS', 'Nieuw-Vennep', 28992, 'POINT (102982.157 476948.449)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Nieuw-Vennep Welgelegen Noord', 'Marketentster', 28, null, null, '2152LW', 'Nieuw-Vennep', 28992, 'POINT (103815.793 476269.289)');

insert into public.geo_address (id, government, type, active, district, street, number, letter, addition, postal, city, srid, geo)
values (nextval('public.seq_geo_address'), 0394, 'address', true, 'Schiphol-Rijk', 'Boeingavenue', 333, null, null, '1119PH', 'Schiphol-Rijk', 28992, 'POINT (111748.66 476607.675)');
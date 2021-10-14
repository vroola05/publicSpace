package org.commonground.ps.backendapi.util.geocoding;


public class ConvertFromWGS84ToRd {
	
	public ConvertFromWGS84ToRd() {}
	
	public static double[] convertFromWGS84ToRd(double lat, double lng){
		double[] result = new double[2];
		Double x = Double.valueOf(getX(lat, lng));
		Double y = Double.valueOf(getY(lat, lng));
		result[0] = x;
		result[1] = y;
		return result;
	}
	
	public static double getDphi(double lat){
		return (lat-ConvertingConstants.lattord);
	}
	
	public static double getDlam(double lng){
		return (lng-ConvertingConstants.lngtord);
	}
	
	public static double getPhicor(double lat, double lng){
		return ((-96.862-(getDphi(lat)*11.714)-(getDlam(lng)*0.125))*0.00001);
	}
	
	public static double getLamcor(double lat, double lng){
		return (((getDphi(lat)*0.329)-37.902-(getDlam(lng)*14.667))*0.00001);
	}
	
	public static double getPhibes(double lat, double lng){
		return (lat-getPhicor(lat, lng));
	}
	
	public static double getLambes(double lat, double lng){
		return (lng-getLamcor(lat, lng));
	}
	
	public static double getPhi(double lat, double lng){
		return ((getPhibes(lat, lng)/180)*ConvertingConstants.pi);
	}
	
	public static double getLambda(double lat, double lng){
		return ((getLambes(lat, lng)/180)*ConvertingConstants.pi);
	}
	
	public static double getQprime(double lat, double lng){
		return (Math.log(Math.tan((getPhi(lat, lng)/2)+(ConvertingConstants.pi/4))));
	}
	
	public static double getDq(double lat, double lng){
		return (ConvertingConstants.e/2*Math.log((ConvertingConstants.e*Math.sin(getPhi(lat, lng))+1)/(1-ConvertingConstants.e*Math.sin(getPhi(lat, lng)))));
	}
	
	public static double getQ(double lat, double lng){
		return (getQprime(lat, lng)-getDq(lat, lng));
	}
	
	public static double getW(double lat, double lng){
		return (ConvertingConstants.n*getQ(lat, lng)+ConvertingConstants.m);
	}
	
	public static double getB(double lat, double lng){
		return ((Math.atan(Math.exp(getW(lat, lng)))*2)-(ConvertingConstants.pi/2));
	}
	
	public static double getDl(double lat, double lng){
		return (ConvertingConstants.n*(getLambda(lat, lng)-ConvertingConstants.lambda0));
	}
	
	public static double getD_1(double lat, double lng){
		return (Math.sin((getB(lat, lng)-ConvertingConstants.b0)/2));
	}
	
	public static double getD_2(double lat, double lng){
		return (Math.sin(getDl(lat, lng)/2));
	}
	
	public static double getS2psihalf(double lat, double lng){
		return ((getD_1(lat, lng)*getD_1(lat, lng))+(getD_2(lat, lng)*getD_2(lat, lng)*Math.cos(getB(lat, lng))*Math.cos(ConvertingConstants.b0)));
	}
	
	public static double getCpsihalf(double lat, double lng){
		return (Math.sqrt(1-getS2psihalf(lat, lng)));
	}
	
	public static double getSpsihalf(double lat, double lng){
		return (Math.sqrt(getS2psihalf(lat, lng)));
	}
	
	public static double getTpsihalf(double lat, double lng){
		return (getSpsihalf(lat, lng)/getCpsihalf(lat, lng));
	}
	
	public static double getSpsi(double lat, double lng){
		return (getSpsihalf(lat, lng)*2*getCpsihalf(lat, lng));
	}
	
	public static double getCpsi(double lat, double lng){
		return (1-(getS2psihalf(lat, lng)*2));
	}
	
	public static double getSa(double lat, double lng){
		return (Math.sin(getDl(lat, lng))*Math.cos(getB(lat, lng))/getSpsi(lat, lng));
	}
	
	public static double getCa(double lat, double lng){
		return (Math.sin(getB(lat, lng))-Math.sin(ConvertingConstants.b0)*getCpsi(lat, lng))/(Math.cos(ConvertingConstants.b0)*getSpsi(lat, lng));
	}
	
	public static double getR(double lat, double lng){
		return (ConvertingConstants.k*2*ConvertingConstants.bigr*getTpsihalf(lat, lng));
	}
	
	public static double getX(double lat, double lng){
		return ((getR(lat, lng)*getSa(lat, lng))+ConvertingConstants.x0);
	}
	
	public static double getY(double lat, double lng){
		return ((getR(lat, lng)*getCa(lat, lng))+ConvertingConstants.y0);
	}
}

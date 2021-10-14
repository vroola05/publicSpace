package org.commonground.ps.backendapi.util.geocoding;

public class LattitudeLongitude {
	
	private double dphi = 0;
	private double dlam = 0;
	private double phicor = 0;
	private double lamcor = 0;
	private double phibes = 0;
	private double lambes = 0;
	private double phi = 0;
	private double lambda = 0;
	private double qprime = 0;
	private double dq = 0;
	private double q = 0;
	private double w = 0;
	private double b = 0;
	private double dl = 0;
	private double d_1 = 0;
	private double d_2 = 0;
	private double s2psihalf = 0;
	private double cpsihalf = 0;
	private double spsihalf = 0;
	private double tpsihalf = 0;
	private double cpsi = 0;
	private double spsi = 0;
	private double sa = 0;
	private double ca = 0;
	private double r = 0;
	private Double x = Double.valueOf(0);
	private Double y = Double.valueOf(0);
	private double lat = 0;
	private double lng = 0;
	
	public LattitudeLongitude(){	
	}
	
	public LattitudeLongitude(double lat, double lng){
		this.lat = lat;
		this.lng = lng;
		reCalculate();
	}
	
	public void reCalculate(){
		this.dphi = (this.lat-ConvertingConstants.lattord);
		this.dlam = (this.lng-ConvertingConstants.lngtord);
		this.phicor = ((-96.862-(dphi*11.714)-(dlam*0.125))*0.00001);
		this.lamcor = (((dphi*0.329)-37.902-(dlam*14.667))*0.00001);
		this.phibes = (this.lat-phicor);
		this.lambes = (this.lng-lamcor);
		this.phi = ((phibes/180)*Math.PI);
		this.lambda = ((lambes/180)*Math.PI);
		this.qprime = (Math.log(Math.tan((phi/2)+(Math.PI/4))));
		this.dq = (ConvertingConstants.E/2*Math.log((ConvertingConstants.E*Math.sin(phi)+1)/(1-ConvertingConstants.E*Math.sin(phi))));
		this.q = (qprime-dq);
		this.w = (ConvertingConstants.N*q+ConvertingConstants.M);
		this.b = ((Math.atan(Math.exp(w))*2)-(Math.PI/2));
		this.dl = (ConvertingConstants.N*(lambda-ConvertingConstants.LAMBDA));
		this.d_1 = (Math.sin((b-ConvertingConstants.B)/2));
		this.d_2 = (Math.sin(dl/2));
		this.s2psihalf = ((d_1*d_1)+(d_2*d_2*Math.cos(b)*Math.cos(ConvertingConstants.B)));
		this.cpsihalf = (Math.sqrt(1-s2psihalf));
		this.spsihalf = (Math.sqrt(s2psihalf));
		this.tpsihalf = (spsihalf/cpsihalf);
		this.spsi = (spsihalf*2*cpsihalf);
		this.cpsi = (1-(s2psihalf*2));
		this.sa = (Math.sin(dl)*Math.cos(b)/spsi);
		this.ca = (Math.sin(b)-Math.sin(ConvertingConstants.B)*cpsi)/(Math.cos(ConvertingConstants.B)*spsi);
		this.r = (ConvertingConstants.K*2*ConvertingConstants.BIGR*tpsihalf);
		this.x = Double.valueOf((r*sa)+ConvertingConstants.X);
		this.y = Double.valueOf((r*ca)+ConvertingConstants.Y);
	}

	public double getLat() {
		return lat;
	}

	public void setLat(double lat) {
		this.lat = lat;
		reCalculate();
	}

	public double getLng() {
		return lng;
	}

	public void setLng(double lng) {
		this.lng = lng;
		reCalculate();
	}

	public double getDphi() {
		return dphi;
	}

	public double getDlam() {
		return dlam;
	}

	public double getPhicor() {
		return phicor;
	}

	public double getLamcor() {
		return lamcor;
	}

	public double getPhibes() {
		return phibes;
	}

	public double getLambes() {
		return lambes;
	}

	public double getPhi() {
		return phi;
	}

	public double getLambda() {
		return lambda;
	}

	public double getQprime() {
		return qprime;
	}

	public double getDq() {
		return dq;
	}

	public double getQ() {
		return q;
	}

	public double getW() {
		return w;
	}

	public double getB() {
		return b;
	}

	public double getDl() {
		return dl;
	}

	public double getD_1() {
		return d_1;
	}

	public double getD_2() {
		return d_2;
	}

	public double getS2psihalf() {
		return s2psihalf;
	}

	public double getCpsihalf() {
		return cpsihalf;
	}

	public double getSpsihalf() {
		return spsihalf;
	}

	public double getTpsihalf() {
		return tpsihalf;
	}

	public double getCpsi() {
		return cpsi;
	}

	public double getSpsi() {
		return spsi;
	}

	public double getSa() {
		return sa;
	}

	public double getCa() {
		return ca;
	}

	public double getR() {
		return r;
	}

	public Double getX() {
		return x;
	}

	public Double getY() {
		return y;
	}
	
	public String toString(){
		return this.lat+", "+this.lng;
	}
}
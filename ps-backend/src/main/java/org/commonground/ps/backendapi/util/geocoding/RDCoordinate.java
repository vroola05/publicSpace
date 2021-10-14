package org.commonground.ps.backendapi.util.geocoding;

public class RDCoordinate {
	
	private double x = 0;
	private double y = 0;
	private double d_1 = 0;
	private double d_2 = 0;
	private double r = 0;
	private double sa = 0;
	private double ca = 0;
	private double psi = 0;
	private double cpsi = 0;
	private double spsi = 0;
	private double sb = 0;
	private double cb = 0;
	private double b = 0;
	private double sdl = 0;
	private double dl = 0;
	private double lambda = 0;
	private double w = 0;
	private double q = 0;
	private double phiprime = 0;
	private double dq = 0;
	private double phi = 0;
	private double dq2 = 0;
	private double phi2 = 0;
	private double dq3 = 0;
	private double phi3 = 0;
	private double dq4 = 0;
	private double phi4 = 0;
	private double phi5 = 0;
	private double lambda2 = 0;
	private double dphi = 0;
	private double dlam = 0;
	private double phicor = 0;
	private double lamcor = 0;
	private Double lat = Double.valueOf(0);
	private Double lng = Double.valueOf(0);
	
	public RDCoordinate(double x, double y){
		this.x = x;
		this.y = y;
		reCalculate();
	}

	public void reCalculate(){
		this.d_1 = (this.x-ConvertingConstants.X);
		this.d_2 = (this.y-ConvertingConstants.Y);
		this.r = Math.sqrt(((Math.pow(d_1, 2))+(Math.pow(d_2, 2))));
		if(r < 0 || r > 0){
			this.sa = ((this.x-ConvertingConstants.X)/r);
			this.ca = ((this.y-ConvertingConstants.Y)/r);
		}else{
			this.sa = 0;
			this.ca = 0;
		}
		this.psi = (Math.atan2(r, (ConvertingConstants.K*2*ConvertingConstants.BIGR))*2);
		this.cpsi = (Math.cos(psi));
		this.spsi = (Math.sin(psi));
		this.sb = (((ca*(Math.cos(ConvertingConstants.B)))*spsi)+((Math.sin(ConvertingConstants.B))*cpsi));
		this.cb = (Math.sqrt((1-(Math.pow(sb, 2)))));
		this.b = (Math.acos(cb));
		this.sdl = ((sa*spsi)/cb);
		this.dl = (Math.asin(sdl));
		this.lambda = ((dl/ConvertingConstants.N)+ConvertingConstants.LAMBDA);
		this.w = (Math.log((Math.tan(((b/2)+(Math.PI/4))))));
		this.q = ((w-ConvertingConstants.M)/ConvertingConstants.N);
		this.phiprime = (((Math.atan(Math.exp(q)))*2)-(Math.PI/2));
		this.dq = (ConvertingConstants.E/2*(Math.log((((ConvertingConstants.E*Math.sin(phiprime))+1)/(1-(ConvertingConstants.E*Math.sin(phiprime)))))));
		this.phi = ((Math.atan(Math.exp((q+dq)))*2)-(Math.PI/2));
		this.dq2 = (ConvertingConstants.E/2*(Math.log((((ConvertingConstants.E*Math.sin(phi))+1)/(1-(ConvertingConstants.E*Math.sin(phi)))))));
		this.phi2 = ((Math.atan(Math.exp((q+dq2)))*2)-(Math.PI/2));
		this.dq3 = (ConvertingConstants.E/2*(Math.log((((ConvertingConstants.E*Math.sin(phi2))+1)/(1-(ConvertingConstants.E*Math.sin(phi2)))))));
		this.phi3 = ((Math.atan(Math.exp((q+dq3)))*2)-(Math.PI/2));
		this.dq4 = (ConvertingConstants.E/2*(Math.log((((ConvertingConstants.E*Math.sin(phi3))+1)/(1-(ConvertingConstants.E*Math.sin(phi3)))))));
		this.phi4 = ((Math.atan(Math.exp((q+dq4)))*2)-(Math.PI/2));
		this.lambda2 = ((lambda/Math.PI)*180);
		this.phi5 = ((phi4/Math.PI)*180);
		this.dphi = (phi5-52);
		this.dlam = (lambda2-5);
		this.phicor = ((-96.862-(dphi*11.714)-(dlam*0.125))*0.00001);
		this.lamcor = (((dphi*0.329)-37.902-(dlam*14.667))*0.00001);
		this.lat = (phi5+phicor);
		this.lng = (lambda2+lamcor);
	}
	
	public double getX() {
		return x;
	}

	public void setX(double x) {
		this.x = x;
		reCalculate();
	}

	public double getY() {
		return y;
	}

	public void setY(double y) {
		this.y = y;
		reCalculate();
	}

	public double getD_1() {
		return d_1;
	}

	public double getD_2() {
		return d_2;
	}

	public double getR() {
		return r;
	}

	public double getSa() {
		return sa;
	}

	public double getCa() {
		return ca;
	}

	public double getPsi() {
		return psi;
	}

	public double getCpsi() {
		return cpsi;
	}

	public double getSpsi() {
		return spsi;
	}

	public double getSb() {
		return sb;
	}

	public double getCb() {
		return cb;
	}

	public double getB() {
		return b;
	}

	public double getSdl() {
		return sdl;
	}

	public double getDl() {
		return dl;
	}

	public double getLambda() {
		return lambda;
	}

	public double getW() {
		return w;
	}

	public double getQ() {
		return q;
	}

	public double getPhiprime() {
		return phiprime;
	}

	public double getDq() {
		return dq;
	}

	public double getPhi() {
		return phi;
	}

	public double getDq2() {
		return dq2;
	}

	public double getPhi2() {
		return phi2;
	}

	public double getDq3() {
		return dq3;
	}

	public double getPhi3() {
		return phi3;
	}

	public double getDq4() {
		return dq4;
	}

	public double getPhi4() {
		return phi4;
	}

	public double getPhi5() {
		return phi5;
	}

	public double getLambda2() {
		return lambda2;
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

	public Double getLat() {
		return lat;
	}

	public Double getLng() {
		return lng;
	}
	
	public String toString(){
		return this.x+", "+this.y;
	}
}
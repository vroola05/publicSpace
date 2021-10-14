package org.commonground.ps.backendapi.util.geocoding;

public class ConvertFromRdToWGS84 {

	public ConvertFromRdToWGS84() {
	}

	public static double[] convertFromRdToWGS84(double x, double y) {
		double[] result = new double[2];
		double lat = getPhiwgs(x, y);
		double lng = getLamwgs(x, y);
		result[0] = lat;
		result[1] = lng;
		return result;
	}

	static double getD_1(double x) {
		return (x - ConvertingConstants.x0);
	}

	static double getD_2(double y) {
		return (y - ConvertingConstants.y0);
	}

	static double getR(double x, double y) {
		return Math.sqrt(((Math.pow(getD_1(x), 2)) + (Math.pow(getD_2(y), 2))));
	}

	static double getSa(double x, double y) {
		if (getR(x, y) < 0 || getR(x, y) > 0) {
			return ((x - ConvertingConstants.x0) / getR(x, y));
		}
		return 0;
	}

	static double getCa(double x, double y) {
		if (getR(x, y) < 0 || getR(x, y) > 0) {
			return ((y - ConvertingConstants.y0) / getR(x, y));
		}
		return 0;
	}

	static double getPsi(double x, double y) {
		return (Math.atan2(getR(x, y), (ConvertingConstants.k * 2 * ConvertingConstants.bigr)) * 2);
	}

	static double getCpsi(double x, double y) {
		return (Math.cos(getPsi(x, y)));
	}

	static double getSpsi(double x, double y) {
		return (Math.sin(getPsi(x, y)));
	}

	static double getSb(double x, double y) {
		return (((getCa(x, y) * (Math.cos(ConvertingConstants.b0))) * getSpsi(x, y))
				+ ((Math.sin(ConvertingConstants.b0)) * getCpsi(x, y)));
	}

	static double getCb(double x, double y) {
		return (Math.sqrt((1 - (Math.pow(getSb(x, y), 2)))));
	}

	static double getB(double x, double y) {
		return (Math.acos(getCb(x, y)));
	}

	static double getSdl(double x, double y) {
		return ((getSa(x, y) * getSpsi(x, y)) / getCb(x, y));
	}

	static double getDl(double x, double y) {
		return (Math.asin(getSdl(x, y)));
	}

	static double getLambda(double x, double y) {
		return ((getDl(x, y) / ConvertingConstants.n) + ConvertingConstants.lambda0);
	}

	static double getW(double x, double y) {
		return (Math.log((Math.tan(((getB(x, y) / 2) + (ConvertingConstants.pi / 4))))));
	}

	static double getQ(double x, double y) {
		return ((getW(x, y) - ConvertingConstants.m) / ConvertingConstants.n);
	}

	static double getPhiPrime(double x, double y) {
		return (((Math.atan(Math.exp(getQ(x, y)))) * 2) - (ConvertingConstants.pi / 2));
	}

	static double getDq(double x, double y) {
		return (ConvertingConstants.e / 2 * (Math.log((((ConvertingConstants.e * Math.sin(getPhiPrime(x, y))) + 1)
				/ (1 - (ConvertingConstants.e * Math.sin(getPhiPrime(x, y))))))));
	}

	static double getPhi(double x, double y) {
		return ((Math.atan(Math.exp((getQ(x, y) + getDq(x, y)))) * 2) - (ConvertingConstants.pi / 2));
	}

	static double getDq2(double x, double y) {
		return (ConvertingConstants.e / 2 * (Math.log((((ConvertingConstants.e * Math.sin(getPhi(x, y))) + 1)
				/ (1 - (ConvertingConstants.e * Math.sin(getPhi(x, y))))))));
	}

	static double getPhi2(double x, double y) {
		return ((Math.atan(Math.exp((getQ(x, y) + getDq2(x, y)))) * 2) - (ConvertingConstants.pi / 2));
	}

	static double getDq3(double x, double y) {
		return (ConvertingConstants.e / 2 * (Math.log((((ConvertingConstants.e * Math.sin(getPhi2(x, y))) + 1)
				/ (1 - (ConvertingConstants.e * Math.sin(getPhi2(x, y))))))));
	}

	static double getPhi3(double x, double y) {
		return ((Math.atan(Math.exp((getQ(x, y) + getDq3(x, y)))) * 2) - (ConvertingConstants.pi / 2));
	}

	static double getDq4(double x, double y) {
		return (ConvertingConstants.e / 2 * (Math.log((((ConvertingConstants.e * Math.sin(getPhi3(x, y))) + 1)
				/ (1 - (ConvertingConstants.e * Math.sin(getPhi3(x, y))))))));
	}

	static double getPhi4(double x, double y) {
		return ((Math.atan(Math.exp((getQ(x, y) + getDq4(x, y)))) * 2) - (ConvertingConstants.pi / 2));
	}

	static double getLambda2(double x, double y) {
		return ((getLambda(x, y) / ConvertingConstants.pi) * 180);
	}

	static double getPhi5(double x, double y) {
		return ((getPhi4(x, y) / ConvertingConstants.pi) * 180);
	}

	static double getDphi(double x, double y) {
		return (getPhi5(x, y) - 52);
	}

	static double getDlam(double x, double y) {
		return (getLambda2(x, y) - 5);
	}

	static double getPhicor(double x, double y) {
		return ((-96.862 - (getDphi(x, y) * 11.714) - (getDlam(x, y) * 0.125)) * 0.00001);
	}

	static double getLamcor(double x, double y) {
		return (((getDphi(x, y) * 0.329) - 37.902 - (getDlam(x, y) * 14.667)) * 0.00001);
	}

	static double getPhiwgs(double x, double y) {
		return (getPhi5(x, y) + getPhicor(x, y));
	}

	static double getLamwgs(double x, double y) {
		return (getLambda2(x, y) + getLamcor(x, y));
	}
}
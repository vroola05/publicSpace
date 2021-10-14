package org.commonground.ps.backendapi.util.geocoding;

public class Geo {
	public static double[] toLatLong(double x, double y) {
		return ConvertFromRdToWGS84.convertFromRdToWGS84(x, y);
	}

	public static double[] toXY(double lat, double lng) {
		return ConvertFromWGS84ToRd.convertFromWGS84ToRd(lat, lng);
	}
}

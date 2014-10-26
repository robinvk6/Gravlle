/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.icanj.app.utils;

import java.text.DateFormat;
import java.text.DateFormatSymbols;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.security.core.codec.Base64;

/**
 *
 * @author maxjerin
 */
public class UtilityMethods {

	public static String parsePhone( String phoneNumber ) {

		phoneNumber = phoneNumber.replace( "(", "" );
		phoneNumber = phoneNumber.replace( ") ", "" );
		phoneNumber = phoneNumber.replace( "-", "" );
		phoneNumber = phoneNumber.replace( "  ", "" );
		return phoneNumber;
	}
	
	public static String getMonthfromInt(int month) {
	    return new DateFormatSymbols().getMonths()[month-1];
	}
	
	public static Date getDatefromString(String date) throws ParseException{
		//Expected Date Format "2012-02-18"
		String startDateString = date;
	    DateFormat df = new SimpleDateFormat("yyyy-MM-dd"); 
	    Date startDate = null;
	    
	   startDate = df.parse(startDateString);	        
	   
	    return startDate;
	}
	public static Date getDOBfromString(String dateS) throws ParseException{
		DateFormat formatter = new SimpleDateFormat("MM-dd-yyyy");
		Date date = (Date) formatter.parse(dateS);
		return date;
	}
	
	public static String encoder(String id) throws Exception{
		
		byte[] encoded = Base64.encode(id.getBytes());
		return new String(encoded);
	}
	
	public static String decoder(String id){
		byte[] decoded = Base64.decode(id.getBytes());
		return new String(decoded);
	}
}

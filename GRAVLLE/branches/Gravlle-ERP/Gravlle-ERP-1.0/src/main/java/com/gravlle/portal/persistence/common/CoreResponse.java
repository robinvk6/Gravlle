package com.gravlle.portal.persistence.common;

public class CoreResponse {
	private int code;
	private String message;
	private String cssAlertClass;
	
	public int getCode() {
		return code;
	}
	public void setCode(int code) {
		this.code = code;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	
	public CoreResponse() {
		
	}
	
	public CoreResponse(int code,String cssAlertMsg,String message){
		this.code=code;
		this.cssAlertClass = cssAlertMsg;
		this.message=message;
	}
	
	public CoreResponse(String cssAlertMsg,String message){
		this.cssAlertClass = cssAlertMsg;
		this.message=message;
	}
	public String getCssAlertClass() {
		return cssAlertClass;
	}
	public void setCssAlertClass(String cssAlertClass) {
		this.cssAlertClass = cssAlertClass;
	}
}

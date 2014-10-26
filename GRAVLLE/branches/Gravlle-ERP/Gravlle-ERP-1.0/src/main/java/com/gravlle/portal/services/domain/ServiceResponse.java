package com.gravlle.portal.services.domain;

public class ServiceResponse {
	
	private ResponseStatus status;
	private String message;
	private Object payload;
	
	public ServiceResponse(ResponseStatus status,String message,Object payload) {
		this.status=status;
		this.message=message;
		this.payload=payload;
	}
	
	public ResponseStatus getStatus() {
		return status;
	}
	public void setStatus(ResponseStatus status) {
		this.status = status;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public Object getPayload() {
		return payload;
	}
	public void setPayload(Object payload) {
		this.payload = payload;
	}

}
